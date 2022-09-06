// Field parameters
const field = document.getElementById("field");
var ctx = field.getContext("2d");
const fieldWidth = field.width;
const fieldHeight = field.height;
const shopHeight = 200;
const shopWidth = 200;
const offset = 10;
const playableFieldStart = shopHeight + offset;
const playableFieldHeight = fieldHeight - shopHeight;
const BACTERIA_COLORS = ["blue", "green", "yellow", "orange"];

// Animation parameters
const N_ANIMATION_FRAMES = 5;
const ANIMATED_IMAGE_WIDTH = 100;
const ANIMATED_IMAGE_HEIGHT = 80;
const STATIC_IMAGE_WIDTH = 200;
const STATIC_IMAGE_HEIGHT = 200;

const LYMPHOCYTES_IMAGES = new Map();  // Map from color to image of lymphocytes
const BACTERIA_IMAGES = new Map();  // Map from color to image of bacteria

BACTERIA_COLORS.forEach((color) => {
    const lymphocyte_image = new Image();
    lymphocyte_image.src = "./images/lymphocytes_" + color + ".png";
    LYMPHOCYTES_IMAGES.set(color, lymphocyte_image);
    
    const bacterium_image = new Image();
    bacterium_image.src = "./images/bacteria_" + color + ".png";
    BACTERIA_IMAGES.set(color, bacterium_image);
});

const LYMPHOCYTES_DEFAULT_IMAGE = new Image();
LYMPHOCYTES_DEFAULT_IMAGE.src = "./images/lymphocytes_dark.png";
LYMPHOCYTES_IMAGES.set("#FFFFFF", LYMPHOCYTES_DEFAULT_IMAGE)

console.log("Colors map for lymphocytes:");
console.log(LYMPHOCYTES_IMAGES);

const GARBAGE_IMAGE = new Image();
GARBAGE_IMAGE.src = "./images/garbage.png";

const T_LYMPHOCYTES_IMAGE = new Image();
T_LYMPHOCYTES_IMAGE.src = "./images/lymphocytes.png";

const MACROPHAGES_IMAGE = new Image();
MACROPHAGES_IMAGE.src = "./images/macrophages.png";

const EOSINOPHILES_IMAGE = new Image();
EOSINOPHILES_IMAGE.src = "./images/eosinophiles.png";

const BACTERIA_IMAGE = new Image();
BACTERIA_IMAGE.src = "./images/bacteria.png";

const HELMINTH_IMAGE = new Image();
HELMINTH_IMAGE.src = "./images/helminth.png";

const BONE_MARROW_IMAGE = new Image();
BONE_MARROW_IMAGE.src = "./images/bone_marrow.png";

const CELL_IMAGE = new Image();
CELL_IMAGE.src = "./images/cell.png";

const VIRUS_IMAGE = new Image();
VIRUS_IMAGE.src = "./images/virus.png";

// Host cell parameters
//      Tissue cells
const tissueCellSize = 30;
const spaceBetweenTissueCells = 5;
var EdgeCellX;

const TISSUE_CELL_COLOR = "#facdf3";

//      Lymphocytes
const randomTargetNumber = 5;

// Pathogen parameters
//      Viruses
const maxVirusesInTissueCell = 64;
const viralSpreadThreshold = 63;
const VIRUS_COLOR = "#800080";
const VIRUS_DOUBLING_TIME = 200;
var starting_nViruses = 2;

//      Bacteria
const bacteriaRadius = 6;
var starting_nBacteria = 30;

// Game parameters
var livesLeft = 10;
var money = 200;
var basePrice = 0.1;
var chanceToGetAntigen = 0.05;

//------------RANDOM-------------
function randomUniform(low, high) {
    var u = Math.random() * (high - low);
    return u + low;
}
function randomChoice(array){
    return array[Math.floor(Math.random()*array.length)];
}
//------------RANDOM-------------

//------------SHAPES-------------
function circle(x, y, radius, fillCircle){
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    if (fillCircle){
        ctx.fill();
    } else {
        ctx.stroke();
    }
}
function square(x, y, size){
    ctx.style = "black";
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
}
function star(cx, cy, nSpikes, outerRadius, innerRadius, color){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/nSpikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy-outerRadius)
      for(i=0;i<nSpikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y)
        rot+=step
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.lineWidth=1;
      ctx.strokeStyle='black';
      ctx.stroke();
      ctx.fillStyle=color;
      ctx.fill();
    }
