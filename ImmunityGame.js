


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
class BodyPart {
    constructor(texture, x, y, width, height) {
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    
    draw() {
        ctx.drawImage(
            this.texture, 0, 0, STATIC_IMAGE_WIDTH, STATIC_IMAGE_HEIGHT,
            this.x,
            this.y,
            this.width,
            this.height)
    }
    
    isIntersected(x, y) {
        return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height)
    }
}
class GarbagePile{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.texture = GARBAGE_IMAGE;
        this.health = this.radius * 30;
    }
    draw(){
        ctx.drawImage(
            this.texture,
            this.x-this.radius/2,
            this.y-this.radius/2,
            this.radius*2, this.radius*2)
    }
}
class Button extends BodyPart {
    constructor(color, x, y, width, height, text) {
        super("", x, y, width, height);
        this.color = color;
        this.text = text;
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.1;
        circle(this.x+this.width/2, this.y+this.height/2, this.width/2, true);
        ctx.globalAlpha = 1;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        circle(this.x+this.width/2, this.y+this.height/2, this.width/2, false);
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
    }
    
}
//--------BASIC CLASSES----------

//---------ORGANS----------------
class Shop extends BodyPart {
  
    constructor(texture, x, y, width, height, cellType, price, enemyTexture, cellTexture, isEnemyAnimated, isCellAnimated) {
        super(texture, x, y, width, height);
        this.cellType = cellType;
        this.price = price;
        
        this.enemyTexture = enemyTexture;
        this.cellTexture = cellTexture;
        this.isEnemyAnimated = isEnemyAnimated;
        this.isCellAnimated = isCellAnimated;
    }

    buy() {
//        console.log("Buying " + this.cellType);
        if(money - this.price >= 0) {
//            console.log("Got enough money");
//            console.log("x: " + (this.x + this.width / 2));
//            console.log("y: " + (this.y + this.height / 2));
            var cell = new this.cellType(
                randomUniform(this.x, this.x + this.width),
                randomUniform(this.y, this.y + this.height));
            immunityCells.push(cell);
            money -= this.price;
        }
    }
    
    draw() {
        super.draw();
    
        ctx.fillStyle = "Black";
        ctx.textBaseline = "top";
        
        // Name of the cell type sold
        ctx.font = this.width/10 + "px Courier";
        ctx.textAlign = "center";
        ctx.fillText(this.cellType.name, this.x + this.width / 2, this.y + this.height/10);
        
        ctx.font = this.width/11 + "px Courier";
        ctx.textAlign = "center";
        ctx.fillText("Produces", this.x + this.width/4, this.y + 3*this.height/10);
        ctx.fillText("Kills", this.x + 3*this.width/4, this.y + 3*this.height/10);

        ctx.drawImage(
            this.cellTexture, 0, 0,
            this.isCellAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isCellAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
            this.x + this.width/4 - 3*this.width/10/2,
            this.y + 4.5*this.height/10,
            3*this.width/10,
            3*this.height/10)
        
            
        ctx.drawImage(
            this.enemyTexture, 0, 0,
            this.isEnemyAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isEnemyAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.x + 3*this.width/4 - 3*this.width/10/2,
            this.y + 4.5*this.height/10,
            3*this.width/10,
            9/4*this.height/10)
        
        ctx.font = this.width/9 + "px Courier";
        ctx.fillText("Price: " + this.price, this.x + this.width / 2, this.y + 8*this.height/10);
        }
}
class SpleenSection{
    constructor(x, y, size){
        this.x = x + size/2;
        this.y = y + size/2;
        this.size = size; // width = height = size
        this.antigen = null;
        this.texture = BONE_MARROW_IMAGE;
    }
    
