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
function addBacteria(bacteriaList, n, texture, maxHealth){
    for (var i=0; i<n; i++){
        var y = randomUniform(shopHeight + offset, playableFieldHeight); 
        var x = -100;
        var color = BACTERIA_COLORS[randomChoice(inplayBacteriaColorsIndices)];
        bacteriaList.push(new Bacterium(color, x, y, bacteriaRadius, maxHealth));
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
    reset.draw();
            }
function stopGame(why){
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (why == "Game Over"){
        ctx.font = "40px Courier";
        ctx.fillText(why, fieldWidth/2, fieldHeight/3)
        ctx.font = "20px Courier";
        var lines = historyObject.makeReport().split('\n');
        for (var i = 0; i < lines.length; i++)
            ctx.fillText(lines[i], fieldWidth/2, fieldHeight/2 + ((i-3)*20));        
    } else {
        ctx.font = "60px Courier";
        ctx.fillText(why, fieldWidth/2, fieldHeight/2);
    }
}
function checkAntibiotics(){
    buttons.filter((button) => button instanceof Antibiotic).forEach((anti) => {
        if ((anti.lastWave != null) && this.wave > anti.lastWave + 1){
            anti.available = false;
        }
    }
    );
}
function formNewWave(waveNumber, oldBac, oldVir, oldHel){
    var newBac = oldBac;
    var newVir = oldVir;
    var newHel = oldHel;
    var coins = Math.round(50*waveNumber + 0.05*waveNumber**2);
    if (randomUniform(0, 1) < PROB_TO_ADD_NEW_COLOR){
        var newIndex = (inplayBacteriaColorsIndices[inplayBacteriaColorsIndices.length-1] + 1) % BACTERIA_COLORS.length;
        if (!inplayBacteriaColorsIndices.includes(newIndex)){
            inplayBacteriaColorsIndices.push(newIndex);   
            colorProbs.push(1);        }
    } 
    if (inplayBacteriaColorsIndices.length > 1 && randomUniform(0, 1) < PROB_TO_REMOVE_COLOR){
        inplayBacteriaColorsIndices.shift();
        colorProbs.shift();
    } 
    
    colorProbs[0] -= 1;
    colorProbs[0] = Math.max(0, colorProbs[0]);
    colorProbs[colorProbs.length-1] += 1;
    if (colorProbs[0] === 0){
        colorProbs.shift();
        inplayBacteriaColorsIndices.shift();
    }
    colorProbs[colorProbs.length-1] = Math.min(colorProbs[colorProbs.length-1], MAX_COLOR_PROB_VAL);
    while (coins > 0){
        [newBac, newVir, newHel, coins] = chooseEnemy(newBac, newVir, newHel, coins, waveNumber);
    }
    return [newBac, newVir, newHel];
}
function chooseEnemy(bacList, virList, helList, coins, waveNumber){
    var candidates = [Bacterium];
    if (waveNumber > 0){
        candidates.push(Virus);
    }
    if (waveNumber > 0){
        candidates.push(Helmint);
    }
    var enemyPrice;
    var enemy = randomChoice(candidates, ENEMY_PROB_DIST.slice(0, candidates.length));
    if (enemy != Helmint){
        var colorIndex = randomChoice(inplayBacteriaColorsIndices, colorProbs);
        var color = BACTERIA_COLORS[colorIndex];
        if (enemy == Bacterium){
            var y = randomUniform(shopHeight + offset, playableFieldHeight);
            var x = -100;
            enemyPrice = BACTERIUM_PRICE;
            if(colorIndex === inplayBacteriaColorsIndices[-1]){
                enemyPrice *= NEW_COLOR_MULTIPLIER;
            }
            if (enemyPrice <= coins){
                bacList.push(new Bacterium(color, x, y, bacteriaRadius, BASE_BACTERIAL_HEALTH, price));
                coins -= enemyPrice;

            }
        } else if (enemy == Virus){
            enemyPrice = VIRUSES_CLASSIFICATION[color].price;
            if (enemyPrice <= coins){
                virList.push(new Virus(color, VIRUSES_CLASSIFICATION[color].doublingTime, null)); 
                coins -= enemyPrice;

            }
        }
    } else {
        var length = randomInteger(MIN_HELMINT_LENGTH, MAX_HELMINT_LENGTH);
        var width = randomInteger(MIN_HELMINT_LENGTH*HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER, length*HELMINT_WIDTH_LENGTH_MULTIPLIER);
        var health = length*width*HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER;
        var price = health;
        var delay = Math.round(health*HELMINT_DELAY_HEALTH_MULTIPLIER + randomUniform(-HELMINT_DELAY_NOISE, HELMINT_DELAY_NOISE));
        enemyPrice = health;
        if (enemyPrice <= coins){
            helList.push(new Helmint(-100, randomUniform(playableFieldStart + 15, playableFieldHeight-15), health, price, delay, width, length));
            coins -= enemyPrice;
        } 
    }
    return [bacList, virList, helList, coins];
    
}
//--------SETUP FUNCTIONS--------

// Game Setup
var immunityCells;
var antibodies;
var shops;
var buttons;
var spleen;
var tissuecells;
var inplayBacteriaColorsIndices;
var colorProbs;
var bacteria;
var viruses;
var helmintes;
var garbagePiles;
var wave;
var gameOverTrue;
var pauseTrue;
var historyObject;
var reset;
function setupGame(){
    immunityCells = [];
    antibodies = [];
    shops = [
        new Shop(BONE_MARROW_IMAGE, xLeftOffset, offset, shopWidth, shopHeight - 2 * offset, NaturalKiller, 150, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE),
        new Shop(BONE_MARROW_IMAGE, xLeftOffset + shopWidth + offset, offset, shopWidth, shopHeight - 2 * offset, TLymphocyte, 300, VIRUS_IMAGE, T_LYMPHOCYTES_IMAGE),
        new Shop(BONE_MARROW_IMAGE, xLeftOffset + 2*shopWidth + 2*offset, offset, shopWidth, shopHeight - 2 * offset, BLymphocyte, 200, BACTERIA_IMAGE, LYMPHOCYTES_IMAGES.get("green")),
        new Shop(BONE_MARROW_IMAGE, xLeftOffset + 3 * shopWidth + 3 * offset, offset, shopWidth, shopHeight - 2 * offset, Neutrophil, 100, BACTERIA_IMAGE, NEUTROPHILS_IMAGE),
        new Shop(BONE_MARROW_IMAGE, xLeftOffset + 4 * shopWidth + 4 * offset, offset, shopWidth, shopHeight - 2 * offset, Eosinophile, 50, HELMINTH_IMAGE, EOSINOPHILES_IMAGE),
        new Shop(BONE_MARROW_IMAGE, xLeftOffset + 5*shopWidth + 5*offset, offset, shopWidth, shopHeight - 2 * offset, Macrophage, 300, GARBAGE_IMAGE, MACROPHAGES_IMAGE)

    ];
    buttons = [];
    for (var i = 0; i < BACTERIA_COLORS.length; i++){
        buttons.push(new Antibiotic(BACTERIA_COLORS[i], fieldWidth/2 - buttonWidth*(BACTERIA_COLORS.length - i) - offset*(BACTERIA_COLORS.length - i), playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
        buttons.push(new Vaccine(BACTERIA_COLORS[i], fieldWidth/2 + offset*(i+1) + buttonWidth*i, playableFieldHeight + offset, buttonWidth, buttonHeight, 100));
    }

    spleen = new Spleen(BONE_MARROW_IMAGE, xLeftOffset+6*shopWidth + 6*offset + 10, offset, shopHeight - 2 * offset, shopHeight - 2 * offset, 16);
    tissueCells = addTissueCells([]);
    inplayBacteriaColorsIndices = [0];
    colorProbs = [MAX_COLOR_PROB_VAL];
    //var bacteria = addBacteria([], starting_nBacteria, BACTERIA_IMAGE, 100);
    bacteria = [];
    viruses = [];
    helmintes = [];
    garbagePiles = [];
    wave = 1;
    [bacteria, viruses, helmintes] = formNewWave(wave, bacteria, viruses, helmintes);
    gameOverTrue = false;  
    pauseTrue = false;
    historyObject = new GameHistory();
    reset = new ResetButton("lightgreen", offset+15, offset+70, 90, 90, "Restart");
    livesLeft = 10;
}
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
            if (cell.label.active && cell.label.isIntersected(x, y) && money >= cell.upgradePrice && cell.label.upgradeAvailable){
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
    
    if (reset.isIntersected(x, y)){
        reset.resetGame();
    }
    
});

var keyActions = {
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    81: "a1",
    87: "a2",
    69: "a3",
    82: "a4",
    65: "v1",
    83: "v2",
    68: "v3",
    70: "v4",
    32: "pause",
    27: "pause",
    85: "upgrade"
};
$("body").keydown(function(event){
    var action = keyActions[event.keyCode];
    if (action != undefined){
        if (["1", "2", "3", "4", "5", "6"].includes(action)){
            shops[parseInt(action)-1].buy();
        } else if (action.startsWith("a")){
            buttons.filter((button) => button instanceof Antibiotic)[parseInt(action[1])-1].activate()
        } else if (action.startsWith("v")){
            buttons.filter((button) => button instanceof Vaccine)[parseInt(action[1])-1].activate()
        } else if (action == "pause"){
            pauseTrue = !pauseTrue;
        } else if (action == "upgrade"){
            immunityCells.filter((cell) => cell.label != undefined && cell.label.active).forEach((cell) => {
                cell.upgrade();
            })
    }       
    }      
            });
gameStart = true;
var game = setInterval(function(){  
    console.log(gameStart, gameOverTrue);
    if (gameStart){
        setupGame();
        gameStart = false;
    } else if (gameOverTrue){
        stopGame("Game Over");
    }
    else if (pauseTrue){
        stopGame("Pause");
    } else {
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    
    printGameInfo();
        
    shops.forEach((shop) => {
        shop.draw();
        if (shop.pockets.length > 0)
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
            if (cell.health < 0){
                historyObject.tissueCellsKilled += 1;
            }
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
                    historyObject.helmintesKilled += 1;
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
                historyObject.bacteriaKilled += 1;
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
    
    if(bacteria.length === 0) {
        wave += 1;
//        bacteria = addBacteria([], starting_nBacteria + wave * 10, BACTERIA_IMAGE, 100 + wave * 30);
        
//
//        if (wave % 4 === 2) {
//            viruses = addViruses(viruses, starting_nViruses, VIRUS_COLOR, VIRUS_DOUBLING_TIME - wave);
//        }
//        if (wave % 10 === 0){
//            helmintes = [new Helmint(-10, randomUniform(playableFieldStart + 15, playableFieldHeight-15), 1000, 1000, 100, 30, 10)];
//        }
//        
        [bacteria, viruses, helmintes] = formNewWave(wave, bacteria, viruses, helmintes);
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