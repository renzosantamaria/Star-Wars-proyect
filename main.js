// GLOBALA VARIABLER------------------------------------------------------------
let pageNum = 1 // Vi hämtar en character list från den första page som finns i API:n
// let vehicleId;
// console.log(vehicleId)

//GRUNDEN TILL ATT FÅ FRAM DATA FRÅN ETT API PÅ ETT ASYNCRONT SÄTT------------------
async function getStarWarsData(page) {//Gjorde om så att funktionerna tar emot ett page-number variabel som parameter
    const req = await fetch (`https://swapi.dev/api/people/?page= + ${page}`) // här blir våran fetch dynamiskt beroende på vilken sida man vill fetcha
    const res = await req.json()
    return res
};

//------------------------------------FUNKTION SOM PRINTAR ALLA CHARACTERS!!!---------
async function print() { //Skapar en funktion som printar en lista på characters 
    document.querySelector(".Planet").classList.add("darker-color-btn")
    // document.querySelector(".Planet").style.background = "rgba(142, 142, 142, 1)"
    

    document.querySelector(".characters-list-wrapper").classList.remove("hidden")// visar preloader --> Här kan man ändra olika preloaders
    document.querySelector(".character").classList.add("hidden")
    let result = await getStarWarsData(pageNum) // Sparar listan på ett variabel "result"
    // console.log(result.results[0].vehicles[0])
    
    var a = document.getElementsByClassName("character")[0]
    a.innerHTML = "<ul>"
    
    for(var i = 0; i < result.results.length; i++){
        a.innerHTML += "<li>" + result.results[i].name + "</li>"
        if(i % 2 == 0) {
            document.getElementsByTagName("li")[i].classList.add("bg-color")
        }
    }
    
    // Vi lägger till en eventlistener här:
    let charInfo = document.querySelectorAll(".character li")
    for (let i = 0; i < charInfo.length; i++) {
        charInfo[i].addEventListener("click", function(){
            clickOnCharacter(charInfo[i].innerText)
        })
    }
    document.querySelector(".characters-list-wrapper").classList.add("hidden") //döljer preloader
    document.querySelector(".character").classList.remove("hidden")
}
print()

//---------------------HÄMTAR PLANETENS DATA-----------------------------------------
async function getStarWarsPlanets(currentP) {

    document.querySelector(".lsd-ring-planet-info").classList.remove("hidden")
    document.querySelector(".planet-spec").classList.add("hidden")

    const req = await fetch (`https://swapi.dev/api/planets/ + ${currentP}`)
    const planetJson = await req.json()
    
    document.querySelector(".lsd-ring-planet-info").classList.add("hidden")
    document.querySelector(".planet-spec").classList.remove("hidden")
    return planetJson
};

//---------------------HÄMTAR VEHICLES DATA-----------------------------------

// async function getStarWarsVehicles(currentV){

//     const req = await fetch (`https://swapi.dev/api/vehicles/ + ${currentV}`)
//     const vehicleJson = await req.json()
//     return vehicleJson
//}

// PRINTAR INFORMATION OM EN CHARACTER------------------------------------
async function clickOnCharacter(charName) {
    let currentPlanet = ""
    let currentVehicle;
    // let planetId;
    

    document.querySelector(".lsd-ring-char-info").classList.remove("hidden")
    document.querySelector(".character-spec").classList.add("hidden")

    document.querySelector(".Planet").style.background = "rgba(142, 142, 142, 1)"
    document.querySelector(".Species").style.background = "rgba(235, 235, 235, 1)"
    document.querySelector(".Vehicles").style.background = "rgba(235, 235, 235, 1)"
    document.querySelector(".Starships").style.background = "rgba(235, 235, 235, 1)"
    
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
            b.innerHTML += "<p>" + "Birth year: " + charInfo.results[i].birth_year + "</p>"
            b.innerHTML += "<p>" + "Gender: " + charInfo.results[i].gender + "</p>"
            currentPlanet = charInfo.results[i].homeworld
            // currentVehicle = charInfo.results[i].vehicles[0]
            // console.log(currentVehicle)

        }
    }
        
    for (let i = 0; i < currentPlanet.length; i++) {
        if (currentPlanet.length == 31) {
            planetId = currentPlanet[currentPlanet.length - 2] + "/"
        }
        else{
            planetId = currentPlanet[currentPlanet.length - 3] + currentPlanet[currentPlanet.length - 2] + "/"
        }
    }
    // PRINTAR PLANETENS INFORMATION----------------------------
    let planetInfo = await getStarWarsPlanets(planetId)
    
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
    // -------------------------------------------------------------

       
    // vehicleId = currentVehicle[currentVehicle.length - 3] + currentVehicle[currentVehicle.length - 2] + "/"
    // console.log(vehicleId)
      

    document.querySelector(".lsd-ring-char-info").classList.add("hidden")
    document.querySelector(".character-spec").classList.remove("hidden")
    // return vehicleId
}

// async function printVehicles() {
//     let vehicleInfo = await clickOnCharacter()
//     console.log(vehicleInfo)
//     var d = document.getElementsByClassName("planet-spec")[0]
//     d.innerHTML = ""
//     for (let i = 0; i < charInfo.results.length; i++){
//         if (charName == charInfo.results[i].name) {
//             var c = document.getElementsByClassName("planet-spec")[0]//När den hittar en match använder vi oss av dess index för att hämta resterande data
            
            // c.innerHTML += "<p>" + vehicleInfo.name + "</p>"
            // c.innerHTML += "<p>" + "Rotation period: " + vehicleInfo.rotation_period + "</p>"
            // c.innerHTML += "<p>" + "Orbital period: " + vehicleInfo.orbital_period + "</p>"
            // c.innerHTML += "<p>" + "Diameter: " + vehicleInfo.diameter + "</p>"
            // c.innerHTML += "<p>" + "Climate: " + vehicleInfo.climate + "</p>"
            // c.innerHTML += "<p>" + "Gravity: " + vehicleInfo.gravity + "</p>"
            // c.innerHTML += "<p>" + "Terrain: " + vehicleInfo.terrain + "</p>"
//         }
//     }
// }

// printVehicles()
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

let btnListener = document.querySelectorAll(".extra-info-buttons")
for (let i = 0; i < btnListener.length; i++) {

    btnListener[i].addEventListener("click", function(){
        
        document.querySelector(".Planet").style.background = "rgba(235, 235, 235, 1)"
        document.querySelector(".Species").style.background = "rgba(235, 235, 235, 1)"
        document.querySelector(".Vehicles").style.background = "rgba(235, 235, 235, 1)"
        document.querySelector(".Starships").style.background = "rgba(235, 235, 235, 1)"

        let currentClass = `.${btnListener[i].innerHTML}`
        document.querySelector(currentClass).style.background = "rgba(142, 142, 142, 1)" 
        
    })
}
