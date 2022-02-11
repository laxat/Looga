var locale = getMsg(); 
var level = new URLSearchParams(window.location.search).get('level');
const MAX_LEVEL = '1'; 
var isNewGame = false; 
var isNewLevel = false;

var LEVELS = {

    TUT1: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveRight"></block></category>',

    TUT2: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block></category>', 

    TUT3: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block></category>', 

    TUT4: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block></category>',

    TUT5: '<category name="'+locale.category.move+'" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'+
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block><block type="robot_jump"></block></category>',

    TUT6: '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="logic_category">'+
    '<block type="robot_light"></block></category>',

    TUT7: '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="logic_category">'+
    '<block type="robot_light"></block><block type="robot_back"></block></category>',

    TUT8: '<category name="'+locale.category.move+'" toolboxitemid="move" css-icon="customIcon fa fa-arrow-left" categorystyle="text_category">'  + 
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block></category>'+
    '<category name="'+locale.category.loop+'" css-icon="customIcon fa fa-refresh" categorystyle="loop_category">'+
    '<block type="robot_loops"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>' +
    '</block></category>',

    FIRST: '<category name="'+locale.category.move+'" toolboxitemid="move" css-icon="customIcon fa fa-arrow-left" categorystyle="list_category">'  + 
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block><block type="robot_jump"></block></category>'+
    '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="text_category"><block type="robot_back"></block><block type="robot_light"></block></category>' +
    '<category name="'+locale.category.loop+'" css-icon="customIcon fa fa-refresh" categorystyle="loop_category">'+
    '<block type="robot_loops"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>' +
    '</block></category>', 

    SECOND: '<category name="'+locale.category.move+'" toolboxitemid="move" css-icon="customIcon fa fa-arrow-left" categorystyle="list_category">'  + 
    '<block type="robot_moveRight"></block><block type="robot_moveLeft"></block><block type="robot_moveDownward"></block><block type="robot_moveUpward"></block><block type="robot_jump"></block></category>'+
    '<category name="'+locale.category.scene+'" css-icon="customIcon fa fa-picture-o" categorystyle="text_category"><block type="robot_back"></block><block type="robot_light"></block></category>' +
    '<category name="'+locale.category.loop+'" css-icon="customIcon fa fa-refresh" categorystyle="loop_category">'+
    '<block type="robot_loops"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>' +
    '</block></category>'
}; 

