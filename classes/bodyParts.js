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
//        console.log("Buying " + this.cellType);
        if(money - this.price >= 0) {
//            console.log("Got enough money");
//            console.log("x: " + (this.x + this.width / 2));
//            console.log("y: " + (this.y + this.height / 2));
            var cell = new this.cellType(
                randomUniform(this.x, this.x + this.width),
                randomUniform(this.y, this.y + this.height));
            immunityCells.push(cell);
            money -= this.price;
        }
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
        ctx.fillText("Kills", this.x + 3*this.width/4, this.y + 3*this.height/10);

        ctx.drawImage(
            this.cellTexture, 0, 0,
            this.isCellAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isCellAnimated ? ANIMATED_IMAGE_HEIGHT : STATIC_IMAGE_HEIGHT,
            this.x + this.width/4 - 3*this.width/10/2,
            this.y + 4.5*this.height/10,
            3*this.width/10,
            3*this.height/10)
        
            
        ctx.drawImage(
            this.enemyTexture, 0, 0,
            this.isEnemyAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
            this.isEnemyAnimated ? ANIMATED_IMAGE_WIDTH : STATIC_IMAGE_WIDTH,
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