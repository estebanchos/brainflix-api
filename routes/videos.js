const { timeStamp } = require('console');
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
        console.log("gotcha you want the simple list")
        res.status(201).send(videoList)
    })

router.route('/:videoId')
    .get((req, res) => {
        let found = videos.find(video => video.id === req.params.videoId)
        if(!found) {
            res.status(404).send("incorrect id")
        } else {
            console.log("found the details")
            const fullDetails = {
                id: found.id,
                title: found.title,
                channel: found.channel,
                image: found.image,
                description: found.details.description,
                views: found.details.views,
                likes: found.details.likes,
                duration: found.details.duration,
                video: found.details.video,
                timeStamp: found.details.timestamp,
                comments: found.details.comments
            }
            res.status(201).send(fullDetails)
        }
    })


module.exports = router