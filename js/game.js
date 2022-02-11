
const CANVAS_WIDTH = 500; 

const CANVAS_HEIGHT = 500; 

var myInterpreter = null; 

var highlightPause = false; 

var pidList = []; 
 
var prevType_ = null; 
var prevDate_ = 0;

// var locale = checkLanguage(); 

var blocklyDiv = document.getElementById("blocklyDiv"); 
var canvas = document.getElementById("canvas1");
var visualization = document.getElementById('visualization');
var exportButton = document.getElementById('save');
var importButton = document.getElementById('load');  
var newButton = document.getElementById('new');
var modal = document.getElementById('newModal'); 
var langChanged = sessionStorage.getItem("lang-cng"); 
var frameSpeed = 10;
var isPlayerPicked=false; 
var newGameStarted = isNewGame; 

const PLAYER = {

    NONE: {
        name: "none",
        run: "",
        jump: "", 
        idle: "", 
        height: 0,
        width: 0,
        runFrames: 0,
        jumpFrame: 0,
        fallFrame: 1,
        size: 100
    },

    ROBOT: {
        name: "robot", 
        run: "common/sprites/looga.png",
        jump: "common/sprites/looga.png",
        idle: "common/sprites/looga.png",
        height: 2500,
        width: 2200,
        idleHeight: 2500,
        idleWidth: 2200,
        runFrames: 0,
        jumpFrame: 0, 
        fallFrame: 0, 
        leftSide: 0,
        size: 125, 
        idleSize: 125
    },

    BLUE: {
        name: "blue",
        run: "common/sprites/bluebot/blue-run.png",    
        jump: "common/sprites/bluebot/blue-jump.png",
        idle:"common/sprites/bluebot/blue-idle.png", 
        height: 395, 
        width: 395,
        idleHeight: 787,
        idleWidth: 786,
        runFrames: 5,
        jumpFrame: 1, 
        fallFrame: 2,
        hasLand: true, 
        size: 100,
        idleSize: 100
    }, 

    CAT: {

        name: "cat",
        run: "common/sprites/cat/cat-run.png",    
        jump: "common/sprites/cat/cat-jump.png",
        idle:"common/sprites/cat/cat-idle.png", 
        height: 852, 
        width: 852, 
        idleHeight: 435,
        idleWidth: 435,
        runFrames: 3,
        jumpFrame: 0, 
        fallFrame: 1, 
        size: 125, 
        idleSize: 85
        
    }, 

    RED: {
        name: "red",
        run: "common/sprites/redbot/red-run.png",    
        jump: "common/sprites/redbot/red-jump.png",
        idle:"common/sprites/redbot/red-idle.png", 
        height: 395, 
        width: 395, 
        idleHeight: 786,
        idleWidth: 786,
        runFrames: 5,
        jumpFrame: 0, 
        fallFrame: 1,
        size: 100,
        idleSize: 100
    }

}
var playerSelect = PLAYER.NONE; 
const BACK = {

    "RIVER": "common/background/back1.png",
    "TENT": "common/background/back2.png",
    "BARN": "common/background/back3.png",
    "CLASS": "common/background/back4.png" 
}; 

const LIGHT_COLOUR = {
    "RED": "common/robot/red.png", 
    "GREEN": "common/robot/green.png", 
    "BLUE": "common/robot/blue.png"
};

const player = {
    x: 100, 
    y: 190,
    startX: 100, 
    startY: 190,
    currY: 190, 
    dy: 0,
    width: playerSelect.width, 
    height: playerSelect.height,
    frameX: 0, 
    frameY: 0,
    idleHeight: playerSelect.idleHeight,
    idleWidth: playerSelect.idleWidth, 
    maxRunFrames: playerSelect.runFrames, 
    action: 'idle',
    gravity: 10,
    gravitySpeed: 0, 
    size: playerSelect.size, 
    idleSize: playerSelect.idleSize
};

