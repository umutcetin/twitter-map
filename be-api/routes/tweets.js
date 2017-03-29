var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tweet = require('../models/Tweet.js');


/* GET /tweets listing. */
router.get('/', function(req, res, next) {
  Tweet.find(function (err, tweets) {
    if (err) return next(err);
    res.json(tweets);
  });
});

// /* GET /tweets/id */
// router.get('/:id', function(req, res, next) {
//   Tweet.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* GET /tweets/text/ */
router.get('/text/:text2', function(req, res, next) {
  //req.params.text2
  //{ $and: [ { "$text": { "$search": "trump" } }, { geo: { $ne: null } } ] }
  //{ $text : { $search : req.params.text2 }
    console.log(req.params.text2);
    Tweet.find({ $and: [ { "$text": { "$search": req.params.text2 } }, { coordinates: { $ne: null } } ] },function(err,authors){
          console.log("inside search");
          res.send(authors);
      })
});

/* GET /tweets/text/geolocation */
router.get('/text/:prm0/bottomLeftLon/:prm1/bottomLeftLat/:prm2/upperRightLon/:prm3/upperRightLat/:prm4', function(req, res, next) {

    console.log(req.params.prm0);
    console.log(req.params.prm1);
    console.log(req.params.prm2);
    console.log(req.params.prm3);
    console.log(req.params.prm4);

    Tweet.find({
      $and: [
          { "$text": { "$search": req.params.prm0 } },
          {
             "coordinates.coordinates": {
                  $geoWithin: {
                      $box: [
                          [ parseFloat(req.params.prm1) , parseFloat(req.params.prm2) ], //bottom left
                          [ parseFloat(req.params.prm3) , parseFloat(req.params.prm4) ]  //upper right

                      ]
                  }
             }
          }
      ]
    },function(err,authors){
          console.log("inside geosearch");
          res.send(authors);
      })
});

/* GET /tweets/text/geolocation */
router.get('/geo//bottomLeftLon/:prm1/bottomLeftLat/:prm2/upperRightLon/:prm3/upperRightLat/:prm4', function(req, res, next) {

    console.log(req.params.prm1);
    console.log(req.params.prm2);
    console.log(req.params.prm3);
    console.log(req.params.prm4);

    Tweet.find({
             "coordinates.coordinates": {
                  $geoWithin: {
                      $box: [
                          [ parseFloat(req.params.prm1) , parseFloat(req.params.prm2) ], //bottom left
                          [ parseFloat(req.params.prm3) , parseFloat(req.params.prm4) ]  //upper right

                      ]
                  }
             }
          }
    ,function(err,authors){
          console.log("inside geosearch");
          res.send(authors);
      })
});


module.exports = router;
