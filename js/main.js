import  {check_name,capitalize}  from  "./functions.js" ;
window.addEventListener("load",function(){
    let addButton=document.querySelector("button");
    // let addButton=document.querySelector("input[value='Play Now']");
    let nameTxtBox=document.querySelector("input[name=name]");
    let nameError=document.querySelector("span#nameError");

    nameTxtBox.onkeypress = function(event){
        if(!isNaN(event.key))
            event.preventDefault();
    };
    addButton.onclick = function(){
        if (!nameTxtBox.value.trim())return;
        console.log("Play Now");
        console.log(nameTxtBox.value.trim());
        let name = capitalize(nameTxtBox.value.trim());
        let flag = check_name(nameError,name);
        console.log(name);
        
        if(flag==0){
            name = capitalize(name);
            // console.log(name);
            // window.location.href = "/game.html?name="+name;
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=0,top=0`;
            let popup = window.open("game.html?name="+name, 'Ducks Shooting', params);
            // console.log(popup);
            if (popup) {
                popup.focus();
            } else {    
                alert('Please allow popups for this website');
                window.location.href = "game.html?name="+name;
            }
            // console.log(popup.closed);
        }
        // preventDefault();
        
    }



});
