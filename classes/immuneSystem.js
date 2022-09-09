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
class ImmuneCell extends MovingObject {
    constructor(texture, x, y, radius, baseSpeed, damage, longevity=20000) {
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
        super(EOSINOPHILES_IMAGE, x, y, 10, 0.2, 0.01);
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

                targetsList = randomChoice(targetsList).parts;
                nCandidates = targetsList.length;
                
                // Move to the random target
                if (this.target == null || this.target.health <= 0 || this.target.x > fieldWidth)  
                {
                    this.target = findTarget(this.x, this.y, targetsList, Math.min(nCandidates, targetsList.length));
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
            if (this.target.infection.length > 0 || this.target.vaccine != null){
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
    constructor(x, y) {
        var color = "#FFFFFF";
        super(LYMPHOCYTES_IMAGES.get(color), x, y, 20, 0.3, 1);
        this.mode = "naive";
        this.shootingRadius = 40;
        this.iteration = 0;
        this.color = color;
    }

    move() {
        super.move();
        bacteria.forEach((bacterium) => {
            if(doCirclesIntersect(this.x, this.y, this.shootingRadius, bacterium.x, bacterium.y, bacterium.radius) && bacterium.mode === "enemy" && bacterium.color === this.color) {

                bacterium.health -= this.damage;
            }
        });
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
class Tlymphocyte extends ImmuneCell {
    constructor(x, y, color=null, active=false) {
        super(T_LYMPHOCYTES_IMAGE, x, y, 20, 0.5, 1);
        this.iteration = 0;
        if (color === null){
            this.color = randomChoice(BACTERIA_COLORS);
        } else {
            this.color = color;
        }
        this.active = active;
    }
    
    move() {
        super.move();
        if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)) {
            if ((this.target.infection.length > 0 && this.target.infection[0].color === this.color) || (this.target.vaccine === this.color)){
                this.target.health -= this.damage;  
                if (!this.active){
                    this.active = true;
                    for (var i = 0; i < TlymphocyteReproductionNumber; i++){
                        immunityCells.push(new Tlymphocyte(this.x, this.y, this.color, true));
                    }
                }
            } else{
                this.target = null;
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