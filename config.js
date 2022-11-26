const BASE_GAME_SPEED = 3;


// Field parameters
const field = document.getElementById("field");
var ctx = field.getContext("2d");

const WIDTH_HEIGHT_RATIO = 1440 / 1068;
ctx.width = Math.round(field.width * WIDTH_HEIGHT_RATIO);

const fieldWidth = field.width;
const fieldHeight = field.height;



// Playable field
const playableFieldX = 0.0208*fieldWidth;
const playableFieldY = 0.4*fieldHeight;
const playableFieldHeight = 0.533*fieldHeight;
const playableFieldWidth = 0.86*fieldWidth;
const playableFieldBorderColor = "#422D0D"
const tissueCellsLeftOffset = 0.007263922*playableFieldWidth;
const tissueCellsUpOffset = 0.017452*playableFieldHeight;

// Right menu
const rightMenuColor = "#2C363E";
const rightMenuX = 0.9*fieldWidth;
const rightMenuWidth = 0.076388*fieldWidth;
const distanceBetweenAntibioticButtonAndBar = 0.03636*rightMenuWidth;
const antibioticBarWidth = 0.0727*rightMenuWidth;

// Antibiotics & vaccines
const buttonWidth = 0.02777*fieldHeight;
const buttonHeight = 0.02777*fieldHeight;
const antibioticsX = rightMenuX + rightMenuWidth/2 - buttonWidth/2;
const topAntibioticY =  0.424*fieldHeight;
const spaceBetweenAntibioticButtons = 0.01667*fieldHeight;
const topVaccineY = 0.6842*fieldHeight;

// Spleen
const spleenTrunkX = 0.706*fieldWidth;
const spleenTrunkWidth = 0.1743*fieldWidth;
const bloodColor = "#CF0000";
const spleenX = 0.734*fieldWidth;
const spleenY = 0.1389*fieldHeight;
const spleenSize = 0.11944*fieldWidth;
const spleenColor = "#E78080"



// Shops
const shopY =  0.172*fieldHeight;
const shopWidth =  0.085417*fieldWidth;
const shopHeight = 0.16*fieldHeight;
const spaceBetweenShops = 0.0125*fieldWidth;
const BACTERIA_COLORS = ["first", "second", "third", "fourth"];
const xLeftOffset = playableFieldX;
const priceHeight = shopHeight*0.125
// Top menu
const topMenuColor = "#142029";
const topMenuHeight = fieldHeight*0.075;
const lifesSize = topMenuHeight*0.6;
const homeHeight = topMenuHeight*0.5;

const wavesBackColor = "#009EEB";
const wavesFillingColor = "#01567F";
const wavesFillingOpacity = 0.6;
const wavesRectangleX = fieldWidth*0.11875;
const wavesRectangleY = topMenuHeight*0.25;
const wavesRectangleWidth = fieldWidth*0.0970;
const wavesRectangleHeight = topMenuHeight*0.5;

const moneyRectangleColor = "#E6BE4A";
const moneyRectangleX = 0.35*fieldWidth;
const moneyRectangleY = wavesRectangleY;
const moneyRectangleWidth = wavesRectangleWidth;
const moneyRectangleHeight = wavesRectangleHeight;

// Main menu
const MAIN_MENU_RIGHT_PANEL_COLOR = "#828282";
const MAIN_MENU_LEFT_PANEL_COLOR = "#434343";
const MAIN_MENU_BUTTONS_X =  1012 / 1440 * fieldWidth;
const MAIN_MENU_BUTTONS_Y =  0.172 * fieldHeight;
const MAIN_MENU_BUTTONS_WIDTH = 300 / 1440 * fieldWidth;
const MAIN_MENU_BUTTONS_HEIGHT = 100 / 1068 * fieldHeight;
const SPACE_BETWEEN_MAIN_MENU_BUTTONS = 50 / 1068 * fieldHeight;

const AUTHORS_INFO = ["Dmitry Biba & Vladimir Shitov",
                      "Design by Anastasia Troshina",
                      "BioMolText 2022"];


