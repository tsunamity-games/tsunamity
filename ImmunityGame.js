const field = document.getElementById("field");

var ctx = field.getContext("2d");

const offset = 10;
const shopHeight = 200;
const MAX_SPEED = 1;
const maxVirusesInTissueCell = 64;
const viralSpreadThreshold = 63;

const fieldWidth = field.width;
const fieldHeight = field.height;
const playableFieldStart = shopHeight + offset;
const playableFieldHeight = fieldHeight - shopHeight;



const bacteriaRadius = 6;
const tissueCellSize = 30;
const spaceBetweenTissueCells = 5;
var EdgeCellX;

const randomEnemyNumber = 5;
var livesLeft = 10;
var money = 200;



var immunityCells = [];
var shops = [];
var enemies = [];
var tissueCells = [];
var viruses = [];

function doCirclesIntersect(x1, y1, r1, x2, y2, r2) {
    centersDistance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    return (centersDistance <= Math.pow(r1 + r2, 2));
};

function randomUniform(low, high) {
    var u = Math.random() * (high - low);
    return u + low;
};

function randomChoice(array){
    return array[Math.floor(Math.random()*array.length)];
};

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
};

function square(x, y, size){
    ctx.style = "black";
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
};

function tissueCellsDistance(c1, c2){
    return (Math.abs(c1.x - c2.x) + Math.abs(c1.y-c2.y))/(tissueCellSize + spaceBetweenTissueCells);
};

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
};

function clip(x, min, max) {
    return Math.min(Math.max(min, x), max);
};

class TissueCell{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = tissueCellSize;
        this.infection = [];
        this.health = 100;
    }
    
    draw(){
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        if (this.infection.length === 0){
            ctx.fillStyle = "#a8dadc";
        } else {
            ctx.fillStyle = this.infection[0].color;
            ctx.globalAlpha = (this.infection.length+this.infection.length*0.2)/(maxVirusesInTissueCell+this.infection.length*0.2);
        }
        square(this.x, this.y, tissueCellSize);
        ctx.globalAlpha = 1;
    }
};

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
        
        if (++this.timeToDouble === this.doublingTime){
            this.timeToDouble = 0;
            
            var virusLoad = this.host.infection.length;
            var spreadDisease = Math.random() > viralSpreadThreshold/virusLoad;
            var cellToInfect;
            if (spreadDisease){
                var me = this;
                cellToInfect = randomChoice(tissueCells.filter(
                    function isNeighbour(cell){
                    return tissueCellsDistance(me.host, cell) < 1.5;
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
    
};

class MovingObject {
    constructor(color, x, y, radius) {
        this.color = color;
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    changeDirection() {}

    draw() {
        ctx.fillStyle = this.color;
        if (this.x > 0 && this.y > 0 && this.x < fieldWidth && this.y < fieldHeight) {
            circle(this.x, this.y, this.radius, true);
            circle(this.x, this.y, this.radius, false);
        }
    }
};


class Enemy extends MovingObject {
    constructor(color, x, y, radius, maxHealth, price) {
        super(color, x, y, radius)
        this.xSpeed = randomUniform(-5, 5); 
        this.ySpeed = randomUniform(-5, 5);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.price = price;
    }

    move() {
        super.move();

        // If enemy went through the right wall, you lose a point
        if (this.x > fieldWidth) {
             $("h1").text("Lives left: " + --livesLeft + ", money left: " + money); 
        };

        this.y = clip(this.y, playableFieldStart + this.radius, fieldHeight - this.radius);
    }

    changeDirection() {
        this.xSpeed = randomUniform(-0.8, 1.2); 
        this.ySpeed = randomUniform(-1, 1);
    }

    draw() {
        ctx.globalAlpha = clip(this.health / this.maxHealth, 0.2, 1);
        super.draw();
        ctx.globalAlpha = 1;
    }
};

class Shop {
    constructor(color, x, y, width, height, cellType, price) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.cellType = cellType;
        this.price = price;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.height, this.width);
        ctx.style = this.color;
        ctx.strokeRect(this.x, this.y, this.height, this.width);
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
            $("h1").text("Lives left: " + livesLeft + ", money left: " + money); 
        }
    }

    isIntersected(x, y) {
        return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height)
    }
};

class ImmuneCell extends MovingObject {
    constructor(color, x, y, radius, baseSpeed, damage) {
        super(color, x, y, radius);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.targetEnemy = undefined;
        this.baseSpeed = baseSpeed;
        this.damage = damage;
    }
    
    changeDirection(enemiesList) {
        if (this.y < shopHeight) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        } else {

            if (enemiesList.length > 0) {
                
                // Move to the random enemy
                if (this.targetEnemy == null || this.targetEnemy.health <= 0 || this.targetEnemy.x > fieldWidth)  
                {
                    this.targetEnemy = findTargetEnemy(this.x, this.y, enemiesList, Math.min(randomEnemyNumber, enemies.length));
                }
                
                // helper variables
                var x_sign = (this.targetEnemy.x - this.x)/Math.abs(this.targetEnemy.x - this.x);
                var y_sign = (this.targetEnemy.y - this.y)/Math.abs(this.targetEnemy.y - this.y);
                var ratio = (this.targetEnemy.y - this.y)/(this.targetEnemy.x - this.x);
                
                // Real calculation: speed is equal to base speed, direction is 'to the enemy'
                this.xSpeed = x_sign * this.baseSpeed / Math.sqrt(ratio*ratio + 1);                
                this.ySpeed = y_sign * Math.abs(ratio * this.xSpeed);       
            }
            else {
                this.targetEnemy = null;
                this.xSpeed = 0;
                this.ySpeed = 0;
            }

            this.xSpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
            this.ySpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
        }
    }

    move() {
        super.move();
        this.y = clip(this.y, this.radius, fieldHeight - this.radius);
        this.x = clip(this.x, this.radius, fieldWidth - this.radius);
    }
};