const key = {
    x: Math.floor((Math.random() * (350 - 0) + 0)),
    y: Math.floor((Math.random() * (350 - 0) + 0)),
    width: 100, 
    height: 100,  
    size: 40,
    isPicked: false
}

const door = {
    x: Math.floor((Math.random() * (350 - 0) + 0)),
    y: Math.floor((Math.random() * (350 - 0) + 0)),
    width: 1301, 
    height: 1301,
    size: 90,
    isOpen: false
}
 
const playerSprite = new Image(); 
playerSprite.src = playerSelect.run;
const jumpSprite = new Image(); 
jumpSprite.src = playerSelect.jump; 
const idleSprite = new Image();
idleSprite.src = playerSelect.idle; 
const background = new Image(); 
background.src = BACK["RIVER"];
const lightSprite = new Image(); 
lightSprite.src = LIGHT_COLOUR["RED"];  
const doorSprite = new Image(); 
doorSprite.src = "common/sprites/door_closed.png";
const keySprite = new Image(); 
keySprite.src = "common/sprites/key.png";

var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = '10px';
    blocklyDiv.style.width = (window.innerWidth - 540) + 'px';
  }; 

window.addEventListener('resize', onresize);
onresize();


if (blocklyDiv){
    var gameWorkspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'), 
        renderer: "zelos",
        theme: Blockly.Themes.Looga, 
        zoom: 
        {
            controls: true, 
        },
    });

    

    Blockly.JavaScript.addReservedWords('movePlayerRight,' + 
    'movePlayerLeft,movePlayerUp,movePlayerDown,playerJump,highlightBlock,changeBack,' +
    'turnLightOn,turnLightOff');

    ///gameWorkspace.registerButtonCallback("COLOUR_PALETTE", coloursFlyoutCallback); 
    gameWorkspace.toolbox_.flyout_.autoClose = false; 
    gameWorkspace.addChangeListener(function(event) {
        if (!(event instanceof Blockly.Events.Ui)) {
          // Something changed. Parser needs to be reloaded.
          generateCodeAndLoadIntoInterpreter();
          saveToLocal(); 
        }
        saveToLocal(); 
    });
}
if(newGameStarted) {
    startNewGame(); 
    newGameStarted = false; 
}


var btnNew = document.getElementById('newDesc'); 

exportButton.addEventListener("click", exportBlocks); 
newButton.addEventListener("click", launchNewModal); 
importButton.addEventListener("click", launchLoadModel); 
btnNew.addEventListener("click", startGame); 

function launchNewModal() {
    //window.location.hash = ""; 
    selectCharacter('none');
    loadLevel('tut1'); 
    document.getElementById('newDesc').style.display = 'block';
}

function launchLoadModel(){
    //window.location.hash = ""; 
    document.getElementById('loadDesc').style.display = 'block';
}


function selectCharacter(name) {

    switch (name){
        case "none":
            playerSelect = PLAYER.NONE; 
            break; 
        case "robot":
            playerSelect = PLAYER.ROBOT; 
            isPlayerPicked = true; 
            break;
        case "blue": 
            playerSelect = PLAYER.BLUE;
            isPlayerPicked = true; 
            break;
        case "red":
            playerSelect = PLAYER.RED; 
            isPlayerPicked = true; 
            break; 
        case "cat":
            playerSelect = PLAYER.CAT; 
            isPlayerPicked = true; 
            break; 
        default: 
            playerSelect = PLAYER.ROBOT;
            isPlayerPicked = true; 
            break; 
    }
    
    isPlayerPicked = false; 
    saveToLocal(); 
    modal.style.display = "none";
    window.location.hash = ""; 

    playerSprite.src = playerSelect.run;
    jumpSprite.src = playerSelect.jump; 
    idleSprite.src = playerSelect.idle; 
    loadPlayer(playerSelect); 
}

