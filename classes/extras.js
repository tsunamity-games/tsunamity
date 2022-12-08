class Button extends BodyPart {
    constructor(color, x, y, width, height, text, isCircle=true, texture="", textLanguageLabel="") {
        super(texture, x, y, width, height);
        this.color = color;
        this.text = text;
        this.isCircle = isCircle;
        this.textLanguageLabel = textLanguageLabel;
    }
    
    draw(){
        if (this.textLanguageLabel){
            this.text = texts["menu"][this.textLanguageLabel][language];
        }
        if (this.texture != ""){
            super.draw();
        }
        else {
            
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.5;

            if(this.isCircle) {
                circle(this.x+this.width/2, this.y+this.height/2, this.width/2, true);
            }
            else {
//                ctx.fillRect(this.x, this.y, this.width, this.height);   
                ctx.strokeStyle = "#E8D9B4";
                ctx.lineWidth = 1;
                ctx.globalAlpha = 1;
//                ctx.strokeRect(this.x, this.y, this.width, this.height);
                roundRect(ctx, this.x, this.y, this.width, this.height, 5, 5, false, true);

            }

            ctx.globalAlpha = 1;
            if (this.text != ""){
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                if(this.isCircle) {
                    circle(this.x+this.width/2, this.y+this.height/2, this.width/2, false);
                    ctx.fillStyle = "black";
                    ctx.font = this.height * 0.7 + "px Rubik One"
                }
                else {
                    ctx.fillStyle = "#E8D9B4";
                    ctx.font = this.height * 0.3 + "px Rubik One"
                }

                ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
            }
        }
    }
    
}
class Antibiotic extends Button {
    constructor(color, x, y, width, height){
        super(color, x, y, width, height, "", false, bacteriaColors[color]["antibioticButtonImage"]["inactive"]);
        this.price = ANTIBIOTIC_PRICE;
        this.course = 0;
        this.lastWave = null;
        this.available = true;
    }  
    
    activate(){
        if (this.lastWave != wave && this.available){
            if (money >= this.price){
                money -= this.price;
                bacteria.filter((bacterium) => bacterium.color === this.color).forEach((bacterium) => {
                    bacterium.health = 1;
                })
                this.course += 1;
                this.course = this.course % ANTIBIOTIC_COURSE_LENGTH;
                if (this.course === 0){
                    this.lastWave = null;
                    this.texture = bacteriaColors[this.color]["antibioticButtonImage"]["inactive"]
                } else {
                    this.lastWave = wave;
                    this.texture = bacteriaColors[this.color]["antibioticButtonImage"]["active"]
                }
                historyObject.antibioticsBought += 1;                
            }
            else {
                moneyHighlighter.appear();
            }
        }
    }
    
    draw(){
        // Draw button
        super.draw();
        
        if (!this.available){
            ctx.drawImage(RESISTANCE_IMAGE, 
                          this.x-0.156*this.width, 
                          this.y-0.0312*this.height, 
                          this.width*1.354, 
                          this.height*1.0575);
        } else {
            // Draw bar nearby
            ctx.fillStyle = "#D9D9D9";
            ctx.fillRect(
                this.x+this.width + distanceBetweenAntibioticButtonAndBar, 
                this.y,
                antibioticBarWidth,
                this.height);
            ctx.fillStyle = bacteriaColors[this.color]["colorCode"];
            var filledHeight = (this.course/ANTIBIOTIC_COURSE_LENGTH)*this.height;
            ctx.fillRect(
                this.x + this.width + distanceBetweenAntibioticButtonAndBar, 
                this.y + this.height - filledHeight,
                antibioticBarWidth,
                filledHeight,
            );
        }
        
    }
}
class Vaccine extends Button{
    constructor(color, x, y, width, height){
        super(color, x, y, width, height, "V", isCircle=false);
        this.price = VACCINE_PRICE;
    }  
    activate(){
        if (money - this.price >= 0){
            money -= this.price;
            var targetTissueCells = [];
            for (var i = 0; i < nVaccinate; i++){
                targetTissueCells.push(randomChoice(tissueCells.filter((cell) => !(cell in targetTissueCells) && cell.virus == null)));
            }
            targetTissueCells.forEach((cell) => cell.vaccine = this.color);
            historyObject.vaccinesBought += 1;       
        } else {
            moneyHighlighter.appear();
        }
    }
    