// fieldwidth = 1440 
// fieldheight = 1068


// Animation parameters
const N_ANIMATION_FRAMES = 5;
const ANIMATED_IMAGE_WIDTH = 100;
const ANIMATED_IMAGE_HEIGHT = 80;
const STATIC_IMAGE_WIDTH = 200;
const STATIC_IMAGE_HEIGHT = 200;
const SCROLL_IMAGE = new Image();
SCROLL_IMAGE.src = "./images/scroll.png";

const LYMPHOCYTES_IMAGES = new Map();  // Map from color to image of lymphocytes
const BACTERIA_IMAGES = new Map();  // Map from color to image of bacteria

//BACTERIA_COLORS.forEach((color) => {
//    const lymphocyte_image = new Image();
//    lymphocyte_image.src = "./images/lymphocytes_" + color + ".png";
//    LYMPHOCYTES_IMAGES.set(color, lymphocyte_image);
//    
//    const bacterium_image = new Image();
//    bacterium_image.src = "./images/bacteria_" + color + ".png";
//    BACTERIA_IMAGES.set(color, bacterium_image);
//});

const LYMPHOCYTES_DEFAULT_IMAGE = new Image();
LYMPHOCYTES_DEFAULT_IMAGE.src = "./images/lymphocytes_dark.png";
LYMPHOCYTES_IMAGES.set("#FFFFFF", LYMPHOCYTES_DEFAULT_IMAGE);

const GARBAGE_IMAGE = new Image();
GARBAGE_IMAGE.src = "./images/garbage.png";

const T_LYMPHOCYTES_IMAGE = new Image();
T_LYMPHOCYTES_IMAGE.src = "./images/lymphocytes.png";

const MACROPHAGES_IMAGE = new Image();
MACROPHAGES_IMAGE.src = "./images/macrophages.png";

const NEUTROPHILS_IMAGE = new Image();
NEUTROPHILS_IMAGE.src = "./images/neutrophils.png";


const EOSINOPHILES_IMAGE = new Image();
EOSINOPHILES_IMAGE.src = "./images/eosinophiles.png";
const BACTERIA_IMAGE = new Image();
BACTERIA_IMAGE.src = "./images/bacteria.png";

const HELMINTH_IMAGE = new Image();
HELMINTH_IMAGE.src = "./images/helmint_trial.png"; //"./images/helminth.png";

const BONE_MARROW_IMAGE = new Image();
BONE_MARROW_IMAGE.src = "./images/bone_marrow.png";

const CELL_IMAGES = [new Image(), new Image(), new Image(), new Image()];
for (var i=1; i < CELL_IMAGES.length+1; i++){
    CELL_IMAGES[i-1].src = "./images/Cell" + i + ".png";
    //CELL_IMAGES[i-1].src = "./cell.png";
}

const VIRUS_IMAGE = new Image();
VIRUS_IMAGE.src = "./images/virus.png";

const HIV_IMAGE = new Image();
HIV_IMAGE.src = "./images/HIV_texture.png";

const LIFES_IMAGE = new Image();
LIFES_IMAGE.src = "./images/lifes.png";

const MONEY_IMAGE = new Image();
MONEY_IMAGE.src = "./images/sugar.png";

const WAVE_IMAGE = new Image();
WAVE_IMAGE.src = "./images/wave.png";

const HOME_IMAGE = new Image();
HOME_IMAGE.src = "./images/home.png";

const PAUSE_IMAGE = new Image();
PAUSE_IMAGE.src = "./images/pause.png";

const RESUME_IMAGE = new Image();
RESUME_IMAGE.src = "./images/resume.png";

const BONE_MARROW_BACKGROUND_IMAGE = new Image();
BONE_MARROW_BACKGROUND_IMAGE.src = "./images/boneMarrow.png";

const GREEN_SCROLL = new Image();
GREEN_SCROLL.src = "./images/greenScroll.png";
const YELLOW_SCROLL = new Image();
YELLOW_SCROLL.src = "./images/yellowScroll.png";
const BLUE_SCROLL = new Image();
BLUE_SCROLL.src = "./images/blueScroll.png";

