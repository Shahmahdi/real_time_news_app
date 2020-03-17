import React, { useState, useEffect } from 'react';
import './App.css';
import Pusher from 'pusher-js';

function App() {

  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <h1 className="App-title">Live Bitcoin Feed</h1>

      <ul className="news-items">
        {newsItems.map((news: any, i) => (
          <li key={i}>
            <a href={`${news.url}`}>
              {news.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
