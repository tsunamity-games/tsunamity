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
            if (this.text != ""){
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
        if (this.lastWave != wave && this.available && money >= this.price){
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
        }
    }
    
    draw(){
        ctx.fillStyle = VIRUSES_CLASSIFICATION[this.color]["colorCode"];
        roundRect(ctx,
                  this.x, this.y, this.width, this.height,
                  leftRadius = 3, rightRadius = 3, fill = true, stroke = false);
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
        console.log(this.upgradeAvailable);
        this.upgradeAvailable = (this.labelledObject.active || this.labelledObject.killed || this.labelledObject.mode === "plasmatic");
        this.updatePosition();
        if (this.active && this.upgradeAvailable){
            if (["naive", "mature"].includes(this.labelledObject.mode)){
                ctx.drawImage(
                    UPGRADE_PLASMATIC, 
                    this.labelledObject.x-UPGRADE_LABEL_WIDTH/2, 
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
                          this.labelledObject.x - UPGRADE_FIRST_SIZE/2, 
                          this.labelledObject.y - this.labelledObject.radius - UPGRADE_FIRST_SIZE, 
                          UPGRADE_FIRST_SIZE, 
                          UPGRADE_FIRST_SIZE);
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
        
        var immuneCellsBought = "NK cells: " + this.cellsBought["NaturalKiller"] + "\nT killers: " + this.cellsBought["TLymphocyte"] + "\nMemory T cells: " + this.cellsBought["TMemory"] + "\nNeutrophils: " + this.cellsBought["Neutrophil"] + "\nB cells: " + this.cellsBought["BLymphocyte"] + "\nPlasmatic cells: " + this.cellsBought["Plasmatic"] + "\nMemory B cells: " + this.cellsBought["BMemory"] +  "\nT helpers: " + this.cellsBought["THelper"] +  "\nEosinophils: " + this.cellsBought["Eosinophile"] + "\nMacrophages: " + this.cellsBought["Macrophage"];
        var enemiesKilled = "Bacteria: " + this.bacteriaKilled + "\nInfected Tissue Cells: " + this.tissueCellsKilled + "\nHelminthes: " + this.helmintesKilled;
        var boostersBought = "Antibiotics: " + this.antibioticsBought + "\nVaccines: " + this.vaccinesBought + "\nA.R.T.: " + this.artBought;
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
        if (this.available && money >= this.price){
            this.money -= this.price;
            this.course = ART_DURATION;
            this.available = false;
            this.texture = ART_ACTIVE_IMAGE;
            historyObject.artBought += 1;
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