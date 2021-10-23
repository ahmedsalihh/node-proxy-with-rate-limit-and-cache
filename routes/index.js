const { Axios } = require('axios');
const url = require('url');
const express = require(express);
const router = express.Router();
const apiCache = require('apicache');

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

let cache = apiCache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    const queryParam = url.parse(req.url, true).query;
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...queryParam,
    });

    const apiRes = await Axios.get(`${API_BASE_URL}?${params}`);
    const data = apiRes.body;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;