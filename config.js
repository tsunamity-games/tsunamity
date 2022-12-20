// Donate
const bitcoinAddress = "17CfQMZd5zz1fYX4SqFwMdgqpYnAAv9owj";

// Game texts
var language = "eng";
var contacts = {
    dmitryBiba: "dmitriy.biba@gmail.com",
    vladimirShitov: "vladimirshitov98@gmail.com",
    anastasiaTroshina: "buccinum@gmail.com"
}
var texts = {
    menu: {
        startGame: {eng: "Start game", rus: "Начать игру"},
        tutorial: {eng: "Tutorial", rus: "Обучение"},
        about: {eng: "About", rus: "Об игре"},
        back: {eng: "Back", rus: "Назад"},
        testerTeam: {eng: "Tester team", rus: "Тестировщики"},
        testerList: {eng: ["Andrey Biba", "Olesya Biba", "Roman Soldatov"], rus: ["Андрей Биба", "Олеся Биба", "Роман Солдатов"]},
        authorInfo: {eng: ["Design by ", "BioMolText 2022"], 
                     rus: ["Дизайн от ", "Био/Мол/Текст-2022"]},
        contacts: {eng: "Contacts", rus:"Контакты"},
        dmitryBiba: {eng: "Dmitry Biba", rus: "Дмитрий Биба"},
        vladimirShitov: {eng: "Vladimir Shitov", rus: "Владимир Шитов"},
        anastasiaTroshina: {eng: "Anastasia Troshina", rus: "Анастасия Трошина"},
        donate: {eng: "Donate", rus: "Задонатить"},
        bitcoinWallet: {eng: "Bitcoin Wallet", rus: "Биткоин"},
        kofi: {eng: "ko-fi", rus: "ko-fi"},
        copied: {eng: "Text copied to clipboard", rus: "Скопировано в буфер обмена"},
        errorCopied: {eng: "Error in copying text", rus: "Ошибка при копировании"}
        
    },
    game:{
        speed: {eng: "Speed", rus: "Скорость"},
        antibiotics: {eng: "Antibiotics", rus: "Антибиотики"},
        vaccines: {eng: "Vaccines", rus: "Вакцины"},
        art: {eng: "A.R.T.", rus: "А.Р.Т."},
        viruses: {eng: "Viruses", rus: "Вирусы"},
        bacteria: {eng: "Bacteria", rus: "Бактерии"},
        other: {eng: "Other", rus: "Все остальное"},
        infectedTissueCells: {eng: "Infected tissue cells", rus: "Зараженные вирусом клетки"},
        helminthes: {eng: "Helminthes", rus: "Гельминты"}
    },
    gameOverScreen: {
        immuneCellsBought: {eng: "Immune cells bought", rus: "Куплено имм. клеток"},
        boostersBought: {eng: "Boosters bought", rus: "Куплено бустеров"},
        enemiesBought: {eng: "Pathogens killed", rus: "Убито патогенов"},
        sugar: {eng: "Glucose", rus: "Глюкоза"},
        currentWave: {eng: "Current wave", rus: "Текущая волна"},
    },
    cellNames: {
        Neutrophil: {eng:"Neutrophil", rus: "Нейтрофил"},
        Macrophage: {eng:"Margophage", rus: "Макрофаг"},
        Eosinophile: {eng:"Eosinophil", rus: "Эозинофил"},
        NaturalKiller: {eng:"NK cell", rus: "НК клетка"},
        BLymphocyte: {eng:"B cell", rus: "Б клетка"},
        PlasmaticCell: {eng:"Plasmatic cell", rus: "Плазматич. клетка"},
        BMemory: {eng: "Memory B cell", rus: "Б клетка памяти"},
        TLymphocyte: {eng:"T Killer", rus: "Т киллер"},
        TMemory: {eng: "Memory T cell", rus: "Т клетка памяти"},
        THelper: {eng:"T Helper", rus: "Т хелпер"}
    },
    tutorial: {
        1: {eng: ["Welcome to Tsunamity!", 
                  "Defend the organism from pathogens"], 
            rus: ["Почувствуй себя в роли иммунной системы!", 
                  "Защищай организм от болезней"]},
        
        2: {eng: ["This is a tissue cell", 
                  "", 
                  "Tissue cells produce glucose needed", 
                  "for the production of immunity cells."], 
            rus: ["Это одна из клеток ткани", 
                  "", 
                  "Они производят глюкозу, которая", 
                  "нужна для покупки иммунных клеток"]},
        
        3: {eng: ["This is bone marrow", 
                  "", 
                  "You can buy immunity cells",
                  "needed for defense here"],
            rus: ["Это костный мозг", 
                  "", 
                  "Здесь можно покупать иммунные клетки", 
                  "для защиты организма"]},
        
        4: {eng: ["To buy immunity cells you need", 
                  "enough glucose", 
                  "", 
                  "The price of each cell is written", 
                  "in the bone marrow"],
            rus: ["Для покупки иммунных клеток нужно иметь", 
                  "достаточно глюкозы", 
                  "",
                  "Цена каждой клетки написана в костном", "мозге"]},
        
        5: {eng: ["Watch the HP!", 
                  "", 
                  "Enemies decrease your health when", 
                  "they reach the right side", 
                  "of the screen.", 
                  "However, each wave you survive", 
                  "adds 1 to your HP"],
            rus: ["Следи за здоровьем!", 
                  "", 
                  "Враги отнимают его, когда доходят", 
                  "до правого конца экрана.", 
                  "Зато с каждой новой волной", 
                  "здоровье увеличивается на 1."]},
        
        6: {eng: ["Bacteria are attacking!", 
                  "", 
                  "Neutrophils help dealing with them.",
                  "",
                  "Click on the neutrophil", 
                  "in the bone marrow to buy it."],
            rus: ["Бактерии наступают!", 
                  "", 
                  "С ними помогают справиться нейтрофилы.",  
                  "",
                  "Нажми на нейтрофил в костном мозге,", 
                  "чтобы купить его"]},
        
        9: {eng: ["This is the Spleen", 
                  "",
                  "Antigens (parts of bacteria) go", 
                  "there sometimes", 
                  "They are needed to train B-lymphocytes."], 
            rus: ["Это — селезёнка", 
                  "", 
                  "Сюда после смерти бактерий иногда",  
                  "попадают антигены", 
                  "Они нужны для тренировки B-лимфоцитов"]},
        
        10: {eng: ["A huge wave of bacteria is coming!", 
                   "", 
                   "Buy several B-lymphocytes, stronger",
                   "immune cells to fight the bacteria"], 
             rus: ["Наступает большая волна бактерий!", "",
                    "Найми несколько B-лимфоцитов", 
                   "— более сильных клеткок", 
                   "для борьбы с бактериями"]},
        
        12: {eng: ["", "B-lymphocytes need time and antigens", 
                   "to train", 
                   "After training they can attack", 
                   "a single bacteria type very efficiently"],
             rus: ["B-лимфоцитам нужно время и антигены", 
                   "для тренировки", 
                   "",
                   "После этого они могут эффективно атаковать", 
                   "один вид бактерий"]},
        
        14: {eng: ["Immune cells sometimes die.",
                   "",
                   "Their remains hinder the ability",
                   "of other immune cells to move.",
                   "Buy macrophages to get rid", 
                   "of the dead cells!"],
             rus: ["Отличная работа! Но время жизни одной из", 
                   "иммунных клеток подошло к концу", 
                   "", 
                   "Остатки мешают двигаться другим", 
                   "иммунным клеткам. Покупай макрофаги,", 
                   "чтобы убирать мёртвые клетки!"]},
        
        17: {eng: ["After B-lymphocytes meet the enemy", 
                   "they can be upgraded", 
                   "",
                   "Click on a B-lymphocyte, and then on", 
                   "the upgrade window or hit the 'U' button", 
                   "to get a Plasmatic cell"],
             rus: ["После того как B-лимфоциты встретятся",
                   "с врагом, их можно улучшить", 
                   "",
                   "Нажми на B-лимфоцит, а затем на окно",
                   "улучшения или на клавишу U, чтобы", 
                   "получить плазматическую клетку"]},
        
        19: {eng: ["Plasmatic cells produce antibodies", 
                   "Antibodies slow down bacteria", 
                   "", 
                   "Continue defending the organism!", 
                   "Don't hesitate to buy more cells"],
             rus: ["Плазматическая клетка производит", 
                   "антитела. Они замедляют бактерий", 
                   "", 
                   "Продолжай защищать организм!", 
                   "Не стесняйся покупать больше клеток"]},
        
        20: {eng: ["Game speed can always be changed", 
                   "on a top panel"],
             rus: ["Скорость игры всегда можно изменить", 
                   "на панели сверху"]},
        
        22: {eng: ["Plasmatic cells can be upgraded", 
                   "to a memory cell to buy B-lymphocytes", 
                   "against specific bacteria types", 
                   "", 
                   "Upgrade a plasmatic cell!"], 
             rus: ["Плазматическую клетку можно улучшить", 
                   "до клетки памяти, чтобы сразу нанимать", 
                   "нужные B-лимфоциты", 
                   "",
                    "Улучши плазматическую клетку!"]},
        
        24: {eng: ["Now you can buy a B-lymphocyte",
                   "against pink bacteria in the bone marrow", 
                   "as long as the memory cell lives!"], 
             rus: ["Теперь в костном мозге можно", 
                   "в любой момент купить B-лимфоцит против", 
                   "розовых бактерий пока клетка памяти жива!"]},
        
        25: {eng: ["A huge wave of bacteria is coming!", 
                   "", 
                   "Antibiotics will help you dealing with it",
                   "", 
                   "Buy an antibiotic against a specific", 
                   "infection in the right panel"], 
             rus: ["Впереди огромная волна бактерий!", 
                   "Справиться с ней помогут антибиотики", 
                   "", 
                   "Покупай антибиотик против нужной", 
                   "инфекции в панели справа"]},
        
        27: {eng: ["Now all the bacteria  are weakened",
                   "and the immune cells will easily", 
                   "get rid of them", 
                   "After using an antibiotic make sure", 
                   "to finish the course! Otherwise the", 
                   "bacteria will get resistant to it.", 
                   "Use the antibiotic for the next 3 waves."],
             rus: ["Теперь бактерии ослабли и иммунные клетки", 
                   "легко справятся с ними", 
                   "",
                   "При использовании антибиотика обязательно", 
                   "пропей курс до конца! Иначе он может стать",
                   "бесполезным. Используй антибиотик", 
                   "3 следующих волны подряд"]},
        
        29: {eng: ["Some of your tissue cells got", 
                   "infected with a virus!",
                   "",
                   "It is important to contain viral infection", 
                   "as infected cells do not produce glucose.",
                   "Buy natural killers to fight it!"
                  ],
             rus: ["Клетки ткани заражены вирусом!", 
                   "", 
                   "Зараженные клетки", 
                   "не производят глюкозу,", 
                   "поэтому очень важно", 
                   "сдерживать вирусную инфекцию.", 
                   "Покупай натуральных киллеров,", 
                   "чтобы бороться с ней!"]},
        
        31: {eng: ["Natural Killers move randomly", 
                   "between tissue cells checking them", 
                   "", 
                   "If a natural killer notices that", 
                   "a cell is infected with a virus,", 
                   "it will kill it."], 
             rus: ["Натуральные киллеры случайно двигаются", 
                   "между клетками ткани, проверяя их", 
                   "",
                   "Если натуральный киллер обнаружит,", 
                   "что клетка заражена вирусом, он её убьёт"]},
        
        33: {eng: ["A serious viral infection can only be",
                   "contained with the help of T-killers!", 
                   "", 
                   "Buy a T-killer in the bone marrow"],
             rus: ["С мощной вирусной инфекцией", 
                   "не справиться без Т-киллеров!", 
                   "",
                   "Найми Т-киллера в костном мозге"]},
        
        35: {eng: ["T-killers produce their copies when", 
                   "they meet a cell with a specific antigen", 
                   "Specificity of a T-killer (indicated",
                   " by its color) is determined randomly", 
                   "", 
                   "Buy a suitable vaccine to", 
                   "increase the probability of a", 
                   "specific T-killer emergence"], 
             rus: ["Т-киллеры производят свои копии, когда", 
                   "встречают клетку с определённым",
                   "антигеном. Специфичность Т-киллера",
                   "(обозначена его цветом) определяется", 
                   "случайно", 
                   "",
                   "Покупай подходящую вакцину, чтобы", 
                   "повысить вероятность появления", 
                   "нужного Т-киллера"]},
        
        37: {eng: ["After a T-killer met a virus or a vaccine", 
                   "it can be upgraded to a memory cell.", 
                   "After that you will be able", 
                   "to buy specific T-killers in", 
                   "the bone marrow", 
                   "", 
                   "Upgrade a T-killer to a memory cell", 
                   "Click on a T-killer that met the enemy", 
                   "and click on the table", 
                   "or hit the 'U' button"], 
             rus: ["После встречи Т-киллера с вирусом или", 
                   "вакциной его можно улучшить до клетки",
                   "памяти. После этого можно будет покупать", 
                   "Т-киллеров против конкретных вирусов",
                   "",
                   "Улучши Т-киллера до Т-клетки памяти!",
                   "Для этого кликни на Т-киллера,",
                   "встретившегося с врагом",
                   "и нажми на табличку или на кнопку U"]},
        
        39: {eng: ["Good job!", 
                   "Now you can buy specific T-killers",
                   "in the bone marrow", 
                   "", 
                   "T-helpers are expensive, but", 
                   "you will get the returns on", 
                   "the investment with time", 
                   "as they automatically produce", 
                   "B-cells or T-killers for free", 
                   "", 
                   "Buy a T-helper in the bone marrow"], 
             rus: ["Прекрасно сыграно!", 
                   "Теперь в костном мозге можно сразу", 
                   "покупать Т-киллеров против этого вируса", 
                   "",
                   "Т-хелперы помогут защищать организм,",
                   "автоматически покупая B-лимфоциты", 
                   "или Т-киллеры", 
                   "",
                   "Найми Т-хелпера в костном мозге!"]},
        
        41: {eng: ["The organism now is under protection!", 
                   "", 
                   "Buy eosinophies to fight helminthes", 
                   "", 
                   "",
                   "Tip: it's better to buy many of them", 
                   "right away."],
             rus: ["Организм под надёжной защитой!", 
                   "Но впереди новые угрозы", 
                   "",
                   "Покупай эозинофилы, чтобы бороться", 
                   "с гельминтами", 
                   "",
                   "Подсказка: лучше сразу", 
                   "купить побольше"]},

        44: {
            eng: ["Rarely, the body can become infected by HIV.",
                  "This virus infects T-helpers,",
                  "reducing immunity",
                  "",
                  "It is almost impossible to be cured from HIV",
                  "but it can be constrained by periodic using",
                  "of antiretroviral therapy (A.R.T.)"
                  ],
            rus: ["Иногда может случиться неприятность и",
                  "организм станет заражён ВИЧ. Этот вирус",
                  "поражает Т-хелперы, снижая иммунитет",
                  "",
                  "Вылечиться от ВИЧ почти невозможно,",
                  "но его можно сдержать, постоянно принимая",
                  "антиретровирусную терапию"
                ]
        },

        46: {
            eng: ["Great job!", "", "Keep protecting the body"],
            rus: ["Отличная работа!", "", "Продолжай защищать организм"]
        },
        
        48: {eng: ["You completed the tutorial.", 
//                   "A real game starts now", 
                   "", 
                   "Now try yourself in a real game!"
//                   "Continue defending the organism.", 
//                   "You are doing very well :)"
                  ],
             rus: ["На этом обучение закончено.", 
//                   "Дальше начинается настоящая игра",
                   "", 
//                   "Продолжай защищать организм.", 
//                   "У тебя отлично получается!"
                   "Теперь попробуй свои силы", 
                   "в настоящей игре!"
                  ]},
    }

}    

