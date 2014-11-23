/*global module, require, console  */
var express = require('express'),
    router = express.Router(),
    flickrModel = require('../models/flickr'),
    model = flickrModel();

router.get('/', function(req, res) {

    'use strict';

    model.fetch(function(flickrPhotos) {

        res.render('home', {
            title: 'Gifreply',
            user_photos: flickrPhotos.user_photos,
            tags: flickrPhotos.tags
        });
    });    

});

module.exports = router;