const MINIMONEY = new Image();
MINIMONEY.src = "./images/minimoney.svg";


const FIRST_POCKET_V = new Image();
FIRST_POCKET_V.src = "./images/pocket_one_v.png";
const SECOND_POCKET_V = new Image();
SECOND_POCKET_V.src = "./images/pocket_two_v.png";
const THIRD_POCKET_V = new Image();
THIRD_POCKET_V.src = "./images/pocket_three_v.png";
const FOURTH_POCKET_V = new Image();
FOURTH_POCKET_V.src = "./images/pocket_four_v.png";

const FIRST_POCKET_B = new Image();
FIRST_POCKET_B.src = "./images/pocket_one_b.png";
const SECOND_POCKET_B = new Image();
SECOND_POCKET_B.src = "./images/pocket_two_b.png";
const THIRD_POCKET_B = new Image();
THIRD_POCKET_B.src = "./images/pocket_three_b.png";
const FOURTH_POCKET_B = new Image();
FOURTH_POCKET_B.src = "./images/pocket_four_b.png";


const FIRST_ANTIBIOTIC_ACTIVE = new Image();
FIRST_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_first_active.png";
const SECOND_ANTIBIOTIC_ACTIVE = new Image();
SECOND_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_second_active.png";
const THIRD_ANTIBIOTIC_ACTIVE = new Image();
THIRD_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_third_active.png";
const FOURTH_ANTIBIOTIC_ACTIVE = new Image();
FOURTH_ANTIBIOTIC_ACTIVE.src = "./images/antibiotic_button_fourth_active.png";


const FIRST_ANTIBIOTIC_INACTIVE = new Image();
FIRST_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_first_inactive.png";
const SECOND_ANTIBIOTIC_INACTIVE = new Image();
SECOND_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_second_inactive.png";
const THIRD_ANTIBIOTIC_INACTIVE = new Image();
THIRD_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_third_inactive.png";
const FOURTH_ANTIBIOTIC_INACTIVE = new Image();
FOURTH_ANTIBIOTIC_INACTIVE.src = "./images/antibiotic_button_fourth_inactive.png";

const FIRST_BACTERIUM = new Image();
FIRST_BACTERIUM.src = "./images/bacteria_first.png";
const SECOND_BACTERIUM = new Image();
SECOND_BACTERIUM.src = "./images/bacteria_second.png";
const THIRD_BACTERIUM = new Image();
THIRD_BACTERIUM.src = "./images/bacteria_third.png";
const FOURTH_BACTERIUM = new Image();
FOURTH_BACTERIUM.src = "./images/bacteria_fourth.png";

const FIRST_LYMPHOCYTE = new Image();
FIRST_LYMPHOCYTE.src = "./images/lymphocytes_dark.png";
const SECOND_LYMPHOCYTE = new Image();
SECOND_LYMPHOCYTE.src = "./images/lymphocytes_dark.png";
const THIRD_LYMPHOCYTE = new Image();
THIRD_LYMPHOCYTE.src = "./images/lymphocytes_dark.png";
const FOURTH_LYMPHOCYTE = new Image();
FOURTH_LYMPHOCYTE.src = "./images/lymphocytes_dark.png";




