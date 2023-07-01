const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const formidable = require('formidable')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', async (req, res) => {
    const form = new formidable.IncomingForm()
    await form.parse(req, function (err, fields, files) {
        const { originalFilename, mimetype, size } = files.upfile[0]

        res.send({
            name: originalFilename,
            type: mimetype,
            size,
        })
    })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
})
