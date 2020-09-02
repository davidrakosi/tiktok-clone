const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8000;

const Videos = require('./api/models/videos')
const Data = require('./data.json')

mongoose.connect('mongodb+srv://davidrakosi:ncWesVNRX05YJa5j@cluster0.nbhzf.mongodb.net/tiktokposts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.use(express.json())

app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/api/v1/posts', (req, res) => {
    res.status(200).send(Data)
})

app.get('/api/v2/posts', (req, res) => {
    Videos.find({}, (err, videosData) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(videosData)
        }
    })
})

app.post('/api/v2/posts', (req, res) => {
    let dbVideos = req.body

    Videos.create(dbVideos, (err, post) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(`post data saved: ${post}`)
        }
    })
})

app.listen(port, () => console.log(`listening on localhost:${port}`))
