class Virus{
    constructor(color, doublingTime, host){
        this.color = color;
        this.number = 1
        this.doublingTime = doublingTime;
        this.timeToDouble = 0;
        if (host === null){
            this.host = randomChoice(tissueCells.filter(function isOnEdgeAndGrownUp(cell){
                return cell.x === playableFieldX+tissueCellsLeftOffset && cell.size === tissueCellSize;}));} 
        else {
            this.host = host;
        }
        if (this.host.x === EdgeCellX){
            livesLeft--;
        }
        this.host.virus = this;
    }
    
    grow(){

        this.host.health -= 0.001*this.number;
        this.timeToDouble += 1*BASE_GAME_SPEED;
        if (this.timeToDouble >= this.doublingTime){
            this.timeToDouble = 0;
            var spreadDisease
            if (this.number < viralSpreadThreshold){
                spreadDisease = false;
            } else {
                spreadDisease = Math.random() < 0.62;
            }
             
            var cellToInfect = null;
            if (spreadDisease){
                var thisHost = this.host;
                var thisColor = this.color;
                cellToInfect = randomChoice(tissueCells.filter(
                    function isUninfectedNeighbour(cell){
                    return (tissueCellsDistance(thisHost, cell) < 1.5) && (cell.size === tissueCellSize) && (cell.virus == null || cell.virus.color === thisColor) && (cell.vaccine != thisColor);
                    }));
                if (cellToInfect != null){
                    if (cellToInfect.virus != null){
                        cellToInfect.virus.number++;
                    } else {
                        var newVirus = new Virus(this.color, this.doublingTime, cellToInfect);
                viruses.push(newVirus);
                    }
                }
            } else {
                this.number = Math.min(this.number*2, maxVirusesInTissueCell);
            }
        }
    }
    
}
class Bacterium extends MovingObject {
    constructor(color, x, y, radius, maxHealth) {
        var texture = bacteriaColors[color]["bacteriumImage"];
        super(texture, x, y, radius)
        this.color = color;
        this.xSpeed = randomUniform(-5, 5); 
        this.ySpeed = randomUniform(-5, 5);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.mode = "enemy";
        this.spleenSection;
        this.realBaseSpeed = BACTERIUM_BASE_SPEED;
        this.baseSpeed = BACTERIUM_BASE_SPEED*BASE_GAME_SPEED;
        this.angle = randomUniform(0, 2*Math.PI);
    }


    move() {
        super.move();

        // If a bacterium went through the right wall, you lose a point
        if (this.x > playableFieldX+playableFieldWidth) {
             --livesLeft; 
        };
      
        if (this.mode === "enemy"){
            this.y = clip(this.y, playableFieldY + this.radius, playableFieldY+playableFieldHeight - this.radius);            
        }
        this.angle += randomUniform(-0.01, 0.01);
    }

    changeDirection() {
        this.baseSpeed = BACTERIUM_BASE_SPEED*BASE_GAME_SPEED;
        if (this.mode === "enemy"){
            this.xSpeed = randomUniform(-1+this.baseSpeed, 1+this.baseSpeed); 
            this.ySpeed = randomUniform(-1, 1);            
        } else if (this.mode === "antigen"){
            [this.xSpeed, this.ySpeed] = moveTo(this.x, this.y, this.spleenSection.x, this.spleenSection.y, 1*BASE_GAME_SPEED);
            if (doCirclesIntersect(this.x, this.y, 0.1, this.spleenSection.x, this.spleenSection.y, 2));
        }
    }

    draw() {
        if (this.mode === "enemy"){
            ctx.globalAlpha = clip(this.health / this.maxHealth, 0.5, 1);
            ctx.save();
            ctx.translate(this.x+this.radius/2, this.y+this.radius/2);
            ctx.rotate(this.angle);
            ctx.drawImage(
                this.texture,
                -this.radius,
                -this.radius,
                2 * this.radius,
                2 * this.radius)
            ctx.restore();
            ctx.globalAlpha = 1;            
        } else if (this.mode === "antigen"){
            ctx.drawImage(
                this.texture,
                this.x-this.radius,
                this.y-this.radius,
                2 * this.radius,
                2 * this.radius)
        }

    }
}
class HelmintPart extends MovingObject{
    constructor(texture, x, y, radius, helmint){
        super(texture, x, y, radius);
        this.helmint = helmint;
        this.angle = 0;
    }
    draw(){
        if (this.x > 0 && this.y > 0 && this.x < playableFieldX+playableFieldWidth && this.y < playableFieldY+playableFieldHeight) {
            ctx.save();
            ctx.translate(this.x+this.radius/2, this.y+this.radius/2);
            ctx.rotate(this.angle);
            ctx.drawImage(
                this.texture,
                -this.radius,
                -this.radius,
                2 * this.radius,
                2 * this.radius)
            ctx.restore();
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
            this.parts.push(new HelmintPart(this.texture, 
                                            this.x-i*this.overlay, 
                                            this.y, 
                                            this.width/2, 
                                            this));
        }
    }
    