function loadLevel(currLevel){
      
    var toolboxText = '<xml>';
    switch(currLevel){
        case "tut1": 
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT1; 
            break;
        case "tut2": 
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT2; 
            break;
        case "tut3":
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT3; 
            break;
        case "tut4":
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT4; 
            break;
        case "tut5":
            selectCharacter('blue'); 
            toolboxText += LEVELS.TUT5; 
            break;
        case "tut6":
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT6; 
            break;
        case "tut7":
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT7; 
            break;
        case "tut8":
            selectCharacter('robot'); 
            toolboxText += LEVELS.TUT8; 
            break;
        case "1":
            selectCharacter('robot'); 
            toolboxText += LEVELS.FIRST; 
            break;
        case "2":
            toolboxText += LEVELS.SECOND;
            drawInitLevel();
            break;
        default:  
            toolboxText += LEVELS.SECOND; 
            break; 
    }
    toolboxText += "</xml>"; 
    var toolboxXml = Blockly.Xml.textToDom(toolboxText);
    gameWorkspace.updateToolbox(toolboxXml); 
    if(!langChanged){
        setTimeout(loadIntroDialog, 200); 
        sessionStorage.removeItem("lang-cng"); 
    }; 
    sessionStorage.removeItem("lang-cng"); 

}

function exportBlocks() {
    try {

        var xml = Blockly.Xml.workspaceToDom(gameWorkspace); 
        var xml_text = Blockly.Xml.domToText(xml);
        console.log(level); 
        var charSelect = "\n"+playerSelect.name+"\n"; 
        var levelSelect = level+"\n"; 
        var finalText = xml_text + charSelect + levelSelect; 


        var link = document.createElement('a'); 
        link.download="project";
        link.href="data:application/octet-stream;utf-8," + encodeURIComponent(finalText);

        document.body.appendChild(link); 
        link.click(); 
        link.remove(); 
    }catch(e) {
        window.location.href="data:application/octet-stream;utf-8," + encodeURIComponent(finalText);
        alert(e);
    }
}

function saveToLocal() {
    var xml = Blockly.Xml.workspaceToDom(gameWorkspace); 
    var xmlText = Blockly.Xml.domToText(xml);

    localStorage.setItem("blocks", xmlText);
    localStorage.setItem("player", playerSelect.name);
    localStorage.setItem("level", level);  
}

function loadBlocks() {
    var xmlText = localStorage.getItem("blocks"); 
    var localCharacter = localStorage.getItem("player"); 
    var mascot = sessionStorage.getItem("mascot");
    var loadOnce = sessionStorage.getItem("loadOnce"); 
    var loadOnceBlocks = sessionStorage.getItem("loadOnceBlocks"); 
    
    if(loadOnce){
        gameWorkspace.clear(); 
        var xml = Blockly.Xml.textToDom(loadOnceBlocks); 
        Blockly.Xml.domToWorkspace(xml, gameWorkspace);
        selectCharacter(mascot); 
        sessionStorage.removeItem("loadOnce");
        sessionStorage.removeItem("loadOnceBlocks");
        sessionStorage.removeItem("mascot")
        saveToLocal(); 
    }else{
        selectCharacter(localCharacter);  
        loadLevel(level);
        if(xmlText){
            gameWorkspace.clear(); 
            var xml = Blockly.Xml.textToDom(xmlText); 
            Blockly.Xml.domToWorkspace(xml, gameWorkspace);
        }
        saveToLocal(); 
    }
} 

function importBlocks(element) {
    var lines = element.split('\n')
    var xml = Blockly.Xml.textToDom(lines[0]); 
    selectCharacter(lines[1]); 
    setLevel(lines[2]);  
    gameWorkspace.clear(); 
    Blockly.Xml.domToWorkspace(xml, gameWorkspace);
    saveToSession(lines[2]);  
    //Blockly.Xml.domToWorkspace(xml, gameWorkspace);
}

