/*global module, require, console  */
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
            
            var tags = [],
            i,
            j,
            mini_array;

            //create an array of tags for search
            for (i in result.photos.photo) {
                mini_array = result.photos.photo[i].tags.split(" ");
    
                for(j=0; j < mini_array.length; j++) {
                    if(tags.indexOf(mini_array[j]) === -1) {
                        tags.push(mini_array[j]);
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