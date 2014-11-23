/*global module, require, console  */
var Flickr = require("flickrapi"),
    flickr_cfg = require("../cfg/flickr.js");

module.exports = function () {

    'use strict';

    return {

        fetch: function () {

            var done = arguments[0];
            
            Flickr.tokenOnly(flickr_cfg, function(error, flickr) {

                flickr.people.getPublicPhotos({
                    user_id:  flickr_cfg.user_id,
                    page:     flickr_cfg.page,
                    per_page: flickr_cfg.per_page,
                    extras:   flickr_cfg.extras
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
                    
                    return done({
                        user_photos: result.photos.photo,
                        tags: tags
                    });
                    
                });
            });
                
        }

    };

};