// Game parameters
var livesLeft = 10;
var STARTING_MONEY = 0;
var chanceToGetAntigen = 0.02;
var baseIncome = 0.01;

// Field parameters
const field = document.getElementById("field");
var ctx = field.getContext("2d");

const WIDTH_HEIGHT_RATIO = 1440 / 1068;
ctx.width = Math.round(field.width * WIDTH_HEIGHT_RATIO);

const fieldWidth = field.width;
const fieldHeight = field.height;


// Main menu
const MAIN_MENU_RIGHT_PANEL_COLOR = "#2C363E";
const MAIN_MENU_LEFT_PANEL_COLOR = "#FAF6ED";
const MAIN_MENU_BUTTONS_X =  1012 / 1440 * fieldWidth;
const MAIN_MENU_BUTTONS_Y =  0.172 * fieldHeight;
const MAIN_MENU_BUTTONS_WIDTH = 300 / 1440 * fieldWidth;
const MAIN_MENU_BUTTONS_HEIGHT = 100 / 1068 * fieldHeight;

const SPACE_BETWEEN_MAIN_MENU_BUTTONS = 50 / 1068 * fieldHeight;
const COVER_IMAGE = new Image();
COVER_IMAGE.src = "./images/coverImage.png";
// Playable field
const playableFieldX = 0.0208*fieldWidth;
const playableFieldY = 0.4*fieldHeight;
const playableFieldHeight = 0.533*fieldHeight;
const playableFieldWidth = 0.86*fieldWidth;
const playableFieldBorderColor = "#422D0D"
const tissueCellsLeftOffset = 0.007263922*playableFieldWidth;
const tissueCellsUpOffset = 0.017452*playableFieldHeight;

