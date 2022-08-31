console.log("Test")

//////fake database of player num and races/////////
const racesArr = ['Arborec', 'Barony Of Letnav', 'Clan Of Saar', 'Embers OF Muatt', 'Emirates Of Haccan', 
'Federation Of Sol', 'Ghosts Of Creus', 'The L1Z1X Mindnet', 'Mentak Coalition', 'Nallu Collective', 'Nekro Virus', 
'Sardak N\'orr', 'Universities OF Jol-Nar', 'Winnu', 'The Yinn Brotherhood', 'Yssaril Tribes', 'Argent Flight', 
'The Empyrean', 'The Mahact Gene-Sorcerers', 'Naaz-Rohka Allience', 'The Nomad', 'The Titans Of Ul', 'The Vul-Wraith Cabal']

const playerAmountArr = [3, 4, 5, 6, 7, 8]

const colors = ['Blue', 'Green', 'Yellow', 'Black', 'Orange', 'Pink', 'Purple', 'Red']

//////////Grabbing all elements to be used in application///////

////////Archive form/////////////
const cardContainer = document.querySelector('.card-container')

const archiveForm = document.querySelector('.archive-form')

const gameTitle = document.getElementById('game-title')

const length = document.getElementById('length')

const playerNumSelect = document.getElementById('player-num-select')////maybe we'll have to use this, maybe not. Or just the options in it///////////

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
    let x = diceRollerParent
    if(x.style.display === "none") {
        x.style.display = 'unset'
    } else {
        x.style.display = 'none'
    }
};

diceRollerActivationButton.addEventListener('click', toggleDisplay)

///////////////////archive form display function////////////////////

const toggleDisplayArchive = () =>{
    console.log('toggle2 test')
    console.log(archiveForm)
    let x = archiveForm
    if ( x.style.display === 'none') {
        x.style.display = 'unset'
    } else {
        x.style.display = 'none'
    }
}

archiveActivationButton.addEventListener('click', toggleDisplayArchive)

////////////////random game generator function/////////////////

const toggleDislpayRandomGenerator = () => {
    console.log("toggle 3 test")
    console.log(randomGenerator)
    let x = randomGenerator
    if ( x.style.display === 'none') {
        x.style.display = 'unset'
    } else {
        x.style.display = 'none'
    }
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


const archivesCallback = ({data: archivesDB}) => displayArchives(archivesDB).catch(error => console.log(error)) ///working on this last night, tuesday///

const getAllArchives = (() => {

    axios.get('http://localhost:4077/api/archives')

    .then(archivesCallback)
    
    .catch((error) => {
        console.log(error)
    })
})


const deleteArchive = ((id) =>{
    axios.delete(`http://localhost:4077/api/archives/${id}`)

    .then(archivesCallback)

    .catch((error) => {
        console.log(error)
})

})


const displayArchives = (arr) => {
    for ( let i = 0; i < arr.length; i ++) {
        createArchiveCards(arr[i])
    }
}

const createArchiveCards = (archivesDB) => {

    const archiveCard = document.createElement('div')
    archiveCard.classList.add('archive-card')

    const archiveTitle = document.createElement('h5')
    const archiveLength = document.createElement('h5')
    const archivePlayerAmount = document.createElement('h5')  
    const archiveRaces = document.createElement('h5')
    const archiveVictor = document.createElement('h5')
    const archiveParagraph = document.createElement('p')
    const archiveDeleteBtn = document.createElement('button').onclick = deleteArchive(`${archivesDB.id}`)


    archiveTitle.textContent = `Game Title: ${archivesDB.Title}`
    archiveLength.textContent = `Game Length: ${archivesDB.Length}`
    archivePlayerAmount.textContent = `Amount Of Players: ${(archivesDB.PlayerAmount)}`
    archiveRaces.textContent = `Races: ${archivesDB.Races}`
    archiveVictor.textContent = `Victor ${archivesDB.Victor}`
    archiveDeleteBtn.innerHTML = `Wipe Archive`
    archiveParagraph.textContent = `${archivesDB.Paragraph}`

    
    archiveCard.appendChild(archiveTitle)
    archiveCard.appendChild(archiveLength)
    archiveCard.appendChild(archivePlayerAmount)
    archiveCard.appendChild(archiveRaces)
    archiveCard.appendChild(archiveVictor)
    archiveCard.appendChild(archiveDeleteBtn)
    archiveCard.appendChild(archiveParagraph)
    cardContainer.appendChild(archiveCard)

}


const createArchive = ((body) => {
    axios.post('http://localhost:4077/api/archives', body)

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
        const archiveTitle = document.createElement('h5')
        const archiveLength = document.createElement('h5')
        const archivePlayerAmount = document.createElement('h5')  ////in final draft look at adding loop to add classes for shorter code///
        const archiveRaces = document.createElement('h5')
        const archiveVictor = document.createElement('h5')
        const archiveParagraph = document.createElement('p')
        const archiveDeleteBtn = document.createElement('button') //.onclick = deleteArchive(`${id}`)
        archiveCard.classList.add('archive-card')

//////////////////////////// had to stop due to class starting, was working on putting the vaules from the ////
////////////////////////   returned data object into the card values/////////////////
        
        archiveTitle.textContent = `Game Title: ${Title}.`
        archiveLength.textContent = `Game Length: ${Length}`
        archivePlayerAmount.textContent = `Amount Of Players: ${(PlayerAmount)}`
        archiveRaces.textContent = `Races: ${Races}`
        archiveVictor.textContent = `Victor ${Victor}`
        archiveDeleteBtn.innerHTML = `Wipe Archive`
        archiveParagraph.textContent = `${Paragraph}`


        archiveCard.appendChild(archiveTitle)
        archiveCard.appendChild(archiveLength)
        archiveCard.appendChild(archivePlayerAmount)
        archiveCard.appendChild(archiveRaces)
        archiveCard.appendChild(archiveVictor)
        archiveCard.appendChild(archiveDeleteBtn)
        archiveCard.appendChild(archiveParagraph)
        cardContainer.appendChild(archiveCard)
        

    })
    .catch((error) => {
        console.log(error)
    })
})