function sendBlocks(element) {
    try {
        var file = element.files[0]; 
        var f = new FileReader(); 
        f.onload = function (event) {
            importBlocks(this.result); 
        }; 
        f.readAsText(file); 
    } catch (e) {
        alert(e); 
    }
}

function saveToSession(mascot){
    if (window.sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(gameWorkspace); 
        var xmlText = Blockly.Xml.domToText(xml);
        sessionStorage.setItem("loadOnce", true); 
        sessionStorage.setItem("loadOnceBlocks", xmlText); 
        sessionStorage.setItem("mascot", mascot); 
    }
}


function startNewGame() { 
    if (confirm(locale.alert.new)){
        startGame(); 
        selectCharacter('robot'); 
        loadLevel(level); 
        saveToLocal(); 
    }
}

function setNewLevel(){
    if(level !== "2"){
        loadBlocks(); 
        loadLevel(level);
        saveToLocal(); 
    }
    else{
        if(langChanged){
            loadBlocks();
            loadLevel();
            saveToLocal(); 
        }else{
        selectCharacter("none"); 
        gameWorkspace.clear();
        modal.style.display = "block"; 
        loadLevel(level);
        saveToLocal(); 
        }
    }
    //loadBlocks(); 
    
}

var ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH; 
canvas.height = CANVAS_HEIGHT; 

var runButton = document.getElementById('runButton'); 
var resetButton = document.getElementById('resetButton'); 


runButton.addEventListener("click", runButtonClick);
resetButton.addEventListener("click", resetButtonClick); 

function preventSpam(e){

    var doubleClickTime = 400;
      if (prevType_ == e.type &&
          prevDate_ + doubleClickTime > Date.now()) {
        e.preventDefault();
        e.stopPropagation();
        return true;
      }
      prevType_ = e.type;
      prevDate_ = Date.now();
      return false;
    } 
    
/**
 * Game Section
 */

const light = { 
    x: player.x + 40, 
    y: player.y - 15, 
    width: 400, 
    height: 232,
    visible: false
};

function drawSprite(img, sx, sy, sw, sh, dx, dy, dw, dh){
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh); 
}

function loadPlayer(x) {
    player.width = x.width; 
    player.height = x.height; 
    player.maxRunFrames = x.runFrames;  
    player.size = x.size;
    player.idleSize = x.idleSize; 
    player.idleHeight = x.idleHeight;
    player.idleWidth = x.idleWidth 
}

function runButtonClick(e){

    if(preventSpam(e)){
        return; 
    }
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
      }
    runButton.style.display = 'none';
    resetButton.style.display = 'inline';
    document.getElementById('spinner').style.visibility = 'visible';
    execute(); 
}

function resetButtonClick(e){
    if(preventSpam(e)){
        return; 
    }

    runButton.style.display = 'inline';
    resetButton.style.display = 'none';
    document.getElementById('spinner').style.visibility = 'hidden';
    highlightBlock(null);
    reset(); 
}


/**
 * Inject the game API into the JS Interpreter.
 * @param {!interpreter} interpreter The JS-Interpreter
 * @param {!Interpreter.Object} globalObject Global object 
 */
