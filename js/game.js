
const CANVAS_WIDTH = 500; 

const CANVAS_HEIGHT = 500; 

var myInterpreter = null; 

var highlightPause = false; 

var pidList = []; 

var prevType_ = null; 
var prevDate_ = 0;

var locale = window.location.search; 

var blocklyDiv = document.getElementById("blocklyDiv"); 
var canvas = document.getElementById("canvas1");
var visualization = document.getElementById('visualization');

var exportButton = document.getElementById('save'); 
var newButton = document.getElementById('new');

var modal = document.getElementById('newModal'); 

var frameSpeed = 15;

var language = locale == "?lang=ar" ?  lang.ar:  lang.en


const PLAYER = {

    NONE: {
        name: "none",
        run: "",
        jump: "", 
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
        height: 2500,
        width: 2200,
        runFrames: 0,
        jumpFrame: 0, 
        fallFrame: 0, 
        size: 125
    },

    BLUE: {
        name: "blue",
        run: "common/sprites/bluebot/blue-run.png",    
        jump: "common/sprites/bluebot/blue-jump.png",
        height: 395, 
        width: 395, 
        runFrames: 5,
        jumpFrame: 1, 
        fallFrame: 2,
        size: 100
    }, 

    CAT: {

        name: "cat",
        run: "common/sprites/cat/cat-run.png",    
        jump: "common/sprites/cat/cat-jump.png",
        height: 852, 
        width: 852, 
        runFrames: 3,
        jumpFrame: 0, 
        fallFrame: 1, 
        size: 125
        
    }, 

    RED: {
        name: "red",
        run: "common/sprites/redbot/red-run.png",    
        jump: "common/sprites/redbot/red-jump.png",
        height: 395, 
        width: 395, 
        runFrames: 5,
        jumpFrame: 0, 
        fallFrame: 1,
        size: 100
    }

}
var playerSelect = PLAYER.ROBOT;

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
    maxRunFrames: playerSelect.runFrames, 
    action: 'idle',
    gravity: 10,
    gravitySpeed: 0, 
    size: playerSelect.size

};

 
const playerSprite = new Image(); 
playerSprite.src = playerSelect.run;
const jumpSprite = new Image(); 
jumpSprite.src = playerSelect.jump; 
const background = new Image(); 
background.src = BACK["RIVER"];
const lightSprite = new Image(); 
lightSprite.src = LIGHT_COLOUR["RED"];  

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
        toolbox: locale == "?lang=ar" ? document.getElementById('ar-toolbox') :  document.getElementById('en-toolbox'), 
        renderer: "zelos",
        zoom: 
        {
            controls: true, 
        },
    });


    Blockly.JavaScript.addReservedWords('movePlayerRight,' + 
    'movePlayerLeft,movePlayerUp,movePlayerDown,highlightBlock,changeBack,' +
    'turnLightOn,turnLightOff'); 

    gameWorkspace.addChangeListener(function(event) {
        if (!(event instanceof Blockly.Events.Ui)) {
          // Something changed. Parser needs to be reloaded.
          generateCodeAndLoadIntoInterpreter();
        }
    });
}


exportButton.addEventListener("click", exportBlocks); 
newButton.addEventListener("click", startNewGame); 
gameWorkspace.addChangeListener(function(event){
    saveToLocal(); 
}); 

function selectCharacter(name) {

    switch (name){
        case "none":
            playerSelect = PLAYER.NONE; 
            break; 
        case "robot":
            playerSelect = PLAYER.ROBOT; 
            break;
        case "blue": 
            playerSelect = PLAYER.BLUE;
            break;
        case "red":
            playerSelect = PLAYER.RED; 
            break; 
        case "cat":
            playerSelect = PLAYER.CAT; 
            break; 
        default: 
            playerSelect = PLAYER.BLUE;
            break; 
    }
    modal.style.display = "none";
    window.location.hash = ""; 
    playerSprite.src = playerSelect.run;
    jumpSprite.src = playerSelect.jump; 
    loadPlayer(playerSelect); 
}