class Macrophage extends ImmuneCell {
    constructor(x, y) {
        super("#FB7057", x, y, 50, 0.4, 0.2);
    }

    move() {
        super.move();
        
        enemies.forEach((enemy) => {
            if(doCirclesIntersect(this.x, this.y, this.radius, enemy.x, enemy.y, enemy.radius)) {
                enemy.health -= this.damage;
            }
        });
    }

    draw() {
        ctx.globalAlpha = 0.5;
        super.draw();
        ctx.globalAlpha = 1;
    }
};

class TLymphocyte extends ImmuneCell {
    constructor(x, y) {
        super("#5EFF83", x, y, 20, 0.5, 1)
    }

    move() {
        super.move();

        if(this.targetEnemy != null && doCirclesIntersect(this.x, this.y, this.radius, this.targetEnemy.x, this.targetEnemy.y, tissueCellSize / 2)) {
            this.targetEnemy.health -= this.damage;
        }
    }
};

class BLymphocyte extends ImmuneCell {
    constructor(x, y) {
        super("#975AF2", x, y, 20, 0.3, 1);
        this.shootingRadius = 40;
    }

    move() {
        super.move();
    
        enemies.forEach((enemy) => {
            if(doCirclesIntersect(this.x, this.y, this.shootingRadius, enemy.x, enemy.y, enemy.radius)) {
                enemy.health -= this.damage;
            }
        });
    }

    draw() {
        ctx.fillStyle = this.color;

        if (this.x > 0 && this.y > 0 && this.x < fieldWidth && this.y < fieldHeight) {
            ctx.globalAlpha = 0.2;
            circle(this.x, this.y, this.shootingRadius, true);
            circle(this.x, this.y, this.shootingRadius, false);

            ctx.globalAlpha = 1;
            circle(this.x, this.y, this.radius, true);
            circle(this.x, this.y, this.radius, false);
        }
    }
};

var findTargetEnemy = function(x, y, enemiesList, n) {
    if (enemiesList.length > 0){
        var number = Math.floor(randomUniform(0, n));
        var res = enemiesList.sort(function(a, b){
            var da = Math.abs(Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2));
            var db = Math.abs(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2));
            return da-db;
        })[number]
        return res;            
    } else {return -1;}
};

var findRandomEnemy = function(enemiesList) {
    if (enemiesList.length > 0){
        var idx = Math.round(randomUniform(0, enemiesList.length));
        return enemiesList[idx];
    }
    else {
        return -1;
    }
};

