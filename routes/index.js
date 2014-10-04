/*global module, require,  */
var express = require('express'),
    router = express.Router(),
    Flickr = require("flickrapi"),
    flickrOptions = {
        "api_key": "580a1c9e12b3b569ef072287fd449f60",
        "user_id": "123475630@N06"
    };

router.get('/', function(req, res) {

    "use strict";

    Flickr.tokenOnly(flickrOptions, function(error, flickr) {

        flickr.people.getPublicPhotos({
            user_id: flickr.options.user_id,
            page: 1,
            per_page: 500,
            extras: 'url_o,url_q,tags'
        }, function(err, result) {

            res.render('home', {
                title: 'hi',
                user_photos: result.photos.photo
            });
        });
    });
});

module.exports = router;