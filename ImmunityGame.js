const field = document.getElementById("field");

var ctx = field.getContext("2d");

const offset = 10;
const shopHeight = 200;
const MAX_SPEED = 1;

const fieldWidth = field.width;
const fieldHeight = field.height;
const playableFieldStart = shopHeight + offset;
const playableFieldHeight = fieldHeight - shopHeight;


const bacteriaRadius = 6;
var livesLeft = 10;
var money = 200;

var cells = [];
var shops = [];
var enemies = [];

function doCirclesIntersect(x1, y1, r1, x2, y2, r2) {
    centersDistance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    return (centersDistance <= Math.pow(r1 + r2, 2));
}

function randomUniform(low, high) {
    var u = Math.random() * (high - low);
    return u + low;
}

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

function drawCells(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "#a8dadc";
    
    var size = 30;
    var space = 5;

    for (var x = offset; x < fieldWidth - size - space; x += size+space){
        for (var y = shopHeight + offset; y < fieldHeight  - size - space; y += size+space){
            square(x, y, size);
        }    
    }
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
}

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
}


class Enemy extends MovingObject {
    constructor(color, x, y, radius) {
        super(color, x, y, radius)
        this.xSpeed = randomUniform(-5, 5); 
        this.ySpeed = randomUniform(-5, 5);
        this.health = 100;
        this.maxHealth = 100;
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
}

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
            cells.push(cell);
            console.log(cells);

            money -= this.price;
            $("h1").text("Lives left: " + livesLeft + ", money left: " + money); 
        }
    }

    isIntersected(x, y) {
        return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height)
    }
}

class TLymphocyte extends MovingObject {
    constructor(x, y) {
        super("#5EFF83", x, y, 20);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.nearestEnemy = undefined;
    }

    changeDirection() {
        if (this.y < shopHeight) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = 3;
        } else {

            if (enemies.length > 0) {
                // Move to the closest enemy
                this.nearestEnemy = findNearestEnemy(this.x, this.y, enemies);
                this.xSpeed = Math.min((this.nearestEnemy.x - this.x) / 100, MAX_SPEED);
                this.ySpeed = Math.min((this.nearestEnemy.y - this.y) / 100, MAX_SPEED);
            }
            else {
                this.xSpeed = 0;
                this.ySpeed = 0;
            }

            this.xSpeed += randomUniform(-2, 2);
            this.ySpeed += randomUniform(-2, 2);
            
        }
    }

    move() {
        super.move();
        this.y = clip(this.y, this.radius, fieldHeight - this.radius);

        if (
            (this.nearestEnemy !== undefined) &&
            doCirclesIntersect(this.x, this.y, this.radius, this.nearestEnemy.x, this.nearestEnemy.y, this.nearestEnemy.radius)
            )
        {
            this.nearestEnemy.health -= 1;
        }
    }
}

var findNearestEnemy = function(x, y, enemiesList) {
    var nearestIdx = 0;
    var nearestEnemyDistance = 10000;
            
    if (enemiesList.length > 0) {
        for(var i=0; i < enemiesList.length; i++) {
            distance = Math.abs(
                Math.pow(x - enemies[i].x, 2) + Math.pow(y - enemies[i].y, 2)
            )

            if (distance < nearestEnemyDistance) {
                nearestEnemyDistance = distance;
                nearestIdx = i;
            }
        }

        return enemiesList[nearestIdx];
    }
    else {
        return -1;
    }
}

var addEnemies = function(enemiesList, n, color){
    for (var i=0; i<n; i++){
        var y = randomUniform(shopHeight + offset, fieldHeight); 
        var x = -10;
        enemiesList.push(new Enemy(color, x, y, bacteriaRadius));
    };
    return enemiesList;
};       

var nEnemies = 30;
enemies = addEnemies(enemies, nEnemies, "green");

var boneMarrow = new Shop("#FEB2BA", 200, offset, shopHeight - 2 * offset, 200, TLymphocyte, 100);
shops.push(boneMarrow);

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
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);

    shops.forEach((shop) => {shop.draw()})

    drawCells();
    drawBlood();
    
    var nextTurnEnemies = [];

    enemies.forEach((enemy) => {
        enemy.move();
        enemy.changeDirection();
        enemy.draw();
        if ((enemy.x < fieldWidth) && (enemy.health > 0) ){
            nextTurnEnemies.push(enemy);
        }
    })

    cells.forEach((cell) => {
        cell.move();
        cell.changeDirection();
        cell.draw();
    })

    enemies = nextTurnEnemies;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, fieldWidth, fieldHeight);
}, 1);