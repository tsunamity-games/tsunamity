// Field parameters
const field = document.getElementById("field");
var ctx = field.getContext("2d");
const fieldWidth = field.width;
const fieldHeight = field.height;
const shopHeight = 200;
const shopWidth = 116;
const buttonWidth = 34;
const buttonHeight = 34;
const offset = 5;
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

const HIV_IMAGE = new Image();
HIV_IMAGE.src = "./images/HIV.png";

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
const NK_PRICE = 150;
const T_LYMPHOCYTE_PRICE = 300;
const B_LYMPHOCYTE_PRICE = 200;
const T_HELPER_PRICE = 200;
const NEUTROPHIL_PRICE = 100;
const MACROPHAGE_PRICE = 100;
const EOSINOPHILE_PRICE = 50;

const EOSINOPHILES_DAMAGE = 0.1;

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
const BACTERIA_BASE_HEALTH = 100;
BACTERIA_HEALTH_INCREASE = 20;
BACTERIA_PRICE_INCREASE = 5;
BACTERIA_NUMBER_INCREASE = 10;

// Game parameters
var livesLeft = 10;
var money = 200;
var basePrice = 0.1;
var chanceToGetAntigen = 0.05;
var garbagePileSlowingCoefficient = 0.4;
var nVaccinate = 30;
var ANTIBIOTIC_COURSE_LENGTH = 4;