    draw(){
        ctx.fillStyle = VIRUSES_CLASSIFICATION[this.color]["colorCode"];
        roundRect(ctx,
                  this.x, this.y, this.width, this.height,
                  leftRadius = 5, rightRadius = 5, fill = true, stroke = false);
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.2;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
        ctx.globalAlpha = 1;
    }

}
class Label extends BodyPart{
    constructor(labelledObject){
        super("", labelledObject.x - labelledObject.radius*3, labelledObject.y - labelledObject.radius*3, labelledObject.radius*6, labelledObject.radius*2*0.9)
        this.labelledObject = labelledObject;
        this.active = false;
        this.upgradeAvailable = false;
    }
    updatePosition(){
        this.x = this.labelledObject.x - UPGRADE_LABEL_WIDTH/2;
        this.y = this.labelledObject.y - this.labelledObject.radius - UPGRADE_LABEL_HEIGHT;
    }
    draw(){
        this.upgradeAvailable = (this.labelledObject.active || this.labelledObject.killed || this.labelledObject.mode === "plasmatic");
        this.updatePosition();
        if (this.active && this.upgradeAvailable){
            if (["naive", "mature"].includes(this.labelledObject.mode)){
                ctx.drawImage(
                    UPGRADE_PLASMATIC, 
                    this.labelledObject.x - UPGRADE_LABEL_WIDTH/2, 
                    this.labelledObject.y - this.labelledObject.radius - UPGRADE_LABEL_HEIGHT, UPGRADE_LABEL_WIDTH, UPGRADE_LABEL_HEIGHT);
            } else if (["plasmatic", "killer"].includes(this.labelledObject.mode)){
                ctx.drawImage(
                    UPGRADE_MEMORY, 
                    this.labelledObject.x-UPGRADE_LABEL_WIDTH/2, 
                    this.labelledObject.y - this.labelledObject.radius - UPGRADE_LABEL_HEIGHT, UPGRADE_LABEL_WIDTH, UPGRADE_LABEL_HEIGHT);
            }
        }
        if (!this.active && this.upgradeAvailable) {
            ctx.drawImage(UPGRADE_FIRST, 
                          this.labelledObject.x + this.labelledObject.radius*0.1, 
                          this.labelledObject.y + this.labelledObject.radius*0.1, 
                          UPGRADE_FIRST_SIZE*0.75, 
                          UPGRADE_FIRST_SIZE);
        }
    }
}
class Pocket extends Shop{
    constructor(shopObj, x, y, color){
        super(x, y, shopObj.cellType, shopObj.price, shopObj.texture, true, true, color)
        this.color = color;
        this.shopObj = shopObj;
        this.width = (shopObj.width*0.9028)/BACTERIA_COLORS.length;
        this.height = this.width*2.65;
        this.texture = null;
        if (this.shopObj == T_LYMPHOCYTE_SHOP){
            this.texture = VIRUSES_CLASSIFICATION[this.color]['pocketImage'];
        } else if (this.shopObj == B_LYMPHOCYTE_SHOP){
            this.texture = bacteriaColors[this.color]['pocketImage'];
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
//        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    buy(){
        if(money - this.price >= 0) {
            var mode;
            if (this.cellType == TLymphocyte){
                mode = "killer";
            } else if (this.cellType == BLymphocyte){
                mode = "mature";
            }
            var cell = new this.cellType(
                randomUniform(this.shopObj.x, this.shopObj.x + this.shopObj.width),
                randomUniform(this.shopObj.y, this.shopObj.y + this.shopObj.height), mode, 
                this.color);
            immunityCells.push(cell);
            money -= this.price;
            historyObject.cellsBought[cell.constructor.name] += 1;
        } else {moneyHighlighter.appear();}
    }
}
class GameHistory {
    constructor(){
        this.cellsBought = {
            NaturalKiller: 0,
            TLymphocyte: 0,
            BLymphocyte: 0,
            THelper: 0,
            Neutrophil: 0,
            Eosinophile: 0,
            Macrophage: 0,
            Plasmatic: 0,
            TMemory: 0,
            BMemory: 0
        }
        this.bacteriaKilled = 0;
        this.tissueCellsKilled = 0;
        this.helmintesKilled = 0;
        this.vaccinesBought = 0;
        this.antibioticsBought = 0;
        this.artBought = 0;
        this.moneyEarned = 0;
    }
    
