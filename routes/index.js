/*global module, require, console  */
var express = require('express'),
    router = express.Router(),
    Flickr = require("flickrapi"),
    flickr_cfg = require("../cfg/flickr.js"),
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
            
            var tags = [],
            i,
            j,
            photo_tags,
            photos = result.photos.photo;

            //create an array of tags for search by
            //looping over all photos and getting their tags
            for (i in photos) {

                if (photos.hasOwnProperty(i)) {
                    photo_tags = photos[i].tags.split(" ");
        
                    for(j=0; j < photo_tags.length; j++) {

                        //Photo has tags, make sure they aren't already in tags array before adding them
                        if(tags.indexOf(photo_tags[j]) === -1) {
                            tags.push(photo_tags[j]);
                        }
                    }
                }
            }
 
            res.render('home', {
                title: 'Gifreply',
                user_photos: result.photos.photo,
                tags: tags
            });
        });
    });
});

module.exports = router;