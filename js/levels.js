var locale = getMsg(); 
var level = new URLSearchParams(window.location.search).get('level');
const MAX_LEVEL = '2'; 
var isNewGame = false; 
var isNewLevel = false;

var LEVELS = {

    TUT1: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveRight"></block></category>',

    TUT2: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveLeft" ></block></category>', 

    TUT3: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveDownward"></block></category>', 

    TUT4: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveUpward"></block></category>',

    TUT5: '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="logic_category">'+
    '<block type="robot_light"></block></category>',

    TUT6: '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="logic_category">'+
    '<block type="robot_back"></block></category>',

    TUT7: '<category name="'+locale.category.move+'" toolboxitemid="move" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'  + 
    '<block type="robot_moveRight"></block></category>'+
    '<category name="'+locale.category.loop+'" css-icon="customIcon fa fa-refresh" categorystyle="loop_category">'+
    '<block type="robot_loops"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>' +
    '</block></category>',

    SECOND: '<category name="'+locale.category.move+'" toolboxitemid="move" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'  + 
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block></category>'+
    '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="logic_category"><block type="robot_back"></block><block type="robot_light"></block></category>' +
    '<category name="'+locale.category.loop+'" css-icon="customIcon fa fa-refresh" categorystyle="loop_category">'+
    '<block type="robot_loops"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>' +
    '</block></category>'
}; 

var DESC = {

    TUT1: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut1/page1.gif" width="200">' + 
            '<img id="pg2" src="common/desc/tut1/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut1/play.gif" width="200">' + 
            '</div> </div> <div class="col-md-6">' +
              '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 01</span>' +
              '<div class="mt-2" id="stateDesc">' +
              '<span id="desc0" class="intro-2" style="display: inline">In this level, you will make the player step right </span>' + 
              '<span id="desc1" class="intro-2" style="display: none">Click the move category, on the leftr side of the page, you can drag the move-right block into the workspace </span>' + 
              '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
              '<span id="desc3" class="intro-2" style="display: none">After that you will see the player runs right</span>' + 
                '</div><div class="mt-4 mb-5">'+
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
              '</div></div> </div> </div> </div> </div>', 
    
    TUT2: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
              '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
              '<img id="pg1" src="common/desc/tut2/blocks.gif" width="300">' + 
              '<img id="pg2" src="common/desc/tut2/run.png" width="200">' + 
              '<img id="pg3" src="common/desc/tut2/play.gif" width="300">' + 
              '</div> </div> <div class="col-md-6">' +
                '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 02</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">In this level, you will make the player step left </span>' + 
                '<span id="desc1" class="intro-2" style="display: none">Click the move category, and drag the block, you connecty blocks together like this </span>' + 
                '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
                '<span id="desc3" class="intro-2" style="display: none">After that you will see the player runs left 2 times now</span>' + 
                  '</div><div class="mt-4 mb-5">'+
                  '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                  '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                  '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                  '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
                '</div></div> </div> </div> </div> </div>', 

    TUT3: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut3/blocks.gif" width="300">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut3/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
                '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 03</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">In this level, you will make the player step down </span>' + 
                '<span id="desc1" class="intro-2" style="display: none">Click the move category, and drag the block to the workspace </span>' + 
                '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
                '<span id="desc3" class="intro-2" style="display: none">After that you will see the player now goes down 2 times/span>' + 
                '</div><div class="mt-4 mb-5">'+
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
                '</div></div> </div> </div> </div> </div>', 
    
    TUT4: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/desc/tut4/blue-jump.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut4/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut4/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
                '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 04</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">In this level, you will make the player jump </span>' + 
                '<span id="desc1" class="intro-2" style="display: none">Click the move category, and drag the block to the workspace. You can also change'+
                ' the intensity of the jump by changing the value </span>' + 
                '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
                '<span id="desc3" class="intro-2" style="display: none">After that you will see the player now jump </span>' + 
                '</div><div class="mt-4 mb-5">'+
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
                '</div></div> </div> </div> </div> </div>', 
    
    TUT5: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-idle.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut5/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut5/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
            '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 05</span>' +
            '<div class="mt-2" id="stateDesc">' +
            '<span id="desc0" class="intro-2" style="display: inline">In this level, you will turn on the players light </span>' + 
            '<span id="desc1" class="intro-2" style="display: none">Click the Scene category, and drag the block to the workspace. You can also change'+
            ' the color of the lamp and turn it on. Try to copy this sequence (its not required but could be cool) </span>' + 
            '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
            '<span id="desc3" class="intro-2" style="display: none">After that you will see the player have a light on/off </span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
            '</div></div> </div> </div> </div> </div>', 
    
    TUT6: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-idle.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut6/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut6/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
                '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 06</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">In this level, you will change the background</span>' + 
                '<span id="desc1" class="intro-2" style="display: none">Click the Scene category, and drag the block to the workspace. This block can change'+
                ' the background of the game, there are 3 options so far. </span>' + 
                '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
                '<span id="desc3" class="intro-2" style="display: none">After that you will see the background has changed </span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
                '</div></div> </div> </div> </div> </div>', 
    
    TUT7: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut7/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut7/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
            '<div class="text-white mt-4" id="stateTitle"> <span class="intro-1">Level 01 - Tutorial 07</span>' +
            '<div class="mt-2" id="stateDesc">' +
            '<span id="desc0" class="intro-2" style="display: inline">In this level, you will learn how to use loops</span>' + 
            '<span id="desc1" class="intro-2" style="display: none">Click the Loops category, and drag the block to the workspace. then drag the '+
            'move block from the move category. you can chnage the number of loops by changing the text of the block. </span>' + 
            '<span id="desc2" class="intro-2" style="display: none">When you are ready click the play button </span>' + 
            '<span id="desc3" class="intro-2" style="display: none">After that you will see the player can move once 5 times. you can loop any other type of' + 
            ' blocks that were shown in the other levels </span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">Next</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">Next</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">Next</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">Close</button>' +
            '</div></div> </div> </div> </div> </div>',
}; 


