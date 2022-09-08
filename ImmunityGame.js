//--------HOST CELLS-------------
class TissueCell{
    constructor(x, y, size=tissueCellSize){
        this.x = x;
        this.y = y;
        this.size = size;
        this.infection = [];
        this.health = 100;
        this.texture = CELL_IMAGE;
        this.vaccine = null;
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
        }
        ctx.globalAlpha = 1;
    }
}

//--------HOST CELLS-------------

//-----GAME SETUP FUNCTIONS------
function addTissueCells(tissueCellsList){
    for (var x = offset; x < fieldWidth - tissueCellSize - spaceBetweenTissueCells; x += tissueCellSize+spaceBetweenTissueCells){
            for (var y = shopHeight + offset; y < fieldHeight - buttonHeight - offset -tissueCellSize-spaceBetweenTissueCells; y += tissueCellSize+spaceBetweenTissueCells){
                    tissueCellsList.push(new TissueCell(x, y));
            }
}
    EdgeCellX = x;
    return tissueCellsList;
}
function addBacteria(bacteriaList, n, texture, maxHealth, price){
    for (var i=0; i<n; i++){
        var y = randomUniform(shopHeight + offset, playableFieldHeight); 
        var x = -10;
        var color = randomChoice(BACTERIA_COLORS);
        bacteriaList.push(new Bacterium(color, x, y, bacteriaRadius, maxHealth, price));
    };
    return bacteriaList;
}       
function addViruses(virusesList, n, color, doublingTime){
    for (var i=0; i < n; i++){
        virusesList.push(new Virus(randomChoice(BACTERIA_COLORS), doublingTime, null))
    }
    return virusesList;
}
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
}
function printGameInfo(){
    ctx.fillStyle = "Black";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "20px Courier";
    ctx.fillText("Wave: "+ wave, offset, offset);
    ctx.fillText("Money: "+ Math.floor(money), offset, offset+20);
    ctx.fillText("Lives: "+ livesLeft, offset, offset+40);
    
            }
function gameOver(){
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over", fieldWidth/2, fieldHeight/2);
}
function checkAntibiotics(){
    buttons.filter((button) => button instanceof Antibiotic).forEach((anti) => {
        if ((anti.lastWave != null) && this.wave > anti.lastWave + 1){
            anti.available = false;
        }
    }
    );
}
//--------SETUP FUNCTIONS--------

// Game Setup
var immunityCells = [];