var bacteriaColors = {
    first:{
        colorCode: "#FD2595",
        pocketImage: FIRST_POCKET_B,
        bacteriumImage: FIRST_BACTERIUM,
        antibioticButtonImage: {
            active: FIRST_ANTIBIOTIC_ACTIVE,
            inactive: FIRST_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: FIRST_LYMPHOCYTE
    },
    second:{
        colorCode: "#DF1B1B",
        pocketImage: SECOND_POCKET_B,
        bacteriumImage: SECOND_BACTERIUM,
        antibioticButtonImage: {
            active: SECOND_ANTIBIOTIC_ACTIVE,
            inactive: SECOND_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: SECOND_LYMPHOCYTE
    },
    third:{
        colorCode: "#FF5900",
        pocketImage: THIRD_POCKET_B,
        bacteriumImage: THIRD_BACTERIUM,
        antibioticButtonImage: {
            active: THIRD_ANTIBIOTIC_ACTIVE,
            inactive: THIRD_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: THIRD_LYMPHOCYTE
},
    fourth:{
        colorCode: "#FFA800",
        pocketImage: FOURTH_POCKET_B,
        bacteriumImage: FOURTH_BACTERIUM,
        antibioticButtonImage: {
            active: FOURTH_ANTIBIOTIC_ACTIVE,
            inactive: FOURTH_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: FOURTH_LYMPHOCYTE
    }
}


var ShopColors = {
    blue:{
        scrollImage: BLUE_SCROLL,
        pocketImageV: FIRST_POCKET_V,        
        colorCode: "#005FA4",
    },
    green:{
        scrollImage: GREEN_SCROLL,
        pocketImageV: SECOND_POCKET_V,        
        colorCode: "#006956",
    },
    yellow:{
        scrollImage: YELLOW_SCROLL,
        pocketImageV: THIRD_POCKET_V,        
        colorCode: "#DC9E00",
    },
    // This one is not displayed, but prevents error when creating orange pocket
    orange:{
        scrollImage: YELLOW_SCROLL,
        pocketImageV: FOURTH_POCKET_V,                
        colorCode: "#DC9E00",
    },
}

cell_names = {
    Neutrophil: "Neutrophil",
    Macrophage: "Margophage",
    Eosinophile: "Eosinophil",
    NaturalKiller: "NK cell",
    BLymphocyte: "B cell",
    TLymphocyte: "T Killer",
    THelper:"T Helper"
}



const BLOOD_IMAGE_1 = new Image();
BLOOD_IMAGE_1.src = "./images/BloodVessel1.png";
const BLOOD_IMAGE_2 = new Image();
BLOOD_IMAGE_2.src = "./images/BloodVessel2.png";
const BLOOD_IMAGE_3 = new Image();
BLOOD_IMAGE_3.src = "./images/BloodVessel3.png";
const BLOOD_IMAGE_4 = new Image();
BLOOD_IMAGE_4.src = "./images/BloodVessel4.png";
const BLOOD_IMAGE_5 = new Image();
BLOOD_IMAGE_5.src = "./images/BloodVessel5.png";
const BLOOD_IMAGE_6 = new Image();
BLOOD_IMAGE_6.src = "./images/BloodVessel6.png";
const BLOOD_IMAGE_7 = new Image();
BLOOD_IMAGE_7.src = "./images/BloodVessel7.png";


// Host cell parameters
//      Tissue cells
const tissueCellSize = 0.0282558*playableFieldWidth;
const nTissueCellRows = 15;
const nTissueCellColumns = 33;
const spaceBetweenTissueCellsHorizontal = 0.00139*fieldWidth;
const spaceBetweenTissueCellsVertical = 0.003472*playableFieldHeight;
var EdgeCellX;

const TISSUE_CELL_COLOR = "#facdf3";
const cancerMutationsThreshold = 20;
const mutationProbability = 0.1;
const tissueCellDeathRate = 0.000001;

// Immune cells

const NK_PRICE = 15;
const T_LYMPHOCYTE_PRICE = 25;
const B_LYMPHOCYTE_PRICE = 20;
const T_HELPER_PRICE = 50;
const NEUTROPHIL_PRICE = 10;
const MACROPHAGE_PRICE = 30;
const EOSINOPHILE_PRICE = 5;
const ANTIBIOTIC_PRICE = 10;
const VACCINE_PRICE = 5;
const PLASMATIC_CELL_UPGRADE_PRICE = 10;
const MEMORY_CELL_UPGRADE_PRICE = 20;

// speeds
const NK_SPEED = 0.5*BASE_GAME_SPEED;
const TLYMPHOCYTE_SPEED = 0.5*BASE_GAME_SPEED;
const NEUTROPHIL_SPEED = 0.4*BASE_GAME_SPEED;
const BLYMPHOCYTE_SPEED = 0.3*BASE_GAME_SPEED;
const THELPER_SPEED = 0.5*BASE_GAME_SPEED;
const EOSINOPHILE_SPEED = 0.2*BASE_GAME_SPEED;
const MACROPHAGE_SPEED = 0.4*BASE_GAME_SPEED;

// damages
const EOSINOPHILES_DAMAGE = 0.01*BASE_GAME_SPEED;
const NEUTROPHIL_DAMAGE = 0.2*BASE_GAME_SPEED;
const MACROPHAGE_DAMAGE = 1*BASE_GAME_SPEED;
const NK_DAMAGE = 1*BASE_GAME_SPEED;
const BLYMPHOCYTE_DAMAGE = 1*BASE_GAME_SPEED;
const TLYMPHOCYTE_DAMAGE = 1*BASE_GAME_SPEED;

const HELPER_DISCOUNT_RATE = 1;
const HELPER_DAMAGE_INCREASE = 1.1;
const HELPER_BUYING_COOLDOWN = 30000;

BASE_IMMUNITY_CELL_LONGEVITY = 40000;
const HIV_LONGEVITY = 10000;


//      Lymphocytes
const randomTargetNumber = 5;
const TlymphocyteReproductionNumber = 5;

// Pathogen parameters
//      Viruses
const maxVirusesInTissueCell = 64;
const viralSpreadThreshold = 63;
const VIRUS_COLOR = "#800080";
const VIRUS_DOUBLING_TIME = 200;
var starting_nViruses = 2;


const HIV_INFECTION_PROBABILITY = 0.03;
const HIV_DOUBLING_PROBABILITY = 0.0001;
const HIV_DAMAGE = 0.05;


//      Bacteria
const bacteriaRadius = 6;
var starting_nBacteria = 30;
const BACTERIUM_BASE_SPEED = BASE_GAME_SPEED*0.2*0.86;

var BASE_BACTERIAL_HEALTH = 200;

// Antibodies
ANTIBODY_LONGEVITY = 10000;
ANTIBODY_PRODUCTION_FREQUENCY = 50;
ANTIBODY_SLOWING_COEFFICIENT = 0.5;


// Game parameters
var livesLeft = 10;
var STARTING_MONEY = 0;
var baseIncome = 0.01*BASE_GAME_SPEED;
var chanceToGetAntigen = 0.02;
var garbagePileSlowingCoefficient = 0.4;
var nVaccinate = 30;
var ANTIBIOTIC_COURSE_LENGTH = 4;

// Wave forming algorithm parameters
var BACTERIUM_PRICE = 1; 
var VIRUS_PRICE = 25;
var HELMINT_PRICE = 50;
var HIV_PRICE = 5;
var ENEMY_PROB_DIST = [1/BACTERIUM_PRICE, 1/VIRUS_PRICE, 1/HELMINT_PRICE, 0/HIV_PRICE];
var MIN_HELMINT_LENGTH = 4;
var MAX_HELMINT_LENGTH = 20;
var HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER = 3;
var HELMINT_WIDTH_LENGTH_MULTIPLIER = 6;
var HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER = 5;
var HELMINT_DELAY_HEALTH_MULTIPLIER= 0.2;
var HELMINT_DELAY_NOISE = 10;



var PROB_TO_ADD_NEW_COLOR = 0.12;
var VIRUSES_CLASSIFICATION = {
    first:{
        doublingTime: 200,
        price: 50,
        pocketImage: FIRST_POCKET_V,
        colorCode: "#52BBEE"
    },
    second:{
        doublingTime: 180,
        price: 55,
        pocketImage: SECOND_POCKET_V,
        colorCode: "#718BCF"
    },
    third:{
        doublingTime: 150, 
        price: 66,
        pocketImage: THIRD_POCKET_V,
        colorCode: "#8A71CF"
    },
    fourth:{
        doublingTime: 100,
        price: 100,
        pocketImage: FOURTH_POCKET_V,
        colorCode: "#B159DB"
    }
}
var MAX_COLOR_PROB_VAL = 10;