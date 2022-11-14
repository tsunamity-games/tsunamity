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
const BACTERIA_COLORS = ["blue", "green", "yellow", "orange"];
const xLeftOffset = playableFieldX;

// Top menu
const topMenuColor = "#142029";
const topMenuHeight = fieldHeight*0.075;
const lifesSize = topMenuHeight*0.6;

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

// Tutorial
BLACK_SCREEN_ALPHA = 0.5;

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

BACTERIA_COLORS.forEach((color) => {
    const lymphocyte_image = new Image();
    lymphocyte_image.src = "./images/lymphocytes_" + color + ".png";
    LYMPHOCYTES_IMAGES.set(color, lymphocyte_image);
    
    const bacterium_image = new Image();
    bacterium_image.src = "./images/bacteria_" + color + ".png";
    BACTERIA_IMAGES.set(color, bacterium_image);
});

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
HELMINTH_IMAGE.src = "./images/helminth.png";

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
MONEY_IMAGE.src = "./images/sugar.svg";


const BONE_MARROW_BACKGROUND_IMAGE = new Image();
BONE_MARROW_BACKGROUND_IMAGE.src = "./images/boneMarrow.png";

const GREEN_SCROLL = new Image();
GREEN_SCROLL.src = "./images/greenScroll.png";
const YELLOW_SCROLL = new Image();
YELLOW_SCROLL.src = "./images/yellowScroll.png";
const BLUE_SCROLL = new Image();
BLUE_SCROLL.src = "./images/blueScroll.png";

const GREEN_MINIMONEY = new Image();
GREEN_MINIMONEY.src = "./images/greenMiniMoney.png";
const YELLOW_MINIMONEY = new Image();
YELLOW_MINIMONEY.src = "./images/yellowMiniMoney.png";
const BLUE_MINIMONEY = new Image();
BLUE_MINIMONEY.src = "./images/blueMiniMoney.png";



var ShopColors = {
    blue:{
        scrollImage: BLUE_SCROLL,
        colorCode: "#005FA4",
        minimoneyImage: BLUE_MINIMONEY
    },
    green:{
        scrollImage: GREEN_SCROLL,
        colorCode: "#006956",
        minimoneyImage: GREEN_MINIMONEY
    },
    yellow:{
        scrollImage: YELLOW_SCROLL,
        colorCode: "#DC9E00",
        minimoneyImage: YELLOW_MINIMONEY
    },
    // This one is not displayed, but prevents error when creating orange pocket
    orange:{
        scrollImage: YELLOW_SCROLL,
        colorCode: "#DC9E00",
        minimoneyImage: YELLOW_MINIMONEY
    },
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
const cancerMutationsThreshold = 50;
const mutationProbability = 0.05;
const tissueCellDeathRate = 0.000001;

// Immune cells

const NK_PRICE = 150;
const T_LYMPHOCYTE_PRICE = 300;
const B_LYMPHOCYTE_PRICE = 200;
const T_HELPER_PRICE = 500;
const NEUTROPHIL_PRICE = 100;
const MACROPHAGE_PRICE = 100;
const EOSINOPHILE_PRICE = 50;

const EOSINOPHILES_DAMAGE = 0.01;

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
const bacteriaRadius = 8;
var starting_nBacteria = 30;
const BACTERIUM_BASE_SPEED = 0.2*0.86;

const BACTERIA_BASE_HEALTH = 100;
var BASE_BACTERIAL_HEALTH = 100;

// Antibodies
ANTIBODY_LONGEVITY = 10000;
ANTIBODY_PRODUCTION_FREQUENCY = 50;
ANTIBODY_SLOWING_COEFFICIENT = 0.5;


// Game parameters
var livesLeft = 10;
var STARTING_MONEY = 0;
var baseIncome = 0.1;
var chanceToGetAntigen = 0.01;
var garbagePileSlowingCoefficient = 0.4;
var nVaccinate = 30;
var ANTIBIOTIC_COURSE_LENGTH = 4;

// Wave forming algorithm parameters
var BACTERIUM_PRICE = 1; 
var VIRUS_PRICE = 50;
var HELMINT_PRICE = 100;
var HIV_PRICE = 10;
var ENEMY_PROB_DIST = [1/BACTERIUM_PRICE, 1/VIRUS_PRICE, 1/HELMINT_PRICE, 0/HIV_PRICE];
var MIN_HELMINT_LENGTH = 3;
var MAX_HELMINT_LENGTH = 20;
var HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER = 3;
var HELMINT_WIDTH_LENGTH_MULTIPLIER = 6;
var HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER = 5;
var HELMINT_DELAY_HEALTH_MULTIPLIER= 0.2;
var HELMINT_DELAY_NOISE = 10;



var PROB_TO_ADD_NEW_COLOR = 0.2;
var PROB_TO_REMOVE_COLOR = 0.1;
var VIRUSES_CLASSIFICATION = {
    blue:{
        doublingTime: 200,
        price: 50},
    green:{
        doublingTime: 180,
        price: 55},
    yellow:{
        doublingTime: 150, 
        price: 66},
    orange:{
        doublingTime: 100,
        price: 100}
}
var NEW_COLOR_MULTIPLIER = 10;
var MAX_COLOR_PROB_VAL = 10;
