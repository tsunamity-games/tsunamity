//-----DRAW THE FIELD------------
function drawField(){
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    
    
    // Blood
    ctx.drawImage(
        BLOOD_IMAGE_7, 
        (1211/1440)*fieldWidth, 
        (320/1080)*fieldHeight, 
        (96/1440)*fieldWidth, 
        (290/1080)*fieldHeight);
    
    // Bone marrow
    ctx.drawImage(
        BONE_MARROW_BACKGROUND_IMAGE, 
        0, 
        (240/1080)*fieldHeight, 
        (1085/1440)*fieldWidth, 
        (319/1080)*fieldHeight);
    
    
    // Right Menu
    ctx.fillStyle = rightMenuColor;
    ctx.fillRect(rightMenuX, 0, rightMenuWidth, fieldHeight);
    
    // Blood
    ctx.fillStyle = bloodColor;
    ctx.fillRect(spleenTrunkX, 0, spleenTrunkWidth, fieldHeight);
    ctx.drawImage(
        BLOOD_IMAGE_1, 
        (16/1440)*fieldWidth, 
        (333/1080)*fieldHeight, 
        (166/1440)*fieldWidth, 
        (176/1080)*fieldHeight);
    ctx.drawImage(
        BLOOD_IMAGE_4, 
        (919/1440)*fieldWidth, 
        (329/1080)*fieldHeight, 
        (165/1440)*fieldWidth, 
        (127/1080)*fieldHeight);
    
    
    
    // Top menu
    ctx.fillStyle = topMenuColor;
    ctx.fillRect(0, 0, fieldWidth, topMenuHeight);
    
    // Lifes
    ctx.drawImage(
            LIFES_IMAGE, fieldWidth*0.02, (topMenuHeight-lifesSize)/2, lifesSize*1.1, lifesSize);
    ctx.fillStyle = "Black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold " + lifesSize*1.1*0.5 + "px Courier";
    ctx.fillText(livesLeft, 
                 fieldWidth*0.02+lifesSize*1.1/2, 
                 topMenuHeight/2);
        
    
    // Waves
    ctx.fillStyle = wavesBackColor;
    roundRect(ctx, 
              wavesRectangleX, 
              wavesRectangleY, 
              wavesRectangleWidth, 
              wavesRectangleHeight, 
              leftRadius = 8, rightRadius = 8, fill = true);
    ctx.fillStyle = wavesFillingColor;
    ctx.globalAlpha = wavesFillingOpacity;
    if (bacteria.length != fullWaveSize){
            roundRect(ctx, 
              wavesRectangleX, 
              wavesRectangleY, 
              wavesRectangleWidth*(1 - bacteria.length/fullWaveSize), 
              wavesRectangleHeight, 
              leftRadius = 8, rightRadius = 0, fill = true);

    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "Black";
    ctx.textAlign = "right";
    ctx.fillText(wave, wavesRectangleX+wavesRectangleWidth*0.9, wavesRectangleY+wavesRectangleHeight/2);
    
    // Money
    ctx.fillStyle = moneyRectangleColor;
    roundRect(ctx, 
              moneyRectangleX, 
              moneyRectangleY, 
              moneyRectangleWidth, 
              moneyRectangleHeight, 
              leftRadius = 8, rightRadius = 8, fill = true, stroke = true);
    ctx.fillStyle = "Black";
    ctx.fillText(Math.round(money), 
                 moneyRectangleX+moneyRectangleWidth*0.9, moneyRectangleY+moneyRectangleHeight/2);
    ctx.drawImage(
            MONEY_IMAGE, 
        moneyRectangleX + moneyRectangleWidth*0.1, 
        moneyRectangleY+moneyRectangleHeight*0.1, 
        moneyRectangleHeight*1.5, 
        moneyRectangleHeight-moneyRectangleHeight*0.2);

    // Playable Field
    ctx.strokeStyle = playableFieldBorderColor;
    ctx.strokeRect(playableFieldX, playableFieldY, playableFieldWidth, playableFieldHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(playableFieldX, playableFieldY, playableFieldWidth, playableFieldHeight);
    
    // Blood over
    ctx.drawImage(
        BLOOD_IMAGE_2, 
        (9/1440)*fieldWidth, 
        (420/1080)*fieldHeight, 
        (88/1440)*fieldWidth, 
        (70/1080)*fieldHeight);
    ctx.drawImage(
        BLOOD_IMAGE_3, 
        (481/1440)*fieldWidth, 
        (362/1080)*fieldHeight, 
        (561/1440)*fieldWidth, 
        (102/1080)*fieldHeight);
    ctx.drawImage(
        BLOOD_IMAGE_5, 
        (830/1440)*fieldWidth, 
        (930/1080)*fieldHeight, 
        (296/1440)*fieldWidth, 
        (147/1080)*fieldHeight);
    ctx.drawImage(
        BLOOD_IMAGE_6, 
        (1243/1440)*fieldWidth, 
        (299/1080)*fieldHeight, 
        ((1440-1243)/1440)*fieldWidth, 
        (118/1080)*fieldHeight);
    
    // Shop names
    var linesY = (165/1080)*fieldHeight;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    ctx.strokeStyle = ShopColors.yellow.colorCode;
    ctx.beginPath();
    ctx.moveTo((37/1440)*fieldWidth, linesY);
    ctx.lineTo(((37+258)/1440)*fieldWidth, linesY);
    ctx.stroke();
    ctx.font = "bold " + (37/1080)*fieldHeight + "px Courier";
    ctx.fillStyle = ShopColors.yellow.colorCode;  
    ctx.fillText("Viruses", (37/1440)*fieldWidth, (120/1080)*fieldHeight);

    
    ctx.strokeStyle = ShopColors.green.colorCode;
    ctx.beginPath();
    ctx.moveTo((312/1440)*fieldWidth, linesY)
    ctx.lineTo(((312+258)/1440)*fieldWidth, linesY)
    ctx.stroke();
    ctx.font = "bold " + (37/1080)*fieldHeight + "px Courier";
    ctx.fillStyle = ShopColors.green.colorCode;  
    ctx.fillText("Bacteria", (312/1440)*fieldWidth, (120/1080)*fieldHeight);
    
    ctx.strokeStyle = ShopColors.blue.colorCode;
    ctx.beginPath();
    ctx.moveTo((595/1440)*fieldWidth, linesY);
    ctx.lineTo(((595+391)/1440)*fieldWidth, linesY);
    ctx.stroke();
    ctx.font = "bold " + (37/1080)*fieldHeight + "px Courier";
    ctx.fillStyle = ShopColors.blue.colorCode;  
    ctx.fillText("Other", (595/1440)*fieldWidth, (120/1080)*fieldHeight)
    
    reset.draw();
    
}

//-----GAME SETUP FUNCTIONS------
function addTissueCells(tissueCellsList){
    for (i=0; i< nTissueCellColumns; i++){
        x = playableFieldX + tissueCellsLeftOffset + i*(tissueCellSize+spaceBetweenTissueCellsHorizontal);
        for (j=0; j < nTissueCellRows; j++){
            y = playableFieldY + tissueCellsUpOffset + j*(tissueCellSize+spaceBetweenTissueCellsVertical);
            tissueCellsList.push(new TissueCell(x, y));
        }
    }
    EdgeCellX = x;
    return tissueCellsList;
}
function addBacteria(bacteriaList, n, maxHealth, price){
    for (var i=0; i<n; i++){
        var y = randomUniform(playableFieldY, playableFieldHeight); 
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
    ctx.fillStyle = "lightgreen";
    ctx.globalAlpha = 0.01;
    ctx.fillRect(fieldWidth*0.35, fieldHeight*0.3, fieldWidth*0.3, fieldHeight*0.63);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    if (why == "Game Over"){
        ctx.font = "40px Courier";
        ctx.fillText(why, fieldWidth/2, fieldHeight/3);
        ctx.font = "20px Courier";
        var lines = historyObject.makeReport().split('\n');
        for (var i = 0; i < lines.length; i++)
            ctx.fillText(lines[i], fieldWidth/2, fieldHeight/2 + ((i-3)*20));        
    } else {
        ctx.font = "60px Courier";
        ctx.fillText(why, fieldWidth/2, fieldHeight/2);
    }
    ctx.globalAlpha = 1;
}
function checkAntibiotics(){
    buttons.filter((button) => button instanceof Antibiotic).forEach((anti) => {
        if ((anti.lastWave != null) && this.wave > anti.lastWave + 1){
            anti.available = false;
        }
    }
    );
}
function formNewWave(waveNumber, oldBac, oldVir, oldHel, oldHIV){
    var newBac = oldBac;
    var newVir = oldVir;
    var newHel = oldHel;
    var newHIV = oldHIV;
    var coins = Math.round(50*waveNumber + 0.05*waveNumber**2);
    if (waveNumber > 3 && randomUniform(0, 1) < PROB_TO_ADD_NEW_COLOR){
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
        [newBac, newVir, newHel, newHIV, coins] = chooseEnemy(newBac, newVir, newHel, newHIV, coins, waveNumber);
    }
    return [newBac, newVir, newHel, newHIV];
}
function chooseEnemy(bacList, virList, helList, hivList, coins, waveNumber){
    var candidates = [Bacterium];
    if (waveNumber > 3){
        candidates.push(Virus);
    }
    if (waveNumber > 10){
        candidates.push(Helmint);
    }
    
    if (waveNumber > 20){
        candidates.push(HIV);
    }
    
    var enemyPrice;
    var enemy = randomChoice(candidates, ENEMY_PROB_DIST.slice(0, candidates.length));
    if (enemy != Helmint && enemy != HIV){
        var colorIndex = randomChoice(inplayBacteriaColorsIndices, colorProbs);
        var color = BACTERIA_COLORS[colorIndex];
        if (enemy == Bacterium){
            var y = randomUniform(playableFieldY, 
                                  playableFieldY + playableFieldHeight);
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
    } else if (enemy == Helmint) {
        var length = randomInteger(MIN_HELMINT_LENGTH, MAX_HELMINT_LENGTH);
        var width = randomInteger(MIN_HELMINT_LENGTH*HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER, length*HELMINT_WIDTH_LENGTH_MULTIPLIER);
        var health = length*width*HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER;
        var price = health;
        var delay = Math.round(health*HELMINT_DELAY_HEALTH_MULTIPLIER + randomUniform(-HELMINT_DELAY_NOISE, HELMINT_DELAY_NOISE));
        enemyPrice = health;
        if (enemyPrice <= coins){
            helList.push(new Helmint(-100, randomUniform(playableFieldY + 15, playableFieldHeight-15), health, price, delay, width, length));
            coins -= enemyPrice;
        } 
    } else if (enemy == HIV){
        enemyPrice = HIV_PRICE;
        if (enemyPrice <= coins){
            hivList.push(new HIV(HIV_IMAGE, 
                                 100, 
                                 randomUniform(playableFieldY + 15, playableFieldHeight-15))
                        );
            coins -= enemyPrice;
        }
    }
    return [bacList, virList, helList, hivList, coins];
    
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
var hiv_particles;
var viruses;
var helmintes;
var garbagePiles;
var wave;
var gameOverTrue;
var pauseTrue;
var historyObject;
var reset;
var fullWaveSize;
      
const T_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + shopWidth + spaceBetweenShops, shopY, TLymphocyte, T_LYMPHOCYTE_PRICE, T_LYMPHOCYTES_IMAGE, false, true, "yellow");
const B_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + 3 * shopWidth + 3 * spaceBetweenShops, shopY, BLymphocyte, B_LYMPHOCYTE_PRICE, LYMPHOCYTES_IMAGES.get("green"), true, true, "green");
      
function setupGame(){
    immunityCells = [];
    antibodies = [];
    shops = [
        new Shop(xLeftOffset, shopY, NaturalKiller, 150, T_LYMPHOCYTES_IMAGE, true, true, "yellow"),
        T_LYMPHOCYTE_SHOP,
        new Shop(xLeftOffset + 2 * shopWidth + 2 * spaceBetweenShops, shopY, Neutrophil, 100, NEUTROPHILS_IMAGE, true, true, "green"),
        B_LYMPHOCYTE_SHOP,
        new Shop(xLeftOffset + 4 * shopWidth + 4 * spaceBetweenShops, 
                 shopY, THelper, T_HELPER_PRICE, T_LYMPHOCYTES_IMAGE, true, true, "blue"),

        new Shop(xLeftOffset + 6 * shopWidth + 6 * spaceBetweenShops, shopY, Macrophage, 300, MACROPHAGES_IMAGE, true, true, "blue"),
        new Shop(xLeftOffset + 5 * shopWidth + 5 * spaceBetweenShops, shopY, Eosinophile, 50, EOSINOPHILES_IMAGE, true, true, "blue")
        
    ];
    buttons = [];
    for (var i = 0; i < BACTERIA_COLORS.length; i++){
        buttons.push(
            new Antibiotic(
                BACTERIA_COLORS[i], 
                antibioticsX,
                topAntibioticY + (buttonHeight+spaceBetweenAntibioticButtons)*i,
                buttonWidth, 
                buttonHeight, 100));
        buttons.push(
            new Vaccine(
                BACTERIA_COLORS[i], 
                antibioticsX,
                topVaccineY + (buttonHeight+spaceBetweenAntibioticButtons)*i, 
                buttonWidth, 
                buttonHeight,
                100));
    }

    spleen = new Spleen(spleenX, spleenY, spleenSize, spleenSize, 12);
    tissueCells = addTissueCells([]);
    inplayBacteriaColorsIndices = [0];
    colorProbs = [MAX_COLOR_PROB_VAL];
    bacteria = [];
    viruses = [];
    helmintes = [];
    hiv_particles = [];
    garbagePiles = [];
    wave = 1;
    [bacteria, viruses, helmintes, hiv_particles] = formNewWave(wave, bacteria, viruses, helmintes, hiv_particles);
    fullWaveSize = bacteria.length;
    gameOverTrue = false;  
    pauseTrue = false;
    historyObject = new GameHistory();
    reset = new ResetButton("red", rightMenuX+rightMenuWidth/2-30, 5, 60, 60, "R");
    livesLeft = 10;
    money = STARTING_MONEY;
}

// Gameplay
$("#field").click(function(event){
    const WIDTH_RATIO = fieldWidth / $("#field").width();
    const HEIGHT_RATIO = fieldHeight / $("#field").height();

    x = WIDTH_RATIO * (event.pageX - field.offsetLeft);
    y = HEIGHT_RATIO * (event.pageY - field.offsetTop);

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
    try{immunityCells.forEach((cell) => {
        if ((cell instanceof BLymphocyte || cell instanceof TLymphocyte) && cell.mode != "memory"){
            if (cell.label.active && cell.label.isIntersected(x, y) && money >= cell.upgradePrice && cell.label.upgradeAvailable){
                money -= cell.upgradePrice;
                cell.upgrade();
                throw 'Break';

            }
            else if (cell.isIntersected(x, y) && cell.mode != "memory"){
                cell.label.active = true;     
                throw 'Break';

            } else {
                cell.label.active = false;
            }
        }
    })} catch (e) {
        if (e !== 'Break') 
            throw e;
    }
    
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
    if (gameStart){
        setupGame();
        gameStart = false;
    } else if (gameOverTrue){
        stopGame("Game Over");
    }
    else if (pauseTrue){
        stopGame("Pause");
    } else {
    drawField();
//    printGameInfo();
        
    shops.forEach((shop) => {
        shop.reset();
        
        if (shop.pockets.length > 0)
        shop.pockets = shop.pockets.filter(function hasMemoryCell(pocket){
            var colors = [];
            immunityCells.filter((cell) => cell instanceof shop.cellType && cell.mode === "memory").forEach((cell) => {colors.push(cell.color);})
            return colors.includes(pocket.color);
            
        });
        shop.pockets.forEach((pocket) => pocket.draw());
    })
    buttons.forEach((button) => {button.draw()})
//    ctx.fillText("Price: 100", buttons[0].x - 60, buttons[0].y + buttons[0].height/2);
    
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
                return (Math.abs(cell.x - potentialNeighbour.x) <= tissueCellSize + spaceBetweenTissueCellsHorizontal) && (Math.abs(cell.y - potentialNeighbour.y) <= tissueCellSize + spaceBetweenTissueCellsVertical) && !(cell.x === potentialNeighbour.x && cell.y === potentialNeighbour.y);
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
            if ((helmint.parts[helmint.parts.length - 1].x < playableFieldX+playableFieldWidth)){
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
        if ((bacterium.x < playableFieldX+playableFieldWidth)){
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

    shops.forEach((shop) => {
        // Set price with discount
        shop.price = Math.round(shop.base_price * Math.pow(HELPER_DISCOUNT_RATE, shop.discount));
        shop.draw();
    });

    spleen.sections.forEach((section) => {
        if (section.antigen != null){
            section.antigen.move();
            section.antigen.changeDirection();
            section.antigen.draw();            
        }
    })
   
    immunityCells.forEach((cell) => {
        cell.draw();
    });

    hiv_particles.forEach((hiv) => {
        hiv.act();
        hiv.draw();
    });
    hiv_particles = hiv_particles.filter((particle) => particle.age < HIV_LONGEVITY);
    
    if(bacteria.length === 0) {
        wave += 1;
        var nmut = [];
        tissueCells.forEach(cell => {
            nmut.push(cell.nMutations);
        })
        var mean = 0;
        nmut.forEach(m => {mean += m;})
        console.log(nmut);   
        [bacteria, viruses, helmintes, hiv_particles] = formNewWave(wave, bacteria, viruses, helmintes, hiv_particles);
        fullWaveSize = bacteria.length;
        checkAntibiotics();
    }
    immunityCells.filter(cell => cell instanceof BLymphocyte || cell instanceof TLymphocyte).forEach(cell => cell.label.draw());
    money += baseIncome * tissueCells.filter((cell) => cell.infection.length === 0).length/tissueCells.length;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, fieldWidth, fieldHeight);
    if (livesLeft <= 0){
        gameOverTrue=true;
    };
    }
}, 1);

function stopAllBacteria() {
    bacteria.forEach((bacterium) => {
        bacterium.baseSpeed = 0;
    })
}
