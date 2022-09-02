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

        archivesDB.push(newArchive)
        console.log(newArchive)
        console.log(archivesDB)
        res.status(200).send(archivesDB[archivesDB.length - 1])
        globalId++
    },
    
    getAllArchives: (req, res) => {
        console.log(archivesDB)
        res.status(200).send(archivesDB)
    },

    deleteArchive: (req, res) => {
        console.log(req.params.id)
        let index = archivesDB.findIndex((archive) => {
            return archive.id === req.params.id
        })
        archivesDB.splice(index, 1)
        res.status(200).send(archivesDB)
        console.log(archivesDB)
    },
}