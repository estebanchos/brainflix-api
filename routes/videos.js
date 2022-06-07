const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')
const videosFile = fs.readFileSync('./data/videos.json')