const TUTORIAL_WINDOW_WIDTH = 500 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_HEIGHT = 250 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_Y_OFFSET = 100 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_TEXT_OFFSET = 30 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_LINE_HEIGHT = 25 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_OK_X_OFFSET = 60 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_OK_Y_OFFSET = 47 / 1068 * fieldHeight;
const TUTORIAL_WINDOW_BUTTON_X_OFFSET = 70 / 1440 * fieldWidth;
const TUTORIAL_WINDOW_BUTTON_Y_OFFSET = 70 / 1068 * fieldHeight;


// Top menu
const topMenuColor = "#142029";
const topMenuHeight = fieldHeight*0.075;

const LIFES_IMAGE = new Image();
LIFES_IMAGE.src = "./images/lifes.png";
const LIFES_IMAGE_PALE = new Image();
LIFES_IMAGE_PALE.src = "./images/lifes_pale.png";
const lifeImages = {
    bright: LIFES_IMAGE,
    pale: LIFES_IMAGE_PALE
}

const lifesSize = topMenuHeight*0.6;

const HOME_IMAGE = new Image();
HOME_IMAGE.src = "./images/home.png";
const homeHeight = topMenuHeight*0.5;
const RESET_IMAGE = new Image();
RESET_IMAGE.src = "./images/restart.png";


