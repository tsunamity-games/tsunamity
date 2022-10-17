//--------BASIC CLASSES----------
class MovingObject {
    constructor(texture, x, y, radius) {
        this.texture = texture;
        this.radius = radius;
        this.x = x;
        this.y = y;

        this.animation_frame = 0;  // Animation frame
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    changeDirection() {}

    draw() {
        if (this.x > 0 && this.y > 0 && this.x < fieldWidth && this.y < fieldHeight) {
            ctx.drawImage(
                this.texture,
                ANIMATED_IMAGE_WIDTH * this.animation_frame,
                0,
                ANIMATED_IMAGE_WIDTH,
                ANIMATED_IMAGE_HEIGHT,
                this.x - this.radius,
                this.y - this.radius,
                2 * this.radius,
                2 * this.radius)
            this.animation_frame = (this.animation_frame + 1) % N_ANIMATION_FRAMES;
        }
    }
}
class Antibody {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.age = 0;
        this.longevity = ANTIBODY_LONGEVITY;
        this.attached = null;
    }
    
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x, this.y-5);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x+2, this.y+2);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x-2, this.y+2);
        ctx.stroke();
    }
    
    move(){
        if (this.attached == null){
            this.age++;
            this.x += randomUniform(-2, 2);
            this.x = clip(this.x, 0, fieldWidth);
            this.y += randomUniform(-2, 2);
            this.y = clip(this.y, playableFieldStart, playableFieldHeight);
            bacteria.forEach((bacterium) =>{
                if (bacterium.color === this.color && doCirclesIntersect(bacterium.x, bacterium.y, bacterium.radius, this.x, this.y, 5)){
                    this.attached = bacterium;
                    this.attached.baseSpeed *=ANTIBODY_SLOWING_COEFFICIENT;
                } 
        });
        } else {
            this.x = this.attached.x + randomUniform(-this.attached.radius, this.attached.radius);
            this.y = Math.sqrt(Math.pow(this.attached.radius, 2) - Math.pow(this.x, 2))*randomChoice([1, -1]);
        }
    }
    
}
class ImmuneCell extends MovingObject {
    constructor(texture, x, y, radius, baseSpeed, damage, longevity=BASE_IMMUNITY_CELL_LONGEVITY) {
        super(texture, x, y, radius);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.target = undefined;
        this.baseSpeed = baseSpeed;
        this.damage = damage;
        this.age = 0;
        this.longevity = longevity;
        this.iteration = 0;
    }
    
    isIntersected(x, y) {
        return Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) < Math.pow(this.radius, 2);
    }
    
    changeDirection(targetsList, nCandidates=randomTargetNumber) {
        if (this.y < shopHeight && this.x < spleen.x) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        } else {

            if (targetsList.length > 0) {
                // Move to the random bacterium
                if (this.target == null || this.target.health <= 0 || this.target.x > fieldWidth)  
                {
                    this.target = findTarget(this.x, this.y, targetsList, Math.min(nCandidates, targetsList.length));
                }
                
                if (this.target != null) {
                    // helper variables
//                    [this.xSpeed, this.ySpeed] = moveTo(this.x, this.y, this.target.x, this.target.y, this.baseSpeed);
                    var x_sign = (this.target.x - this.x)/Math.abs(this.target.x - this.x);
                    var y_sign = (this.target.y - this.y)/Math.abs(this.target.y - this.y);
                    var ratio = (this.target.y - this.y)/(this.target.x - this.x);
                    
                    // Real calculation: speed is equal to base speed, direction is 'to the closest bacterium'
                    this.xSpeed = x_sign * this.baseSpeed / Math.sqrt(ratio*ratio + 1);                
                    this.ySpeed = y_sign * Math.abs(ratio * this.xSpeed);   
                }
                    
            }
            else {
                this.target = null;
                this.xSpeed = 0;
                this.ySpeed = 0;
            }

            this.xSpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
            this.ySpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
        }
    }

    move() {
        if (garbagePiles.some((pile) => doCirclesIntersect(this.x, this.y, this.radius, pile.x, pile.y, pile.radius))){
            this.x += this.xSpeed*garbagePileSlowingCoefficient;
            this.y += this.ySpeed*garbagePileSlowingCoefficient;
            
        }
        else{
            super.move();
        }
        this.x = clip(this.x, this.radius, fieldWidth - this.radius);
    }
    live(){
        if (this.y > playableFieldStart){
            this.age++;
        }
    }
}
class Neutrophil extends ImmuneCell {
    constructor(x, y) {
        super(NEUTROPHILS_IMAGE, x, y, 20, 0.4, 0.4);
    }

