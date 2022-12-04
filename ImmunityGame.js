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
    toMainMenu.draw();  
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

    ctx.drawImage(
        SCROLL_IMAGE, 
        fieldWidth*0.35, 
        fieldHeight*0.3, 
        fieldWidth*0.3, 
        fieldHeight*0.63);

    ctx.fillStyle = "black";

    if(why instanceof Array) {  // Tutorial's text is a list of strings
        ctx.font = "22px Courier";
        for (var i = 0; i < why.length; i++)
                ctx.fillText(why[i], fieldWidth/2, fieldHeight/2 + ((i-3)*29));        
    } else {
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
    if (((waveNumber > 3) && (gameState == "game")) || ((waveNumber > 8) && (gameState == "tutorial"))){
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
var tutorialState = 0;
var waitingForClick = false;
var gameState = "menu";

// Tutorial vars
var currentAntibioticsBought;
var currentVaccinesBought;
var currentWave;

const MENU_BUTTONS = [
    new Button(MAIN_MENU_RIGHT_PANEL_COLOR, MAIN_MENU_BUTTONS_X, MAIN_MENU_BUTTONS_Y,
           MAIN_MENU_BUTTONS_WIDTH, MAIN_MENU_BUTTONS_HEIGHT, "Start game", isCircle=false),
    new Button(MAIN_MENU_RIGHT_PANEL_COLOR, MAIN_MENU_BUTTONS_X, MAIN_MENU_BUTTONS_Y + MAIN_MENU_BUTTONS_HEIGHT + SPACE_BETWEEN_MAIN_MENU_BUTTONS,
           MAIN_MENU_BUTTONS_WIDTH, MAIN_MENU_BUTTONS_HEIGHT, "Tutorial", isCircle=false),
    new Button(MAIN_MENU_RIGHT_PANEL_COLOR, MAIN_MENU_BUTTONS_X, MAIN_MENU_BUTTONS_Y + 2 * (MAIN_MENU_BUTTONS_HEIGHT + SPACE_BETWEEN_MAIN_MENU_BUTTONS),
           MAIN_MENU_BUTTONS_WIDTH, MAIN_MENU_BUTTONS_HEIGHT, "Settings", isCircle=false),
]

const T_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + shopWidth + spaceBetweenShops, shopY, TLymphocyte, T_LYMPHOCYTE_PRICE, T_LYMPHOCYTES_IMAGE, false, true, "yellow");
const B_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + 3 * shopWidth + 3 * spaceBetweenShops, shopY, BLymphocyte, B_LYMPHOCYTE_PRICE, LYMPHOCYTES_IMAGES.get("green"), true, true, "green");

shops = [
    new Shop(xLeftOffset, shopY, NaturalKiller, 150, T_LYMPHOCYTES_IMAGE, true, true, "yellow"),
    T_LYMPHOCYTE_SHOP,
    new Shop(xLeftOffset + 2 * shopWidth + 2 * spaceBetweenShops, shopY, Neutrophil, 100, NEUTROPHILS_IMAGE, true, true, "green"),
    B_LYMPHOCYTE_SHOP,
    new Shop(xLeftOffset + 4 * shopWidth + 4 * spaceBetweenShops, 
             shopY, THelper, T_HELPER_PRICE, T_LYMPHOCYTES_IMAGE, true, true, "blue"),
    new Shop(xLeftOffset + 5 * shopWidth + 5 * spaceBetweenShops, shopY, Eosinophile, 50, EOSINOPHILES_IMAGE, true, true, "blue"),
    new Shop(xLeftOffset + 6 * shopWidth + 6 * spaceBetweenShops, shopY, Macrophage, 300, MACROPHAGES_IMAGE, true, true, "blue")
    
];
      
function setupGame(tutorial=false){
    immunityCells = [];
    antibodies = [];
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
    if(!tutorial) {
        [bacteria, viruses, helmintes, hiv_particles] = formNewWave(wave, bacteria, viruses, helmintes, hiv_particles);
    } else {
        bacteria.push(new Bacterium("blue", 0, fieldHeight / 2, bacteriaRadius, BASE_BACTERIAL_HEALTH, BACTERIUM_PRICE));
    }
    
    fullWaveSize = bacteria.length;
    gameOverTrue = false;  
    pauseTrue = false;
    historyObject = new GameHistory();
    reset = new ResetButton("red", rightMenuX+rightMenuWidth/2 - 120, 10, 60, 60, "R");
    toMainMenu = new Button("white", rightMenuX+rightMenuWidth/2 - 30, 10, 60, 60, "Q");
    livesLeft = tutorial ? 99 : 10;
    money = tutorial ? 5 : STARTING_MONEY;
}

