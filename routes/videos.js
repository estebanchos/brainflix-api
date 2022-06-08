const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')
const videosFile = fs.readFileSync('./data/videos.json')
const videos = JSON.parse(videosFile)
const videoList = videos.map(video => {
    let simpleVideo = {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
    }
    return simpleVideo
})

router.route('/')
.get((req, res) => {
    console.log(videoList)
    res.send("gotcha")
})

module.exports = router