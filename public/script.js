document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchVideos(query);
  
    // Show the search bar below the video player after the first search
    const searchContainer = document.getElementById('search-container');
    const videoPlayer = document.getElementById('video-player');
    const container = document.querySelector('.container');
  
    if (videoPlayer.style.display === 'none') {
      container.insertBefore(searchContainer, document.getElementById('results'));
    }
  
    // Scroll to the top of the container to bring the search bar into view
    container.scrollIntoView({ behavior: 'smooth' });
  });
  
  async function searchVideos(query) {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    data.items.forEach(item => {
      const videoElement = document.createElement('div');
      videoElement.classList.add('video-item');
      
      videoElement.innerHTML = `
        <img src="${item.snippet.thumbnails.default.url}" alt="Thumbnail">
        <div>
          <h3>${item.snippet.title}</h3>
          <p>${item.snippet.description}</p>
        </div>
      `;
      
      // Add click event listener to load video in player
      videoElement.addEventListener('click', () => {
        const videoId = item.id.videoId;
        loadVideo(videoId);
      });
      
      resultsDiv.appendChild(videoElement);
    });
  }
  
  function loadVideo(videoId) {
    const playerDiv = document.getElementById('video-player');
    const iframe = document.getElementById('player');
  
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    playerDiv.style.display = 'block';  // Show the video player
  
    // Move search bar below the video player when a video is selected
    const searchContainer = document.getElementById('search-container');
    const resultsDiv = document.getElementById('results');
    const container = document.querySelector('.container');
    
    container.insertBefore(searchContainer, resultsDiv);
  
    // Scroll to the video player to ensure it's in view
    playerDiv.scrollIntoView({ behavior: 'smooth' });
  }
  