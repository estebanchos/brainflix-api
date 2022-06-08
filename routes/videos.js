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

const findVideo = (id) => videos.find(video => video.id === id)

router.route('/')
    .get((_req, res) => {
        res.status(200).send(videoList)
    })

router.route('/:videoId')
    .get((req, res) => {
        let found = findVideo(req.params.videoId)
        if (!found) {
            res.status(404).send("Incorrect Video ID")
        } else {
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
            res.status(200).send(fullDetails)
        }
    })

router.route('/:videoId/comments')
    .post((req, res) => {
        let found = findVideo(req.params.videoId)
        if (!found) {
            res.status(404).send("Incorrect Video ID")
        } else {
            const newComment = {
                id: uniqid(),
                name: req.body.name,
                comment: req.body.comment,
                likes: 0,
                timestamp: Date.now()
            }
            res.status(201).send(newComment)
            let updatedComments = [...found.details.comments, newComment]
            let foundIndex = videos.findIndex(video => video.id === req.params.videoId)
            let newVideos = [...videos]
            newVideos[foundIndex].details.comments = updatedComments
            fs.writeFileSync('./data/videos.json', JSON.stringify(newVideos))
        }
    })

module.exports = router
