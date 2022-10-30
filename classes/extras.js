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
        ctx.font = this.width*0.7 + "px Courier"
        circle(this.x+this.width/2, this.y+this.height/2, this.width/2, false);
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
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
        if (this.lastWave != wave && this.available && money - this.price >= 0){
            money -= this.price;
            bacteria.filter((bacterium) => bacterium.color === this.color).forEach((bacterium) => {
                bacterium.health = 1;
            })
            this.course += 1;
            this.course = this.course % ANTIBIOTIC_COURSE_LENGTH;
            if (this.course === 0){
                this.lastWave = null;
            } else {
                this.lastWave = wave;
            }
            historyObject.antibioticsBought += 1;
            
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
        ctx.font = this.width*0.7 + "px Courier"
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
            historyObject.vaccinesBought += 1;       
        }
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
        this.x = this.labelledObject.x - this.labelledObject.radius*3;
        this.y = this.labelledObject.y - this.labelledObject.radius*3;
    }
    draw(){
        this.upgradeAvailable = (this.labelledObject.killed || this.labelledObject.active || this.labelledObject.mode === "plasmatic") && money >= this.labelledObject.upgradePrice;
        this.updatePosition();
        if (this.active){
            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 0.1;
            if (this.upgradeAvailable) {
                ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "red";
            }
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 1;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = this.width/13 + "px Courier";
            ctx.fillStyle = "black";
            var labelText;
            if (["naive", "mature"].includes(this.labelledObject.mode)){
                labelText = "Plasmatic Cell";
            } else if (["plasmatic", "killer"].includes(this.labelledObject.mode)){
                labelText = "Memory cell";
            }
            labelText += " (" + this.labelledObject.upgradePrice + ")";
            ctx.fillText(labelText, this.x + this.width/2, this.y + this.height/2);     
        }
    }
}
class Pocket extends Shop{
    constructor(shopObj, x, y, width, height, color){
        super(x, y, shopObj.cellType, shopObj.price)
        this.color = color;
        this.shopObj = shopObj;
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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

        }
    }
}
class GameHistory {
    constructor(){
        this.cellsBought = {
            NaturalKiller: 0,
            TLymphocyte: 0,
            BLymphocyte: 0,
            Neutrophil: 0,
            Eosinophile: 0,
            Macrophage: 0
        }
        this.bacteriaKilled = 0;
        this.tissueCellsKilled = 0;
        this.helmintesKilled = 0;
        this.vaccinesBought = 0;
        this.antibioticsBought = 0;
        this.moneyEarned = 0;
    }
    
    makeReport(){
        this.moneyEarned = Math.round(this.cellsBought["NaturalKiller"]*150 + this.cellsBought["TLymphocyte"]*300 + this.cellsBought["BLymphocyte"]*200 + this.cellsBought["Neutrophil"]*100 + this.cellsBought["Eosinophile"]*50 + this.cellsBought["Macrophage"]*300 + this.antibioticsBought*100 + this.vaccinesBought*100 + money);
        var text = "Immune cells bought:\nNatural Killers: " + this.cellsBought["NaturalKiller"] + "\nT-lymphocytes: " + this.cellsBought["TLymphocyte"] + "\nB-lymphocytes: " + this.cellsBought["BLymphocyte"] + "\nNeutrophils: " + this.cellsBought["Neutrophil"] + "\nEosinophiles: " + this.cellsBought["Eosinophile"] + "\nMacrophages: " + this.cellsBought["Macrophage"] + "\n\nEnemies killed:\nBacteria: " + this.bacteriaKilled + "\nInfected Tissue Cells: " + this.tissueCellsKilled + "\nHelmintes: " + this.helmintesKilled + "\n\nBoosters bought:\nAntibiotics: " + this.antibioticsBought + "\nVaccines: " + this.vaccinesBought + "\n\n Money earned: " + this.moneyEarned + "\nCurrent wave: " + wave;
        return text;
    }
}
class ResetButton extends Button{
    resetGame(){
        gameStart = true;
        gameOverTrue = false;
    }
}