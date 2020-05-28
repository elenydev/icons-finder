const mainContent=document.querySelector('.mainContent');
const mainContentIcons=document.querySelector('.mainContent__icons');
//NAV BAR ANIMATION
const navSlide=()=>{
    const burger=document.querySelector('.burger');
    const slider=document.querySelector('.mainNav__list');
    const navLinks=document.querySelectorAll('.mainNav__list__item');
    //toogle NAV
    burger.addEventListener('click', function(){
        slider.classList.toggle('nav-active');

    //Animate links
    navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation='';
        }
        else{
            link.style.animation=`navLinkFade 0.5s linear forwards ${index / 5 + 1 }s`;
        }
    })
    burger.classList.toggle('toggle');
})
}
navSlide();
//FUNCTION THAT PUSH REQUEST FOR ICONS
async function searchIcons(icons,counts){
    let icon=icons;
    let count=counts;
    const API_SECRET="eZsT5vw3W46ifQCqEehkJrnFOQhRIvE6iaz293KaPvGvddSqnE18pSiEzUcNbLt2";
    const url=`https://cors-anywhere.herokuapp.com/https://api.iconfinder.com/v4/icons/search?query=${icon}&count=${count}&premium=0`;
    try{const connection= await fetch(url,{
        method: "GET",
     headers: {
        "Authorization": `Bearer  ${API_SECRET}`}
    });
    const response= await connection.json();
    return response;
    }
    catch(err){
        console.log("Ooops, Something went Wrong");
    }
}
///Looking for ICON,NUMBER OF ICONS
async function searchIconsValues() {
    const iconValue=document.querySelector('.iconValue').value;
    const numberOfIcons=document.querySelector('.numberOfIcons').value;
    try{ let data= await searchIcons(iconValue,numberOfIcons)
        console.log(data);
        //Show icons on mainScreen
        for(let i=0; i<=numberOfIcons; i++){
            document.querySelector('.mainContent__icons').innerHTML+=`<a href="https://www.iconfinder.com/icons/${data.icons[i].icon_id}" class="icon-main"><img src="${data.icons[i].raster_sizes[4].formats[0].preview_url}"></a>`
        }
        // mainContent.style.left="50%";
    }
    catch(err){
        console.log(err);
    }
}
///event Listeners
document.querySelector('.wrapperArrow').addEventListener('click', (e) =>{
e.preventDefault();
mainContent.style.left="-100%";
})
document.querySelector('.iconValue').addEventListener('keyup', e => e.keyCode===13 && searchIconsValues());
document.querySelector('.mainForm__button').addEventListener('click', searchIconsValues);

