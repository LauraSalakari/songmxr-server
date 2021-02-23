const express = require('express');
const router  = express.Router();
const spotifyApi = require("../config/spotify.config");

// get genres
router.get('/genres', (req, res) => {
  spotifyApi.getAvailableGenreSeeds()
  .then(response => {
    //console.log(response);
    res.status(200).json(response.body.genres);
  })
  .catch(err => {
    console.log(err);
  })
});

// get genre-based recommendations
router.post("/genrerecommendations", (req, res) => {
  let {seedGenres} = req.body;
  
  spotifyApi.getRecommendations({
    seed_genres: seedGenres,
    limit: 6
  })
  .then(data => {
    let {tracks} = data.body;
    let recs = tracks.map(x => {
      return {album: x.album.name, image: x.album.images[0], artists: x.artists, href: x.href, id: x.id, name: x.name, preview: x.preview_url}
    })
    res.status(200).json(recs);
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;