const WAVE_IMAGE = new Image();
WAVE_IMAGE.src = "./images/wave.png";
const wavesBackColor = "#E8D9B4";
const wavesFillingColor = "#D3B97F";
const wavesRectangleX = fieldWidth*0.11875;
const wavesRectangleY = topMenuHeight*0.25;
const wavesRectangleWidth = fieldWidth*0.0970;
const wavesRectangleHeight = topMenuHeight*0.5;

const MONEY_IMAGE = new Image();
MONEY_IMAGE.src = "./images/sugar.png";
const moneyRectangleColor = "#E8D9B4";
const moneyRectangleX = 0.276*fieldWidth;
const moneyRectangleY = wavesRectangleY;
const moneyRectangleWidth = wavesRectangleWidth;
const moneyRectangleHeight = wavesRectangleHeight;

// Speed
const SPEED_UP_IMAGE = new Image();
SPEED_UP_IMAGE.src = "./images/speed_up.png";
const SPEED_DOWN_IMAGE = new Image();
SPEED_DOWN_IMAGE.src = "./images/speed_down.png";
const speedRectangleColor = "#E8D9B4";
const speedRectangleX = 0.456*fieldWidth;
const speedRectangleY = wavesRectangleY;
let speedRectangleWidth = wavesRectangleWidth;
const speedRectangleHeight = wavesRectangleHeight;
var BASE_GAME_SPEED = 1;

const PAUSE_IMAGE = new Image();
PAUSE_IMAGE.src = "./images/pause.png";
const RESUME_IMAGE = new Image();
RESUME_IMAGE.src = "./images/resume.png";

// Right menu
const rightMenuColor = "#2C363E";
const rightMenuX = 0.9*fieldWidth;
const rightMenuWidth = 0.076388*fieldWidth;

// Antibiotics & vaccines
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
const MONEY_RIGHT_PANEL_IMAGE = new Image();
MONEY_RIGHT_PANEL_IMAGE.src = "./images/sugar_right_menu.png";
const RESISTANCE_IMAGE = new Image();
RESISTANCE_IMAGE.src = "./images/resistence.png";
const buttonWidth = 0.02777*fieldHeight;
const buttonHeight = 0.02777*fieldHeight;
const antibioticsX = rightMenuX + rightMenuWidth/2 - buttonWidth/2 + rightMenuWidth*0.1;
const antibioticBarWidth = 0.0727*rightMenuWidth;
const distanceBetweenAntibioticButtonAndBar = 0.03636*rightMenuWidth;
const topAntibioticY = 0.17*fieldHeight;
const spaceBetweenAntibioticButtons = 0.01667*fieldHeight;
const topVaccineY = 0.52*fieldHeight;
var ANTIBIOTIC_COURSE_LENGTH = 4;
var nVaccinate = 30;