    draw(){
        for (let i = this.parts.length - 1; i >= 0; i--){
            this.parts[i].draw(false);
        }
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
        this.movingtime += 1*BASE_GAME_SPEED;
        if (this.movingtime >= this.delay){
            this.movingtime = 0;
            var segment = this.parts.pop();
            if (this.parts.length > 0){
                var newY = this.parts[0].y + randomUniform(-this.overlay, this.overlay);
                newY = clip(newY, playableFieldY + this.width/2, playableFieldY + playableFieldHeight-this.width/2);
                var newX = this.parts[0].x + Math.sqrt(Math.pow(this.overlay, 2) -  Math.pow(this.parts[0].y-newY, 2));
                
                var angle = Math.asin((newY - this.parts[0].y)/Math.pow(Math.pow(newX - this.parts[0].x, 2) + Math.pow(newY - this.parts[0].y, 2), 0.5));
                
                if (newX > playableFieldX+playableFieldWidth){
                    livesLeft--;
                } else {
                    segment.x = newX;
                    segment.y = newY;
                    segment.angle = angle;
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
class GarbagePile{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.texture = randomChoice(GARBAGE_IMAGES);
        this.health = this.radius * 30;
    }
    draw(){
        ctx.drawImage(
            this.texture,
            this.x-this.radius/2,
            this.y-this.radius/2,
            this.radius*2, this.radius*2*0.994);
    }
}

class IntracellularPathogen extends MovingObject {
    constructor(texture, x, y, radius, possibleHostTypes) {
        super(texture, x, y, radius);
        this.possibleHostTypes = possibleHostTypes;
        this.target = undefined;
        this.baseSpeed = 5;
        this.doublingProbability = HIV_DOUBLING_PROBABILITY;
    }

    changeDirection() {
        if(this.target == undefined) {
            this.xSpeed = randomUniform(-this.baseSpeed*BASE_GAME_SPEED*ART_SLOWING_COEFFICIENT, this.baseSpeed*BASE_GAME_SPEED*ART_SLOWING_COEFFICIENT);
            this.ySpeed = randomUniform(-this.baseSpeed*BASE_GAME_SPEED*ART_SLOWING_COEFFICIENT, this.baseSpeed*BASE_GAME_SPEED*ART_SLOWING_COEFFICIENT);
        }
    }

    move() {
        if(this.target == null) {
            // Mess around
            super.move();

            // If pathogen intersects any of its possible hosts, it goes inside
            immunityCells.forEach((cell) => {
                this.possibleHostTypes.forEach((host) => {
                    if((cell instanceof host) && (doCirclesIntersect(cell.x, cell.y, cell.radius, this.x, this.y, this.radius))) {
                        this.target = cell;
                    }
                });
            });
        }
        else {
            this.x = this.target.x + randomUniform(-3, 3);
            this.y = this.target.y + randomUniform(-3, 3);
        }
        
        this.x = clip(this.x, this.radius, playableFieldX + playableFieldWidth - this.radius)
        this.y = clip(this.y, playableFieldY + this.radius, playableFieldY + playableFieldHeight - this.radius)

    }

    act() {
        this.changeDirection();
        this.move();
    }
}


class HIV extends IntracellularPathogen {
    constructor(texture, x, y) {
        var radius = 3;
        super(texture, x, y, radius, [THelper]);
        this.age = 0;
    }

    act() {
        super.act();

        if(this.target != null) {
            // Kill host slowly
            this.target.age += HIV_DAMAGE;
            
            // Double sometimes
            if(randomUniform(0, 1)*BASE_GAME_SPEED < this.doublingProbability) {
                hiv_particles.push(new HIV(HIV_IMAGE, this.target.x, this.target.y));
                console.log("HIV doubled, total number of particles: " + hiv_particles.length);
            }

            if(this.target.age > this.target.longevity) {
                this.target = null;
            }
        } else {
            this.age += 1*BASE_GAME_SPEED;
        }
    }
}