//------------SHAPES-------------

//--------OTHER SUPPORT----------
function clip(x, min, max) {
    return Math.min(Math.max(min, x), max);
}

function moveTo(xFrom, yFrom, xTo, yTo, speed){
    if (xTo === xFrom && yTo === yFrom){
        return [0, 0];
    } 
    var x_sign = (xTo - xFrom)/Math.abs(xTo - xFrom);
    var y_sign = (yTo - yFrom)/Math.abs(yTo - yFrom);
    var ratio = (yTo - yFrom)/(xTo - xFrom);

    // Real calculation: speed is equal to base speed, direction is 'to the xTo yTo'
    var xSpeed;
    var ySpeed;
    if (Math.abs(xTo - xFrom) < 1){xSpeed = 0;} else {xSpeed = x_sign * speed / Math.sqrt(ratio*ratio + 1)}
    if (Math.abs(yTo - yFrom) < 1){ySpeed = 0;} else {ySpeed = y_sign * Math.abs(ratio * speed)} 
    return [xSpeed, ySpeed];
}
//--------OTHER SUPPORT----------

//-------SUPPORT FOR CELLS-------
function findTarget(x, y, targetList, n) {
    if (targetList.length > 0){
        var number = Math.floor(randomUniform(0, n));
        var res = targetList.sort(function(a, b){
            var da = Math.abs(Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2));
            var db = Math.abs(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2));
            return da-db;
        })[number]
        return res;            
    } else {return -1;}
}
function findRandomTarget(targetsList) {
    if (targetsList.length > 0){
        var idx = Math.round(randomUniform(0, targetsList.length));
        return targetsList[idx];
    }
    else {
        return -1;
    }
}
function doCirclesIntersect(x1, y1, r1, x2, y2, r2) {
    centersDistance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    return (centersDistance <= Math.pow(r1 + r2, 2));
}
function tissueCellsDistance(c1, c2){
    return (Math.abs(c1.x - c2.x) + Math.abs(c1.y-c2.y))/(tissueCellSize + spaceBetweenTissueCells);
}
//-------SUPPORT FOR CELLS-------

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
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw(){
        star(this.x, this.y, 12, this.size, this.size*0.2, "#A3A300");
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
        console.log("Buying " + this.cellType);
        if(money - this.price >= 0) {
            console.log("Got enough money");
            console.log("x: " + (this.x + this.width / 2));
            console.log("y: " + (this.y + this.height / 2));
            var cell = new this.cellType(
                randomUniform(this.x, this.x + this.width),
                randomUniform(this.y, this.y + this.height));
            immunityCells.push(cell);
            console.log(immunityCells);
            money -= this.price;
        }
    }
    
    draw() {
        super.draw();
    
        ctx.fillStyle = "Black";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";

        // Name of the cell type sold
        ctx.font = "20px Courier";
        ctx.fillText(this.cellType.name, this.x + this.width / 2 - 50, this.y + offset);

        ctx.font = "16px Courier";
        ctx.fillText("Produces", this.x + 25, this.y + 50);
        ctx.fillText("Kills", this.x + this.width  - 75, this.y + 50);

        ctx.font = "22px Courier";
        ctx.fillText("Price: " + this.price, this.x + offset + this.width / 2 - 55, this.y + this.height - 5 * offset);

        ctx.drawImage(
            this.cellTexture, 0, 0,
            this.isCellAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isCellAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
            this.x  + 25,
            this.y + 75,
            50,
            50)

        ctx.drawImage(
            this.enemyTexture, 0, 0,
            this.isEnemyAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isEnemyAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
            this.x + this.width - 75,
            this.y + 75,
            50,
            50)
        }
}
class SpleenSection{
    constructor(x, y, size){
        this.x = x + size/2;
        this.y = y + size/2;
        this.size = size;
        this.antigen = null;
        this.texture = BONE_MARROW_IMAGE;
    }
    
