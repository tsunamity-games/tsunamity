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
class Shop extends BodyPart {  
    constructor(x, y, cellType, price, enemyTexture, cellTexture, isEnemyAnimated, isCellAnimated) {
        super(BONE_MARROW_IMAGE, x, y, shopWidth, shopHeight - 2 * offset);
        this.cellType = cellType;
        this.price = price;
        this.base_price = price;
        
        this.enemyTexture = enemyTexture;
        this.cellTexture = cellTexture;
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

            cell.damage = cell.damage * Math.pow(HELPER_DAMAGE_INCREASE, this.discount);
            immunityCells.push(cell);
            money -= this.price;
            historyObject.cellsBought[cell.constructor.name] += 1;
        }
        
    }

    reset() {
        this.price = this.base_price;
        this.discount = 0;
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

        const targetText = this.cellType == THelper ? "Buys" : "Kills";

        ctx.fillText(targetText, this.x + 3*this.width/4, this.y + 3*this.height/10);

        ctx.drawImage(
            this.cellTexture, 0, 0,
            this.isCellAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isCellAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
            this.x + this.width/4 - 3*this.width/10/2,
            this.y + 4.5*this.height/10,
            3*this.width/10,
            9/4*this.height/10)
        
            
        ctx.drawImage(
            this.enemyTexture, 0, 0,
            this.isEnemyAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isEnemyAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
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
class TissueCell{
    constructor(x, y, size=tissueCellSize, ancestor=null){
        this.x = x;
        this.y = y;
        this.size = size;
        this.infection = [];
        this.health = 100;
        this.texture = CELL_IMAGE;
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
        } else if (this.nMutations >= cancerMutationsThreshold){
            ctx.fillStyle = "black";
            circle(this.x +  tissueCellSize/ 2, this.y + tissueCellSize / 2, this.size / 2, true);
        }
        ctx.globalAlpha = 1;
    }
}