// Gameplay
$("#field").click(function(event){
    const WIDTH_RATIO = fieldWidth / $("#field").width();
    const HEIGHT_RATIO = fieldHeight / $("#field").height();

    x = WIDTH_RATIO * (event.pageX - field.offsetLeft);
    y = HEIGHT_RATIO * (event.pageY - field.offsetTop);

    switch(gameState) {
        case "menu":
            if(MENU_BUTTONS[0].isIntersected(x, y)) {
                gameStart = true;
                setupGame();
                gameState = "game";
            }
            
            if(MENU_BUTTONS[1].isIntersected(x, y)) {
                gameStart = true;
                tutorialState = 0;
                setupGame(tutorial=true);
                gameState = "tutorial";
            }
            break;
        default:  // game and tutorial
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

            if(toMainMenu.isIntersected(x, y)) {
                gameState = "menu";
            }

            if(gameState == "tutorial" && waitingForClick) {
                tutorialState += 1;

                presetTutorialState(tutorialState);
            }
            break;
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

presetTutorialState = function(tutorialState) {
    console.log("Presetting state " + tutorialState);
    switch(tutorialState) {
        case 2:
            drawBlackScreen(BLACK_SCREEN_ALPHA, tissueCells[50].x, tissueCells[50].y,
                 tissueCells[50].size, tissueCells[50].size, tissueCells[50].size / 5);
            break;
        case 3:
            playGame(tutorial=true);
            let lastShop = shops[shops.length-1];
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[0].x - 10, shops[0].y, 
                lastShop.x + lastShop.width, lastShop.height, 10)
            break;
        case 4:
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, moneyRectangleX, moneyRectangleY, moneyRectangleWidth, moneyRectangleHeight, 10)
            break;
        case 5:
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, fieldWidth*0.02, (topMenuHeight-lifesSize)/2, lifesSize*1.1, lifesSize, 10);
            break;
        case 6:
            playGame(tutorial=true);
            break;
        case 10:
            playGame(tutorial=true);
            chanceToGetAntigen = 0.01;  // Return default
            trainingProbability = 0.3;

            // Make a wave a little bit easier (not kill player too quickly)
            bacteria.forEach((bacterium) => {
                bacterium.baseSpeed /= 2;
            });
            break;
        case 13:
            trainingProbability = 0.01; // Restore default
            break;
        case 20:
            currentWave = wave;
        case 24:
            currentAntibioticsBought = historyObject.antibioticsBought;
            break;
        case 29:
            viruses.push(new Virus("blue", VIRUSES_CLASSIFICATION["blue"].doublingTime, null));
            viruses.push(new Virus("green", VIRUSES_CLASSIFICATION["green"].doublingTime, null));
            break;
        case 31:
            currentWave = wave;
            break;
        case 35:
            currentVaccinesBought = historyObject.vaccinesBought;
            break;
        case 41:
            let length = randomInteger(MIN_HELMINT_LENGTH, MAX_HELMINT_LENGTH);
            let width = randomInteger(MIN_HELMINT_LENGTH*HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER, length*HELMINT_WIDTH_LENGTH_MULTIPLIER);
            let health = length*width*HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER;
            let delay = Math.round(health*HELMINT_DELAY_HEALTH_MULTIPLIER + randomUniform(-HELMINT_DELAY_NOISE, HELMINT_DELAY_NOISE));
            helmintes.push(new Helmint(-100, randomUniform(playableFieldY + 15, playableFieldHeight - 15), health, health, delay, width, length));
            break;
        default:
            break;
    }
};

