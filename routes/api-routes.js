const express = require('express');
const router  = express.Router();
const spotifyApi = require("../config/spotify.config");

// get genres
router.get('/genres', (req, res, next) => {
  spotifyApi.getAvailableGenreSeeds()
  .then(response => {
    //console.log(response);
    res.status(200).json(response.body.genres);
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;