var shops = [
    new Shop(BONE_MARROW_IMAGE, xLeftOffset, offset, shopWidth, shopHeight - 2 * offset, NaturalKiller, 200, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + shopWidth + offset, offset, shopWidth, shopHeight - 2 * offset, BLymphocyte, 200, BACTERIA_IMAGE, LYMPHOCYTES_IMAGES.get("green")),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + 2 * shopWidth + 2 * offset, offset, shopWidth, shopHeight - 2 * offset, Neutrophil, 100, BACTERIA_IMAGE, NEUTROPHILS_IMAGE),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + 3 * shopWidth + 3 * offset, offset, shopWidth, shopHeight - 2 * offset, Eosinophile, 50, HELMINTH_IMAGE, EOSINOPHILES_IMAGE),
    new Shop(BONE_MARROW_IMAGE, xLeftOffset + 4*shopWidth + 4*offset, offset, shopWidth, shopHeight - 2 * offset, Macrophage, 300, GARBAGE_IMAGE, MACROPHAGES_IMAGE)
];
var buttons = [];
for (var i = 0; i < BACTERIA_COLORS.length; i++){
    buttons.push(new Antibiotic(BACTERIA_COLORS[i], fieldWidth/2 - buttonWidth*(BACTERIA_COLORS.length - i) - offset*(BACTERIA_COLORS.length - i), playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
    buttons.push(new Vaccine(BACTERIA_COLORS[i], fieldWidth/2 + offset*(i+1) + buttonWidth*i, playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
}
spleen = new Spleen(BONE_MARROW_IMAGE, xLeftOffset+5*shopWidth + 5*offset + 10, offset, shopHeight - 2 * offset, shopHeight - 2 * offset, 16);
var bacteria = addBacteria([], starting_nBacteria, BACTERIA_IMAGE, 100, 5);

var tissueCells = addTissueCells([]);
var viruses = [];
var helmintes = [];
var garbagePiles = [];
var wave = 1;
var gameOverTrue = false;  
// Gameplay
$("#field").click(function(event){
//    console.log("Page coordinates:")
//    console.log("[", event.pageX, ",", event.pageY, "],");

    x = event.pageX - field.offsetLeft;
    y = event.pageY - field.offsetTop;

//    console.log("Canvas coordinates:")
//    console.log("[", x, ",", y, "],");

    // If any of the shops clicked, try to buy cell;
    shops.forEach((shop) => {
//        console.log(shop);
//        console.log(shop.isIntersected(x, y));
        if(shop.isIntersected(x, y)) {
            shop.buy();
        }
    })
    
    // If any of the buttons are clicked, do their thing
    buttons.forEach((button)=>{
        if (button.isIntersected(x, y)){
            button.activate();
        }
    })
});

var game = setInterval(function(){
    if (gameOverTrue){
        gameOver();
    }
    else{
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    
    printGameInfo();
        
    shops.forEach((shop) => {shop.draw()})
    buttons.forEach((button) => {button.draw()})
    
    spleen.draw();
    var nextTurnTissueCells = [];
    tissueCells.forEach((cell) => {
        if(cell.health > 0) {
            cell.draw()
            nextTurnTissueCells.push(cell);
        } else {
            nextTurnTissueCells.push(new TissueCell(cell.x, cell.y, 1));
            viruses = viruses.filter(function notFromThisHost(virus){return virus.host != cell;});
        }
    })
    tissueCells = nextTurnTissueCells;
    garbagePiles.forEach((pile) => {pile.draw()})
    garbagePiles = garbagePiles.filter((pile) => pile.health > 0);
    var nextTurnHelmintes = [];
    helmintes.forEach((helmint) => {
        helmint.move();
        helmint.draw();
        if (helmint.parts.length > 0){
            if ((helmint.parts[helmint.parts.length - 1].x < fieldWidth)){
                if (helmint.health <= 0) {
    //                money += helmint.price;
                      garbagePiles.push(new GarbagePile(helmint.x, helmint.y, helmint.overlay*helmint.parts.length*0.5));
                } else {
                    nextTurnHelmintes.push(helmint);
                }
        }
        }
    })
    helmintes = nextTurnHelmintes;
    
//    drawBlood();
    
    var nextTurnBacteria = [];
    bacteria.forEach((bacterium) => {
        bacterium.move();
        bacterium.changeDirection();
        bacterium.draw();
        if ((bacterium.x < fieldWidth)){
            if (bacterium.health <= 0) {
                if (randomUniform(0, 1) < chanceToGetAntigen){
                    bacterium.mode = "antigen";
                    var sectionSet = spleen.sections.filter((section) => section.antigen === null);
                    if (sectionSet.length === 0){
                        sectionSet = spleen.sections;
                    }
                    bacterium.spleenSection = randomChoice(sectionSet);
                    bacterium.spleenSection.antigen = bacterium; 
                }
//                money += bacterium.price;
            } else{
                nextTurnBacteria.push(bacterium);
            }
        }
    })
    spleen.sections.forEach((section) => {
        if (section.antigen != null){
            section.antigen.move();
            section.antigen.changeDirection();
            section.antigen.draw();            
        }
    })
    
    bacteria = nextTurnBacteria;
    
    viruses.forEach((virus) => {
        virus.grow();
    })

                
    if (bacteria.length > 0){
        immunityCells.forEach((cell) => {
            cell.live();
            cell.move();

            var targetList;

            if(cell instanceof NaturalKiller) {
                targetList = tissueCells;
                
            } else if (cell instanceof Eosinophile){
                targetList = helmintes;
            } else if (cell instanceof Macrophage) {
                targetList = garbagePiles;}
            else {
                targetList = bacteria;
            }

            cell.changeDirection(targetList);
            cell.draw();
            
            // Visualize target
//            if(cell.target != null) {
//                ctx.beginPath();
//                ctx.strokeStyle = "red";
//                ctx.moveTo(cell.x, cell.y);
//                ctx.lineTo(cell.target.x, cell.target.y);
//                ctx.stroke();
//            }
            
        // Old cells die
        var oldCells = immunityCells.filter((cell)=>cell.age >= cell.longevity);
        oldCells.forEach((cell) => {
            garbagePiles.push(new GarbagePile(cell.x, cell.y, cell.radius));
        })
        immunityCells = immunityCells.filter((cell)=>cell.age < cell.longevity);
    })}
    
    if(bacteria.length === 0) {
        bacteria = addBacteria([], starting_nBacteria + wave * 10, BACTERIA_IMAGE, 100 + wave * 30, 5 + wave * 2);
        wave += 1;

        if (wave % 4 === 2) {
            viruses = addViruses(viruses, starting_nViruses, VIRUS_COLOR, VIRUS_DOUBLING_TIME - wave);
        }
        if (wave % 10 === 0){
            helmintes = [new Helmint(-10, randomUniform(playableFieldStart + 15, playableFieldHeight-15), 1000, 1000, 100, 30, 10)];
        }
        checkAntibiotics();
    }
    money += basePrice * tissueCells.filter((cell) => cell.infection.length === 0).length/tissueCells.length;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, fieldWidth, fieldHeight);
    if (livesLeft <= 0){
        gameOverTrue=true;
    };
    }
}, 1);