function apiInterpreter(interpreter, globalObject) 
{
    var wrapper; 

    wrapper = function(dist, id){
        movePlayerUp(dist, id); 
    }; 
    interpreter.setProperty(globalObject, 'moveUpward', 
        interpreter.createNativeFunction(wrapper)); 
    wrapper = function(dist, id){
        movePlayerDown(dist, id); 
    }; 
    interpreter.setProperty(globalObject, 'moveDownward', 
        interpreter.createNativeFunction(wrapper)); 
    wrapper = function(dist, id){
        movePlayerLeft(dist, id); 
    }; 

    interpreter.setProperty(globalObject, 'moveLeft', 
        interpreter.createNativeFunction(wrapper)); 
    wrapper = function(dist, id){
        movePlayerRight(dist, id); 
    }; 
    interpreter.setProperty(globalObject, 'moveRight', 
        interpreter.createNativeFunction(wrapper));

    wrapper = function(val, id){
        playerJump(val, id); 
    };

    interpreter.setProperty(globalObject, 'moveJump', 
        interpreter.createNativeFunction(wrapper));

    wrapper = function(val, id){
        changeBackground(val, id); 
    }; 

    interpreter.setProperty(globalObject, 'changeBack', 
        interpreter.createNativeFunction(wrapper));

    wrapper = function(colour, id){
        turnLightOn(colour, id); 
    }; 
    interpreter.setProperty(globalObject, 'turnOn', 
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id){
        turnLightOff(id); 
    }; 
    interpreter.setProperty(globalObject, 'turnOff', 
        interpreter.createNativeFunction(wrapper));
    wrapper = function(id) {
        id = String(id || '');
        return interpreter.createPrimitive(highlightBlock(id));
        };
        interpreter.setProperty(globalObject, 'highlightBlock',
            interpreter.createNativeFunction(wrapper));
    
    wrapper = function(func, time){
        return interpreter.createPrimitive(setTimeout(func, time)); 
    }; 
    interpreter.setProperty(globalObject, 'setTimeout',
            interpreter.createNativeFunction(wrapper));

}

let upTimerId
let downTimerId
let lastPos;
let fallPos;

function reset(){
    clearInterval(downTimerId);
    clearInterval(upTimerId);
    player.action = 'idle'  
    player.x = player.startX;
    player.y = player.startY;
    player.dx = 0; 
    player.dy = 0; 
    player.frameX = 0; 
    player.frameY = 0; 
    player.gravitySpeed = 0; 
    background.src = BACK['RIVER']; 
    light.x  = player.x + 40; 
    light.y = player.y - 10; 
    light.visible = false; 
    gameWorkspace.highlightBlock(null); 
    highlightPause = false; 
    key.isPicked = false;
    door.isOpen = false; 
    doorSprite.src = "common/sprites/door_closed.png"; 
    
    for (var i = 0; i < pidList.length; i++) {
        clearTimeout(pidList[i]);
    }
    pidList.length = 0;
    myInterpreter = null;
}

function highlightBlock(id){
    gameWorkspace.highlightBlock(id);
    highlightPause = true; 
}

function execute(){

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        setTimeout(execute, 250);
        return;
      }
    
    reset();
    Blockly.selected && Blockly.selected.unselect();
    var code = Blockly.JavaScript.workspaceToCode(gameWorkspace);
    myInterpreter = new Interpreter(code, apiInterpreter); 
    pidList.push(setTimeout(executeChunk_, 500));
    
}

function executeChunk_() {

  pidList.length = 0;
  highlightPause = false; 
  var go;
  do {
    try {
        go = myInterpreter.step();  
    } catch (e) {
      // User error, terminate in shame.
      go = false;
      return;
    }
    if (go && highlightPause) {
      // The last executed command requested a pause.
      go = false;
      pidList.push(
          setTimeout(executeChunk_, 1000));
    }
  } while (go);
  if(!highlightPause){
    document.getElementById('spinner').style.visibility = 'hidden';
    player.action = "idle"; 
    light.visible = false; 
    highlightBlock(null); 
    checkClearCondition(); 
  }

}

function generateCodeAndLoadIntoInterpreter() {
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    return Blockly.JavaScript.workspaceToCode(gameWorkspace);
}

function getCode() {
    var xml = Blockly.Xml.workspaceToDom(gameWorkspace, true); 
    var text = Blockly.Xml.domToText(xml); 
    return text; 
}


// Core Functions
function move(){
    player.x += 2; 
    light.x += 2; 
}
function movePlayerRight(value, id) {
    clearInterval(downTimerId);
    if (player.x < canvas.width - 100) { 
        player.frameY = 0;
        player.action = 'right'; 
        for(var i = 0; i < value; i++){
            setTimeout(move(), 500); 
        }
           
    }
    
    highlightBlock(id); 
    handlePlayerFrame(); 
    startAnimating(frameSpeed);  
}