// ART
const ART_IMAGE = new Image();
ART_IMAGE.src = "./images/ART.png";
const ART_ACTIVE_IMAGE = new Image();
ART_ACTIVE_IMAGE.src = "./images/ART_active.png";
const ARTY = 0.82*fieldHeight;
const ART_PRICE = 30;
const ART_SLOWING_COEFFICIENT = 0.2;
var ART_DURATION = 20000;

// Blood
const BLOOD_IMAGE_1 = new Image();
BLOOD_IMAGE_1.src = "./images/blood/BloodVessel1.png";
const BLOOD_IMAGE_1_PALE = new Image();
BLOOD_IMAGE_1_PALE.src = "./images/blood/BloodVessel1_pale.png";

const BLOOD_IMAGE_2 = new Image();
BLOOD_IMAGE_2.src = "./images/blood/BloodVessel2.png";
const BLOOD_IMAGE_2_PALE = new Image();
BLOOD_IMAGE_2_PALE.src = "./images/blood/BloodVessel2_pale.png";

const BLOOD_IMAGE_3 = new Image();
BLOOD_IMAGE_3.src = "./images/blood/BloodVessel3.png";
const BLOOD_IMAGE_3_PALE = new Image();
BLOOD_IMAGE_3_PALE.src = "./images/blood/BloodVessel3_pale.png";

const BLOOD_IMAGE_4 = new Image();
BLOOD_IMAGE_4.src = "./images/blood/BloodVessel4.png";
const BLOOD_IMAGE_4_PALE = new Image();
BLOOD_IMAGE_4_PALE.src = "./images/blood/BloodVessel4_pale.png";

const BLOOD_IMAGE_5 = new Image();
BLOOD_IMAGE_5.src = "./images/blood/BloodVessel5.png";
const BLOOD_IMAGE_5_PALE = new Image();
BLOOD_IMAGE_5_PALE.src = "./images/blood/BloodVessel5_pale.png";

const BLOOD_IMAGE_6 = new Image();
BLOOD_IMAGE_6.src = "./images/blood/BloodVessel6.png";
const BLOOD_IMAGE_6_PALE = new Image();
BLOOD_IMAGE_6_PALE.src = "./images/blood/BloodVessel6_pale.png";

const BLOOD_IMAGE_7 = new Image();
BLOOD_IMAGE_7.src = "./images/blood/BloodVessel7.png";
const BLOOD_IMAGE_7_PALE = new Image();
BLOOD_IMAGE_7_PALE.src = "./images/blood/BloodVessel7_pale.png";

const BLOOD_IMAGE_8 = new Image();
BLOOD_IMAGE_8.src = "./images/blood/BloodVessel8.png";
const BLOOD_IMAGE_8_PALE = new Image();
BLOOD_IMAGE_8_PALE.src = "./images/blood/BloodVessel8_pale.png";

const blood = {
    1: {bright: BLOOD_IMAGE_1,
        pale: BLOOD_IMAGE_1_PALE}, 
    2: {bright: BLOOD_IMAGE_2,
        pale: BLOOD_IMAGE_2_PALE},
    3: {bright: BLOOD_IMAGE_3,
        pale: BLOOD_IMAGE_3_PALE},
    4: {bright: BLOOD_IMAGE_4,
        pale: BLOOD_IMAGE_4_PALE},
    5: {bright: BLOOD_IMAGE_5,
        pale: BLOOD_IMAGE_5_PALE},
    6: {bright: BLOOD_IMAGE_6,
        pale: BLOOD_IMAGE_6_PALE},
    7: {bright: BLOOD_IMAGE_7,
        pale: BLOOD_IMAGE_7_PALE},
    8: {bright: BLOOD_IMAGE_8,
        pale: BLOOD_IMAGE_8_PALE}
}
// Spleen
const spleenTrunkX = 0.706*fieldWidth;
const spleenTrunkWidth = 0.1743*fieldWidth;
const bloodColor = {
    bright: "#CF0000",
    pale: "#E67E7C"
}
const spleenX = 0.734*fieldWidth;
const spleenY = 0.1389*fieldHeight;
const spleenSize = 0.11944*fieldWidth;
const spleenColor = "#E78080"



// Shops


const THELPER_SHOP = new Image();
THELPER_SHOP.src = "./images/Thelper_shop.png";
const MACROPHAGE_SHOP = new Image();
MACROPHAGE_SHOP.src = "./images/Macrophage_shop.png";
const EOSINOPHIL_SHOP = new Image();
EOSINOPHIL_SHOP.src = "./images/Eosinophil_shop.png";
const TKILLER_SHOP_IMAGE = new Image();
TKILLER_SHOP_IMAGE.src = "./images/TKiller_shop.png";
const NK_SHOP = new Image();
NK_SHOP.src = "./images/NK_shop.png";
const BLYMPHOCYTE_SHOP_IMAGE = new Image();
BLYMPHOCYTE_SHOP_IMAGE .src = "./images/BLymphocyte_shop.png";
const NEUTROPHIL_SHOP = new Image();
NEUTROPHIL_SHOP.src = "./images/Neutrophil_shop.png";



