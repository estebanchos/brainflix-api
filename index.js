const express = require("express");
const app = express();

const videosRoute = require('./routes/videos')

app.use(express.json())
app.use(express.static('public'))
app.use('/videos', videosRoute)

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});