    draw(){
        ctx.drawImage(
            this.texture, 0, 0, STATIC_IMAGE_WIDTH, STATIC_IMAGE_HEIGHT,
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size)
    }
}   
class Spleen extends BodyPart{
    constructor(color, x, y, width, height, nSections){
        super(color, x, y, width, height);
        this.sections = [];
        var sectionSize = this.width/((nSections - 4)/4 + 2);
        for (var i = 0; i < this.width/sectionSize; i ++){
            for (var j = 0; j < this.width/sectionSize; j ++){
                if (i === 0 || j === 0 || i === this.width/sectionSize-1 || j === this.width/sectionSize-1){
                    this.sections.push(new SpleenSection(this.x + i*sectionSize, this.y+j*sectionSize, this.width/((nSections - 4)/4 + 2)));
                }
            }    
        }
    }
    draw(){
        super.draw();
        this.sections.forEach((section) => section.draw());
    }
}
class Antibiotic extends Button {
    constructor(color, x, y, width, height, price){
        super(color, x, y, width, height, "A");
        this.price = price;
        this.course = 0;
        this.lastWave = null;
        this.available = true;
    }  
    
    activate(){
        if (this.available && money - this.price >= 0){
            money -= this.price;
            bacteria.filter((bacterium) => bacterium.color === this.color).forEach((bacterium) => {
                bacterium.health = 1;
            })
            if (this.lastWave != wave){
                this.course += 1;
                this.course = this.course % ANTIBIOTIC_COURSE_LENGTH;
                if (this.course === 0){
                    this.lastWave = null;
                } else {
                    this.lastWave = wave;
                }
            }
            
        }
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.1;
        circle(this.x+this.width/2, this.y+this.height/2, this.width/2, true);
        ctx.globalAlpha = 1;
        if (this.course > 0){
            ctx.beginPath();
            ctx.moveTo(this.x+this.width/2, this.y+this.height/2);
            ctx.arc(this.x+this.width/2, this.y+this.height/2, this.width/2, -Math.PI/2, -Math.PI/2+2*Math.PI*this.course/ANTIBIOTIC_COURSE_LENGTH, false);
            ctx.fill();
            
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        circle(this.x+this.width/2, this.y+this.height/2, this.width/2, false);
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
        if (!this.available){
            ctx.strokeStyle = "red";
            ctx.lineWidth = 4;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.moveTo(this.x + this.width, this.y);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.stroke();
        }
    }
}
class Vaccine extends Button{
    constructor(color, x, y, width, height, price){
        super(color, x, y, width, height, "V");
        this.price = price;
    }  
    activate(){
        if (money - this.price >= 0){
            money -= this.price;
            var targetTissueCells = [];
            for (var i = 0; i < nVaccinate; i++){
                targetTissueCells.push(randomChoice(tissueCells.filter((cell) => !(cell in targetTissueCells) && cell.infection.length === 0)));
            }
            targetTissueCells.forEach((cell) => cell.vaccine = this.color);                          
        }
    }
}
//---------ORGANS----------------


//--------HOST CELLS-------------
class TissueCell{
    constructor(x, y, size=tissueCellSize){
        this.x = x;
        this.y = y;
        this.size = size;
        this.infection = [];
        this.health = 100;
        this.texture = CELL_IMAGE;
        this.vaccine = null;
    }
    
