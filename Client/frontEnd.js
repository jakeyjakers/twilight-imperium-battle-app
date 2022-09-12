console.log("Test")

//////fake database of player num and races/////////
const racesArr = ['Arborec', 'Barony Of Letnav', 'Clan Of Saar', 'Embers OF Muatt', 'Emirates Of Haccan', 
'Federation Of Sol', 'Ghosts Of Creus', 'The L1Z1X Mindnet', 'Mentak Coalition', 'Nallu Collective', 'Nekro Virus', 
'Sardak N\'orr', 'Universities OF Jol-Nar', 'Winnu', 'The Yinn Brotherhood', 'Yssaril Tribes', 'Argent Flight', 
'The Empyrean', 'The Mahact Gene-Sorcerers', 'Naaz-Rohka Allience', 'The Nomad', 'The Titans Of Ul', 'The Vul-Wraith Cabal']

const playerAmountArr = [3, 4, 5, 6, 7, 8]


//////////Grabbing all elements to be used in application///////

////////Archive form/////////////
const cardContainer = document.querySelector('.card-container')

const archiveForm = document.querySelector('.archive-form')

const gameTitle = document.getElementById('game-title')

const length = document.getElementById('length')

const playerNumSelect = document.getElementById('player-num-select')

const playerNumText = playerNumSelect.options[playerNumSelect.selectedIndex].text

const playerOption = document.querySelectorAll('option')

const races = document.getElementById('races')

const victor = document.getElementById('victor')

const textArea = document.getElementById('text-area')

const archiveBtn = document.querySelector(".archive-button")

/////////Archive form////////////////////////////////////

////////////////random game generator form///////////////

const randomGenerator = document.getElementById("random-gen")

const randNumPlayerInput = document.getElementById('random-num-players')

const randGenBtn = document.getElementById('gen-btn')

const randomGameCardContainer = document.getElementById('random-game-section')

////////////////random game generator form///////////////

/////dice roller////////
const diceRollerDisplay = document.getElementById('dice-roller-display')

const diceRollerBtn = document.getElementById('dice-roller-button')

const diceRollerParent = document.querySelector('.dice-roller')

/////////display activation buttons////////

const archiveActivationButton = document.getElementById("archive-activation-button")

const diceRollerActivationButton = document.getElementById("dice-roller-activation")

const randomGeneratorActivationButton = document.getElementById("random-generator-button" )

//////////////////////miiscellaneous functions//////////////////////////

////////////////////diceroller function//////////////////////

const diceRoller = () => {
   let initiative = Math.floor(Math.random() * 10) +1
   console.log(initiative)
    diceRollerDisplay.textContent = `Initiative: ${initiative}`
}

diceRollerBtn.addEventListener('click', diceRoller)

///////////////////dice roller display function/////////////////////

const toggleDisplay = () => {
    console.log('toggle display test')
    console.log(diceRollerParent)
    diceRollerParent.classList.toggle('hidden')
  
}

diceRollerActivationButton.addEventListener('click', toggleDisplay)

///////////////////archive form display function////////////////////

const toggleDisplayArchive = () =>{
    console.log('toggle2 test')
    console.log(archiveForm)
    archiveForm.classList.toggle('hidden')
    
}

archiveActivationButton.addEventListener('click', toggleDisplayArchive)

////////////////random game generator function/////////////////

const toggleDislpayRandomGenerator = () => {
    console.log("toggle 3 test")
    console.log(randomGenerator)
    randomGenerator.classList.toggle('hidden')

}

randomGeneratorActivationButton.addEventListener('click', toggleDislpayRandomGenerator)

/////////////////////clear form functions//////////////////////////

const clearFormArchive = () => {
    archiveForm.reset()
}

const clearFormRandomGenerator = () =>{
    randomGenerator.reset()
}

//////////////////////////////////////////////////////////////

/////////////axios and form submit functions////////////////

//////// acrchives callback/////////////////

const archivesCallback = ({data: archivesDB}) => displayArchives(archivesDB)

/////////////// get all archives ////////////////////

const getAllArchives = (() => {

    axios.get('/api/archives')

    .then(archivesCallback)
    
    .catch((error) => {
        console.log(error)
    })
})

///////////////// delelte archives function/////////////////////

const deleteArchive = id => axios.delete(`/api/archives/${id}`).then(archivesCallback).catch(error => console.log(error))


const displayArchives = (arr) => {

    cardContainer.innerHTML=``

    for ( let i = 0; i < arr.length; i ++) {

        createArchiveCards(arr[i])
        
    }
}

/////////////// create archives used with the get request and archivecallback/////////////////////////