const MINIMONEY = new Image();
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
MINIMONEY.src = "./images/minimoney.svg";
const BONE_MARROW_BACKGROUND_IMAGE = new Image();
BONE_MARROW_BACKGROUND_IMAGE.src = "./images/boneMarrow.png";
const shopY =  0.172*fieldHeight;
const shopWidth =  0.085417*fieldWidth;
const shopHeight = 0.16*fieldHeight;
const spaceBetweenShops = 0.0125*fieldWidth;
const xLeftOffset = playableFieldX;

const priceHeight = shopHeight*0.125

const wavesFillingOpacity = 0.6;

const AUTHORS_INFO = ["Dmitry Biba & Vladimir Shitov",
                      "Design by Anastasia Troshina",
                      "BioMolText 2022"];

// Tutorial
BLACK_SCREEN_ALPHA = 0.5;

// fieldwidth = 1440 
// fieldheight = 1068

const SCROLL_IMAGE = new Image();
SCROLL_IMAGE.src = "./images/scroll.png";

const LYMPHOCYTES_IMAGES = new Map();  // Map from color to image of lymphocytes
const BACTERIA_IMAGES = new Map();  // Map from color to image of bacteria

const HELMINTH_IMAGE = new Image();
HELMINTH_IMAGE.src = "./images/helminth.png";

var ShopColors = {
    blue:{
        pocketImageV: FIRST_POCKET_V,        
        colorCode: "#005FA4",
    },
    green:{
        pocketImageV: SECOND_POCKET_V,        
        colorCode: "#006956",
    },
    yellow:{
        pocketImageV: THIRD_POCKET_V,        
        colorCode: "#DC9E00",
    },
    // This one is not displayed, but prevents error when creating orange pocket
    orange:{
        pocketImageV: FOURTH_POCKET_V,                
        colorCode: "#DC9E00",
    },
}


// fieldwidth = 1440 
// fieldheight = 1068


// Animation parameters
const N_ANIMATION_FRAMES = 5;
const ANIMATED_IMAGE_WIDTH = 100;
const ANIMATED_IMAGE_HEIGHT = 100;
const STATIC_IMAGE_WIDTH = 200;
const STATIC_IMAGE_HEIGHT = 200;

const LYMPHOCYTES_DEFAULT_IMAGE = new Image();
LYMPHOCYTES_DEFAULT_IMAGE.src = "./images/lymphocyte_test.png";

const GARBAGE_IMAGE_1 = new Image();
GARBAGE_IMAGE_1.src = "./images/garbage_1.png";
const GARBAGE_IMAGE_2 = new Image();
GARBAGE_IMAGE_2.src = "./images/garbage_2.png";
const GARBAGE_IMAGE_3 = new Image();
GARBAGE_IMAGE_3.src = "./images/garbage_3.png";
const GARBAGE_IMAGES = [GARBAGE_IMAGE_1, GARBAGE_IMAGE_2, GARBAGE_IMAGE_3];
var garbagePileSlowingCoefficient = 0.4;

const PAUSE_SCREEN = new Image();
PAUSE_SCREEN.src = "./images/pause_screen.png";
const PAUSE_RECTANGLE = new Image();
PAUSE_RECTANGLE.src = "./images/pause_rectangle.png";
const pauseScreenWidth = 0.5*fieldWidth;
const pauseScreenHeight = 0.16*fieldHeight;

const GAME_OVER_FLAG = new Image();
GAME_OVER_FLAG.src = "./images/gameoverFlag.png"
const gameOverFlagX = 0.034*fieldWidth;
const gameOverFlagHeight = 0.625*fieldHeight;
const gameOverFlagWidth =  0.1647*gameOverFlagHeight;
const STATS_FLAG = new Image();
STATS_FLAG.src = "./images/statsFlag.png"
const statsFlagX = 0.133*fieldWidth;
const statsFlagHeight = 0.625*fieldHeight;
const statsFlagWidth = 0.72*statsFlagHeight;
const DIGIT_IMAGES = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
for (var i=0; i < DIGIT_IMAGES.length; i++){
    DIGIT_IMAGES[i].src = "./images/digits/" + i + ".png";
}
const digitImageWidth = fieldWidth*(75/1400);
const digitImageHeight = fieldHeight*(125/1070)
const GAME_OVER_BLUR = new Image();
GAME_OVER_BLUR.src = "./images/gameover_blur.png";


// Host cell parameters
//      Tissue cells
const CELL_IMAGES = [new Image(), new Image(), new Image(), new Image()];
for (var i=1; i < CELL_IMAGES.length+1; i++){
    CELL_IMAGES[i-1].src = "./images/Cell" + i + ".png";
}
const tissueCellSize = 0.0282558*playableFieldWidth;
const nTissueCellRows = 15;
const nTissueCellColumns = 33;
const spaceBetweenTissueCellsHorizontal = 0.00139*fieldWidth;
const spaceBetweenTissueCellsVertical = 0.003472*playableFieldHeight;
var EdgeCellX;
const tissueCellDeathRate = 0.000001;

