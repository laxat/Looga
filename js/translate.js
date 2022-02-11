
var language; 
var locale; 

function changeLanguage(lang)
{
    sessionStorage.setItem("lang-cng", true); 
    saveToSession(playerSelect.name); 
    window.location.search = "?lang="+lang+"&level="+level; 
    
    //location = "?lang=" + lang;
    //loadFromLocal();
    //location.reload();

}

if (window.location.search)
{
    var langName = new URLSearchParams(window.location.search).get('lang');
    switch (langName)
    {
        case "ar":
            language = lang.ar
            setMsg(lang.ar);
            break;  
        case "en": 
            language = lang.en
            setMsg(lang.en);
            break;  
        default: 
            language = lang.en
            setMsg(lang.en); 
            break; 
    }

}

function changeElement(str, val){
    document.getElementById(str).innerHTML = val; 
}

function setMsg(lang){

    //Areas
    document.getElementById("view").innerHTML = '<img src="common/icons/view.svg"><span>'+lang.button.view+'</span>';
    document.getElementById("code").innerHTML = '<img src="common/icons/code.svg"><span>'+lang.button.code+'</span>';
    
    //Header
    changeElement('save', lang.header.save);
    changeElement('load', lang.header.load); 
    changeElement('new', lang.header.new); 
    changeElement('file', lang.header.file); 
    changeElement('help', lang.header.help); 
    changeElement('level-select', lang.header.select); 
    changeElement('jump', lang.header.jumpTo); 
    changeElement('skip-lvl', lang.header.skipLvl); 
    changeElement('skip-tut', lang.header.skipTut); 


    //Load Game Modal
    changeElement('load-title', lang.desc.load.title); 
    changeElement('load-info', lang.desc.load.info); 
    document.getElementById("loadBtn").innerHTML = lang.desc.load.title +  '<i class="fa fa-file" aria-hidden="true"></i>'; 

    //New Game Modal
    changeElement('new-title', lang.desc.new.title); 
    changeElement('new-info', lang.desc.new.info);
    document.getElementById("newBtn").innerHTML = lang.desc.new.title + '<i class="fa fa-gamepad" aria-hidden="true"></i>'; 

    //Win Game Modal
    changeElement('win-title', lang.desc.winner.title); 
    changeElement('desc-tut', lang.desc.winner.levelInfo); 
    changeElement('desc-lvl', lang.desc.winner.gameInfo); 
    changeElement('btn-tut', lang.button.nextLevel); 
    changeElement('btn-lvl', lang.button.home); 
}

function getMsg(){
    return language; 
}




