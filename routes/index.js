/*global module, require,  */
var express = require('express'),
    router = express.Router(),
    Flickr = require("flickrapi"),
    flickr_cfg = require("../cfg/flickr.js");
    flickrOptions = {
        "api_key": flickr_cfg.flickr_api_key,
        "user_id": flickr_cfg.flickr_user_id
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