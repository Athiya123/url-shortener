import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    // using regex for validation
    const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    const numericPattern = /^\d+$/;
    
    // Check if the entered URL matches the pattern, but only if the URL has been modified by the user
    if (url.trim() !== '') {
      setIsValidUrl(urlPattern.test(url) || numericPattern.test(url));
    }
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl) {
      console.log('Invalid URL');
      return;
    }
    try {
      const response = await fetch('https://url2-xngs.onrender.com/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortenedUrl(data.shortenedUrl);
      setUrl('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
     <div className="card">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ borderColor: isValidUrl ? 'initial' : 'red' }}
        />
        {!isValidUrl && url.trim() !== '' && <p style={{ color: 'red' }}>Invalid URL</p>}
        <button type="submit">Shorten</button>
      </form>
      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;