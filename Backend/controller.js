require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

/////// making a new sequelize object/////
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
})

///////////////////////////////////////


const archivesDB = require('./db.json')

let globalId = 3

module.exports = {
    createArchive: (req, res) =>{
        let {Title, Length, PlayerAmount, 
            Races, Victor, Paragraph}  = req.body

        let newArchive = {
        id: globalId,
        Title,
        Length,
        PlayerAmount,
        Races,
        Victor,
        Paragraph
        }

        //// sequalize query
        /// sequelize.query(`
        // INSERT INTO archives (gloabal_id, title, length, player_amount, races, victor, paragragh) 
        // VALUES (${globalId}, '${Title}',
        // '${Length}', '${PlayerAmount}',
        // '${Races}', '${Victor}',
        // '${Paragragh}');
        //////`)

        // sequelize.query(`
        //SELECT FROM archives
        // WHERE user_id = something;
        //`) .then((dbRes) => {
            // res.status(200).send(deRes[0])
        //})
        // .catch((err) => console.log(err))

        // res.status(200).send()
        archivesDB.push(newArchive)
        console.log(newArchive)
        console.log(archivesDB)
        res.status(200).send(archivesDB[archivesDB.length - 1])
        globalId++
    },
    
    getAllArchives: (req, res) => {
        // sequelize.query(
            //`
            // SELECT  archives, archive.user_id, users.user_id
            // FROM users
            // JOIN archives
            //  ON users.user_id = archives.user_id;
            //`)
            // .then((dbRes) => {
                // res.status(200).send(deRes[0])
           // })
           // .catch((error) => {
            // console.log(error)
          // }) 
        console.log(archivesDB)
        res.status(200).send(archivesDB)
    },

    deleteArchive: (req, res) => {
        // const {id} = req.params

        // sequelize.query(
            //`
            //DELETE 
            // FROM archives
            // WHERE ${id} = globalId;
            //`)
            // .then((dbRes) => {
            //   res.status(200).send(dbRes[0])
            //})
            // .catch((error) => {
            // console.log(error)
           // })
        console.log(req.params.id)
        let index =  archivesDB.findIndex((archive) => {
            return +archive.id === +req.params.id
        })
        archivesDB.splice(index, 1)
        res.status(200).send(archivesDB)
        console.log(archivesDB)
    },

    createUser: (req, res) => {
        let {userName, password} = req.body
        console.log(userName)

        saltRounds = 10
       
        bcrypt.hash(password, saltRounds, (error, passwordHash) => {
           let  returnedPassword = passwordHash
            return returnedPassword
        })
        ///// here we will use sequalize for db
        sequelize.query(`
            INSERT INTO users (name, password)
            VALUE ('${userName}', '${returnedPassword}');
        `)
        sequelize.query(
            `
            SELECT users.username, users.user_id
            FROM users
            WHERE users.username = '${userName}', 
            `)
        .then((dbRes) =>{
            res.status(200).send(dbRes[0])
        })
        .catch((error) =>{
            console.log(error)
        })
    },

    deleteUser: (req, res) => {
        let {id} = req.params

        sequelize.query(
            `
                DELETE 
                FROM archives 
                WHERE archives.user_id = users.user_id;
            `)

            sequelize.query(
                `
                    DELETE 
                    FROM users
                    WHERE users.user_id = ${id}
                `)
                .then(() => {
                    res.status(200).send()
                })
                .catch((error) => {
                    console.log(error)
                })
    }
}