    makeReport(){
        this.moneyEarned = Math.round(this.cellsBought["NaturalKiller"]*NK_PRICE + this.cellsBought["TLymphocyte"]*T_LYMPHOCYTE_PRICE + this.cellsBought["BLymphocyte"]*B_LYMPHOCYTE_PRICE + this.cellsBought["Neutrophil"]*NEUTROPHIL_PRICE + this.cellsBought["Eosinophile"]*EOSINOPHILE_PRICE + this.cellsBought["Macrophage"]*MACROPHAGE_PRICE + this.antibioticsBought*ANTIBIOTIC_PRICE + this.vaccinesBought*VACCINE_PRICE + money);
        
        
        
        var immuneCellsBought = texts["cellNames"]["NaturalKiller"][language] + ": " + this.cellsBought["NaturalKiller"] + "\n" + texts["cellNames"]["TLymphocyte"][language] +": " + this.cellsBought["TLymphocyte"] + "\n" + texts["cellNames"]["TMemory"][language] + ": " + this.cellsBought["TMemory"] + "\n" + texts["cellNames"]["Neutrophil"][language] + ": " + this.cellsBought["Neutrophil"] + "\n"+ texts["cellNames"]["BLymphocyte"][language] +": " + this.cellsBought["BLymphocyte"] + "\n" + texts["cellNames"]["PlasmaticCell"][language] + ": " + this.cellsBought["Plasmatic"] + "\n"+ texts["cellNames"]["BMemory"][language] +": " + this.cellsBought["BMemory"] +  "\n" + texts["cellNames"]["THelper"][language] + ": " + this.cellsBought["THelper"] +  "\n" + texts["cellNames"]["Eosinophile"][language] + ": " + this.cellsBought["Eosinophile"] + "\n" + texts["cellNames"]["Macrophage"][language] + ": " + this.cellsBought["Macrophage"];
        var enemiesKilled = texts["game"]["bacteria"][language] + ": " + this.bacteriaKilled + "\n" + texts["game"]["infectedTissueCells"][language] + ": " + this.tissueCellsKilled + "\n" + texts["game"]["helminthes"][language] + ": " + this.helmintesKilled;
        var boostersBought = texts["game"]["antibiotics"][language] + ": " + this.antibioticsBought + "\n" + texts["game"]["vaccines"][language] + ": " + this.vaccinesBought + "\n" + texts["game"]["art"][language] + ": " + this.artBought;
        var moneyEarned = this.moneyEarned;
        var currentWave = wave;
        return [immuneCellsBought, enemiesKilled, boostersBought, moneyEarned, currentWave];
    }
}
class ResetButton extends Button{
    resetGame(){
        gameStart = true;
        gameOverTrue = false;
    }
}
class ART extends Button{
    constructor(x, y, width, height){
        super("black", x, y, width, height, "", false, ART_IMAGE);
        this.price = ART_PRICE;
        this.course = 0;
        this.available = true;
    } 
    
    activate(){
        if (money >= this.price){
            money -= this.price;
            this.course = ART_DURATION;
            this.available = false;
            this.texture = ART_ACTIVE_IMAGE;
            historyObject.artBought += 1;
        } else {
            moneyHighlighter.appear();
        }
    }
    
    draw(){
        super.draw();
        this.course = Math.max(this.course - 1*BASE_GAME_SPEED, 0);
        if (this.course === 0){
            this.available = true;
            this.texture = ART_IMAGE;
        }
        ctx.fillStyle = "#D9D9D9";
        ctx.fillRect(
            this.x+this.width + distanceBetweenAntibioticButtonAndBar, 
            this.y,
            antibioticBarWidth,
            this.height);
        ctx.fillStyle = "#E6F0A3";
        var filledHeight = (this.course/ART_DURATION)*this.height;
        ctx.fillRect(
            this.x + this.width + distanceBetweenAntibioticButtonAndBar, 
            this.y + this.height - filledHeight,
            antibioticBarWidth,
            filledHeight,
        );
        ctx.strokeStyle = "black";
        ctx.moveTo(
            this.x + this.width + distanceBetweenAntibioticButtonAndBar, 
            this.y + this.height - filledHeight);
        ctx.lineTo(this.x + this.width + distanceBetweenAntibioticButtonAndBar + antibioticBarWidth, this.y + this.height - filledHeight);
        ctx.stroke();
    }
}

class LangButton extends Button{
    constructor(x, y, width, height, text, active) {
        super("black", x, y, width, height, text);
        this.active = active;
    }
    
    draw(){
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";    
        ctx.fillStyle = "#E8D9B4";
        ctx.strokeStyle = "#E8D9B4";
        if (this.active){
            roundRect(ctx, this.x, this.y, this.width, this.height,
                      10, 10, true,false)
            
            ctx.fillStyle = "black";
            ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
        } else {
            roundRect(ctx, this.x, this.y, this.width, this.height,
                      10, 10,false,true)
            ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
        }
        
    }
    
}

class OKButton extends Button{
    draw(){
        ctx.strokeStyle = wavesBackColor;
        roundRect(ctx,
                  this.x,
                  this.y,
                  this.width,
                  this.height,
                  6, 6, false, true, 6, 6);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#E8D9B4";
        ctx.font = this.height * 0.4 + "px Rubik One"
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
    }
}

class MoneyHighlighter{
    constructor(){
        this.x = moneyRectangleX;
        this.y = moneyRectangleY;
        this.width = moneyRectangleWidth;
        this.height = moneyRectangleHeight;
        this.color = "red";
        this.lifespan = 0;
        this.alpha = 1;
        this.maxLifespan = 300;
    }
    
    appear(){
        this.lifespan = this.maxLifespan;
        this.alpha = 1;
    }
    
    draw(){
        if (this.lifespan > 0){
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.globalAlpha = this.alpha;
            roundRect(ctx, this.x, this.y, this.width, this.height, leftRadius = 8, rightRadius = 8, fill = false, stroke = true);
            ctx.lineWidth = 1;
            ctx.globalAlpha = 1;
            this.lifespan = Math.max(this.lifespan - BASE_GAME_SPEED, 0); 
            this.alpha = Math.max(this.lifespan/this.maxLifespan, 0);
        }
    }
}