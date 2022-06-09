const express = require("express");
const app = express();
require('dotenv').config()
const { PORT: port } = process.env
const cors = require('cors')
const videosRoute = require('./routes/videos')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/videos', videosRoute)

app.listen(port, () => {
    console.log("Server is listening on port 8080");
});