
var language; 
var locale; 

function changeLanguage(lang)
{
    location = "?lang=" + lang;
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

function setMsg(lang){

    //Header
    document.getElementById("file").textContent = lang.header.file;
    document.getElementById("new").innerHTML = lang.header.new
    document.getElementById("save").innerHTML = lang.header.save;
    document.getElementById("load").textContent = lang.header.load;

    //Button 
    document.getElementById("runButton").textContent = lang.button.run; 
    document.getElementById("stepButton").textContent = lang.button.step; 
    document.getElementById("resetButton").textContent = lang.button.reset;
    document.getElementById("view").textContent = lang.button.view;

}

function getMsg(){
    return language; 
}


