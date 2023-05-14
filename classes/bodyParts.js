class BodyPart {
    constructor(texture, x, y, width, height) {
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    draw() {
        ctx.drawImage(
            this.texture, 
            this.x,
            this.y,
            this.width,
            this.height)
    }
    
    isIntersected(x, y) {
        return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height)
    }
}
class Shop extends BodyPart {  
    constructor(x, y, cellType, price, shopTexture, isEnemyAnimated, isCellAnimated, color) {
        super(shopTexture, 
              x, y, 
              shopWidth, 
              shopHeight);
        this.color = color;
        this.cellType = cellType;
        this.price = price;
        this.base_price = price;
        
        this.isEnemyAnimated = isEnemyAnimated;
        this.isCellAnimated = isCellAnimated;
        this.pockets = [];
        this.discount = 0;
    }

    buy() {
        if(money - this.price >= 0) {
            var cell = new this.cellType(
                randomUniform(this.x, this.x + this.width),
                randomUniform(this.y, this.y + this.height));

            if (cell instanceof TLymphocyte){
                cell.baseSpeed = Math.min(tissueCellSize*0.5, cell.baseSpeed * Math.pow(HELPER_DAMAGE_INCREASE, this.discount)); 
            } else if (cell instanceof BLymphocyte){
                cell.damage = cell.damage * Math.pow(HELPER_DAMAGE_INCREASE, this.discount);
            }
            immunityCells.push(cell);
            money -= this.price;
            historyObject.cellsBought[cell.constructor.name] += 1;
        } else {
            moneyHighlighter.appear();
        }
        
    }

    reset() {
        this.price = this.base_price;
        this.discount = 0;
    }
        
}
class SpleenSection{
    constructor(x, y, size){
        this.x = x + size/2;
        this.y = y + size/2;
        this.size = size*0.7; // width = height = size
        this.antigen = null;
    }
    
    draw(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - this.size/2, this.y-this.size/2, this.size, this.size);
    }
}   
class Spleen extends BodyPart{
    constructor(x, y, width, height, nSections){
        super(null, x, y, width, height);
        this.sections = [];
        var sectionSize = this.width/((nSections - 4)/4 + 2);
        for (var i = 0; i < this.width/sectionSize; i ++){
            for (var j = 0; j < this.width/sectionSize; j ++){
                if (i === 0 || j === 0 || i === this.width/sectionSize-1 || j === this.width/sectionSize-1){
                    this.sections.push(new SpleenSection(
                        this.x + i*sectionSize, 
                        this.y + j*sectionSize, 
                        this.width/((nSections - 4)/4 + 2)));
                }
            }    
        }
    }
    draw(){
        ctx.fillStyle = spleenColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.sections.forEach((section) => section.draw());
    }
}
class TissueCell{
    constructor(x, y, size=tissueCellSize, ancestor=null){
        this.x = x;
        this.y = y;
        this.size = size;
        this.virus = null;
        this.health = 100;
        this.texture = randomChoice(CELL_IMAGES);
        this.vaccine = null;
        this.nMutations;
        if (ancestor === null){
            this.nMutations = 0;
        } else {
            this.nMutations = ancestor.nMutations;
            if (randomUniform(0, 1) < mutationProbability){
                this.nMutations += 1;   
            }
        }
    }
    
    draw(){
        if (this.size < tissueCellSize){this.size = Math.min(this.size + 0.05*gameSpeed, tissueCellSize)};
            
        ctx.drawImage(
            this.texture, 0, 0, 34, 34,
            this.x + (tissueCellSize - this.size) / 2,
            this.y + (tissueCellSize - this.size) / 2,
            this.size,
            this.size)
        
        if (this.virus != null){
            ctx.fillStyle = VIRUSES_CLASSIFICATION[this.virus.color]["colorCode"];
            ctx.globalAlpha = (this.virus.number+this.virus.number*0.2)/(maxVirusesInTissueCell+this.virus.number*0.2);
            circle(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, true);
        } else if (this.vaccine != null){
            ctx.fillStyle = VIRUSES_CLASSIFICATION[this.vaccine]["colorCode"];
            ctx.globalAlpha = 0.5;
            circle(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, true);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "black";
            ctx.fillText("V", this.x + this.size / 2, this.y + this.size / 2)
        } else if (this.nMutations >= cancerMutationsThreshold){
            ctx.fillStyle = "black";
            circle(this.x +  tissueCellSize/ 2, this.y + tissueCellSize / 2, this.size / 2, true);
        }
        ctx.globalAlpha = 1;
    }
}
