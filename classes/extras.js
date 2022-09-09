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
        if (this.available && money - this.price >= 0){
            money -= this.price;
            bacteria.filter((bacterium) => bacterium.color === this.color).forEach((bacterium) => {
                bacterium.health = 1;
            })
            if (this.lastWave != wave){
                this.course += 1;
                this.course = this.course % ANTIBIOTIC_COURSE_LENGTH;
                if (this.course === 0){
                    this.lastWave = null;
                } else {
                    this.lastWave = wave;
                }
            }
            
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
        }
    }
}