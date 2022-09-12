const userName = document.getElementById('username')

const password = document.getElementById('password')

const passwordCheck = document.getElementById('password-check')

/////////// submit sign up function////////////////

const submitSignUp = (event) => {
    event.preventDefault()

    if (userName.length < 10 && password !== passwordCheck) {
    alert(`Please enter a valid username and make sure your pasword and password check match.`)    
    }
    else {
        let userObj = {

            userName: userName.value,
            password: password.value

        }
        createUser(userObj)
    }
    
}

///////// create user function used with sign up/////////////

const createUser = (body) => {
    axios.post('/api/archives/signup', body)
    .then((response) => {
        let {userName} = response.data
        alert(`Thank you for making an account${userName}! \n Stay as long as you wish. May your battles be remembered forever.`)

        createAcountInfo(response.data)
    })

}

const createAcountInfo = (data) =>{
    let {userName, id} = data

    const userInfo = document.createElement('div')

    userInfo.innerHTML = `
        <h2>Username: </h2>
        <span>${userName}</span>
        <button onclick="deletUser(${id})"</button>
    `
}

/////// delete user function//////////

const deleteUser = (id) => {
    axios.delete(`/api/archives/user/${id}`)
    .then(() =>{
        // something or another
    })
    .catch((error) => {
        console.log(error)
    })
}