    draw(){
        ctx.drawImage(
            this.texture, 0, 0, STATIC_IMAGE_WIDTH, STATIC_IMAGE_HEIGHT,
            this.x - this.size / 2,
            this.y - this.size / 2,
            2 * this.size,
            2 * this.size)
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
        super.move();
        this.x = clip(this.x, this.radius, fieldWidth - this.radius);
    }
    live(){
        this.age++;
    }
    
}
class Macrophage extends ImmuneCell {
    constructor(x, y) {
        super(MACROPHAGES_IMAGE, x, y, 40, 0.4, 0.2);
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
class TLymphocyte extends ImmuneCell {
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
                cellToInfect = randomChoice(tissueCells.filter(
                    function isNeighbour(cell){
                    return tissueCellsDistance(thisHost, cell) < 1.5 && cell.size === tissueCellSize;
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
    constructor(texture, x, y, radius, maxHealth, price) {
        super(texture, x, y, radius)
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
            this.y = clip(this.y, playableFieldStart + this.radius, fieldHeight - this.radius);            
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
            ctx.globalAlpha = clip(this.health / this.maxHealth, 0.2, 1);
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
            for (var y = shopHeight + offset;y < fieldHeight-tissueCellSize-spaceBetweenTissueCells; y += tissueCellSize+spaceBetweenTissueCells){
                    tissueCellsList.push(new TissueCell(x, y));
            }
}
    EdgeCellX = x;
    return tissueCellsList;
}
function addBacteria(bacteriaList, n, texture, maxHealth, price){
    for (var i=0; i<n; i++){
        var y = randomUniform(shopHeight + offset, fieldHeight); 
        var x = -10;
        var color = randomChoice(["blue", "green", "yellow", "orange"];
        bacteriaList.push(new Bacterium(BACTERIA_COLORS.get(color), x, y, bacteriaRadius, maxHealth, price));
    };
    return bacteriaList;
}       
function addViruses(virusesList, n, color, doublingTime){
    for (var i=0; i < n; i++){
        virusesList.push(new Virus(color, doublingTime, null))
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
    
            };
function gameOver(){
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over", fieldWidth/2, fieldHeight/2);
}
//--------SETUP FUNCTIONS--------

// Game Setup
var immunityCells = [];
var shops = [
    new Shop(BONE_MARROW_IMAGE, shopWidth, offset, shopWidth, shopHeight - 2 * offset, TLymphocyte, 200, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE),
    new Shop(BONE_MARROW_IMAGE, 2 * shopWidth + offset, offset, shopWidth, shopHeight - 2 * offset, BLymphocyte, 200, BACTERIA_IMAGE, LYMPHOCYTES_IMAGES.get("green")),
    new Shop(BONE_MARROW_IMAGE, 3 * shopWidth + 2 * offset, offset, shopWidth, shopHeight - 2 * offset, Macrophage, 100, GARBAGE_IMAGE, MACROPHAGES_IMAGE),
    new Shop(BONE_MARROW_IMAGE, 4 * shopWidth + 3 * offset, offset, shopWidth, shopHeight - 2 * offset, Eosinophile, 50, HELMINTH_IMAGE, EOSINOPHILES_IMAGE)
];
spleen = new Spleen(BONE_MARROW_IMAGE, 150+4*200 + 20, offset, shopHeight - 2*offset, shopHeight - 2 * offset, 16);
var bacteria = addBacteria([], starting_nBacteria, BACTERIA_IMAGE, 100, 5);

var tissueCells = addTissueCells([]);
var viruses = [];
var helmintes = [];
var garbagePiles = [];
var wave = 1;
var gameOverTrue = false;  
// Gameplay
$("#field").click(function(event){
    console.log("Page coordinates:")
    console.log("[", event.pageX, ",", event.pageY, "],");

    x = event.pageX - field.offsetLeft;
    y = event.pageY - field.offsetTop;

    console.log("Canvas coordinates:")
    console.log("[", x, ",", y, "],");

    // If any of the shops clicked, try to buy cell;
    shops.forEach((shop) => {
        console.log(shop);
        console.log(shop.isIntersected(x, y));
        if(shop.isIntersected(x, y)) {
            shop.buy();
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

            if(cell instanceof TLymphocyte) {
                targetList = tissueCells;
                
            } else if (cell instanceof Eosinophile){
                targetList = helmintes;
            } else {
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