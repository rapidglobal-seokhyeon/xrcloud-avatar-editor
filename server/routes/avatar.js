const express = require('express')
const router = express()
const { XMLBuilder, XMLParser } = require('fast-xml-parser')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: process.env.AVARTAR_UPLOAD_PATH })

const options = {
    ignoreAttributes: false,
    format: true
}

const builder = new XMLBuilder(options)

router.get('/:userId', (req, res) => {
    const userAvatarFolderPath = `${process.env.AVARTAR_UPLOAD_PATH}/${req.params.userId}`
    if (!fs.existsSync(`${userAvatarFolderPath}/${req.params.userId}.xml`)) {
        res.status(500).send('File not found')
        return
    }
    res.type('text/xml')

    fs.readFile(`${userAvatarFolderPath}/${req.params.userId}.xml`, 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }
        const parser = new XMLParser()
        const jsonData = parser.parse(data)
        res.send(jsonData.Avatar)
    })
})

router.post('/:userId', upload.single('avatarFile'), (req, res) => {
    const output = `<?xml version="1.0" encoding="UTF-8"?>
${builder.build({
    Avatar: {
        Sex: req.body.Sex,
        Hair: req.body.Hair,
        Face: req.body.Face,
        Body: req.body.Body,
        Leg: req.body.Leg,
        Foot: req.body.Foot,
        Hand: req.body.Hand,
        Glasses: req.body.Glasses
    }
})}
    `
    const userAvatarFolderPath = `${process.env.AVARTAR_UPLOAD_PATH}/${req.body.userId}`

    if (!fs.existsSync(userAvatarFolderPath)) {
        fs.mkdirSync(userAvatarFolderPath, { recursive: true })
    }
    fs.renameSync(
        `${process.env.AVARTAR_UPLOAD_PATH}/${req.file.filename}`,
        `${userAvatarFolderPath}/${req.body.userId}.glb`
    )
    try {
        fs.writeFileSync(`${userAvatarFolderPath}/${req.params.userId}.xml`, output)
        res.send({
            result: 1,
            message: 'SUCCESS',
            pageAuthor: 0
        })
    } catch (err) {
        res.status(500).send({
            result: 0,
            message: err.message,
            pageAuthor: 0
        })
    }
})

module.exports = router