var DESC = {

    TUT1: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut1/page1.gif" width="200">' + 
            '<img id="pg2" src="common/desc/tut1/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut1/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
              '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut1.title+'</span>' +
              '<div class="mt-2" id="stateDesc">' +
              '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut1.page1+'</span>' + 
              '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut1.page2+'</span>' + 
              '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut1.page3+' </span>' + 
              '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut1.page4+'</span>' + 
                '</div><div class="mt-4 mb-5">'+
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
              '</div></div> </div> </div> </div> </div>', 
    
    TUT2: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
              '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
              '<img id="pg1" src="common/desc/tut2/blocks.gif" width="300">' + 
              '<img id="pg2" src="common/desc/tut2/run.png" width="200">' + 
              '<img id="pg3" src="common/desc/tut2/play.gif" width="300">' + 
              '</div> </div> <div class="col-md-6">' +
                '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut2.title+'</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut2.page1+'</span>' + 
                '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut2.page2+'</span>' + 
                '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut2.page3+'</span>' + 
                '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut2.page4+'</span>' + 
                  '</div><div class="mt-4 mb-5">'+
                  '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                  '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                  '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                  '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
                '</div></div> </div> </div> </div> </div>', 

    TUT3: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut3/blocks.gif" width="300">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut3/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
                '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut3.title+'</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut3.page1+'</span>' + 
                '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut3.page2+' </span>' + 
                '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut3.page3+'</span>' + 
                '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut3.page4+'</span>' + 
                '</div><div class="mt-4 mb-5">'+
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
                '</div></div> </div> </div> </div> </div>', 
    
    TUT4: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut4/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut4/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
                '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut4.title+'</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut4.page1+'</span>' + 
                '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut4.page2+'</span>' + 
                '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut4.page3+'</span>' + 
                '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut4.page4+'</span>' + 
                '</div><div class="mt-4 mb-5">'+
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
                '</div></div> </div> </div> </div> </div>', 

    TUT5:  '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
                '<div class="text-center mt-2"> <img id="pg0" src="common/desc/tut4/blue-jump.png" width="200">' + 
                '<img id="pg1" src="common/desc/tut5/blocks.gif" width="320">' + 
                '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
                '<img id="pg3" src="common/desc/tut5/play.gif" width="300">' + 
                '</div> </div> <div class="col-md-6">' +
                    '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut5.title+'</span>' +
                    '<div class="mt-2" id="stateDesc">' +
                    '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut5.page1+'</span>' + 
                    '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut5.page2+'</span>' + 
                    '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut5.page3+'</span>' + 
                    '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut5.page4+'</span>' + 
                    '</div><div class="mt-4 mb-5">'+
                    '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                    '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                    '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                    '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
                    '</div></div> </div> </div> </div> </div>', 
    
    TUT6: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-idle.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut5/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut5/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
            '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut6.title+'</span>' +
            '<div class="mt-2" id="stateDesc">' +
            '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut6.page1+'</span>' + 
            '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut6.page2+'</span>' + 
            '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut6.page3+'</span>' + 
            '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut6.page4+'</span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
            '</div></div> </div> </div> </div> </div>', 
    
    TUT7: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-idle.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut6/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut6/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
                '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut7.title+'</span>' +
                '<div class="mt-2" id="stateDesc">' +
                '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut7.page1+'</span>' + 
                '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut7.page2+'</span>' + 
                '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut7.page3+'</span>' + 
                '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut7.page4+'</span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
                '</div></div> </div> </div> </div> </div>', 
    
    TUT8: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/tut7/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/tut7/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
            '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.tut8.title+'</span>' +
            '<div class="mt-2" id="stateDesc">' +
            '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.tut8.page1+'</span>' + 
            '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.tut8.page2+' </span>' + 
            '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.tut8.page3+'</span>' + 
            '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.tut8.page4+'</span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
            '</div></div> </div> </div> </div> </div>',

    LEVEL1: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/bluebot/blue-select.png" width="200">' + 
            '<img id="pg1" src="common/desc/lvl1/blocks.gif" width="320">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/lvl1/play.gif" width="300">' + 
            '</div> </div> <div class="col-md-6">' +
            '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.level1.title+'</span>' +
            '<div class="mt-2" id="stateDesc">' +
            '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.level1.page1+'</span>' + 
            '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.level1.page2+'</span>' + 
            '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.level1.page3+'</span>' + 
            '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.level1.page4+' </span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.close+'</button>' +
            '</div></div> </div> </div> </div> </div>',

    LEVEL2: '<div class="intro-modal-content"> <div class="modal-body"> <div class="row"> <div class="col-md-6">' +
            '<div class="text-center mt-2"> <img id="pg0" src="common/sprites/key.png" width="200">' + 
            '<img id="pg1" src="common/sprites/door_open.png" width="200">' + 
            '<img id="pg2" src="common/desc/tut3/run.png" width="200">' + 
            '<img id="pg3" src="common/desc/lvl2/reset.png" width="200">' + 
            '<img id="pg4" src="common/desc/lvl2/play.gif" width="300" style="display: none">' + 
            '</div> </div> <div class="col-md-6">' +
            '<div class="text-black mt-4" id="stateTitle"> <span class="intro-1">'+locale.desc.level2.title+'</span>' +
            '<div class="mt-2" id="stateDesc">' +
            '<span id="desc0" class="intro-2" style="display: inline">'+locale.desc.level2.page1+'</span>' + 
            '<span id="desc1" class="intro-2" style="display: none">'+locale.desc.level2.page2+'</span>' + 
            '<span id="desc2" class="intro-2" style="display: none">'+locale.desc.level2.page3+'</span>' + 
            '<span id="desc3" class="intro-2" style="display: none">'+locale.desc.level2.page4+'</span>' + 
            '<span id="desc4" class="intro-2" style="display: none">'+locale.desc.level2.page5+'</span>' + 
                '</div><div class="mt-4 mb-5">'+  
                '<button id="btn0" class="btn btn-primary" onclick="'+"closeDialog('pg0')"+'">'+locale.button.next+'</button>' +
                '<button id="btn1" class="btn btn-primary" onclick="'+"closeDialog('pg1')"+'">'+locale.button.next+'</button>' +
                '<button id="btn2" class="btn btn-primary" onclick="'+"closeDialog('pg2')"+'">'+locale.button.next+'</button>' +
                '<button id="btn3" class="btn btn-primary" onclick="'+"closeDialog('pg3')"+'">'+locale.button.next+'</button>' +
                '<button id="btn4" class="btn btn-primary" style="display: none" onclick="'+"closeDialog('pg4')"+'" >'+locale.button.close+'</button>' +
            '</div></div> </div> </div> </div> </div>',
}; 

if(level != MAX_LEVEL && level != "2"){
    document.getElementById('skip-tut').style.display = "block"; 
} else {
    document.getElementById('skip-lvl').style.display = 'none'; 
}


function startGame() {
    window.location.search = "?lang="+locale.name+"&level=tut1"; 
    isNewGame=true; 
}

const levelList = ['tut1', 'tut2', 'tut3', 'tut4', 'tut5', 'tut6', 'tut7', 'tut8', '1', '2']; 
function nextLevel() {
    if (level !== MAX_LEVEL && level !== '2'){
        let current = levelList.findIndex((element) => element === level);  
        window.location.search = "?lang="+locale.name+"&level="+levelList[current+1]; 
        //location.reload()    
    }
    else if(level === '2'){
        localStorage.removeItem("level"); 
        sessionStorage.removeItem("lang-cng"); 
        window.location.href = "index.html";  
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
    else if (level !== "2" && s === 'none'){
        selectCharacter('robot'); 
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
        case "1":
            gameDesc.innerHTML = DESC.LEVEL1;
            break;
        case "2":
            document.getElementById("desc-tut").style.display = 'none'; 
            document.getElementById("desc-lvl").style.display = 'inline';
            document.getElementById("btn-tut").style.display = 'none'; 
            document.getElementById("btn-lvl").style.display = 'inline'; 
            gameDesc.innerHTML = DESC.LEVEL2;
            break;
        default:
            gameDesc.style.display = 'none'; 
            break;
    }
    if (window.performance.navigation.type != window.performance.navigation.TYPE_RELOAD) {
        if(level !== null){
            gameDesc.style.display = "block"; 

        }
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
            if(level !== "2")document.getElementById('gameDesc').style.display = "none"
            else{
                document.getElementById('pg4').style.display = "inline"; 
                document.getElementById('btn4').style.display = "inline";
                document.getElementById('desc4').style.display = "inline"; 
                }
            break; 
        case 'pg4':
            document.getElementById('gameDesc').style.display = "none";    
    }
    // var gameDesc = document.getElementById('gameDesc'); 
    // gameDesc.style.display = "none";
}

function LoadWinner(){
    document.getElementById("winner").style.display = "block"; 

}
 
