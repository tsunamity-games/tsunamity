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
function addBacteria(bacteriaList, n, maxHealth, price){
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
var antibodies = [];

const T_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + shopWidth + offset, offset, TLymphocyte, T_LYMPHOCYTE_PRICE, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE, false, true);
const B_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + 3 * shopWidth + 3 * offset, offset, BLymphocyte, B_LYMPHOCYTE_PRICE, BACTERIA_IMAGE, LYMPHOCYTES_IMAGES.get("green"), true, true);

var shops = [
    new Shop(xLeftOffset, offset, NaturalKiller, NK_PRICE, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE, false, true),
    T_LYMPHOCYTE_SHOP,
    new Shop(xLeftOffset + 2 * shopWidth + 2 * offset, offset, THelper, T_HELPER_PRICE, T_LYMPHOCYTES_IMAGE, T_LYMPHOCYTES_IMAGE, true, true),
    B_LYMPHOCYTE_SHOP,
    new Shop(xLeftOffset + 4 * shopWidth + 4 * offset, offset, Neutrophil, NEUTROPHIL_PRICE, BACTERIA_IMAGE, NEUTROPHILS_IMAGE, true, true),
    new Shop(xLeftOffset + 5 * shopWidth + 5 * offset, offset, Eosinophile, EOSINOPHILE_PRICE, HELMINTH_IMAGE, EOSINOPHILES_IMAGE, false, true),
    new Shop(xLeftOffset + 6 * shopWidth + 6 * offset, offset, Macrophage, MACROPHAGE_PRICE, GARBAGE_IMAGE, MACROPHAGES_IMAGE, false, true)
    
];
var buttons = [];
for (var i = 0; i < BACTERIA_COLORS.length; i++){
    buttons.push(new Antibiotic(BACTERIA_COLORS[i], fieldWidth/2 - buttonWidth*(BACTERIA_COLORS.length - i) - offset*(BACTERIA_COLORS.length - i), playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
    buttons.push(new Vaccine(BACTERIA_COLORS[i], fieldWidth/2 + offset*(i+1) + buttonWidth*i, playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
}

spleen = new Spleen(BONE_MARROW_IMAGE, xLeftOffset + 7 * shopWidth + 6 * offset + 10, offset, shopHeight - 2 * offset, shopHeight - 2 * offset, 16);
var bacteria = addBacteria([], starting_nBacteria, 100, 5);
var tissueCells = addTissueCells([]);
var viruses = [];
var helmintes = [];
var garbagePiles = [];
var wave = 1;
var gameOverTrue = false;  
// Gameplay
$("#field").click(function(event){
    x = event.pageX - field.offsetLeft;
    y = event.pageY - field.offsetTop;

    // If any of the shops clicked, try to buy cell;
    shops.forEach((shop) => {
        if(shop.isIntersected(x, y)) {
            shop.buy();
        }
        shop.pockets.forEach((pocket) => {
            if(pocket.isIntersected(x, y)) {
            pocket.buy();
            }
        })
    })
    
    // If any of the buttons are clicked, do their thing
    buttons.forEach((button)=>{
        if (button.isIntersected(x, y)){
            button.activate();
        }
    })
    
    // If B or T-lymphocyte is clicked, suggest upgrade
    immunityCells.forEach((cell) => {
        if ((cell instanceof BLymphocyte || cell instanceof TLymphocyte) && cell.mode != "memory"){
            if (cell.label.active && cell.label.isIntersected(x, y) && money >= cell.upgradePrice){
                money -= cell.upgradePrice;
                cell.upgrade();
            }
            if (cell.isIntersected(x, y) && cell.mode != "memory"){
                cell.label.active = true;                
            } else {
                cell.label.active = false;
            }
        }
    })
    
});

// var hiv = new HIV(HIV_IMAGE, 300, 200);

var game = setInterval(function(){
    if (gameOverTrue){
        gameOver();
    }
    else{
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    
    printGameInfo();
        
    shops.forEach((shop) => {
        shop.draw();
        if (shop.pockets.length > 0)
            console.log(shop.pockets);
        shop.pockets = shop.pockets.filter(function hasMemoryCell(pocket){
            var colors = [];
            immunityCells.filter((cell) => cell instanceof shop.cellType && cell.mode === "memory").forEach((cell) => {colors.push(cell.color);})
            return colors.includes(pocket.color);
            
        });
        shop.pockets.forEach((pocket) => pocket.draw());
    })
    buttons.forEach((button) => {button.draw()})
    ctx.fillText("Price: 100", buttons[0].x - 60, buttons[0].y + buttons[0].height/2);
    
    spleen.draw();
    var nextTurnTissueCells = [];
    tissueCells.forEach((cell) => {
        if(cell.health > 0 && randomUniform(0, 1) > tissueCellDeathRate) {
            cell.draw()
            nextTurnTissueCells.push(cell);
        } else {
            var neighbours = tissueCells.filter((potentialNeighbour) => {
                return (Math.abs(cell.x - potentialNeighbour.x) <= tissueCellSize + spaceBetweenTissueCells) && (Math.abs(cell.y - potentialNeighbour.y) <= tissueCellSize + spaceBetweenTissueCells) && !(cell.x === potentialNeighbour.x && cell.y === potentialNeighbour.y);
            })
            var probs = [];
            neighbours.forEach((neighbour)=>{probs.push(neighbour.nMutations);})
            nextTurnTissueCells.push(new TissueCell(cell.x, cell.y, 1, randomChoice(neighbours, probs)));
            viruses = viruses.filter((virus) => virus.host != cell);
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
                      garbagePiles.push(new GarbagePile(helmint.x, helmint.y, helmint.overlay*helmint.parts.length*0.5));
                } else {
                    nextTurnHelmintes.push(helmint);
                }
        }
        }
    })
    helmintes = nextTurnHelmintes;
    
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
            
            if(cell instanceof THelper) {
                cell.act();
            }

            var targetList;

            if(cell instanceof NaturalKiller || cell instanceof TLymphocyte || (cell instanceof BLymphocyte && cell.mode === "plasmatic")) {
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
            
            
            // Old cells die
            var oldCells = immunityCells.filter((cell)=>cell.age >= cell.longevity);
            oldCells.forEach((cell) => {
                garbagePiles.push(new GarbagePile(cell.x, cell.y, cell.radius));
            })
            immunityCells = immunityCells.filter((cell)=>cell.age < cell.longevity);
        })
    }
    antibodies = antibodies.filter((antibody) => antibody.age < antibody.longevity && (antibody.attached == null || antibody.attached.health > 0));
    antibodies.forEach((antibody) => {
        antibody.move();
        antibody.draw();
    })

    // hiv.draw();
    
    if(bacteria.length === 0) {
        bacteria = addBacteria([], starting_nBacteria + wave * BACTERIA_NUMBER_INCREASE, BACTERIA_BASE_HEALTH + wave * BACTERIA_HEALTH_INCREASE, 5 + wave * BACTERIA_PRICE_INCREASE);
        wave += 1;

        if (wave % 4 === 2) {
            viruses = addViruses(viruses, starting_nViruses, VIRUS_COLOR, VIRUS_DOUBLING_TIME - wave);
        }
        if (wave % 10 === 0){
            helmintes = [new Helmint(-10, randomUniform(playableFieldStart + 15, playableFieldHeight-15), 1000, 1000, 100, 30, 10)];
        }
        checkAntibiotics();
    }
    immunityCells.filter(cell => cell instanceof BLymphocyte || cell instanceof TLymphocyte).forEach(cell => cell.label.draw());
    money += basePrice * tissueCells.filter((cell) => cell.infection.length === 0).length/tissueCells.length;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, fieldWidth, fieldHeight);
    if (livesLeft <= 0){
        gameOverTrue=true;
    };
    }
}, 1);