//-----DRAW THE FIELD------------
function drawField(gameOver=false){
    var brightness;
    if (gameOver)
        brightness = "pale";
    else
        brightness = "bright";
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    // Bone marrow
    ctx.drawImage(
        BONE_MARROW_BACKGROUND_IMAGE, 
        0, 
        (240/1080)*fieldHeight, 
        (1085/1440)*fieldWidth, 
        (319/1080)*fieldHeight);
    
    
    // Blood
    ctx.drawImage(
        blood["1"][brightness], 
        (461/1440)*fieldWidth, 
        (324/1080)*fieldHeight, 
        (602.23/1440)*fieldWidth, 
        (158.62/1080)*fieldHeight);
    
    ctx.drawImage(
        blood["2"][brightness], 
        (1242.99/1440)*fieldWidth, 
        (300/1080)*fieldHeight, 
        (238/1440)*fieldWidth, 
        (74.45/1080)*fieldHeight);
    
    ctx.drawImage(
        blood["5"][brightness], 
        (1211.21/1440)*fieldWidth, 
        (320/1080)*fieldHeight, 
        (96/1440)*fieldWidth, 
        (290/1080)*fieldHeight);
    
    ctx.drawImage(
        blood["7"][brightness], 
        (836.77/1440)*fieldWidth, 
        (1008.04/1080)*fieldHeight, 
        (279.78/1440)*fieldWidth, 
        (45.78/1080)*fieldHeight);
    
    
    // Right Menu
    ctx.fillStyle = rightMenuColor;
    ctx.fillRect(rightMenuX, 0, rightMenuWidth, fieldHeight);
    ctx.beginPath();
    ctx.strokeStyle = "#D9D9D9";
    ctx.lineWidth = 1;
    ctx.moveTo(rightMenuX+rightMenuWidth*(1-0.675)/2, 
               topAntibioticY-0.018*fieldHeight);
    ctx.lineTo(rightMenuX+rightMenuWidth*(0.675+(1-0.675)/2), 
               topAntibioticY-0.018*fieldHeight);
    ctx.moveTo(rightMenuX+rightMenuWidth*(1-0.675)/2, 
               topVaccineY-0.018*fieldHeight);
    ctx.lineTo(rightMenuX+rightMenuWidth*(0.675+(1-0.675)/2), 
               topVaccineY-0.018*fieldHeight);
    ctx.moveTo(rightMenuX+rightMenuWidth*(1-0.675)/2, 
               ARTY-0.018*fieldHeight);
    ctx.lineTo(rightMenuX+rightMenuWidth*(0.675+(1-0.675)/2), 
               ARTY-0.018*fieldHeight);
    
    ctx.stroke();
    
    
    ctx.drawImage(
        MONEY_RIGHT_PANEL_IMAGE, 
        rightMenuX+rightMenuWidth*(1-0.675)/2 + rightMenuWidth*0.675*0.2, 
        topAntibioticY-0.018*fieldHeight - moneyRectangleHeight*0.6*0.8, 
        moneyRectangleHeight*0.6*0.8*1.23, 
        moneyRectangleHeight*0.6*0.8);
    ctx.drawImage(
        MONEY_RIGHT_PANEL_IMAGE, 
        rightMenuX+rightMenuWidth*(1-0.675)/2 + rightMenuWidth*0.675*0.2, 
        topVaccineY-0.018*fieldHeight - moneyRectangleHeight*0.6*0.8, 
        moneyRectangleHeight*0.6*0.8*1.23, 
        moneyRectangleHeight*0.6*0.8);
    
    ctx.drawImage(
        MONEY_RIGHT_PANEL_IMAGE, 
        rightMenuX+rightMenuWidth*(1-0.675)/2 + rightMenuWidth*0.675*0.2, 
        ARTY-0.018*fieldHeight - moneyRectangleHeight*0.6*0.8, 
        moneyRectangleHeight*0.6*0.8*1.23, 
        moneyRectangleHeight*0.6*0.8);
    
    ctx.font = wavesRectangleHeight*0.4 + "px Rubik One";
    ctx.fillStyle = "#D9D9D9";
    ctx.textAlign = "left";    
    ctx.fillText(ANTIBIOTIC_PRICE, 
                 rightMenuX+rightMenuWidth*(1-0.675)/2 + rightMenuWidth*0.675*0.2 + moneyRectangleHeight*0.6*0.8*1.23 + moneyRectangleHeight*0.1, 
                 topAntibioticY-0.018*fieldHeight - moneyRectangleHeight*0.6*0.8/2);
    ctx.fillText(VACCINE_PRICE, 
                 rightMenuX+rightMenuWidth*(1-0.675)/2 + rightMenuWidth*0.675*0.2 + moneyRectangleHeight*0.6*0.8*1.23 + moneyRectangleHeight*0.1, 
                 topVaccineY-0.018*fieldHeight - moneyRectangleHeight*0.6*0.8/2);
    ctx.fillText(ART_PRICE, 
                 rightMenuX+rightMenuWidth*(1-0.675)/2 + rightMenuWidth*0.675*0.2 + moneyRectangleHeight*0.6*0.8*1.23 + moneyRectangleHeight*0.1, 
                 ARTY-0.018*fieldHeight - moneyRectangleHeight*0.6*0.8/2);
    ctx.textBaseline = "top";
    ctx.textAlign = "center";    
    var name = texts["game"]["antibiotics"][language];
    for (let i = 0; i < name.length; i++) {
        ctx.fillText(
            name[i], 
            rightMenuX + rightMenuWidth / 5, 
            topAntibioticY + fieldHeight/50*i);
    }
    var name = texts["game"]["vaccines"][language];
    for (let i = 0; i < name.length; i++) {
        ctx.fillText(
            name[i], 
            rightMenuX + rightMenuWidth / 5, 
            topVaccineY + fieldHeight/55    *i);
    }
    var name = texts["game"]["art"][language];
    for (let i = 0; i < name.length; i+=2) {
        ctx.fillText(
            name[i] + name[i+1], 
            rightMenuX + rightMenuWidth / 5, 
            ARTY + fieldHeight/50*i/2 - fieldHeight*0.008);
    }
    
    // Blood
    ctx.fillStyle = bloodColor[brightness];
    ctx.fillRect(spleenTrunkX, 0, spleenTrunkWidth, fieldHeight);
    
    
    // Top menu
    ctx.fillStyle = topMenuColor;
    ctx.fillRect(0, 0, fieldWidth, topMenuHeight);
        
    
    // Waves
    ctx.fillStyle = wavesBackColor;
    roundRect(ctx, 
              wavesRectangleX, 
              wavesRectangleY, 
              wavesRectangleWidth, 
              wavesRectangleHeight, 
              leftRadius = 8, rightRadius = 8, fill = true);
    ctx.fillStyle = wavesFillingColor;
    if (bacteria.length != fullWaveSize){
            roundRect(ctx, 
              wavesRectangleX, 
              wavesRectangleY, 
              wavesRectangleWidth*(1 - bacteria.length/fullWaveSize), 
              wavesRectangleHeight, 
              leftRadius = 8, rightRadius = 0, fill = true);

    }
    ctx.fillStyle = "#142029";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.font = wavesRectangleHeight*0.5 + "px Rubik One";
    ctx.fillText(wave, wavesRectangleX+wavesRectangleWidth*0.9, 
                 wavesRectangleY + wavesRectangleHeight*0.8);
    ctx.drawImage(
        WAVE_IMAGE, 
        wavesRectangleX + wavesRectangleWidth*0.1, 
        wavesRectangleY + wavesRectangleHeight*0.2, 
        wavesRectangleHeight*0.6*1.3819,
        wavesRectangleHeight*0.6);
    
    // Money
    ctx.fillStyle = moneyRectangleColor;
    roundRect(ctx, 
              moneyRectangleX, 
              moneyRectangleY, 
              moneyRectangleWidth, 
              moneyRectangleHeight, 
              leftRadius = 8, rightRadius = 8, fill = true, stroke = true);
    ctx.fillStyle = "#142029";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(money), 
                 moneyRectangleX+moneyRectangleWidth*0.9, moneyRectangleY + moneyRectangleHeight*0.8);


    ctx.drawImage(
            MONEY_IMAGE, 
        moneyRectangleX + moneyRectangleWidth*0.1, 
        moneyRectangleY + moneyRectangleHeight*0.1, 
        moneyRectangleHeight*0.8*1.23, 
        moneyRectangleHeight*0.8);

    
    // Speed
    ctx.fillStyle = speedRectangleColor;
    roundRect(ctx, 
              speedRectangleX, 
              speedRectangleY, 
              speedRectangleWidth, 
              speedRectangleHeight, 
              leftRadius = 8, rightRadius = 8, fill = true, stroke = true);
    ctx.fillStyle = "#142029";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    var text;
    if (BASE_GAME_SPEED != 10){
        text = texts["game"]["speed"][language] + " " + BASE_GAME_SPEED.toFixed(1);
    } else {
        text = texts["game"]["speed"][language] + " " + Math.round(BASE_GAME_SPEED);
    }
    ctx.fillText(text, 
             speedRectangleX+speedRectangleWidth*0.5, speedRectangleY+speedRectangleHeight*0.8);
    
    // Lifes
    ctx.drawImage(
        lifeImages[brightness],
        fieldWidth*0.02,
        (topMenuHeight-lifesSize)/2, 
        lifesSize*1.1, 
        lifesSize);
    
    ctx.fillStyle = "#142029";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = lifesSize*1.1*0.35 + "px Rubik One";
    ctx.fillText(Math.max(0, livesLeft), 
                 fieldWidth*0.02+lifesSize*1.1/2, 
                 topMenuHeight/2);
    
    // Playable Field
    ctx.strokeStyle = playableFieldBorderColor;
    ctx.strokeRect(playableFieldX, playableFieldY, playableFieldWidth, playableFieldHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(playableFieldX, playableFieldY, playableFieldWidth, playableFieldHeight);
    
    
    // Shop names
    var linesY = (165/1080)*fieldHeight;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    ctx.strokeStyle = ShopColors.yellow.colorCode;
    ctx.beginPath();
    ctx.moveTo((37/1440)*fieldWidth, linesY);
    ctx.lineTo(((37+258)/1440)*fieldWidth, linesY);
    ctx.stroke();
    ctx.font = (37/1080)*fieldHeight + "px Rubik One";
    ctx.fillStyle = ShopColors.yellow.colorCode;  
    ctx.fillText(texts["game"]["viruses"][language], (37/1440)*fieldWidth, (120/1080)*fieldHeight);

    
    ctx.strokeStyle = ShopColors.green.colorCode;
    ctx.beginPath();
    ctx.moveTo((312/1440)*fieldWidth, linesY)
    ctx.lineTo(((312+258)/1440)*fieldWidth, linesY)
    ctx.stroke();
    ctx.fillStyle = ShopColors.green.colorCode;  
    ctx.fillText(texts["game"]["bacteria"][language], (312/1440)*fieldWidth, (120/1080)*fieldHeight);
    
    ctx.strokeStyle = ShopColors.blue.colorCode;
    ctx.beginPath();
    ctx.moveTo((595/1440)*fieldWidth, linesY);
    ctx.lineTo(((595+391)/1440)*fieldWidth, linesY);
    ctx.stroke();
    ctx.fillStyle = ShopColors.blue.colorCode;  
    ctx.fillText(texts["game"]["other"][language], (595/1440)*fieldWidth, (120/1080)*fieldHeight)
    
    reset.draw();
    toMainMenu.draw();  
    pause.draw();
    speed_up.draw();
    speed_down.draw();
    shops.forEach((shop) => {shop.pockets.forEach((pocket) => {pocket.draw();})})
    
    // Setting the font multiple times apparently hinders performance
       
    shops.forEach((shop) => {
        shop.draw1();
    });
    // Draw buttons
    ctx.font = buttonHeight * 0.8 + "px Rubik One";
    buttons.forEach((button) => {button.draw()})    
    
    // Draw spleen
    spleen.draw();
    spleen.sections.forEach((section) => {if (section.antigen != null){section.antigen.draw();}})
    
    
    // Draw tissue cells
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";        
    tissueCells.forEach((cell) => {cell.draw();})
    
    // Draw objects on the field
    garbagePiles.forEach((pile) => {pile.draw();})
    helmintes.forEach((helmint) => {helmint.draw();})
    bacteria.forEach((bacterium) => {bacterium.draw();})
    immunityCells.forEach((cell) => {cell.draw();})
    antibodies.forEach((antibody) => {antibody.draw();})
    hiv_particles.forEach((hiv) => {hiv.draw();})
    
    // Draw blood vessels that should be over everything else
//    ctx.drawImage(
//        BLOOD_IMAGE_2, 
//        (9/1440)*fieldWidth, 
//        (420/1080)*fieldHeight, 
//        (88/1440)*fieldWidth, 
//        (70/1080)*fieldHeight);
//    ctx.drawImage(
//        BLOOD_IMAGE_3, 
//        (481/1440)*fieldWidth, 
//        (362/1080)*fieldHeight, 
//        (561/1440)*fieldWidth, 
//        (102/1080)*fieldHeight);
//    ctx.drawImage(
//        BLOOD_IMAGE_5, 
//        (830/1440)*fieldWidth, 
//        (930/1080)*fieldHeight, 
//        (296/1440)*fieldWidth, 
//        (147/1080)*fieldHeight);
//    ctx.drawImage(
//        blood["3"][brightness], 
//        (875.79/1440)*fieldWidth, 
//        (430/1080)*fieldHeight, 
//        (81.37/1440)*fieldWidth, 
//        (24.45/1080)*fieldHeight);
    ctx.drawImage(
        blood["4"][brightness], 
        (1225.74/1440)*fieldWidth, 
        (436/1080)*fieldHeight, 
        (71.29/1440)*fieldWidth, 
        (49.4/1080)*fieldHeight);
    ctx.drawImage(
        blood["6"][brightness], 
        (887.91/1440)*fieldWidth, 
        (995.36/1080)*fieldHeight, 
        (77.33/1440)*fieldWidth, 
        (49.4/1080)*fieldHeight);
    ctx.drawImage(
        blood["8"][brightness], 
        (566.03/1440)*fieldWidth, 
        (430/1080)*fieldHeight, 
        (82/1440)*fieldWidth, 
        (34/1080)*fieldHeight);
    immunityCells.filter(cell => cell instanceof BLymphocyte || cell instanceof TLymphocyte).forEach(cell => cell.label.draw());

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

function stopGame(why){
    if(why instanceof Array) {  // Tutorial's text is a list of strings
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.drawImage(
            SCROLL_IMAGE, 
            fieldWidth*0.35, 
            fieldHeight*0.3, 
            fieldWidth*0.3, 
            fieldHeight*0.63);

        ctx.fillStyle = "black";

        ctx.font = "22px Rubik One";
        for (var i = 0; i < why.length; i++)
                ctx.fillText(why[i], fieldWidth/2, fieldHeight/2 + ((i-3)*29));        
    } else {
        if (why == "Game Over" && !gameOverScreenDrawn){
            drawField(gameOver=true);   
            ctx.drawImage(GAME_OVER_BLUR, 0, topMenuHeight, 
                          rightMenuX, fieldHeight-topMenuHeight);
            ctx.drawImage(GAME_OVER_FLAG, 
                          gameOverFlagX, 
                          fieldHeight-gameOverFlagHeight + 0.016*gameOverFlagHeight, 
                          gameOverFlagWidth, 
                          gameOverFlagHeight);
            ctx.drawImage(STATS_FLAG, 
                          statsFlagX, 
                          fieldHeight-statsFlagHeight + 0.016*gameOverFlagHeight, 
                          statsFlagWidth, 
                          statsFlagHeight);
            var immuneCellsBought; var enemiesKilled; var boostersBought; var moneyEarned; var currentWave;
            [immuneCellsBought, enemiesKilled, boostersBought, moneyEarned, currentWave] = historyObject.makeReport(); 
            
            var fontsize = statsFlagWidth*0.03;
            var spaceBetweenLines = fontsize*1.9;
            ctx.fillStyle = "#BE983E";
            ctx.textAlign = "left";
            ctx.font = fontsize + "px Rubik One";
            var firstColumnX = statsFlagX + statsFlagWidth*0.15;
            var firstHeaderY = fieldHeight - statsFlagHeight + 0.135*statsFlagHeight;
            var secondColumnX = statsFlagX + statsFlagWidth*0.6;
            var enemiesKilledHeaderY = firstHeaderY + (immuneCellsBought.split("\n").length)*spaceBetweenLines + fontsize*6;
            var moneyEarnedY = firstHeaderY + (boostersBought.split("\n").length)*spaceBetweenLines + fontsize*5;
            ctx.fillText(texts["gameOverScreen"]["immuneCellsBought"][language], 
                         firstColumnX,
                         firstHeaderY);
            ctx.fillText(texts["gameOverScreen"]["boostersBought"][language], 
                         secondColumnX, 
                         firstHeaderY);
            ctx.fillText(texts["gameOverScreen"]["enemiesBought"][language], 
                         firstColumnX, 
                         enemiesKilledHeaderY);
            ctx.fillText(texts["gameOverScreen"]["sugar"][language] + ": " + moneyEarned, 
                         secondColumnX, 
                         moneyEarnedY);
            
            ctx.fillStyle = "#FDFBF7";
            for (var i = 0; i < immuneCellsBought.split("\n").length; i++)
                ctx.fillText(immuneCellsBought.split("\n")[i], firstColumnX, firstHeaderY + fontsize*2 + (i*spaceBetweenLines));
            for (var i = 0; i < boostersBought.split("\n").length; i++)
                ctx.fillText(boostersBought.split("\n")[i], secondColumnX, firstHeaderY + fontsize*2 + (i*spaceBetweenLines));
            for (var i = 0; i < enemiesKilled.split("\n").length; i++)
                ctx.fillText(enemiesKilled.split("\n")[i], firstColumnX, enemiesKilledHeaderY + fontsize*2 + (i*spaceBetweenLines));
            
            ctx.font = fontsize*1.2 + "px Rubik One";
            ctx.fillStyle = "#BE983E";
            
            ctx.fillText(texts["gameOverScreen"]["currentWave"][language] + ":", secondColumnX, moneyEarnedY + fontsize*5);
            
            if (("" + currentWave).length === 1){
                ctx.drawImage(DIGIT_IMAGES[currentWave], 
                              (secondColumnX + statsFlagX + statsFlagWidth)/2 - digitImageWidth/2 - statsFlagWidth*0.05, 
                              moneyEarnedY + fontsize*8,
                              digitImageWidth, digitImageHeight
                             );
            } else if (("" + currentWave).length === 2){
                var firstDigit = Math.floor(currentWave/10);
                var secondDigit = currentWave % 10;
                var decreasedDigitWidth = digitImageWidth*0.7;
                var decreasedDigitHeight = digitImageHeight*0.7;
                ctx.drawImage(DIGIT_IMAGES[firstDigit], 
                              (secondColumnX + statsFlagX + statsFlagWidth)/2 - decreasedDigitWidth - statsFlagWidth*0.05, 
                              moneyEarnedY + fontsize*9,                             decreasedDigitWidth, decreasedDigitHeight
                             );
                ctx.drawImage(DIGIT_IMAGES[secondDigit], 
                              (secondColumnX + statsFlagX + statsFlagWidth)/2  - statsFlagWidth*0.05, 
                              moneyEarnedY + fontsize*9,
                              decreasedDigitWidth, decreasedDigitHeight);
            } else if (("" + currentWave).length === 3){
                var firstDigit = Math.floor(currentWave/100);
                var secondDigit = Math.floor(currentWave/10);
                var thirdDigit = currentWave % 10;
                var decreasedDigitWidth = digitImageWidth*0.5;
                var decreasedDigitHeight = digitImageHeight*0.5;
                
                ctx.drawImage(DIGIT_IMAGES[firstDigit], 
                              (secondColumnX + statsFlagX + statsFlagWidth)/2 - statsFlagWidth*0.05 - decreasedDigitWidth*1.5 , 
                              moneyEarnedY + fontsize*10,                             decreasedDigitWidth, decreasedDigitHeight
                             );
                ctx.drawImage(DIGIT_IMAGES[secondDigit], 
                              (secondColumnX + statsFlagX + statsFlagWidth)/2 - statsFlagWidth*0.05 - decreasedDigitWidth/2 , 
                              moneyEarnedY + fontsize*10,
                              decreasedDigitWidth, decreasedDigitHeight);
                ctx.drawImage(DIGIT_IMAGES[thirdDigit], 
                              (secondColumnX + statsFlagX + statsFlagWidth)/2 - statsFlagWidth*0.05 + decreasedDigitWidth*0.5, 
                              moneyEarnedY + fontsize*10,
                              decreasedDigitWidth, decreasedDigitHeight);
            }
        gameOverScreenDrawn = true;
        
        } else if (why == "Pause" && !pauseScreenDrawn){
            ctx.globalAlpha = 0.7;
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#2C363E";
            ctx.fillRect(0, 0, fieldWidth, fieldHeight);
            ctx.globalAlpha = 1;
            ctx.drawImage(
                PAUSE_SCREEN,
                fieldWidth/2 - pauseScreenWidth/2,
                fieldHeight/2 - pauseScreenHeight/2,
                pauseScreenWidth, pauseScreenHeight
            );
            pause.draw();
            pauseScreenDrawn=true;
        }
    }

}

function checkAntibiotics(){
    buttons.filter((button) => button instanceof Antibiotic).forEach((anti) => {
        if ((anti.lastWave != null) && this.wave > anti.lastWave + 1){
            anti.available = false;
            anti.texture = bacteriaColors[anti.color]["antibioticButtonImage"]["inactive"];
            anti.course = 0;
        }
    }
    );
}

function formNewWave(waveNumber, oldBac, oldVir, oldHel, oldHIV){
    var newBac = oldBac;
    var newVir = oldVir;
    var newHel = oldHel;
    var newHIV = oldHIV;
    var coins;
    if (waveNumber === 1){
        coins = 15;
    } else {
        coins = Math.round(25*waveNumber + 0.025*waveNumber**2);
    }
    if (waveNumber > 3 && randomUniform(0, 1) < PROB_TO_ADD_NEW_COLOR_BACTERIA){
        var newIndex = (inplayBacteriaColorsIndices[inplayBacteriaColorsIndices.length-1] + 1) % BACTERIA_COLORS.length;
        if (!inplayBacteriaColorsIndices.includes(newIndex)){
            inplayBacteriaColorsIndices.push(newIndex);   
            bacterialColorProbs.push(1);}
    }
    if (waveNumber > 3 && randomUniform(0, 1) < PROB_TO_ADD_NEW_COLOR_VIRUS){
        var newIndex = (inplayVirusesColorsIndices[inplayVirusesColorsIndices.length-1] + 1) % BACTERIA_COLORS.length;
    
        if (!inplayVirusesColorsIndices.includes(newIndex)){
            inplayVirusesColorsIndices.push(newIndex);   
            viralColorProbs.push(1);        }
    } 
    bacterialColorProbs[0] -= 1;
    bacterialColorProbs[0] = Math.max(0, bacterialColorProbs[0]);
    bacterialColorProbs[bacterialColorProbs.length-1] += 1;
    
    viralColorProbs[0] -= 1;
    viralColorProbs[0] = Math.max(0, viralColorProbs[0]);
    viralColorProbs[viralColorProbs.length-1] += 1;
    
    
    
    if (bacterialColorProbs[0] === 0){
        bacterialColorProbs.shift();
        inplayBacteriaColorsIndices.shift();
    }
    
    if (viralColorProbs[0] === 0){
        viralColorProbs.shift();
        inplayVirusesColorsIndices.shift();
    }
    
    bacterialColorProbs[bacterialColorProbs.length-1] = Math.min(bacterialColorProbs[bacterialColorProbs.length-1], MAX_COLOR_PROB_VAL);
    viralColorProbs[viralColorProbs.length-1] = Math.min(viralColorProbs[viralColorProbs.length-1], MAX_COLOR_PROB_VAL);
    
    while (coins > 0){
        [newBac, newVir, newHel, newHIV, coins] = chooseEnemy(newBac, newVir, newHel, newHIV, coins, waveNumber);
    }
    return [newBac, newVir, newHel, newHIV];
}

function chooseEnemy(bacList, virList, helList, hivList, coins, waveNumber){
    var candidates = [Bacterium];
    if (waveNumber > 4){
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
        if (enemy == Bacterium){
            var colorIndex = randomChoice(inplayBacteriaColorsIndices, bacterialColorProbs);
            var color = BACTERIA_COLORS[colorIndex];

            var y = randomUniform(playableFieldY, 
                                  playableFieldY + playableFieldHeight);
            var xx = [];
            var probs =[];
            for (let i=0; i < waveNumber; i++){
                xx.push(-100 - 2*i);
                probs.push(Math.max(100-i, 1));
            }
            var x = randomChoice(xx, probs);
            enemyPrice = BACTERIUM_PRICE;
            if (enemyPrice <= coins){
                bacList.push(new Bacterium(color, x, y, bacteriaRadius, BASE_BACTERIAL_HEALTH, price));
                coins -= enemyPrice;

            }
        } else if (enemy == Virus){
            var colorIndex = randomChoice(inplayVirusesColorsIndices, viralColorProbs);
            var color = BACTERIA_COLORS[colorIndex];
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
        var delay = Math.round((health*HELMINT_DELAY_HEALTH_MULTIPLIER + randomUniform(-HELMINT_DELAY_NOISE, HELMINT_DELAY_NOISE)));
        enemyPrice = health;
        if (enemyPrice <= coins){
            helList.push(new Helmint(-100, randomUniform(playableFieldY, playableFieldY+playableFieldHeight), health, price, delay, width, length));
            coins -= enemyPrice;
        } 
    } else if (enemy == HIV){
        enemyPrice = HIV_PRICE;
        if (enemyPrice <= coins){
            hivList.push(new HIV(HIV_IMAGE, 
                                 6, 
                                 randomUniform(playableFieldY + 15, playableFieldY+playableFieldHeight-15))
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
var inplayVirusesColorsIndices;
var bacterialColorProbs;
var viralColorProbs;

var bacteria;
var hiv_particles;
var viruses;
var helmintes;
var garbagePiles;
var wave;
var gameOverTrue;
var pauseTrue;
var pauseScreenDrawn;
var gameOverScreenDrawn;
var pause;
var historyObject;
var reset;
var speed_up;
var speed_down;
var fullWaveSize;
var artObj;
var tutorialState = 0;
var waitingForClick = false;
var gameState = "menu";

const MENU_BUTTONS = [
    new Button(MAIN_MENU_RIGHT_PANEL_COLOR, MAIN_MENU_BUTTONS_X, MAIN_MENU_BUTTONS_Y,
           MAIN_MENU_BUTTONS_WIDTH, MAIN_MENU_BUTTONS_HEIGHT, texts["menu"]["startGame"][language], false, "", "startGame"),
    new Button(MAIN_MENU_RIGHT_PANEL_COLOR, MAIN_MENU_BUTTONS_X, MAIN_MENU_BUTTONS_Y + MAIN_MENU_BUTTONS_HEIGHT + SPACE_BETWEEN_MAIN_MENU_BUTTONS,
           MAIN_MENU_BUTTONS_WIDTH, MAIN_MENU_BUTTONS_HEIGHT, texts["menu"]["tutorial"][language], false, "", "tutorial"),
    new Button(MAIN_MENU_RIGHT_PANEL_COLOR, MAIN_MENU_BUTTONS_X, MAIN_MENU_BUTTONS_Y + 2 * (MAIN_MENU_BUTTONS_HEIGHT + SPACE_BETWEEN_MAIN_MENU_BUTTONS),
           MAIN_MENU_BUTTONS_WIDTH, MAIN_MENU_BUTTONS_HEIGHT, texts["menu"]["about"][language], false, "", "about"),
    new LangButton( 
        (1012/1440)*fieldWidth, 
        (683.5/1080)*fieldHeight,
        (140/1440)*fieldWidth, 
        (100/1080)*fieldHeight, 
        "Рус", active = false),
    new LangButton( 
        (1172/1440)*fieldWidth, 
        (683.5/1080)*fieldHeight,
        (140/1440)*fieldWidth, 
        (100/1080)*fieldHeight, 
        "Eng", active = true),
    
    
]

const T_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + shopWidth + spaceBetweenShops, shopY, TLymphocyte, T_LYMPHOCYTE_PRICE, TKILLER_SHOP_IMAGE, false, true, "yellow");
const B_LYMPHOCYTE_SHOP = new Shop(xLeftOffset + 3 * shopWidth + 3 * spaceBetweenShops, shopY, BLymphocyte, B_LYMPHOCYTE_PRICE, BLYMPHOCYTE_SHOP_IMAGE, true, true, "green");

shops = [
    new Shop(xLeftOffset, shopY, NaturalKiller, NK_PRICE, NK_SHOP, true, true, "yellow"),
    T_LYMPHOCYTE_SHOP,
    new Shop(xLeftOffset + 2 * shopWidth + 2 * spaceBetweenShops, shopY, Neutrophil, NEUTROPHIL_PRICE, NEUTROPHIL_SHOP, true, true, "green"),
    B_LYMPHOCYTE_SHOP,
    new Shop(xLeftOffset + 4 * shopWidth + 4 * spaceBetweenShops, 
             shopY, THelper, T_HELPER_PRICE, THELPER_SHOP, true, true, "blue"),
    new Shop(xLeftOffset + 5 * shopWidth + 5 * spaceBetweenShops, shopY, Eosinophile, EOSINOPHILE_PRICE, EOSINOPHIL_SHOP, true, true, "blue"),
    new Shop(xLeftOffset + 6 * shopWidth + 6 * spaceBetweenShops, shopY, Macrophage, MACROPHAGE_PRICE, MACROPHAGE_SHOP, true, true, "blue")

    
];
      
function setupGame(tutorial=false){
    if (language == "eng"){
        speedRectangleWidth = wavesRectangleWidth;
    } else {
        speedRectangleWidth = wavesRectangleWidth * 1.2;
    }
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
                buttonHeight, isCircle=false));
        buttons.push(
            new Vaccine(
                BACTERIA_COLORS[i], 
                antibioticsX,
                topVaccineY + (buttonHeight+spaceBetweenAntibioticButtons)*i, 
                buttonWidth, 
                buttonHeight, isCircle=false));
    }
    artObj = new ART(antibioticsX, ARTY, buttonWidth, buttonHeight);
    buttons.push(
        artObj
    )
    spleen = new Spleen(spleenX, spleenY, spleenSize, spleenSize, 12);
    tissueCells = addTissueCells([]);
    inplayBacteriaColorsIndices = [0];
    inplayVirusesColorsIndices = [0];
    
    bacterialColorProbs = [MAX_COLOR_PROB_VAL];
    viralColorProbs = [MAX_COLOR_PROB_VAL];
    
    bacteria = [];
    viruses = [];
    helmintes = [];
    hiv_particles = [];
    garbagePiles = [];
    wave = 1;
    if(!tutorial) {
        [bacteria, viruses, helmintes, hiv_particles] = formNewWave(wave, bacteria, viruses, helmintes, hiv_particles);
    } else {
        bacteria.push(new Bacterium("first", 0, fieldHeight / 2, bacteriaRadius, BASE_BACTERIAL_HEALTH, BACTERIUM_PRICE));
    }
    
    fullWaveSize = bacteria.length;
    gameOverTrue = false;  
    pauseTrue = false;
    gameOverScreenDrawn = false;
    historyObject = new GameHistory();
    reset = new ResetButton("red", 
                            fieldWidth*(1321.26/1440), 
                            (topMenuHeight-homeHeight)/2, 
                            topMenuHeight*0.5, 
                            topMenuHeight*0.5, "R", false, RESET_IMAGE);
    toMainMenu = new Button("white", 
                            fieldWidth*(1370.03/1440), 
                            (topMenuHeight-homeHeight)/2,
                            topMenuHeight*0.5,
                            topMenuHeight*0.5, 
                            "Q", false, HOME_IMAGE);
    pause = new Button("white",
                       fieldWidth*(1269.03/1440),
                       (topMenuHeight-topMenuHeight*0.5)/2,
                       topMenuHeight*0.5,
                       topMenuHeight*0.5,
                       "Q", false, 
                       PAUSE_IMAGE);
    speed_up = new Button("white",
                       speedRectangleX + speedRectangleWidth + fieldWidth*0.0042,
                       speedRectangleY + speedRectangleHeight/2 - speedRectangleHeight*0.625/2,
                       wavesRectangleWidth*0.14,
                       speedRectangleHeight*0.625,
                       "", false, 
                       SPEED_UP_IMAGE);
    speed_down = new Button("white",
                       speedRectangleX - fieldWidth*0.0042 - wavesRectangleWidth*0.14,
                       speedRectangleY + speedRectangleHeight/2 - speedRectangleHeight*0.625/2,
                       wavesRectangleWidth*0.14,
                       speedRectangleHeight*0.625,
                       "", false, 
                       SPEED_DOWN_IMAGE);
    
    livesLeft = 10;
    money = STARTING_MONEY;
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
                setupGame(tutorial=true);
                gameState = "tutorial";
            }
            
            if(MENU_BUTTONS[2].isIntersected(x, y)) {
                gameStart = false;
                gameState = "about";
            }
            if(MENU_BUTTONS[3].isIntersected(x, y)) {
                gameStart = false;
                language = "rus";
                MENU_BUTTONS[3].active = true;
                MENU_BUTTONS[4].active = false;
                
            }
            if(MENU_BUTTONS[4].isIntersected(x, y)) {
                gameStart = false;
                language = "eng";
                MENU_BUTTONS[3].active = false;
                MENU_BUTTONS[4].active = true;
            }
            
            break;
        case "about":
            if(MENU_BUTTONS[0].isIntersected(x, y)) {
                gameState = "menu";
                MENU_BUTTONS[0].textLanguageLabel = "startGame";
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
                    if (cell.label.active && cell.label.isIntersected(x, y) && money >= cell.upgradePrice){
                        money -= cell.upgradePrice;
                        cell.upgrade();
                        throw 'Break';

                    }
                    else if (cell.isIntersected(x, y) && cell.label.upgradeAvailable){
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
            
            if(pause.isIntersected(x, y)) {
                if (pauseTrue){
                    pause.texture = PAUSE_IMAGE;
                } else {pause.texture = RESUME_IMAGE;}
                pauseTrue = !pauseTrue;
                pauseScreenDrawn = false;
                 
            }
            
            if(speed_up.isIntersected(x, y)) {
                BASE_GAME_SPEED = Math.min(10, BASE_GAME_SPEED+0.5);
            }
            if(speed_down.isIntersected(x, y)) {
                BASE_GAME_SPEED = Math.max(1, BASE_GAME_SPEED-0.5);
            }
            
            if(gameState == "tutorial" && waitingForClick) {
                tutorialState += 1;
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
    55: "7",
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
        if (["1", "2", "3", "4", "5", "6", "7"].includes(action)){
            shops[parseInt(action)-1].buy();
        } else if (action.startsWith("a")){
            buttons.filter((button) => button instanceof Antibiotic)[parseInt(action[1])-1].activate()
        } else if (action.startsWith("v")){
            buttons.filter((button) => button instanceof Vaccine)[parseInt(action[1])-1].activate()
        } else if (action == "pause"){
            if (pauseTrue){pause.texture = PAUSE_IMAGE;} 
            else {pause.texture = RESUME_IMAGE;}
            ctx.fillStyle = topMenuColor;
            ctx.globalAlpha = 1;
            ctx.fillRect(pause.x, pause.y, pause.width, pause.height);
            pause.draw();
            pauseTrue = !pauseTrue;
            pauseScreenDrawn = false;
        } else if (action == "upgrade"){
            immunityCells.filter((cell) => cell.label != undefined && cell.label.active && cell.label.upgradeAvailable).forEach((cell) => {
                if (cell.upgradePrice <= money){
                    money -= cell.upgradePrice;
                    cell.upgrade();                    
                }
            })
    }       
    }      
});

gameStart = true;

handleTutorialState = function(tutorialState) {
    console.log("Handling state " + tutorialState);
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
            text = ["Ничоси, работает"];
            stopGame(text);
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
        
    shops.forEach((shop) => {
        shop.reset();
        if (shop.pockets.length > 0)
        shop.pockets = shop.pockets.filter(function hasMemoryCell(pocket){
            var colors = [];
            immunityCells.filter((cell) => cell instanceof shop.cellType && cell.mode === "memory").forEach((cell) => {colors.push(cell.color);})
            return colors.includes(pocket.color);
            
        });
        // Set price with discount
        shop.price = Math.round(shop.base_price * Math.pow(HELPER_DISCOUNT_RATE, shop.discount));
    })
    var nextTurnTissueCells = [];

    tissueCells.forEach((cell) => {
        if(cell.health > 0 && randomUniform(0, 1) > tissueCellDeathRate) {
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
    garbagePiles = garbagePiles.filter((pile) => pile.health > 0);
    var nextTurnHelmintes = [];
    helmintes.forEach((helmint) => {
        helmint.move();
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
    })
        
    spleen.sections.forEach((section) => {
        if (section.antigen != null){
            section.antigen.move();
            section.antigen.changeDirection();            
        }
    })
    
    hiv_particles.forEach((hiv) => {hiv.act();});
    hiv_particles = hiv_particles.filter((particle) => particle.age < HIV_LONGEVITY);
    
    if(bacteria.length === 0) {
        wave += 1;
        livesLeft += 1;
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
    money += baseIncome * BASE_GAME_SPEED * tissueCells.filter((cell) => cell.virus == null).length/tissueCells.length;
        
    
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
    ctx.fillRect(0, 0, fieldWidth, topMenuHeight);

    // Left panel
    ctx.drawImage(COVER_IMAGE, 0, topMenuHeight, 0.61*fieldWidth, fieldHeight - topMenuHeight);
    
    // Right panel
    ctx.fillStyle = MAIN_MENU_RIGHT_PANEL_COLOR;
    ctx.fillRect(0.61*fieldWidth, 
                 topMenuHeight, 
                 fieldWidth - 0.61*fieldWidth, 
                 fieldHeight - topMenuHeight);
    
    ctx.fillStyle = "#E8D9B4";
    writeAuthorInfo();

    MENU_BUTTONS.forEach((button) => {
        button.draw();
    })
    
    ctx.beginPath();
    ctx.moveTo((1012/1440)*fieldWidth, 
               (668.5/1080)*fieldHeight);
    ctx.lineTo((1312/1440)*fieldWidth, 
               (668.5/1080)*fieldHeight);
    ctx.stroke();

}

function writeAuthorInfo(){
    ctx.textAlign = "left";
    ctx.font = 0.0187*fieldHeight + "px gillsansmt";
    var text = [texts["menu"]["dmitryBiba"][language] + " & " + texts["menu"]["vladimirShitov"][language], texts["menu"]["authorInfo"][language][0] + texts["menu"]["anastasiaTroshina"][language], texts["menu"]["authorInfo"][language][1]];
    for (var i = 0; i < text.length; i++){
        ctx.fillText(text[i], 
                     MAIN_MENU_BUTTONS_X,  
                     0.9*fieldHeight + (i * 0.028*fieldHeight));
    }
}

function drawAbout(){
    // Top panel
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, fieldWidth, topMenuHeight);

    // Left panel
    ctx.drawImage(COVER_IMAGE, 0, topMenuHeight, 0.61*fieldWidth, fieldHeight - topMenuHeight);
    
    // Right panel
    ctx.fillStyle = MAIN_MENU_RIGHT_PANEL_COLOR;
    ctx.fillRect(0.61*fieldWidth, 
                 topMenuHeight, 
                 fieldWidth - 0.61*fieldWidth, 
                 fieldHeight - topMenuHeight);

    MENU_BUTTONS[0].textLanguageLabel = "back";
    MENU_BUTTONS[0].draw();

    var authors = ["dmitryBiba", "vladimirShitov", "anastasiaTroshina"];
    ctx.fillStyle = "#BE983E"
    ctx.font = 0.024*fieldHeight + "px Rubik One";
    ctx.textAlign = "left";
    ctx.textBaseline = "left";
    ctx.fillText(texts["menu"]["contacts"][language] + ":", fieldWidth*0.7, fieldHeight*0.36);
    ctx.fillText(texts["menu"]["testerTeam"][language] + ":", fieldWidth*0.7, fieldHeight*0.4 + fieldHeight*0.04*authors.length + fieldHeight*0.08);
    
    ctx.font = 0.014*fieldHeight + "px Rubik One";
    ctx.fillStyle = "#E8D9B4";
    
    for (i = 0; i < authors.length; i++){
        ctx.fillText(texts["menu"][authors[i]][language] + ": " + contacts[authors[i]], fieldWidth*0.7, fieldHeight*0.4 + fieldHeight*0.04*i);
    }
    
    
    for (let i=0; i < texts["menu"]["testerList"][language].length; i++){
        ctx.fillText(texts["menu"]["testerList"][language][i], fieldWidth*0.7, fieldHeight*0.4 + fieldHeight*0.04*authors.length + fieldHeight*0.12 + i * fieldHeight*0.04);
    }
    writeAuthorInfo();
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
        case "about":
            drawAbout();
        default:
            break;
    }
}, 1);

function stopAllBacteria() {
    bacteria.forEach((bacterium) => {
        bacterium.baseSpeed = 0;
    })
}
