// api/search.js
const axios = require('axios');

module.exports = async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: "No search term provided" });
  }

  try {
    // Replace with your actual search logic
    const response = await axios.get(`YOUR_YOUTUBE_API_URL?q=${searchTerm}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
