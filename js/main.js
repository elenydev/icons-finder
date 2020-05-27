
//FUNCTION THAT PUSH REQUEST FOR ICONS
async function searchIcons(icons,counts){
    let icon=icons;
    let count=counts;
    const API_SECRET="eZsT5vw3W46ifQCqEehkJrnFOQhRIvE6iaz293KaPvGvddSqnE18pSiEzUcNbLt2";
    const url=`https://cors-anywhere.herokuapp.com/https://api.iconfinder.com/v4/icons/search?query=${icon}&count${count}`;
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
async function searchIconsValues(){
    const iconValue=document.querySelector('.iconValue').value;
    const numberOfIcons=document.querySelector('.numberOfIcons').value;
    try{ const data= await searchIcons(iconValue,numberOfIcons)
        console.log(data);
    console.log(iconValue, numberOfIcons);
    }
    catch(err){
        console.log(err);
    }
}


///event Listeners
document.querySelector('.iconValue').addEventListener('keyup', e => e.keyCode===13 && searchIconsValues())
