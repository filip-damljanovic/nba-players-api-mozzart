const express = require('express');
const axios = require('axios');
const router = express.Router();

const getPlayersUrl = "http://data.nba.net/data/10s/prod/v1/2019/players.json";

// @route     GET api/players
// @desc      Get all nba players
router.get('/', async (req, res) => {
  try {
    const query = req.query;
    const players = await axios.get(getPlayersUrl);
    res.json(players.data.league.standard.slice(query.start, query.end));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/players/:id
// @desc      Get specific player
router.get('/:id', async (req, res) => {
  try {
    const player = await axios.get(`http://data.nba.net/data/10s/prod/v1/2019/players/${req.params.id}_gamelog.json`);

    const data = {
      games: player.data.league.standard,
      personId: req.params.id
    };

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
