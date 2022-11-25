class Button extends BodyPart {
    constructor(color, x, y, width, height, text, isCircle=true, texture="") {
        super(texture, x, y, width, height);
        this.color = color;
        this.text = text;
        this.isCircle = isCircle;
    }
    
    draw(){
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
                ctx.fillRect(this.x, this.y, this.width, this.height);   
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                ctx.globalAlpha = 1;
                ctx.strokeRect(this.x, this.y, this.width, this.height)
            }

            ctx.globalAlpha = 1;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if(this.isCircle) {
                circle(this.x+this.width/2, this.y+this.height/2, this.width/2, false);
                ctx.fillStyle = "black";
                ctx.font = this.height * 0.7 + "px Courier"
            }
            else {
                ctx.fillStyle = "white";
                ctx.font = this.height * 0.4 + "px Courier"
            }

            ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
        }
    }
    
}
class Antibiotic extends Button {
    constructor(color, x, y, width, height, price){
        super(color, x, y, width, height, "A", false, bacteriaColors[color]["antibioticButtonImage"]["inactive"]);
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
                this.texture = bacteriaColors[this.color]["antibioticButtonImage"]["inactive"]
            } else {
                this.lastWave = wave;
                this.texture = bacteriaColors[this.color]["antibioticButtonImage"]["active"]
            }
            historyObject.antibioticsBought += 1;
            
        }
    }
    
    draw(){
        // Draw button
        super.draw();
        
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
        super(color, x, y, width, height, "V", isCircle=false);
        this.price = price;
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
        }
    }
    
    draw(){
        ctx.fillStyle = VIRUSES_CLASSIFICATION[this.color]["colorCode"];
        roundRect(ctx,
                  this.x, this.y, this.width, this.height,
                  leftRadius = 3, rightRadius = 3, fill = true, stroke = false);
        ctx.font = "bold " + this.height * 0.8 + "px Courier";
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
    constructor(shopObj, x, y, color){
        super(x, y, shopObj.cellType, shopObj.price, shopObj.cellTexture, true, true, color)
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

        }
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
        this.moneyEarned = Math.round(this.cellsBought["NaturalKiller"]*NK_PRICE + this.cellsBought["TLymphocyte"]*T_LYMPHOCYTE_PRICE + this.cellsBought["BLymphocyte"]*B_LYMPHOCYTE_PRICE + this.cellsBought["Neutrophil"]*NEUTROPHIL_PRICE + this.cellsBought["Eosinophile"]*EOSINOPHILE_PRICE + this.cellsBought["Macrophage"]*MACROPHAGE_PRICE + this.antibioticsBought*ANTIBIOTIC_PRICE + this.vaccinesBought*VACCINE_PRICE + money);
        var text = "Immune cells bought:\nNK cells: " + this.cellsBought["NaturalKiller"] + "\nT killers: " + this.cellsBought["TLymphocyte"] + "\nNeutrophils: " + this.cellsBought["Neutrophil"] + "\nB cells: " + this.cellsBought["BLymphocyte"] + "\nT helpers: " + this.cellsBought["THelper"] +  "\nEosinophils: " + this.cellsBought["Eosinophile"] + "\nMacrophages: " + this.cellsBought["Macrophage"] + "\n\nEnemies killed:\nBacteria: " + this.bacteriaKilled + "\nInfected Tissue Cells: " + this.tissueCellsKilled + "\nHelminthes: " + this.helmintesKilled + "\n\nBoosters bought:\nAntibiotics: " + this.antibioticsBought + "\nVaccines: " + this.vaccinesBought + "\n\n Money earned: " + this.moneyEarned + "\nCurrent wave: " + wave;
        return text;
    }
}
class ResetButton extends Button{
    resetGame(){
        gameStart = true;
        gameOverTrue = false;
    }
}