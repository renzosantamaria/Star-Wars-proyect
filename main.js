//CSS ANIMATIONS------------------------------------------------------------------
if(document.getElementsByClassName("planet-spec")[0].innerText.length == 0){
    document.getElementsByClassName("planet-spec")[0].classList.add("lds-ring")
}
else if(document.getElementsByClassName("planet-spec")[0].innerText.length > 0){
    document.getElementsByClassName("planet-spec")[0].classList.remove("lds-ring")
}
// -------------------------------------------------------------------------------------

// GLOBALA VARIABLER------------------------------------------------------------
let pageNum = 1 // Vi hämtar en character list från den första page som finns i API:n
let nombreTest = "Luke Skywalker" //Global funktion som vi använder för att hitta char Index



//GRUNDEN TILL ATT FÅ FRAM DATA FRÅN ETT API PÅ ETT ASYNCRONT SÄTT------------------
async function getStarWarsData(page) {//Gjorde om så att funktionerna tar emot ett page-number variabel som parameter
    const req = await fetch (`https://swapi.dev/api/people/?page= + ${page}`) // här blir våran fetch dynamiskt beroende på vilken sida man vill fetcha
    const res = await req.json()
    return res
};
var resultPromise = getStarWarsData(pageNum);
// -----------------------------------------------------------------------------------



//------------------------------------FUNKTION SOM PRINTAR ALLA CHARACTERS!!!---------
async function print() { //Skapar en funktion som enbart printar en lista på characters
    let result = await getStarWarsData(pageNum) // Sparar listan på ett variabel "result"

    document.querySelector(".loader").classList.remove("hidden")

    var a = document.getElementsByClassName("character")[0]
    a.innerHTML = "<ul>"

    for(var i = 0; i < result.results.length; i++){
        a.innerHTML += "<li>" + result.results[i].name + "</li>"
        if(i % 2 == 0) {
            document.getElementsByTagName("li")[i].classList.add("bg-color")
        }
    }

    document.querySelector(".loader").classList.add("hidden")
    // Vi lägger till en eventlistener här:
      let charInfo = document.querySelectorAll(".character li")
         for (let i = 0; i < charInfo.length; i++) {
             charInfo[i].addEventListener("click", function(){
                 clickOnCharacter(charInfo[i].innerText)
             })
           }
}
print()

//------------------------------------------------------------------------------------
async function getStarWarsPlanets(currentP) {
    const req = await fetch (`${currentP}`)
    const planetJson = await req.json()
    return planetJson
};
let testPlanet = `http://swapi.dev/api/planets/1/`
//getStarWarsPlanets(testPlanet)


// PRINTAR INFORMATION OM EN CHARACTER------------------------------------
async function clickOnCharacter(charName) {
    let currentPlanet = ""
    
    document.querySelector(".loader-right").classList.remove("hidden")//VISAR LOADING BAR
    let charInfo = await getStarWarsData(pageNum)// väntar på info från API
    
    var b = document.getElementsByClassName("character-spec")[0]//Rensar rutan innan man printar nästa characters info
    b.innerHTML = ""
    
    for (let i = 0; i < charInfo.results.length; i++){//loopar igenom hela character listan 
        if (charName == charInfo.results[i].name) {// söker efter en match
            var b = document.getElementsByClassName("character-spec")[0]
            //När den hittar en match använder vi oss av dess index för att hämta resterande data
            b.innerHTML += "<p>" + charInfo.results[i].name + "</p>"
            b.innerHTML += "<p>" + "Height: " + charInfo.results[i].height + "</p>"
            b.innerHTML += "<p>" + "Mass: " + charInfo.results[i].mass + "</p>"
            b.innerHTML += "<p>" + "Hair color: " + charInfo.results[i].hair_color + "</p>"
            b.innerHTML += "<p>" + "Skin color: " + charInfo.results[i].skin_color + "</p>"
            b.innerHTML += "<p>" + "Eye color: " + charInfo.results[i].eye_color + "</p>"
            b.innerHTML += "<p>" + "Birth_year: " + charInfo.results[i].birth_year + "</p>"
            b.innerHTML += "<p>" + "Gender: " + charInfo.results[i].gender + "</p>"
            currentPlanet = charInfo.results[i].homeworld
        }
    }
    let planetInfo = await getStarWarsPlanets(currentPlanet)

    var c = document.getElementsByClassName("planet-spec")[0]
    c.innerHTML = ""
    for (let i = 0; i < charInfo.results.length; i++){
        if (charName == charInfo.results[i].name) {
            var c = document.getElementsByClassName("planet-spec")[0]//När den hittar en match använder vi oss av dess index för att hämta resterande data
            
            c.innerHTML += "<p>" + planetInfo.name + "</p>"
            c.innerHTML += "<p>" + "Rotation period: " + planetInfo.rotation_period + "</p>"
            c.innerHTML += "<p>" + "Orbital period: " + planetInfo.orbital_period + "</p>"
            c.innerHTML += "<p>" + "Diameter: " + planetInfo.diameter + "</p>"
            c.innerHTML += "<p>" + "Climate: " + planetInfo.climate + "</p>"
            c.innerHTML += "<p>" + "Gravity: " + planetInfo.gravity + "</p>"
            c.innerHTML += "<p>" + "Terrain: " + planetInfo.terrain + "</p>"
        }
    }
    document.querySelector(".loader-right").classList.add("hidden")//TAR BORT LOADING BAR
}


//--------------------- KNAPPAR PREVIOUS AND NEXT---------------------
function nextPage() {
    if (pageNum < 9) {
        pageNum++
    }else{  // När man kommer till sista sidan kommer den att returnera dig till första
        pageNum = 1 
    }
    getStarWarsData(pageNum)
    print()
    document.querySelector("p .current-page").innerHTML = pageNum
 }
        
 function previousPage() {
    if (pageNum > 1) {
        pageNum-- 
    }else{// När man inte kan backa mer kommer den att skicka dig till sista sidan
        pageNum = 9
    }
    getStarWarsData(pageNum)
    print()
    document.querySelector("p .current-page").innerHTML = pageNum
}
