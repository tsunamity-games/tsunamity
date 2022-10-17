// Field parameters
const field = document.getElementById("field");
var ctx = field.getContext("2d");
const fieldWidth = field.width;
const fieldHeight = field.height;
const shopHeight = 200;
const shopWidth = 130;
const buttonWidth = 34;
const buttonHeight = 34;
const offset = 10;
const BACTERIA_COLORS = ["blue", "green", "yellow", "orange"];
const xLeftOffset = 145;

// Animation parameters
const N_ANIMATION_FRAMES = 5;
const ANIMATED_IMAGE_WIDTH = 100;
const ANIMATED_IMAGE_HEIGHT = 80;
const STATIC_IMAGE_WIDTH = 200;
const STATIC_IMAGE_HEIGHT = 200;

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

const CELL_IMAGE = new Image();
CELL_IMAGE.src = "./images/cell.png";

const VIRUS_IMAGE = new Image();
VIRUS_IMAGE.src = "./images/virus.png";

// Host cell parameters
//      Tissue cells
const tissueCellSize = 30;
const spaceBetweenTissueCells = 5;
var EdgeCellX;
const nTissueCellRows = 14;
const playableFieldStart = shopHeight + offset;
const playableFieldHeight = playableFieldStart + nTissueCellRows*(tissueCellSize + spaceBetweenTissueCells)-spaceBetweenTissueCells;
const TISSUE_CELL_COLOR = "#facdf3";
const cancerMutationsThreshold = 50;
const mutationProbability = 0.05;
const tissueCellDeathRate = 0.000001;

// Immune cells
BASE_IMMUNITY_CELL_LONGEVITY = 40000;


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


//      Bacteria
const bacteriaRadius = 8;
var starting_nBacteria = 30;
var BASE_BACTERIAL_HEALTH = 100;

// Antibodies
ANTIBODY_LONGEVITY = 10000;
ANTIBODY_PRODUCTION_FREQUENCY = 50;
ANTIBODY_SLOWING_COEFFICIENT = 0.5;

// Game parameters
var livesLeft = 10;
var STARTING_MONEY = 0;
var basePrice = 0.1;
var chanceToGetAntigen = 0.01;
var garbagePileSlowingCoefficient = 0.4;
var nVaccinate = 30;
var ANTIBIOTIC_COURSE_LENGTH = 4;

// Wave forming algorithm parameters
var BACTERIUM_PRICE = 1; 
var VIRUS_PRICE = 50;
var HELMINT_PRICE = 100;
var ENEMY_PROB_DIST = [1/BACTERIUM_PRICE, 1/VIRUS_PRICE, 1/HELMINT_PRICE];
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