handleTutorialState = function(tutorialState) {
    console.log("Handling state " + tutorialState);
    if(tutorialState >= 12) {
        VIRUSES_CLASSIFICATION["blue"].price = 1;  // Increase probability of virus appearing 
    } else {
        VIRUSES_CLASSIFICATION["blue"].price = 50;  // default
    }

    switch(tutorialState) {
        case 0:
            for(var i=0; i < 5; i++) {
                playGame(tutorial=true);
            }
            tutorialState += 1;
            break;
        case 1:
            text = ["Почувствуй себя", "в роли иммунной системы!", "Защищай организм", "от болезней",
                    "", "", "Кликни в любое место", "чтобы продолжить"];
            stopGame(text);
            waitingForClick = true;
            break;

        case 2:
            waitingForClick = false;
            text = ["Это одна из клеток ткани.", "Они производят", "глюкозу, которая", "нужны для покупки", "иммунных клеток",
                    "", "", "Кликни в любое место", "чтобы продолжить"]
            stopGame(text);
            waitingForClick = true;
            break;
        case 3:  // Skipping step: remove black screen and draw the field, then go to the next state immediately
            waitingForClick = false;
            text = ["Это костный мозг.", "", "Здесь можно покупать", "иммунные клетки", "для защиты организма"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 4:
            waitingForClick = false;
            text = ["Для покупки иммунных клеток", "нужно иметь достаточно глюкозы.",
                    "Цена каждой клетки", "написана в костном мозге"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 5:
            waitingForClick = false;
            text = ["Следи за здоровьем!", "Враги отнимают его,", "когда доходят", "до правого конца экрана"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 6:
            waitingForClick = false;
            text = ["Бактерии наступают!", "", "С ними помогают", "справиться нейтрофилы.",  "",
                    "Нажми на нейтрофил ", "в костном мозге,", "чтобы купить его"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 7:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[2].x, shops[2].y, 
                shops[2].width, shops[2].height, 10)

            let neutrophils = immunityCells.filter((cell) => cell instanceof Neutrophil);
            if(neutrophils.length > 0) {
                tutorialState += 1
            };
            break;
        case 8:
            playGame(tutorial=true);

            if(bacteria[0].health < 10) {
                chanceToGetAntigen = 1;
                bacteria[0].health = 0;

                drawBlackScreen(BLACK_SCREEN_ALPHA, spleen.x, spleen.y, spleen.width, spleen.height, 10);
                tutorialState += 1;
            }

            break;
        case 9:
            waitingForClick = false;
            text = ["Это — селезёнка.", "Сюда после смерти", "бактерий иногда",  "попадают антигены",
                    "Они нужны для тренировки", "B-лимфоцитов"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 10:
            waitingForClick = false;
            text = ["Наступает большая", "волна бактерий!", "Найми B-лимфоцит —", "более сильную клетку",
                    "для борьбы", "с бактериями"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 11:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[3].x, shops[3].y, shops[3].width, shops[3].height, 10);
            
            let bCells = immunityCells.filter((cell) => cell instanceof BLymphocyte);
            if(bCells.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 12:
            waitingForClick = false;
            text = ["B-лимфоцитам нужно", "время и антигены", "для тренировки.", "", "После этого они могут",
                    "эффективно атаковать", "один вид бактерий"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 13:
            waitingForClick = false;
            playGame(tutorial=true);
            if(bacteria.length < 5) {
                immunityCells[0].age = immunityCells[0].longevity;  // Kill one of the cells
                tutorialState += 1;
            };
            break;
        case 14:
            waitingForClick = false;
            text = ["Отличная работа!", "","Но время жизни одной из", "иммунных клеток",
                     "подошло к концу.", "", "Покупай макрофаги,",
                    "чтобы убирать", "мёртвые клетки!"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 15:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[6].x, shops[6].y, shops[6].width, shops[6].height, 10);
            
            let macrophages = immunityCells.filter((cell) => cell instanceof Macrophage);
            if(macrophages.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 16:
            waitingForClick = false;
            playGame(tutorial=true);
            
            if(garbagePiles.length == 0) {
                tutorialState += 1
            };
            break;
        case 17:
            waitingForClick = false;6
            text = ["Великолепно сыграно!", "", "Как только B-лимфоциты", "встретятся с врагом", "их можно улучшить",
                    "до плазматической клетки", "", "Нажми на B-лимфоцит,", "а затем на кнопку улучшения",
                    "или на клавишу U,", "чтобы получить", "плазматическую клетку"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 18:
            waitingForClick = false;

            let unupgradedBcells = immunityCells.filter((cell) => cell instanceof BLymphocyte);

            if(unupgradedBcells.length > 0) {
                bCell = unupgradedBcells[0];
                drawBlackScreen(BLACK_SCREEN_ALPHA, bCell.x - bCell.radius, bCell.y - bCell.radius,
                                2 * bCell.radius, 2 * bCell.radius, 5);
            }

            let plasmaticCells = immunityCells.filter(cell => {
                return (cell instanceof BLymphocyte) && (cell.mode == "plasmatic")
            })
            if(plasmaticCells.length > 0) {
                tutorialState += 1
            };

            playGame(tutorial=true);
            break;
        case 19:
            waitingForClick = false;
            text = ["Плазматическая клетка", "производит антитела.", "Они замедляют бактерий.", "",
                    "Продолжай сражаться", "с бактериями!", "Не стесняйся покупать", "больше клеток"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 20:
            waitingForClick = false;
            if(wave - currentWave > 1) {
                tutorialState += 1;
            }
            playGame(tutorial=true);
            break;
        case 21:
            waitingForClick = false;
            text = ["Плазматическую клетку", "можно улучшить", "до клетки памяти,", "чтобы сразу нанимать", "нужные B-лимфоциты", "",
                    "Улучши плазматическую", "клетку!"]
            stopGame(text);
            waitingForClick = true;
            break;
        case 22:
            waitingForClick = false;

            let memoryBCells = immunityCells.filter(cell => {
                return (cell instanceof BLymphocyte) && (cell.mode == "memory")
            })
            if(memoryBCells.length > 0) {
                tutorialState += 1
            };
            playGame(tutorial=true);
            break;
        case 23:
            waitingForClick = false;
            text = ["Теперь в костном мозге", "можно в любой момент", "купить B-лимфоцит", "против конкретного вида бактерий!"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 24:
            waitingForClick = false;
            text = ["Впереди огромная", "волна бактерий!", "Справиться с ней", "помогут антибиотики", "",
                    "Покупай антибиотик", "против нужной инфекции"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 25:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA / 2, antibioticsX - 5, topAntibioticY - 10, buttonWidth + 10, 
                            (buttonHeight + spaceBetweenAntibioticButtons)*BACTERIA_COLORS.length, 10);
            if(historyObject.antibioticsBought > currentAntibioticsBought) {
                tutorialState += 1;
            }
            break;
        case 26:
            waitingForClick = false;
            text = ["Теперь бактерии ослабли", "и иммунные клетки легко", "справятся с ними.", "",
                    "При использовании антибиотика", "обязательно пропей курс", "до конца!", "Иначе он может",
                    "стать бесполезным.", "", "Используй антибиотик", "3 следующих волны подряд"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 27:
            waitingForClick = false;
            playGame(tutorial=true);
            if(viruses.length > 0) {
                tutorialState += 1;
            }
            break;
        case 28:
            waitingForClick = false;
            text = ["Клетки ткани", "заражены вирусом!", "", "Покупай",  "натуральных киллеров,",
                    "чтобы бороться с ними!"]
            stopGame(text);
            waitingForClick = true;
            break;
        case 29:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[0].x, shops[0].y, shops[0].width, shops[0].height, 10);
            
            let naturalKillers = immunityCells.filter((cell) => cell instanceof NaturalKiller);
            if(naturalKillers.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 30:
            waitingForClick = false;
            text = ["Натуральные киллеры", "случайно двигаются", "между клетками ткани,", "проверяя их.", "",
                    "Если натуральный киллер", "обнаружит, что клетка", "заражена вирусом,", "он её убьёт"]
            stopGame(text);
            waitingForClick = true;
            break;
        case 31:
            waitingForClick = false;
            if(wave - currentWave > 1) {
                tutorialState += 1;
            }
            playGame(tutorial=true);
            break;
        case 32:
            waitingForClick = false;
            text = ["С мощной", "вирусной инфекцией", "не справиться", "без Т-киллеров!", "",
                    "Найми Т-киллера", "в костном мозге"];
            stopGame(text);
            waitingForClick = true;
            break;
        case 33:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[1].x, shops[1].y, shops[1].width, shops[1].height, 10);
            
            let tCells = immunityCells.filter((cell) => cell instanceof TLymphocyte);
            if(tCells.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 34:
            waitingForClick = false;
            text = ["Т-киллеры производят", "свои копии,", "когда встречают клетку", "с определённым", "антигеном", "",
                    "Специфичность Т-киллера", "определяется случайно", "",
                    "Покупай нужную вакцину,", "чтобы повысить вероятность", "появления нужного", "Т-киллера"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 35:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA / 2, antibioticsX - 5, topVaccineY - 10, buttonWidth + 10, 
                            (buttonHeight + spaceBetweenAntibioticButtons)*BACTERIA_COLORS.length, 10);
            if(historyObject.vaccinesBought > currentVaccinesBought) {
                tutorialState += 1;
            }
            break;
        case 36:
            waitingForClick = false;
            text = ["После встречи Т-киллера", "с вирусом или вакциной", "его можно улучшить", "до клетки памяти", "",
                    "После этого можно", "будет сразу покупать", "Т-киллеров против", "конкретных вирусов", "в костном мозге.",
                    "", "Улучши Т-киллера", "до Т-клетки памяти!", "Для этого кликни", "на Т-киллера,", "встретившегося с врагом",
                    "и кликни на табличку", "или на кнопку U"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 37:
            waitingForClick = false;
            playGame(tutorial=true);
            if(T_LYMPHOCYTE_SHOP.pockets.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 38:
            waitingForClick = false;
            text = ["Прекрасно сыграно!", "Теперь в костном мозге", "можно сразу покупать", "Т-киллеры против этого вируса",
                    "", "Т-хелперы помогут защищать", "организм, иногда покупая", "B-лимфоциты или Т-киллеры",
                    "Покупай Т-хелпера", "в костном мозге!"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 39:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[4].x, shops[4].y, shops[4].width, shops[4].height, 10);
            
            let helpers = immunityCells.filter((cell) => cell instanceof THelper);
            if(helpers.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 40:
            waitingForClick = false;
            text = ["Организм под надёжной защитой!", "Но впереди новые угрозы", "",
                    "Покупай эозинофилы", "чтобы бороться", "с гельминтами", "",
                    "Подсказка: лучше сразу", "купить побольше"
                ];
            stopGame(text);
            waitingForClick = true;
            break;
        case 41:
            waitingForClick = false;
            playGame(tutorial=true);
            drawBlackScreen(BLACK_SCREEN_ALPHA, shops[5].x, shops[5].y, shops[5].width, shops[5].height, 10);
            
            let eosinophiles = immunityCells.filter((cell) => cell instanceof Eosinophile);
            if(eosinophiles.length > 0) {
                tutorialState += 1
                playGame(tutorial=true);
            };
            break;
        case 42:
            waitingForClick = false;
            text = ["Это было великолепно!", "На этом обучение закончено", "дальше начинается", "настоящая игра",
                    "", "Продолжай защищать организм", "у тебя отлично получается!"
        ];
            stopGame(text);
            waitingForClick = true;
            break;
        default:
            playGame(tutorial=true);
            break;
        
    }

    return tutorialState;
}

function playGame(tutorial=false) {
    if(gameStart){
        console.log("Setting up game");
        setupGame(tutorial);
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
}

function drawMenu() {
    // Top panel
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, fieldWidth, 80);

    // Left panel
    ctx.fillStyle = MAIN_MENU_LEFT_PANEL_COLOR;
    ctx.fillRect(0, 80, 884, fieldHeight - 80);

    // Right panel
    ctx.fillStyle = MAIN_MENU_RIGHT_PANEL_COLOR;
    ctx.fillRect(884, 80, fieldWidth - 884, fieldHeight - 80);

    ctx.fillStyle = "white";
    ctx.font = 20 + "px Courier";
    ctx.textAlign = "left";
    ctx.textBaseline = "left";

    for (var i = 0; i < AUTHORS_INFO.length; i++){
        ctx.fillText(AUTHORS_INFO[i], 884 + 123.5, 966 + (i * 30));
    }

    MENU_BUTTONS.forEach((button) => {
        button.draw();
    })

}

var game = setInterval(function(){
    switch(gameState) {
        case "game":
            playGame();
            break;
        case "menu":
            drawMenu();
            break;
        case "tutorial":
            tutorialState = handleTutorialState(tutorialState);
            break;
        default:
            break;
    }
}, 1);

function stopAllBacteria() {
    bacteria.forEach((bacterium) => {
        bacterium.baseSpeed = 0;
    })
}