function movePlayerDown(value, id) {
    if(player.y < canvas.height - 100){ 
        player.action = 'down'
        player.y += value;
        light.y += value;  
    }
    
    highlightBlock(id); 
    handlePlayerFrame(); 
    startAnimating(frameSpeed); 
}

function movePlayerUp(value, id){
    if(player.y > 150){ 
        player.action = 'up'
        player.y -= value;
        light.y -= value;  
    }
    
    highlightBlock(id); 
    handlePlayerFrame(); 
    startAnimating(frameSpeed); 
}

function playerJump(value, id) {
    lastPos = player.y
    fallPos = lastPos - value;
    clearInterval(downTimerId);
    player.action = 'jump'
    player.dy = 0; 
    highlightBlock(id);
    upTimerId = setInterval(function() {
        player.dy -= value;
        player.y -= value;  
        light.y += player.dy;
        if(player.y < fallPos) {
            fall(); 
        }
    }, 60); 
    
    player.gravitySpeed = 0; 
    highlightBlock(id); 
    handlePlayerJumpFrame(); 
    startAnimating(frameSpeed); 
}


function fall(){
    clearInterval(upTimerId); 
    downTimerId = setInterval(function() {
        if (player.y < fallPos) {
            player.action = 'fall'; 
            player.gravitySpeed += player.gravity; 
            player.y += player.dy + player.gravitySpeed;  
            light.y += player.dy + player.gravitySpeed; 
            
        }
        if (player.y >= lastPos && player.action === 'fall') { 
            player.frameX = playerSelect.hasLand ? 3 : playerSelect.leftSide===0 ? 0 : 1; 
        }
    }, 60);
    handlePlayerJumpFrame(); 
    startAnimating(frameSpeed); 
}
 
function movePlayerLeft(value, id){
    clearInterval(downTimerId);
    if(player.x > 0){
        player.action = 'left'; 
        player.frameY = playerSelect.leftSide===0 ? 0 : 1;
        player.x -= value; 
        light.x -= value; 

    }
    highlightBlock(id);
    handlePlayerFrame(); 
    startAnimating(frameSpeed); 
}

function turnLightOn(colour, id){
    clearInterval(downTimerId);
    player.action = 'lightOn'; 
    if (colour in LIGHT_COLOUR){
        light.visible = true; 
        lightSprite.src = LIGHT_COLOUR[colour]; 
        
    }
    startAnimating(frameSpeed);
    highlightBlock(id); 
}

function turnLightOff(id){
    clearInterval(downTimerId);
    player.action  = 'lightOff'; 
    light.visible = false; 
    startAnimating(frameSpeed); 
    highlightBlock(id); 
}

function changeBackground(value, id){
    clearInterval(downTimerId);
    player.action = 'idle'; 
    if (value in BACK){
        background.src = BACK[value]; 
        startAnimating(frameSpeed);
    }
    highlightBlock(id)
}

function handlePlayerFrame(){ 

    if(player.action === 'right'){  
        if(player.frameX < player.maxRunFrames) player.frameX++
        else player.frameX = 0; 
    }
    if(player.action === 'left'){  
        if(player.frameX < player.maxRunFrames) player.frameX++
        else player.frameX = 0; 
    }
    if(player.action === 'down' || player.action === 'up'){  
        if(player.frameX < player.maxRunFrames) player.frameX++
        else player.frameX = 0; 
    }

}

function handlePlayerJumpFrame(){ 
    if(player.action === 'jump') {
        if(player.frameX < 3) player.frameX=playerSelect.jumpFrame
        else player.frameX = 0
    }
    if(player.action === 'fall') {
        if(player.frameX < 3) player.frameX=playerSelect.fallFrame
        else player.frameX = 0
    }

}

