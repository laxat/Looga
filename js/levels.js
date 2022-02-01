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
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block></category>'+
    '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="logic_category"><block type="robot_back"></block><block type="robot_light"></block></category>' +
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


