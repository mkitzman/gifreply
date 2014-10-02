var express = require('express');
var router = express.Router();

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "",
      'user_id': ''
    };

/* GET home page. */
router.get('/', function(req, res) {

    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
      // we can now use "flickr" as our API object,
      // but we can only call public methods and access public data
      console.log('test');

       flickr.people.getPublicPhotos({
          user_id: flickr.options.user_id,
          page: 1,
          per_page: 500,
          extras : 'url_o,url_q,tags'
        }, function(err, result) {
            console.log(result);
            var user_photos = result.photos.photo;
            console.log(user_photos);

                res.render('home', { 
                            title: 'hi',
                            user_photos : user_photos
                        });

            // for (var key in user_photos) {
            //    if (user_photos.hasOwnProperty(key)) {
            //       console.log(user_photos[key].id);
            //    }
            // }
          // result is Flickr's response
        });
    });
//https://www.flickr.com/services/api/explore/flickr.photos.getInfo
//http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=580a1c9e12b3b569ef072287fd449f60&user_id=123475630@N06






  
});

module.exports = router;
