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
    constructor(x, y, cellType, price, cellTexture, isEnemyAnimated, isCellAnimated, color) {
        var texture;
        if (['blue', 'green', 'yellow'].includes(color)){
            texture = ShopColors[color]["scrollImage"]
        } else {
            texture = ShopColors["blue"]["scrollImage"]
        }
        super(texture, 
              x, y, 
              shopWidth, 
              shopHeight);
        this.color = color;
        this.cellType = cellType;
        this.price = price;
        this.base_price = price;
        
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

            if (cell instanceof TLymphocyte){
                cell.baseSpeed = Math.min(tissueCellSize*0.5, cell.baseSpeed * Math.pow(HELPER_DAMAGE_INCREASE, this.discount)); 
            } else if (cell instanceof BLymphocyte){
                cell.damage = cell.damage * Math.pow(HELPER_DAMAGE_INCREASE, this.discount);
            }
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
    
        ctx.fillStyle =  ShopColors[this.color]["colorCode"];
        ctx.textBaseline = "top";
        
        // Name of the cell type sold
        ctx.font = "bold " + this.width/8 + "px Courier";
        ctx.textAlign = "center";
        var name = cell_names[this.cellType.name];
        for (let i = 0; i < name.length; i++) {
            ctx.fillText(
                name[i], 
                this.x + this.width / 5, 
                this.y + this.height/9 + this.height/12*i);
        
        }
        ctx.drawImage(
            this.cellTexture, 0, 0,
            this.isCellAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isCellAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
            this.x + this.width/2 - 6*this.width/10/2 + this.width/12,
            this.y + this.height/2 - 4.5/2*this.height/10 - this.height/12,
            6*this.width/10,
            9/2*this.height/10)

        // Draw coloured rectangle for price
        ctx.fillStyle = ShopColors[this.color]["colorCode"];
        var priceX = this.x + this.width*(53/123), priceY = this.y + this.height*(1-0.125), priceWidth = this.width*(1-53/123), priceHeight = this.height*0.125;
        roundRect(ctx, 
              priceX, priceY, priceWidth, priceHeight, 
              8, 0, true, false, 0);
        
        // Write price
        ctx.fillStyle = "#F9EAC4";
        ctx.font = "bold " + priceHeight*0.9 + "px Courier";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        
        ctx.fillText(this.price, 
                     priceX + priceWidth/2, 
                     priceY + priceHeight/2);
        
    
        // Render price image
        ctx.drawImage(MINIMONEY, 
                      priceX + priceWidth*0.1,
                      priceY + priceHeight*0.05,
                      priceHeight*0.9*1.282,
                      priceHeight*0.9
                     );
        }
}
class SpleenSection{
    constructor(x, y, size){
        this.x = x + size/2;
        this.y = y + size/2;
        this.size = size*0.7; // width = height = size
        this.antigen = null;
        this.texture = BONE_MARROW_IMAGE;
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
        if (this.size < tissueCellSize){this.size = Math.min(this.size + 0.05, tissueCellSize)};
            
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