    move() {
        super.move();
        
        bacteria.forEach((bacterium) => {
            if(doCirclesIntersect(this.x, this.y, this.radius, bacterium.x, bacterium.y, bacterium.radius) && bacterium.mode === "enemy") {
                bacterium.health -= this.damage;
            }
        });
    }

    draw() {
        ctx.globalAlpha = 0.8;
        super.draw();
        ctx.globalAlpha = 1;
    }
}
class Macrophage extends ImmuneCell {
    constructor(x, y) {
        super(MACROPHAGES_IMAGE, x, y, 40, 0.4, 1);
        this.texture = MACROPHAGES_IMAGE;
    }
    move(){
        super.move();
        garbagePiles.forEach((pile) => {
            if(doCirclesIntersect(this.x, this.y, this.radius, pile.x, pile.y, pile.radius)) {
                pile.health -= this.damage;
            }
        });
    }
}
class Eosinophile extends ImmuneCell {
    constructor(x, y) {
        super(EOSINOPHILES_IMAGE, x, y, 10, 0.2, EOSINOPHILES_DAMAGE);
    } 
    move() {
        super.move();
        helmintes.forEach((helmint) => {
            if(
                helmint.parts.some(
                (part) => {return doCirclesIntersect(this.x, this.y, this.radius, part.x, part.y, part.radius)})
                )
                {helmint.health -= this.damage;}
        });
    }
    changeDirection(targetsList, nCandidates=randomTargetNumber){
        if (this.y < shopHeight) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        } else {
            if (targetsList.length > 0) {

                
                // Move to the random target
                if (this.target == null || this.target.helmint.health <= 0 || this.target.x > fieldWidth)  
                {
                    targetsList = randomChoice(targetsList).parts;
                    this.target = findTarget(this.x, this.y, 
                                             targetsList, 
                                             targetsList.length);
                }
                if (this.target != null) {
                    // helper variables
                    var x_sign = (this.target.x - this.x)/Math.abs(this.target.x - this.x);
                    var y_sign = (this.target.y - this.y)/Math.abs(this.target.y - this.y);
                    var ratio = (this.target.y - this.y)/(this.target.x - this.x);
                    
                    // Real calculation: speed is equal to base speed, direction is 'to the closest bacterium'
                    this.xSpeed = x_sign * this.baseSpeed / Math.sqrt(ratio*ratio + 1);                
                    this.ySpeed = y_sign * Math.abs(ratio * this.xSpeed);   
                }
                    
            }
            else {
                this.target = null;
                this.xSpeed = 0;
                this.ySpeed = 0;
            }

            this.xSpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
            this.ySpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
        }
    }
}
class NaturalKiller extends ImmuneCell {
    constructor(x, y) {
        super(T_LYMPHOCYTES_IMAGE, x, y, 20, 0.5, 1);
        this.iteration = 0;
    }

    move() {
        super.move();
        if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)) {
            if (this.target.infection.length > 0 || this.target.vaccine != null || this.target.nMutations >= cancerMutationsThreshold){
                this.target.health -= this.damage;    
            } else{
                this.target = null;
            }
            
        }
    }
    
    changeDirection(targetsList){
        super.changeDirection(targetsList, 10);
    }
}
class BLymphocyte extends ImmuneCell {
    constructor(x, y, mode="naive", color="#FFFFFF") {
        super(LYMPHOCYTES_IMAGES.get(color), x, y, 20, 0.3, 1);
        this.mode = mode;
        this.shootingRadius = 40;
        this.iteration = 0;
        this.color = color;
        this.label = new Label(this);
        this.killed = false;
        this.upgradePrice = 200;
        this.counter = 0;
    }

