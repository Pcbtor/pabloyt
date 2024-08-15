const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Your YouTube API Key
const API_KEY = 'AIzaSyBwNMzklnv-WWG5YacP_2KeYEx17osjDMo';

// API Route to handle search requests
app.get('/api/search', async (req, res) => {
  const searchQuery = req.query.q;
  
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        key: API_KEY,
        type: 'video',
        maxResults: 10
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