// Immune cells
const FIRST_LYMPHOCYTE = new Image();
FIRST_LYMPHOCYTE.src = "./images/Blymphocytes_first.png";
const SECOND_LYMPHOCYTE = new Image();
SECOND_LYMPHOCYTE.src = "./images/Blymphocytes_second.png";
const THIRD_LYMPHOCYTE = new Image();
THIRD_LYMPHOCYTE.src = "./images/Blymphocytes_third.png";
const FOURTH_LYMPHOCYTE = new Image();
FOURTH_LYMPHOCYTE.src = "./images/Blymphocytes_fourth.png";
const FIRST_PLASMATIC = new Image();
FIRST_PLASMATIC.src = "./images/Plasmatic_first.png";
const SECOND_PLASMATIC = new Image();
SECOND_PLASMATIC.src = "./images/Plasmatic_second.png";
const THIRD_PLASMATIC = new Image();
THIRD_PLASMATIC.src = "./images/Plasmatic_third.png";
const FOURTH_PLASMATIC = new Image();
FOURTH_PLASMATIC.src = "./images/Plasmatic_fourth.png";
const FIRST_BMEMORY = new Image();
FIRST_BMEMORY.src = "./images/BMemory_first.png";
const SECOND_BMEMORY = new Image();
SECOND_BMEMORY.src = "./images/BMemory_second.png";
const THIRD_BMEMORY = new Image();
THIRD_BMEMORY.src = "./images/BMemory_third.png";
const FOURTH_BMEMORY = new Image();
FOURTH_BMEMORY.src = "./images/BMemory_fourth.png";

const T_LYMPHOCYTES_IMAGE = new Image();
T_LYMPHOCYTES_IMAGE.src = "./images/Tlymphocyte_image.png";
const FIRST_TLYMPHOCYTE = new Image();
FIRST_TLYMPHOCYTE.src = "./images/Tlymphocytes_first.png";
const SECOND_TLYMPHOCYTE = new Image();
SECOND_TLYMPHOCYTE.src = "./images/Tlymphocytes_second.png";
const THIRD_TLYMPHOCYTE = new Image();
THIRD_TLYMPHOCYTE.src = "./images/Tlymphocytes_third.png";
const FOURTH_TLYMPHOCYTE = new Image();
FOURTH_TLYMPHOCYTE.src = "./images/Tlymphocytes_fourth.png";
const FIRST_TMEMORY = new Image();
FIRST_TMEMORY.src = "./images/TMemory_first.png";
const SECOND_TMEMORY = new Image();
SECOND_TMEMORY.src = "./images/TMemory_second.png";
const THIRD_TMEMORY = new Image();
THIRD_TMEMORY.src = "./images/TMemory_third.png";
const FOURTH_TMEMORY = new Image();
FOURTH_TMEMORY.src = "./images/TMemory_fourth.png";



const MACROPHAGES_IMAGE = new Image();
MACROPHAGES_IMAGE.src = "./images/macrophages.png";
const NEUTROPHILS_IMAGE = new Image();
NEUTROPHILS_IMAGE.src = "./images/neutrophils.png";
const EOSINOPHILES_IMAGE = new Image();
EOSINOPHILES_IMAGE.src = "./images/eosinophiles.png";
const NK_IMAGE = new Image();
NK_IMAGE.src = "./images/NK_cells.png";
const T_HELPER_IMAGE = new Image();
T_HELPER_IMAGE.src = "./images/Thelper.png";


var BASE_IMMUNITY_CELL_LONGEVITY = 40000;

// Prices
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

// Speeds
var NK_SPEED = 0.5;
var TLYMPHOCYTE_SPEED = 0.5;
var NEUTROPHIL_SPEED = 0.4;
var BLYMPHOCYTE_SPEED = 0.3;
var THELPER_SPEED = 0.5;
var EOSINOPHILE_SPEED = 0.2;
var MACROPHAGE_SPEED = 0.4;

// Damages
var EOSINOPHILES_DAMAGE = 0.01;
var NEUTROPHIL_DAMAGE = 0.2;
var MACROPHAGE_DAMAGE = 1;
var NK_DAMAGE = 1;
var BLYMPHOCYTE_DAMAGE = 1;
var TLYMPHOCYTE_DAMAGE = 1;

//      Lymphocytes
const randomTargetNumber = 5;
const TlymphocyteReproductionNumber = 5;
var trainingProbability = 0.01;

// Helper
var HELPER_BUYING_COOLDOWN = 30000;
const HELPER_DISCOUNT_RATE = 1;
const HELPER_DAMAGE_INCREASE = 1.1;


const UPGRADE_PLASMATIC = new Image();
UPGRADE_PLASMATIC.src = "./images/upgrade_plasmatic.png";
const UPGRADE_MEMORY = new Image();
UPGRADE_MEMORY.src = "./images/upgrade_memory.png";

// Antibodies
ANTIBODY_LONGEVITY = 10000;
ANTIBODY_PRODUCTION_FREQUENCY = 50;
ANTIBODY_SLOWING_COEFFICIENT = 0.7;


// Upgrade
const UPGRADE_FIRST = new Image();
UPGRADE_FIRST.src = "./images/upgrade_first.png";
const UPGRADE_FIRST_SIZE = 0.022*fieldHeight;

const UPGRADE_LABEL_HEIGHT = 0.037*fieldHeight;
const UPGRADE_LABEL_WIDTH = 0.069*fieldWidth;