var addEnemies = function(enemiesList, n, color, maxHealth, price){
    for (var i=0; i<n; i++){
        var y = randomUniform(shopHeight + offset, fieldHeight); 
        var x = -10;
        enemiesList.push(new Enemy(color, x, y, bacteriaRadius, maxHealth, price));
    };
    return enemiesList;
};       

var addViruses = function(virusesList, n, color, doublingTime){
    for (var i=0; i < n; i++){
        virusesList.push(new Virus(color, doublingTime, null))
    }
    return virusesList;
};

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

function gameOver(){
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over", fieldWidth/2, fieldHeight/2);
};

// Add Tissue Cells
for (var x = offset; 
     x < fieldWidth - tissueCellSize - spaceBetweenTissueCells; 
     x += tissueCellSize+spaceBetweenTissueCells){
            for (var y = shopHeight + offset; 
                 y < fieldHeight  - tissueCellSize - spaceBetweenTissueCells; 
                 y += tissueCellSize+spaceBetweenTissueCells){
                    tissueCells.push(new TissueCell(x, y));
            }
    EdgeCellX = x;
}


var nEnemies = 30;
var nViruses = 2;

const ENEMY_COLOR = "#1CA63B";
const VIRUS_COLOR = "#800080";
const VIRUS_DOUBLING_TIME = 100;
enemies = addEnemies(enemies, nEnemies, ENEMY_COLOR, 100, 5);

shops = [
    // Bone marrow parts
    new Shop("#FEB2BA", 200, offset, shopHeight - 2 * offset, 200, TLymphocyte, 200),
    new Shop("#C4A4F4", 2 * 200, offset, shopHeight - 2 * offset, 200, BLymphocyte, 200),
    new Shop("#F2715A", 3 * 200, offset, shopHeight - 2 * offset, 200, Macrophage, 100),
];



var wave = 1;
var gameOverTrue = false; 

var game = setInterval(function(){
    if (gameOverTrue){
        gameOver();
    }
    else{
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);

    shops.forEach((shop) => {shop.draw()})

    var nextTurnTissueCells = [];
    tissueCells.forEach((cell) => {
        if(cell.health > 0) {
            cell.draw()
            nextTurnTissueCells.push(cell);
        }
    });
    tissueCells = nextTurnTissueCells;
    // drawBlood();
    
    var nextTurnEnemies = [];
    enemies.forEach((enemy) => {
        enemy.move();
        enemy.changeDirection();
        enemy.draw();
        if ((enemy.x < fieldWidth)){
            if (enemy.health <= 0) {
                money += enemy.price;
                $("h1").text("Lives left: " + livesLeft + ", money left: " + money); 
            } else{
                nextTurnEnemies.push(enemy);
            }
        }
    })
    enemies = nextTurnEnemies;
    
    viruses.forEach((virus) => {
        virus.grow();
    })
        
    if (enemies.length > 0){
        immunityCells.forEach((cell) => {
            cell.move();

            var enemiesList;

            if(cell instanceof TLymphocyte) {
                enemiesList = tissueCells.filter((cell) => {return cell.infection.length > 0});
            } else {
                enemiesList = enemies;
            }

            cell.changeDirection(enemiesList);
            cell.draw();
            
            // Visualize target enemy
            if(cell.targetEnemy != null) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.moveTo(cell.x, cell.y);
                ctx.lineTo(cell.targetEnemy.x, cell.targetEnemy.y);
                ctx.stroke();
            }
    })}

    
    if(enemies.length === 0) {
        enemies = addEnemies([], nEnemies + wave * 10, ENEMY_COLOR, 100 + wave * 30, 5 + wave * 2);
//        viruses = addViruses([], nViruses + wave, VIRUS_COLOR, VIRUS_DOUBLING_TIME);
        wave += 1;

        if (wave % 10 == 5) {
            viruses = addViruses(viruses, nViruses, VIRUS_COLOR, VIRUS_DOUBLING_TIME - wave);
        }
    }
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, fieldWidth, fieldHeight);
    if (livesLeft <= 0){
        gameOverTrue=true;
    };
    }
}, 1);