function exportBlocks() {
    try {

        var xml = Blockly.Xml.workspaceToDom(gameWorkspace); 
        var xml_text = Blockly.Xml.domToText(xml);
        
        var charSelect = "\n"+playerSelect.name+"\n"; 
        var finalText = xml_text + charSelect; 


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
}

function loadFromLocal() {
    var xmlText = localStorage.getItem("blocks"); 
    var localCharacter = localStorage.getItem("player"); 
    if(xmlText){
        gameWorkspace.clear(); 
        var xml = Blockly.Xml.textToDom(xmlText);
        selectCharacter(localCharacter);  
        Blockly.Xml.domToWorkspace(xml, gameWorkspace);
    }
}

function importBlocks(element) {
    var lines = element.split('\n')
    var xml = Blockly.Xml.textToDom(lines[0]); 
    selectCharacter(lines[1]); 
    console.log(playerSelect.name); 
    gameWorkspace.clear(); 
    Blockly.Xml.domToWorkspace(xml, gameWorkspace);
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



function startNewGame() { 
    if (confirm(language.alert.new)){
        selectCharacter("none"); 
        gameWorkspace.clear(); 
        modal.style.display = "block"; 
        saveToLocal(); 
    }
    
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
    player.size = playerSelect.size;
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

function reset(){
    player.x = player.startX;
    player.y = player.startY;
    player.dx = 0; 
    player.dy = 0; 
    player.frameX = 0; 
    player.frameY = 0; 
    player.action = 'idle'  
    player.gravitySpeed = 0; 
    background.src = BACK['RIVER']; 
    light.x  = player.x + 40; 
    light.y = player.y - 10; 
    light.visible = false; 
    gameWorkspace.highlightBlock(null); 
    highlightPause = false; 
    
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
    player.action = "idle"; 
    document.getElementById('spinner').style.visibility = 'hidden';
    highlightBlock(null); 
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
let upTimerId
let downTimerId

function movePlayerRight(value, id) {
    clearInterval(downTimerId);
    if (player.x < canvas.width - 100) {  
        player.action = 'right'; 
        player.x += value; 
        light.x += value;   
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

function movePlayerUp(value, id) {
    
    if(player.y > 150){
        clearInterval(downTimerId);

        player.action = 'jump'
        player.dy = 0; 
        highlightBlock(id);
        upTimerId = setInterval(function() {
             player.dy -= value;
             player.y -= value;  
             light.y += player.dy;
             if(player.y < 190) {
                 fall(); 
             }
        }, 110); 
        
    }
    player.gravitySpeed = 0; 
    highlightBlock(id); 
    handlePlayerJumpFrame(); 
    startAnimating(frameSpeed); 
}

function fall(){
    clearInterval(upTimerId);
    downTimerId = setInterval(function() {
        if (player.y < 190) {
            player.action = 'fall'; 
            player.gravitySpeed += player.gravity; 
            player.y += player.dy + player.gravitySpeed;  
            light.y += player.dy + player.gravitySpeed; 
            
        }
        if (player.y >= 190 && player.action === 'fall') { 
            player.action = 'idle'; 
        }
    }, 60);
    handlePlayerJumpFrame(); 
    startAnimating(frameSpeed); 
}
 
function movePlayerLeft(value, id){
    clearInterval(downTimerId);
    if(player.x > 0){
        player.action = 'left'  
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
    player.action = 'background'; 
    if (value in BACK){
        background.src = BACK[value]; 
        startAnimating(frameSpeed);
    }
    highlightBlock(id)
}

function handlePlayerFrame(){ 
    if(player.action === 'right'){ 
        player.frameY = 0; 
        if(player.frameX < player.maxRunFrames) player.frameX++
        else player.frameX = 0; 
    }
    if(player.action === 'left'){ 
        player.frameY = 1; 
        if(player.frameX < player.maxRunFrames) player.frameX++
        else player.frameX = 0; 
    }
    if(player.action === "idle"){
        player.frameY = 0; 
        player.frameX = 0;
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

let fps, fpsInterval, startTime, now, then, elapsed; 

function startAnimating(fps){
    fpsInterval = 1000/fps; 
    then = Date.now(); 
    startTime = then; 
    animate(); 
}

function animate() {
    requestAnimationFrame(animate); 
    now = Date.now(); 
    elapsed = now - then; 
    if(elapsed > fpsInterval) { 
        then = now - (elapsed % fpsInterval); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 
        if(light.visible === true){
            drawSprite(lightSprite, 0, 0, light.width, light.height, light.x, light.y, 250, 150); 
        }  
        if(player.action === 'jump' || player.action === "fall"){
            drawSprite(jumpSprite, player.width * player.frameX, player.height * player.frameY, player.width, 
                player.height, player.x, player.y, player.size, player.size);
            handlePlayerJumpFrame();
        }
        else if(player.action !== "jump" && player.action !== "fall") {
            
            drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, 
                player.height, player.x, player.y, player.size, player.size);
            handlePlayerFrame();
        }
    }  
}
startAnimating(frameSpeed); 