// Pathogen parameters
// Bacteria
const FIRST_BACTERIUM = new Image();
FIRST_BACTERIUM.src = "./images/bacteria_first.png";
const SECOND_BACTERIUM = new Image();
SECOND_BACTERIUM.src = "./images/bacteria_second.png";
const THIRD_BACTERIUM = new Image();
THIRD_BACTERIUM.src = "./images/bacteria_third.png";
const FOURTH_BACTERIUM = new Image();
FOURTH_BACTERIUM.src = "./images/bacteria_fourth.png";
const BACTERIA_COLORS = ["first", "second", "third", "fourth"];
const bacteriaRadius = 6;
var starting_nBacteria = 30;
var BACTERIUM_BASE_SPEED = 0.2*0.86;
var BASE_BACTERIAL_HEALTH = 200;
var bacteriaColors = {
    first:{
        colorCode: "#FD2595",
        pocketImage: FIRST_POCKET_B,
        bacteriumImage: FIRST_BACTERIUM,
        antibioticButtonImage: {
            active: FIRST_ANTIBIOTIC_ACTIVE,
            inactive: FIRST_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: FIRST_LYMPHOCYTE,
        plasmaticImage: FIRST_PLASMATIC,
        memoryImage: FIRST_BMEMORY
    },
    second:{
        colorCode: "#DF1B1B",
        pocketImage: SECOND_POCKET_B,
        bacteriumImage: SECOND_BACTERIUM,
        antibioticButtonImage: {
            active: SECOND_ANTIBIOTIC_ACTIVE,
            inactive: SECOND_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: SECOND_LYMPHOCYTE,
        plasmaticImage: SECOND_PLASMATIC,
        memoryImage: SECOND_BMEMORY
    },
    third:{
        colorCode: "#FF5900",
        pocketImage: THIRD_POCKET_B,
        bacteriumImage: THIRD_BACTERIUM,
        antibioticButtonImage: {
            active: THIRD_ANTIBIOTIC_ACTIVE,
            inactive: THIRD_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: THIRD_LYMPHOCYTE,
        plasmaticImage: THIRD_PLASMATIC,
        memoryImage: THIRD_BMEMORY
},
    fourth:{
        colorCode: "#FFA800",
        pocketImage: FOURTH_POCKET_B,
        bacteriumImage: FOURTH_BACTERIUM,
        antibioticButtonImage: {
            active: FOURTH_ANTIBIOTIC_ACTIVE,
            inactive: FOURTH_ANTIBIOTIC_INACTIVE
        },
        lymphocyteImage: FOURTH_LYMPHOCYTE,
        plasmaticImage: FOURTH_PLASMATIC,
        memoryImage: FOURTH_BMEMORY
    }
}

//      Viruses
const maxVirusesInTissueCell = 64;
const viralSpreadThreshold = 63;
var VIRUS_DOUBLING_TIME = 200;
var VIRUSES_CLASSIFICATION = {
    first:{
        doublingTime: VIRUS_DOUBLING_TIME,
        price: 50,
        pocketImage: FIRST_POCKET_V,
        colorCode: "#35B1F6",
        TLymphocyteImage: FIRST_TLYMPHOCYTE,
        MemoryImage: FIRST_TMEMORY
    },
    second:{
        doublingTime: VIRUS_DOUBLING_TIME*0.9,
        price: 55,
        pocketImage: SECOND_POCKET_V,
        colorCode: "#1B68D2",
        TLymphocyteImage: SECOND_TLYMPHOCYTE,
        MemoryImage: SECOND_TMEMORY
    },
    third:{
        doublingTime: VIRUS_DOUBLING_TIME*0.75, 
        price: 66,
        pocketImage: THIRD_POCKET_V,
        colorCode: "#5C43E7",
        TLymphocyteImage: THIRD_TLYMPHOCYTE,
        MemoryImage: THIRD_TMEMORY
    },
    fourth:{
        doublingTime: VIRUS_DOUBLING_TIME*0.5,
        price: 100,
        pocketImage: FOURTH_POCKET_V,
        colorCode: "#A441DE",
        TLymphocyteImage: FOURTH_TLYMPHOCYTE,
        MemoryImage: FOURTH_TMEMORY
    }
}

// HIV
const HIV_IMAGE = new Image();
HIV_IMAGE.src = "./images/HIV_texture.png";
const HIV_LONGEVITY = 10000;
const HIV_INFECTION_PROBABILITY = 0.03;
const HIV_DOUBLING_PROBABILITY = 0.0001;
const HIV_DAMAGE = 0.05;

// Cancer
const cancerMutationsThreshold = 20;
const mutationProbability = 0.1;


// Wave forming algorithm parameters
var BACTERIUM_PRICE = 1; 
var VIRUS_PRICE = 25;
var HELMINT_PRICE = 50;
var HIV_PRICE = 60;
var ENEMY_PROB_DIST = [1/BACTERIUM_PRICE, 1/VIRUS_PRICE, 1/HELMINT_PRICE, 1/HIV_PRICE];
var MIN_HELMINT_LENGTH = 4;
var MAX_HELMINT_LENGTH = 20;
var HELMINT_WIDTH_MIN_LENGTH_MULTIPLIER = 3;
var HELMINT_WIDTH_LENGTH_MULTIPLIER = 6;
var HELMINT_HEALTH_LENGTH_WIDTH_MULTIPLIER = 5;
var HELMINT_DELAY_HEALTH_MULTIPLIER= 0.2;
var HELMINT_DELAY_NOISE = 10;
var PROB_TO_ADD_NEW_COLOR_BACTERIA = 0.12;
var PROB_TO_ADD_NEW_COLOR_VIRUS = 0.08;

var MAX_COLOR_PROB_VAL = 10;