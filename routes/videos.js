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
                timestamp: found.details.timestamp,
                comments: found.details.comments
            }
            res.status(200).send(fullDetails)
        }
    })

router.route('/')
    .post((req, res) => {
        if (!req.body.title || !req.body.description) {
            res.status(400).send("Incorrect Information Sent to Server")
        } else {
            let newVideo = {
                id: uniqid(),
                title: req.body.title,
                channel: 'Michael Scott',
                image: 'http://localhost:8080/images/preview.jpg',
                details: {
                    description: req.body.description,
                    views: '0',
                    likes: '0',
                    duration: '5:00',
                    video: "https://project-2-api.herokuapp.com/stream",
                    timestamp: Date.now(),
                    comments: []
                }
            }
            let updatedVideos = [...videos, newVideo]
            fs.writeFileSync('./data/videos.json', JSON.stringify(updatedVideos))
            res.status(201).send(newVideo)
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
            let updatedComments = [newComment, ...found.details.comments]
            let foundIndex = videos.findIndex(video => video.id === req.params.videoId)
            let updatedVideos = [...videos]
            updatedVideos[foundIndex].details.comments = updatedComments
            fs.writeFileSync('./data/videos.json', JSON.stringify(updatedVideos))
            res.status(201).send(newComment)
        }
    })

module.exports = router