function checkInclusion(str){
    var code = Blockly.JavaScript.workspaceToCode(gameWorkspace); 
    if(code.includes(str)){
        saveToLocal(); 
        LoadWinner(); 
    }
}

function checkClearCondition() {
    var blockCount = gameWorkspace.getAllBlocks().length; 
    if(level !== "2" && level != MAX_LEVEL){
        if(blockCount > 0){
            switch (level) {
                case "tut1": 
                    checkInclusion("moveRight"); 
                case "tut2":
                    checkInclusion("moveLeft"); 
                case "tut3":
                    checkInclusion("moveDownward");
                case "tut4":
                    checkInclusion("moveUpward"); 
                case "tut5":
                    checkInclusion("moveJump"); 
                case "tut6":
                    checkInclusion("turnOn") || checkInclusion("turnOff"); 
                case "tut7":
                    checkInclusion("changeBack"); 
                case "tut8":
                    checkInclusion("for"); 
            }
        }else{
            alert("Please place a block"); 
        }
    }
    else if(level === '2'){
        if(key.isPicked && door.isOpen && checkCollision(player, door)){LoadWinner();}
    }
}

let fps, fpsInterval, startTime, now, then, elapsed; 

function startAnimating(fps){
    fpsInterval = 1000/fps; 
    then = Date.now(); 
    startTime = then; 
    animate(); 
}

function checkCollision(a, b){ 
    return !(
        ((a.y + a.size) <= (b.y)) ||
        (a.y >= (b.y + b.size)) ||
        ((a.x + a.size) <= b.x) ||
        (a.x >= (b.x + b.size))
    );
}
console.log(checkCollision(player, key))
function drawInitLevel(){
    if(level === "2"){
        while(checkCollision(key, door))
        { 
            console.log("door + key"); 
            door.x = Math.floor((Math.random() * (350 - 0) + 0)); 
            door.y = Math.floor((Math.random() * (350 - 0) + 0)); 
        }
        while(checkCollision(key, player))
        {
            console.log("player + key");
            key.x =  Math.floor((Math.random() * (350 - 0) + 0)); 
            key.y = Math.floor((Math.random() * (350 - 0) + 0)); 
        }
        return true;  
    }
}

function adventClear(){
    if(level === "2"){
        if(checkCollision(player, key)){
            key.isPicked = true;
            door.isOpen = true; 
            doorSprite.src = "common/sprites/door_open.png"; 
        }

        if(checkCollision(player, door) && door.isOpen === true){
            checkClearCondition(); 
        }
    }
}


function animate() {
    requestAnimationFrame(animate); 
    now = Date.now(); 
    elapsed = now - then; 
    if(elapsed > fpsInterval) { 
        then = now - (elapsed % fpsInterval); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);   
        if(level === "2"){
            adventClear();
            drawSprite(doorSprite, 0, 0, door.width, door.height, door.x, door.y, door.size, door.size); 
            if (!key.isPicked){
                drawInitLevel()
                drawSprite(keySprite, 0, 0, key.width, key.height, key.x, key.y, key.size, key.size); 
            }
        } 
        if(light.visible === true){
            drawSprite(lightSprite, 0, 0, light.width, light.height, light.x, light.y, 250, 150); 
        }  
        if((player.action === 'jump' || player.action === "fall") && player.action !== "idle"){
            drawSprite(jumpSprite, player.width * player.frameX, player.height * player.frameY, player.width, 
                player.height, player.x, player.y, player.size, player.size);
            handlePlayerJumpFrame();
        }
        else if (player.action === "idle") {
            drawSprite(idleSprite, 0, 0, player.idleWidth, player.idleHeight, player.x, player.y, player.idleSize, player.idleSize);
        }
        else if(player.action !== "jump" && player.action !== "fall" && player.action !=="idle") {
            
            drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, 
                player.height, player.x, player.y, player.size, player.size);
            handlePlayerFrame();
        }
        
    }
    
}
startAnimating(frameSpeed); 