function startGame() {
    window.location.search = "?lang="+locale.name+"&level=tut1"; 
    isNewGame=true; 
}

const levelList = ['tut1', 'tut2', 'tut3', 'tut4', 'tut5', 'tut6', 'tut7', '2']; 
function nextLevel() {
    if (level !== MAX_LEVEL){
        let current = levelList.findIndex((element) => element === level);  
        window.location.search = "?lang="+locale.name+"&level="+levelList[current+1]; 
        //location.reload();
        
    }
}

function setLevel(setLvl){

    //level = setLvl;
    window.location.search = "?lang="+locale.name+"&level="+setLvl; 
    //location.reload(); 
}

function checkLevel(){
    var s = localStorage.getItem('player'); 

    if (level === null){
        document.getElementById('newDesc').style.display = 'block';  
    }
    else if (level !== MAX_LEVEL && s === 'none'){
        selectCharacter(); 
    }
    else if (level === MAX_LEVEL && s === 'none'){
        setNewLevel(); 
    } 
}

function loadIntroDialog(){
    var gameDesc = document.getElementById('gameDesc'); 
    switch (level){
        case "tut1":
            gameDesc.innerHTML = DESC.TUT1; 
            break; 
        case "tut2":
            gameDesc.innerHTML = DESC.TUT2; 
            break; 
        case "tut3":
            gameDesc.innerHTML = DESC.TUT3;
            break;
        case "tut4":
            gameDesc.innerHTML = DESC.TUT4;
            break;
        case "tut5":
            gameDesc.innerHTML = DESC.TUT5;
            break;
        case "tut6":
            gameDesc.innerHTML = DESC.TUT6;
            break;
        case "tut7":
            gameDesc.innerHTML = DESC.TUT7;
            break;
    }
    if (window.performance.navigation.type != window.performance.navigation.TYPE_RELOAD) {
        gameDesc.style.display = "block"; 
    }
}

function closeDialog(id){

    switch (id){

        case 'pg0':
            console.log("here");
            document.getElementById('pg0').style.display = "none"; 
            document.getElementById('btn0').style.display = "none"; 
            document.getElementById('desc0').style.display = "none"; 
            document.getElementById('pg1').style.display = "inline";
            document.getElementById('btn1').style.display = "inline";
            document.getElementById('desc1').style.display = "inline";   
            break; 
        case 'pg1':
            document.getElementById('pg1').style.display = "none"; 
            document.getElementById('btn1').style.display = "none";
            document.getElementById('desc1').style.display = "none"; 
            document.getElementById('pg2').style.display = "inline"; 
            document.getElementById('btn2').style.display = "inline";
            document.getElementById('desc2').style.display = "inline";   
            break; 
        case 'pg2':
            document.getElementById('pg2').style.display = "none"; 
            document.getElementById('btn2').style.display = "none";
            document.getElementById('desc2').style.display = "none"; 
            document.getElementById('pg3').style.display = "inline"; 
            document.getElementById('btn3').style.display = "inline";
            document.getElementById('desc3').style.display = "inline"; 
            break; 
        case 'pg3':
            document.getElementById('pg3').style.display = "none"; 
            document.getElementById('btn3').style.display = "none";
            document.getElementById('desc3').style.display = "none"; 
            document.getElementById('pg0').style.display = "inline"; 
            document.getElementById('btn0').style.display = "inline";
            document.getElementById('desc0').style.display = "inline"; 
            document.getElementById('gameDesc').style.display = "none"; 
            break; 
                
    }
    // var gameDesc = document.getElementById('gameDesc'); 
    // gameDesc.style.display = "none";
}

function LoadWinner(){
    document.getElementById("winner").style.display = "block"; 

}
 