    draw(){
        if (this.size < tissueCellSize){this.size = Math.min(this.size + 0.05, tissueCellSize)};
        
        ctx.drawImage(
            this.texture, 0, 0, STATIC_IMAGE_WIDTH, STATIC_IMAGE_HEIGHT,
            this.x + (tissueCellSize - this.size) / 2,
            this.y + (tissueCellSize - this.size) / 2,
            this.size,
            this.size)
        
        if (this.infection.length !== 0){
            ctx.fillStyle = this.infection[0].color;
            ctx.globalAlpha = (this.infection.length+this.infection.length*0.2)/(maxVirusesInTissueCell+this.infection.length*0.2);
            circle(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, true);
        } else if (this.vaccine != null){
            ctx.fillStyle = this.vaccine;
            ctx.globalAlpha = 0.1;
            circle(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, true);
            ctx.globalAlpha = 1;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText("V", this.x + this.size / 2, this.y + this.size / 2)
        }
        ctx.globalAlpha = 1;
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
            if (this.target.infection.length > 0){
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
//--------HOST CELLS-------------


//---------PATHOGENS-------------
class Virus{
    constructor(color, doublingTime, host){
        this.color = color;
        this.doublingTime = doublingTime;
        this.timeToDouble = 0;
        if (host === null){
            this.host = randomChoice(tissueCells.filter(function isOnEdge(cell){return cell.x === offset;}));} 
        else {
            this.host = host;
        }
        if (this.host.infection.length === 0 && this.host.x === EdgeCellX){
            livesLeft--;
        }
        this.host.infection.push(this);
    }
    
    grow(){

        this.host.health -= 0.001;
        
        if (++this.timeToDouble === this.doublingTime){
            this.timeToDouble = 0;
            
            var virusLoad = this.host.infection.length;
            var spreadDisease = Math.random() > viralSpreadThreshold/virusLoad;
            var cellToInfect;
            if (spreadDisease){
                var thisHost = this.host;
                var thisColor = this.color;
                cellToInfect = randomChoice(tissueCells.filter(
                    function isUninfectedNeighbour(cell){
                    return tissueCellsDistance(thisHost, cell) < 1.5 && cell.size === tissueCellSize && (cell.infection.length === 0 || cell.infection[0].color === thisColor) && (cell.vaccine != thisColor);
                    }));
            } else {
                cellToInfect = this.host
            }
            if (cellToInfect != null && cellToInfect.infection.length < maxVirusesInTissueCell){
                var newVirus = new Virus(this.color, this.doublingTime, cellToInfect);
                viruses.push(newVirus);
            }
        }
    }
    
}
class Bacterium extends MovingObject {
    constructor(color, x, y, radius, maxHealth, price) {
        var texture = BACTERIA_IMAGES.get(color);

        super(texture, x, y, radius)
        this.color = color;
        this.xSpeed = randomUniform(-5, 5); 
        this.ySpeed = randomUniform(-5, 5);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.price = price;
        this.mode = "enemy";
        this.spleenSection;
    }


    move() {
        super.move();

        // If a bacterium went through the right wall, you lose a point
        if (this.x > fieldWidth) {
             --livesLeft; 
        };
      
        if (this.mode === "enemy"){
            this.y = clip(this.y, playableFieldStart + this.radius, playableFieldHeight - this.radius);            
        }
    }

    changeDirection() {
        if (this.mode === "enemy"){
            this.xSpeed = randomUniform(-0.8, 1.2); 
            this.ySpeed = randomUniform(-1, 1);            
        } else if (this.mode === "antigen"){
            [this.xSpeed, this.ySpeed] = moveTo(this.x, this.y, this.spleenSection.x, this.spleenSection.y, 1);
        }
    }

    draw() {
        if (this.mode === "enemy"){
            ctx.globalAlpha = clip(this.health / this.maxHealth, 0.5, 1);
            super.draw();
            ctx.globalAlpha = 1;            
        } else if (this.mode === "antigen"){
            super.draw();
        }

    }
}
class Helmint {
    constructor(x, y, health, price, delay, width, length){
        this.x = x;
        this.y = y;
        this.maxHealth = health;
        this.health = health;
        this.price = price;
        this.parts = [];
        this.delay = delay;
        this.texture = HELMINTH_IMAGE;
        this.width = width;
        this.movingtime = 0;
        this.overlay = this.width*0.6; // stupid, but this is actually something inversely proportional to the overlay of the segments
        for (var i=0; i < length; i++){
            this.parts.push(new MovingObject(this.texture, this.x-i*this.overlay, this.y, this.width/2));
        }
    }
    
    draw(){
        this.parts.forEach((part) => {part.draw(false)});
        // Draw a healthbar

        if (this.health > 0 && this.parts.length > 0){
            var barY = this.parts.slice().sort(function(a, b){return a.y-b.y;})[0].y - this.width;
            var barX = this.parts[this.parts.length-1].x - this.width/2;
            var barLength = this.width*0.6*this.parts.length;
            var barWidth = this.width/5;
            var fillLength = barLength*this.health/this.maxHealth;
            if (this.health/this.maxHealth > 0.7){
                ctx.fillStyle = "#90ee90";    
            } else if (this.health/this.maxHealth > 0.3){
                ctx.fillStyle = "#fdfd96";
            } else {
                ctx.fillStyle = "#FF7F7F";
            }
            ctx.fillRect(barX, barY, fillLength, barWidth);
            ctx.fillStyle = 'white';
            ctx.fillRect(barX+fillLength, barY, barLength-fillLength, barWidth);
            ctx.strokeRect(barX, barY, barLength, barWidth);            
        }
        
    }
    
    move(){
        if (++this.movingtime >= this.delay){
            this.movingtime = 0;
            var segment = this.parts.pop();
            if (this.parts.length > 0){
                var newY = this.parts[0].y + randomUniform(-this.overlay, this.overlay);
                newY = clip(newY, playableFieldStart + this.width/2, playableFieldHeight-this.width/2);
                var newX = this.parts[0].x + Math.sqrt(Math.pow(this.overlay, 2) -  Math.pow(this.parts[0].y-newY, 2));
                if (newX > fieldWidth){
                    livesLeft--;
                } else {
                    segment.x = newX;
                    segment.y = newY;
                    this.parts.unshift(segment);
                } 
                this.x = segment.x;
                this.y = segment.y;
            } else {
                livesLeft--;
            }
        }
    }
}
//---------PATHOGENS-------------

//-----GAME SETUP FUNCTIONS------
function addTissueCells(tissueCellsList){
    for (var x = offset; x < fieldWidth - tissueCellSize - spaceBetweenTissueCells; x += tissueCellSize+spaceBetweenTissueCells){
            for (var y = shopHeight + offset; y < fieldHeight - buttonHeight - offset -tissueCellSize-spaceBetweenTissueCells; y += tissueCellSize+spaceBetweenTissueCells){
                    tissueCellsList.push(new TissueCell(x, y));
            }
}
    EdgeCellX = x;
    return tissueCellsList;
}
function addBacteria(bacteriaList, n, texture, maxHealth, price){
    for (var i=0; i<n; i++){
        var y = randomUniform(shopHeight + offset, playableFieldHeight); 
        var x = -10;
        var color = randomChoice(BACTERIA_COLORS);
        bacteriaList.push(new Bacterium(color, x, y, bacteriaRadius, maxHealth, price));
    };
    return bacteriaList;
}       
function addViruses(virusesList, n, color, doublingTime){
    for (var i=0; i < n; i++){
        virusesList.push(new Virus(randomChoice(BACTERIA_COLORS), doublingTime, null))
    }
    return virusesList;
}
function drawBlood(){
    var pointsBranch1 = 
        [[369, 378], [418, 346], [491, 333], [567, 313], [638, 260], [702, 193], 
            [759, 139], [837, 128], [915, 126], [942, 102], [957, 87], [980, 0]]
    ctx.lineWidth = 30;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(pointsBranch1[0][0], pointsBranch1[0][1]);
    for (var i=1; i < pointsBranch1.length; i++){
        ctx.lineTo(pointsBranch1[i][0], pointsBranch1[i][1]);
    }
    ctx.moveTo(942, 102)
    var pointsBranch2 = [[943, 227], [958, 266], [950, 292], [944, 351], [965, 365], [989, 377], [1021, 448], [1006, 481], [970, 550], [929, 584], [848, 644], [849, 668], [870, 706], [898, 722], [919, 744], [929, 754]];
    for (var i=1; i < pointsBranch2.length; i++){
        ctx.lineTo(pointsBranch2[i][0], pointsBranch2[i][1]);
    }
    
    ctx.stroke();
}
function printGameInfo(){
    ctx.fillStyle = "Black";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "20px Courier";
    ctx.fillText("Wave: "+ wave, offset, offset);
    ctx.fillText("Money: "+ Math.floor(money), offset, offset+20);
    ctx.fillText("Lives: "+ livesLeft, offset, offset+40);
    
            }
function gameOver(){
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over", fieldWidth/2, fieldHeight/2);
}
function checkAntibiotics(){
    buttons.filter((button) => button instanceof Antibiotic).forEach((anti) => {
        if ((anti.lastWave != null) && this.wave > anti.lastWave + 1){
            anti.available = false;
        }
    }
    );
}
//--------SETUP FUNCTIONS--------

// Game Setup
var immunityCells = [];

var shops = [
    new Shop(BONE_MARROW_IMAGE, xLeftOffset, offset, shopWidth, shopHeight - 2 * offset, NaturalKiller, 200, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + shopWidth + offset, offset, shopWidth, shopHeight - 2 * offset, BLymphocyte, 200, BACTERIA_IMAGE, LYMPHOCYTES_IMAGES.get("green")),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + 2 * shopWidth + 2 * offset, offset, shopWidth, shopHeight - 2 * offset, Neutrophil, 100, BACTERIA_IMAGE, NEUTROPHILS_IMAGE),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + 3 * shopWidth + 3 * offset, offset, shopWidth, shopHeight - 2 * offset, Eosinophile, 50, HELMINTH_IMAGE, EOSINOPHILES_IMAGE),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + 4*shopWidth + 4*offset, offset, shopWidth, shopHeight - 2 * offset, Macrophage, 300, GARBAGE_IMAGE, MACROPHAGES_IMAGE)
];
var buttons = [];
for (var i = 0; i < BACTERIA_COLORS.length; i++){
    buttons.push(new Antibiotic(BACTERIA_COLORS[i], fieldWidth/2 - buttonWidth*(BACTERIA_COLORS.length - i) - offset*(BACTERIA_COLORS.length - i), playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
    buttons.push(new Vaccine(BACTERIA_COLORS[i], fieldWidth/2 + offset*(i+1) + buttonWidth*i, playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
}
spleen = new Spleen(BONE_MARROW_IMAGE, xLeftOffset+5*shopWidth + 5*offset + 10, offset, shopHeight - 2 * offset, shopHeight - 2 * offset, 16);
var bacteria = addBacteria([], starting_nBacteria, BACTERIA_IMAGE, 100, 5);

var tissueCells = addTissueCells([]);
var viruses = [];
var helmintes = [];
var garbagePiles = [];
var wave = 1;
var gameOverTrue = false;  
// Gameplay
$("#field").click(function(event){
//    console.log("Page coordinates:")
//    console.log("[", event.pageX, ",", event.pageY, "],");

    x = event.pageX - field.offsetLeft;
    y = event.pageY - field.offsetTop;

//    console.log("Canvas coordinates:")
//    console.log("[", x, ",", y, "],");

    // If any of the shops clicked, try to buy cell;
    shops.forEach((shop) => {
//        console.log(shop);
//        console.log(shop.isIntersected(x, y));
        if(shop.isIntersected(x, y)) {
            shop.buy();
        }
    })
    
    // If any of the buttons are clicked, do their thing
    buttons.forEach((button)=>{
        if (button.isIntersected(x, y)){
            button.activate();
        }
    })
});

var game = setInterval(function(){
    if (gameOverTrue){
        gameOver();
    }
    else{
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    
    printGameInfo();
        
    shops.forEach((shop) => {shop.draw()})
    buttons.forEach((button) => {button.draw()})
    
    spleen.draw();
    var nextTurnTissueCells = [];
    tissueCells.forEach((cell) => {
        if(cell.health > 0) {
            cell.draw()
            nextTurnTissueCells.push(cell);
        } else {
            nextTurnTissueCells.push(new TissueCell(cell.x, cell.y, 1));
            viruses = viruses.filter(function notFromThisHost(virus){return virus.host != cell;});
        }
    })
    tissueCells = nextTurnTissueCells;
    garbagePiles.forEach((pile) => {pile.draw()})
    garbagePiles = garbagePiles.filter((pile) => pile.health > 0);
    var nextTurnHelmintes = [];
    helmintes.forEach((helmint) => {
        helmint.move();
        helmint.draw();
        if (helmint.parts.length > 0){
            if ((helmint.parts[helmint.parts.length - 1].x < fieldWidth)){
                if (helmint.health <= 0) {
    //                money += helmint.price;
                      garbagePiles.push(new GarbagePile(helmint.x, helmint.y, helmint.overlay*helmint.parts.length*0.5));
                } else {
                    nextTurnHelmintes.push(helmint);
                }
        }
        }
    })
    helmintes = nextTurnHelmintes;
    
//    drawBlood();
    
    var nextTurnBacteria = [];
    bacteria.forEach((bacterium) => {
        bacterium.move();
        bacterium.changeDirection();
        bacterium.draw();
        if ((bacterium.x < fieldWidth)){
            if (bacterium.health <= 0) {
                if (randomUniform(0, 1) < chanceToGetAntigen){
                    bacterium.mode = "antigen";
                    var sectionSet = spleen.sections.filter((section) => section.antigen === null);
                    if (sectionSet.length === 0){
                        sectionSet = spleen.sections;
                    }
                    bacterium.spleenSection = randomChoice(sectionSet);
                    bacterium.spleenSection.antigen = bacterium; 
                }
//                money += bacterium.price;
            } else{
                nextTurnBacteria.push(bacterium);
            }
        }
    })
    spleen.sections.forEach((section) => {
        if (section.antigen != null){
            section.antigen.move();
            section.antigen.changeDirection();
            section.antigen.draw();            
        }
    })
    
    bacteria = nextTurnBacteria;
    
    viruses.forEach((virus) => {
        virus.grow();
    })

                
    if (bacteria.length > 0){
        immunityCells.forEach((cell) => {
            cell.live();
            cell.move();

            var targetList;

            if(cell instanceof NaturalKiller) {
                targetList = tissueCells;
                
            } else if (cell instanceof Eosinophile){
                targetList = helmintes;
            } else if (cell instanceof Macrophage) {
                targetList = garbagePiles;}
            else {
                targetList = bacteria;
            }

            cell.changeDirection(targetList);
            cell.draw();
            
            // Visualize target
//            if(cell.target != null) {
//                ctx.beginPath();
//                ctx.strokeStyle = "red";
//                ctx.moveTo(cell.x, cell.y);
//                ctx.lineTo(cell.target.x, cell.target.y);
//                ctx.stroke();
//            }
            
        // Old cells die
        var oldCells = immunityCells.filter((cell)=>cell.age >= cell.longevity);
        oldCells.forEach((cell) => {
            garbagePiles.push(new GarbagePile(cell.x, cell.y, cell.radius));
        })
        immunityCells = immunityCells.filter((cell)=>cell.age < cell.longevity);
    })}
    
    if(bacteria.length === 0) {
        bacteria = addBacteria([], starting_nBacteria + wave * 10, BACTERIA_IMAGE, 100 + wave * 30, 5 + wave * 2);
        wave += 1;

        if (wave % 4 === 2) {
            viruses = addViruses(viruses, starting_nViruses, VIRUS_COLOR, VIRUS_DOUBLING_TIME - wave);
        }
        if (wave % 10 === 0){
            helmintes = [new Helmint(-10, randomUniform(playableFieldStart + 15, playableFieldHeight-15), 1000, 1000, 100, 30, 10)];
        }
        checkAntibiotics();
    }
    money += basePrice * tissueCells.filter((cell) => cell.infection.length === 0).length/tissueCells.length;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, fieldWidth, fieldHeight);
    if (livesLeft <= 0){
        gameOverTrue=true;
    };
    }
}, 1);