    upgrade(){
        this.label.active = false;
        if (this.mode === "mature"){
            this.mode = "plasmatic";
            this.damage = 0;
            this.upgradePrice = 300;
        } else if (this.mode === "plasmatic"){
            this.mode = "memory";
            this.longevity = BASE_IMMUNITY_CELL_LONGEVITY*4;
            this.baseSpeed = 0;
            this.upgradePrice = 0;
            shops.filter((shop)=> this instanceof shop.cellType).forEach((shop) =>{
                shop.pockets.push(new Pocket(shop, 
                                             shop.x + BACTERIA_COLORS.indexOf(this.color)*shop.width/BACTERIA_COLORS.length, shop.height+offset, shop.width/BACTERIA_COLORS.length, 2*offset*0.9, 
                                             this.color)) 
            })
        }
    }
    
    move() {
        if (this.mode != "memory"){
            super.move();
        }
        if (this.mode === "mature"){
            bacteria.forEach((bacterium) => {
                if(doCirclesIntersect(this.x, this.y, this.shootingRadius, bacterium.x, bacterium.y, bacterium.radius) && bacterium.mode === "enemy" && bacterium.color === this.color) {
                    bacterium.health -= this.damage;
                    if (!this.killed && bacterium.health <= 0){
                        this.killed = true;
                    }
                }
            })    
        }
        if (this.mode === "plasmatic"){
            this.y = clip(this.y, playableFieldStart+this.radius, playableFieldHeight-this.radius);
            if (this.counter++ % ANTIBODY_PRODUCTION_FREQUENCY == 0)
                antibodies.push(new Antibody(this.x, this.y, this.color));
        }
    }

    goToSplin(){
        if (this.y < shopHeight) {
            // Get away from shop
            this.xSpeed = 0;
            this.ySpeed = this.baseSpeed * 3;}
        else if (this.y >= shopHeight){
            this.xSpeed = 0.5;
            this.ySpeed = 0;
        } else{
            super.changeDirection()
        }}
    
    changeDirection(targetsList, nCandidates=randomTargetNumber){
        if (this.mode === "naive"){
            if (this.x < spleen.x){
                this.goToSplin();
            } else if (spleen.sections.filter((section)=> section.antigen != null).length > 0){
                super.changeDirection(spleen.sections.filter((section)=> section.antigen != null), nCandidates=spleen.sections.length);
            } else {
                super.changeDirection(spleen.sections, spleen.sections.length);
            }
            if (this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size/2)){
                if (this.target.antigen != null && doCirclesIntersect(this.target.x, this.target.y, this.target.size/2, this.target.antigen.x, this.target.antigen.y, this.target.antigen.radius) && randomUniform(0, 1) < 0.1){
                    this.texture = LYMPHOCYTES_IMAGES.get(this.target.antigen.color);
                    this.color = this.target.antigen.color;
                    this.mode = "mature";
                    this.target = null;
                }
                else{
                    this.target = null;
                }
            }
        } else if (this.mode === "mature") {
            super.changeDirection(targetsList.filter((target) => target.color === this.color), nCandidates);   
        } else if (this.mode === "plasmatic"){
            super.changeDirection(targetsList, 1000);
            if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)){
                this.target = null;
            }
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;

        // Visualize shooting radius
        if (this.x > 0 && this.y > 0 && this.x < fieldWidth && this.y < fieldHeight) {
            ctx.globalAlpha = 0.2;
            circle(this.x, this.y, this.shootingRadius, true);
            circle(this.x, this.y, this.shootingRadius, false);
            ctx.globalAlpha = 1;

            super.draw();
        }
    }
}
class TLymphocyte extends ImmuneCell {
    constructor(x, y, mode="killer", color=null, active=false) {
        super(T_LYMPHOCYTES_IMAGE, x, y, 20, 0.5, 1);
        this.iteration = 0;
        if (color === null){
            var probs = []
            BACTERIA_COLORS.forEach((color) => {
                probs.push(tissueCells.filter((tissueCell) => tissueCell.vaccine === color).length);
            })
            for (var i = 0; i < probs.length; i++){
                probs[i] += tissueCells.filter((tissueCell) => tissueCell.vaccine == null).length/4;                
            }
            
            this.color = randomChoice(BACTERIA_COLORS, probs);
        } else {
            this.color = color;
        }
        this.active = active;
        this.label = new Label(this);
        this.mode = mode;
        this.upgradePrice = 300;
    }
    
