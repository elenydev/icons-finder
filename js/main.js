const mainContent=document.querySelector('.mainContent');
const mainContentIcons=document.querySelector('.mainContent__icons');
const mainContentHeader=document.querySelector('.mainContent__header');
const mainForm=document.querySelector('.mainForm');
const h3Alert=document.querySelector('.h3Alert');
const home=document.querySelector('#home');
const favourites=document.querySelector('#favourites');
const random=document.querySelector('#random');
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
    document.querySelector('.mainContent__icons').innerHTML=""
    const iconValue=document.querySelector('.iconValue').value;
    const numberOfIcons=parseInt(document.querySelector('.numberOfIcons').value);
    const h3=document.querySelector('.h3Alert');
    if(iconValue==="" || numberOfIcons<=0 || numberOfIcons>100){
        document.querySelector('.numberOfIcons').style.borderBottom="2px solid red";
        document.querySelector('.iconValue').style.borderBottom="2px solid red";
        h3Alert.style.display="block";
        h3Alert.textContent="Put correct values"
    }
    else if(iconValue!="" && numberOfIcons>=1 && numberOfIcons <=100){
    document.querySelector('.numberOfIcons').style.borderBottom="1px solid black";
    document.querySelector('.iconValue').style.borderBottom="1px solid black";
    h3Alert.style.display="none"
    const data= await searchIcons(iconValue,numberOfIcons)
    try{
        //Show icons on mainScreen
        mainContent.style.left="50%";
        mainContentHeader.innerHTML=`<i class="fas fa-arrow-left wrapperArrow" ><div class="deleteResult"></div></i>Results for: ${iconValue}`;
        for(let i=0; i<=numberOfIcons; i++){
            const href=`https://www.iconfinder.com/icons/${data.icons[i].icon_id}/download/png/512`
            document.querySelector('.mainContent__icons').innerHTML+=`<div class="icon-main">
            <img src="${data.icons[i].raster_sizes[4].formats[0].preview_url}"><a href="https://www.iconfinder.com/icons/${data.icons[i].icon_id}/free_bsd_freebsd_icon" target="_blank"><i class="fas fa-save"></i></a>
            <span class="star"><i class="fas fa-star"></span></i></div>`
        }
    }
    catch(err){
        mainContentHeader.innerHTML=`<i class="fas fa-arrow-left wrapperArrow" ><div class="deleteResult"></div></i>Results for: ${iconValue}`;
        console.log(err);
    }
    const allSpans=document.querySelectorAll('.star');
        allSpans.forEach(span=>{
            span.addEventListener('click', setLocalStorage);
        })
}
}
//CLEARING FUNCTION ON HOME
function showOnlyHome(){
    mainContent.style.left="-100%"
    document.querySelector('.mainNav__list').classList.remove('nav-active');
    document.querySelector('.favouritesContent').style.left="-50%";
    document.querySelector('.burger').style.transform="rotate(180deg)";
}
//DECLARE FUNCTION THAT WILL RETURN RANDOM ICONS
async function searchRandomIcons(arrs){
    const arr=arrs
    const API_SECRET="eZsT5vw3W46ifQCqEehkJrnFOQhRIvE6iaz293KaPvGvddSqnE18pSiEzUcNbLt2";
    const url=`https://cors-anywhere.herokuapp.com/https://api.iconfinder.com/v4/icons/search?query=${arr}&count=60&premium=0`;
    try{const connection= await fetch(url,{
        method: "GET",
     headers: {
        "Authorization": `Bearer  ${API_SECRET}`}
    });
    const response= await connection.json();
    return response;
    }
    catch(err){
        alert("Ooops, Something went Wrong");
    }

}
//MAKING RANDOM CONTENT
async function searchRandomIconsValues(){
    setTimeout(function(){
        document.querySelector('.mainNav__list').classList.remove('nav-active');
        document.querySelector('.burger').style.transform="rotate(180deg)";
    },2000);
    document.querySelector('.mainContent__icons').innerHTML=""
    let randomNumber=Math.floor(Math.random()*(9-0)+0);
    const arr=['arrow','sun','sky','smile','dark','eye','dot','dog','cat','cow']
    let arrRandom=arr[randomNumber]
    const data= await searchRandomIcons(arrRandom);
    console.log(data);
    try{
        //Show icons on mainScreen
        mainContent.style.left="50%";
        mainContentHeader.innerHTML=`<i class="fas fa-arrow-left wrapperArrow" ><div class="deleteResult"></div></i>Results for: ${arrRandom}`;
        for(let i=0; i<=60; i++){
            const href=`https://www.iconfinder.com/icons/${data.icons[i].icon_id}/download/png/512`
            document.querySelector('.mainContent__icons').innerHTML+=`<div class="icon-main">
            <img src="${data.icons[i].raster_sizes[4].formats[0].preview_url}"><a href="https://www.iconfinder.com/icons/${data.icons[i].icon_id}/free_bsd_freebsd_icon" target="_blank"><i class="fas fa-save"></i></a>
             <span class="star"><i class="fas fa-star"></span></i></div>`
        }
    }
    catch(err){
        mainContentHeader.innerHTML=`<i class="fas fa-arrow-left wrapperArrow" ><div class="deleteResult"></div></i>Results for: ${arrRandom}`;
        console.log(err);
    }
    const allSpans=document.querySelectorAll('.star');
        allSpans.forEach(span=>{
            span.addEventListener('click', setLocalStorage);
        })
    document.querySelector('.favouritesContent').style.left="-50%";
}
//ADDING ICON TO FAVOURITES
function setLocalStorage(e){
    let parent=this.parentElement;
    let icons;
        if(localStorage.getItem("icons")===null){
            icons=[];
        }
        else{
        icons=JSON.parse(localStorage.getItem("icons"))
        }
        icons.push(parent.innerHTML);
        localStorage.setItem("icons", JSON.stringify(icons));
        icons=JSON.parse(localStorage.getItem("icons"));
        document.querySelector('.favourites__icons').innerHTML+=`<div class="favourites-icon">${icons[icons.length-1]}</div>`;
            const delStar=document.querySelectorAll('.favourites-icon')
            delStar.forEach(star=>{
            star.lastChild.remove();
            const deleteSpan=document.createElement('span');
            deleteSpan.classList.add('deleteSpan')
            deleteSpan.innerHTML=`<i class="fas fa-times"></i>`;
            star.appendChild(deleteSpan);
            });
            let deleteIcons=document.querySelectorAll('.deleteSpan');
            deleteIcons.forEach(del =>{
            del.addEventListener('click', deleteIcon);
})}
//SHOW ICON IN FAVOURITES
function showLocalStorage(){
    let icons;
        if(localStorage.getItem("icons")<1){
            icons=[];
            return
        }
        else{
        icons=JSON.parse(localStorage.getItem("icons"));
        icons.forEach(function(icon){
            document.querySelector('.favourites__icons').innerHTML+=`<div class="favourites-icon">${icon}</div>`;
                const delStar=document.querySelectorAll('.favourites-icon')
                delStar.forEach(star=>{
                star.lastChild.remove();
                const deleteSpan=document.createElement('span');
                deleteSpan.classList.add('deleteSpan')
                deleteSpan.innerHTML=`<i class="fas fa-times"></i>`;
                star.appendChild(deleteSpan);
                })
                let deleteIcons=document.querySelectorAll('.deleteSpan');
                deleteIcons.forEach(del =>{
                del.addEventListener('click', deleteIcon);
            })
        })};

}
showLocalStorage();
//Showing favourites form menu
function showFavourites(){
    document.querySelector('.favouritesContent').style.left="50%";
    document.querySelector('.mainContent').style.left="-100%";
    setTimeout(function(){
        document.querySelector('.mainNav__list').classList.remove('nav-active');
    },2000);
    document.querySelector('.burger').style.transform="rotate(180deg)";
}
//hiding favourites
function hideFavourites(){
    document.querySelector('.favouritesContent').style.left="-50%"
}
//Delete favourite icon
function deleteIcon(){
    deleteElement=this.parentElement;
    console.log(deleteElement);
    removeIcon(deleteIcon);
    deleteElement.style.transform="scale(0)";
    deleteElement.addEventListener('transitionend', function(){
        deleteElement.remove();
    });
}

function removeIcon(icon){
    if(localStorage.getItem("icons")===null){
        icons=[];
    }
    else{
        icons=JSON.parse(localStorage.getItem("icons"));
    }
    const iconRemove=icon;
    icons.splice(icons.indexOf(iconRemove),1);
    localStorage.setItem("icons", JSON.stringify(icons));

}

///event Listeners

favourites.addEventListener('click', showFavourites);
random.addEventListener('click', searchRandomIconsValues);
home.addEventListener('click', showOnlyHome);
mainContentHeader.addEventListener('click', () =>{ mainContent.style.left="-100%";});
document.querySelector('.numberOfIcons').addEventListener('keyup', e => e.keyCode===13 && searchIconsValues());
document.querySelector('.mainForm__button').addEventListener('click', searchIconsValues);
document.querySelector('.favourites__header .wrapperArrow').addEventListener('click', hideFavourites);
document.querySelector('.mainNav__logo').addEventListener('click', showOnlyHome);