const createArchiveCards = (archivesDB) => {

    const archiveCard = document.createElement('div')

    archiveCard.classList.add('archive-card')

    archiveCard.innerHTML=
    
    `
    <h5 class="archive-info">Game Title: ${archivesDB.Title}</h5>
            <h5 class="archive-info">Game Length: ${archivesDB.Length}</h5>
            <h5 class="archive-info">Amount Of Players: ${(archivesDB.PlayerAmount)}</h5>
            <h5 class="archive-info" id="races-box">Races: ${archivesDB.Races}</h5>
            <h5 class="archive-info">Victor: ${archivesDB.Victor}</h5>
            <p class="archive-info scroll">${archivesDB.Paragraph}.</p>
            <button id="delete-btn" onclick="deleteArchive(${archivesDB.id})">Wipe Archive</button>
    `
   
    cardContainer.appendChild(archiveCard)

}

//////////////////// create archive -- used with the post, archive form///////////

const createArchive = ((body) => {

    axios.post('/api/archives', body)

    .then((response) => {
        let {id,
            Title,
            Length,
            PlayerAmount,
            Races,
            Victor,
            Paragraph
            } = response.data

        console.log(id, Title, Length, PlayerAmount, Races, Victor, Paragraph)
        
        const archiveCard = document.createElement('div')

        archiveCard.classList.add('archive-card')

        archiveCard.innerHTML=
        
        `
        <h5 class="archive-info">Game Title: ${Title}</h5>
                <h5 class="archive-info">Game Length: ${Length}</h5>
                <h5 class="archive-info">Amount Of Players: ${(PlayerAmount)}</h5>
                <h5 class="archive-info" id="races-box">Races: ${Races}</h5>
                <h5 class="archive-info">Victor: ${Victor}</h5>
                <p class="archive-info scroll">${Paragraph}.</p>
                <button id="delete-btn" onclick="deleteArchive(${id})">Wipe Archive</button>
        `   

        cardContainer.appendChild(archiveCard)

    })
    .catch((error) => {
        console.log(error)
    })
})

////////////////////// form submit --- for submitting the archive form /////

const submitArchiveForm = (event) =>{
    event.preventDefault()

/////////////// Here we are getting the info from the archive form, and making and object for it,
///////////// to be sent to createArchive function, then to the backend server and databse
    
    let bodyObj = {

        Title: gameTitle.value.trim(),
        Length: length.value.trim(),
        PlayerAmount: playerNumText,
        Races: races.value.trim(),
        Victor: victor.value.trim(),
        Paragraph: textArea.value,

    }

        createArchive(bodyObj)

        clearFormArchive()

}

//////function to randomly select players form 3-8//////
const randomGameStart = (event) =>{
    event.preventDefault()
    console.log('test for randomdgamestart')

////////////// Here we are taking the input from the from the random genrator form, and making sure it is a number//
////////// Then we declare and empty array for info to be stored, and a seat number//////////

    let randomPlayerAmount = +randNumPlayerInput.value
    let playerArr = []
    let seatNumber = 1
    
//////////// Here we are initializing a for loop, that inside of it will grab a random faction/race from an 
///// data array, then we will insert that as well as a seat number for it, into the playerArr    

    for(let i = 0; i < randomPlayerAmount; i++){
        
        let randomlyChosenRaces = racesArr[Math.floor(Math.random()*racesArr.length)]

///////// When a race gets chosen, it will get rmoved from the old data array, to insure it will not get picked a 
///////// a second or third time for setting up the game.

        playerArr.push(`Slice ${seatNumber}, ${randomlyChosenRaces},`)

        seatNumber++

        let index = racesArr.findIndex((races) => {
            
        return races === randomlyChosenRaces  

        })

        racesArr.splice(index, 1)

    }
    console.log(playerArr)
   
///////////// Here we will create a div element, and add a css class to it

    const randomGameCard = document.createElement('div')
    
    randomGameCard.classList.add('random-game-card')

//////////// Here we will inititate another for loop which will loop over the new playerArr(see previous loop)
///////////// An element will be created for each item in the arry, which will then have a css class added to it

    for(let i = 0; i < playerArr.length; i++){

        console.log(playerArr[i])

        let playerInfo = document.createElement('h5')

        playerInfo.textContent = playerArr[i]

        console.log(playerInfo)
        
        playerInfo.classList.add('random-game-info')  

//////// Each element will now be appended to the div card

        randomGameCard.appendChild(playerInfo)
        
    }

////////// The parent div will now be appended to the DOM

    randomGameCardContainer.appendChild(randomGameCard)

    clearFormRandomGenerator()

}

////function to randomly choose races based off of random players//////

archiveForm.addEventListener('submit', submitArchiveForm)

randomGenerator.addEventListener('submit', randomGameStart)

getAllArchives()