    upgrade(){
        this.label.active = false;
        if (this.mode === "killer"){
            this.mode = "memory";
            this.longevity = 100000;
            this.baseSpeed = 0;
            this.upgradePrice = 0;
            shops.filter((shop)=> this instanceof shop.cellType).forEach((shop) =>{
                shop.pockets.push(new Pocket(shop, 
                                             shop.x + BACTERIA_COLORS.indexOf(this.color)*shop.width/BACTERIA_COLORS.length, shop.height+offset, shop.width/BACTERIA_COLORS.length, 2*offset*0.9, 
                                             this.color))
            })
        }
    }
    
    move() {
        if (this.mode != "memory"){
            super.move();
            if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)) {
            if ((this.target.infection.length > 0 && this.target.infection[0].color === this.color) || (this.target.vaccine === this.color)){
                this.target.health -= this.damage;  
                if (!this.active){
                    this.active = true;
                    for (var i = 0; i < TlymphocyteReproductionNumber; i++){
                        immunityCells.push(new TLymphocyte(this.x, this.y, "killer", this.color, true));
                    }
                }
            } else{
                this.target = null;
            }
            
        }
        }
    }
    
    changeDirection(targetsList){
        super.changeDirection(targetsList, 10);
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.2;
        circle(this.x, this.y, 30, true);
        circle(this.x, this.y, 30, false);
        ctx.globalAlpha = 1;
        super.draw();
    }
}

class THelper extends ImmuneCell {
    constructor(x, y) {
        super(T_LYMPHOCYTES_IMAGE, x, y, 20, 0.5, 0, 100000);

        this.place = this.choosePlace();
        this.placeReached = false;
        this.cooldown = HELPER_BUYING_COOLDOWN;
        this.timeFromTheLastPurchase = 0;
    }

    choosePlace() {
        const ROWS = 4;
        const COLS = 12;

        const gridCellWidth = Math.floor(fieldWidth / COLS);
        const gridCellHeight = Math.floor((playableFieldHeight) / ROWS);
        
        const col = Math.floor(randomUniform(0, COLS));
        const row = Math.floor(randomUniform(0, ROWS));

        var place = [col * gridCellWidth + randomUniform(-10, 10), playableFieldStart + row * gridCellHeight + randomUniform(-10, 10)];
        place[0] = clip(place[0], this.radius, fieldWidth - this.radius);
        place[1] = clip(place[1], playableFieldStart + this.radius, playableFieldHeight - this.radius);

        return place;
    }

    changeDirection(){
        if (this.y < shopHeight) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        }
        else {
            
            if(this.placeReached) {
                // Mess around the place
                this.xSpeed = randomUniform(-0.1, 0.1);
                this.ySpeed = randomUniform(-0.1, 0.1);
            }
            else {
                // Move closer to place
                [this.xSpeed, this.ySpeed] = moveTo(this.x, this.y, this.place[0], this.place[1], this.baseSpeed);

                this.xSpeed += randomUniform(-0.1, 0.1);
                this.ySpeed += randomUniform(-0.1, 0.1);
            }
            
        }
    }

    move() {
        if(doCirclesIntersect(this.x, this.y, this.radius, this.place[0], this.place[1], 10)) {
            this.placeReached = true;
        }

        super.move();
    }

    act() {
        // Evaluate, which type of pathogen is threatening the body
        var infectedCells = tissueCells.filter((cell) => {return(cell.infection.length > 0)});
        var infectionRatio = infectedCells.length / tissueCells.length;
        var shopToBuy;

        if(infectionRatio > 0.1) {
            shopToBuy = T_LYMPHOCYTE_SHOP;
            T_LYMPHOCYTE_SHOP
        }
        else {
            shopToBuy = B_LYMPHOCYTE_SHOP;
        }

        shopToBuy.discount += 1;

        // Buy the cell once in a cooldown
        if(this.timeFromTheLastPurchase < this.cooldown) {
            this.timeFromTheLastPurchase += 1;
        }
        else {
            this.timeFromTheLastPurchase = 0;
    
            // Buy the corresponding lymphocyte
            money += shopToBuy.price;
            shopToBuy.buy();
        }
    }

    draw() {
        super.draw();

        // Draw the progress of buying a lymphocyte
        if(this.placeReached) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI*2 * this.timeFromTheLastPurchase / this.cooldown);
            ctx.stroke();
        }
    }
}