const submitArchiveForm = (event) =>{
    event.preventDefault()
    ///logic to check if form is even filled out///

    /////////// making axios call, post, creating objec and sending it to backend/////////////
    
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
    //we need to somehow take the value of the random plyer input

    let randomPlayerAmount = +randNumPlayerInput.value
    let playerArr = []
    let seatNumber = 1
    //then somehow take that value and grab the races from the racesArr equivalent the randome player input
    for(let i = 0; i < randomPlayerAmount; i++){
        
        //////asign colors to races///////
        

        let randomlyChosenRaces = racesArr[Math.floor(Math.random()*racesArr.length)]


        playerArr.push(`Slice ${seatNumber}, ${randomlyChosenRaces},`)

        seatNumber++

        // return playerArr

    }
    console.log(playerArr)
    ///loop over playerstr and split it//

    const randomGameCard = document.createElement('div')
    randomGameCard.classList.add('random-game-card')

    for(let i = 0; i < playerArr.length; i++){

        ///during the loop each substring will be attached to a created element
        console.log(playerArr[i])
        let playerInfo = document.createElement('h5')
        playerInfo.textContent = playerArr[i]
        console.log(playerInfo)
        playerInfo.classList.add('random-game-info')
        // console.log(playerInfo)
        // let playerInfo = document.createElement('h5').classList.add('random-game-info').textContent = playerArr[i]
        // console.log(playerInfo)
        // playerInfo.classList.add('random-game-info')

        // randomGameCard.appendChild(document.createElement('h5').textContent = playerArr[i]).classList.add('random-game-card')
        

        ///then each element will be appended to the DOM in some fashion. maybe a card, with race pics?
        randomGameCard.appendChild(playerInfo)
    }
    cardContainer.appendChild(randomGameCard)

    //then assign those races to a seat number

    //then push them to a new variable, 

    //then append that to the DOM
    clearFormRandomGenerator()

}


////function to randomly choose races based off of random players//////

archiveForm.addEventListener('submit', submitArchiveForm)

randomGenerator.addEventListener('submit', randomGameStart)

getAllArchives()