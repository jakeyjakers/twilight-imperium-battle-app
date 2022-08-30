const archivesDB = require('./db.json')

let globalId = 3

module.exports = {
    createArchive: (req, res) =>{
        let {archiveTitle, archiveLength, archivePlayerAmount, 
            archiveRaces, archiveVictor, archiveParagraph}  = req.body

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
        res.status(200).send(archivesDB[archivesDB.length - 1])
        globalId++
    },
    
    getAllArchives: (req, res) => {

    },

    deleteArchive: (req, res) => {

    },
}