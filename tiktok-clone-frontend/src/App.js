import React, { useState, useEffect } from "react";
import Video from "./Video";
// import db from "./firebase";
import "./App.css";
import axios from './axios'

function App() {
  const [videos, setVideos] = useState([]);

  // pulling the data, originally from firebase

  useEffect(() => {
    async function fetchPosts() {
      const req = await axios.get('/api/posts')
      setVideos(req.data)

      return req
    }
    
    fetchPosts()
  }, []);

  return (
    // BEM
    <div className="app">
      <div className="app__videos">
        {videos.map(
          ({ url, channel, description, song, likes, messages, shares }) => (
            <Video
              url={url}
              channel={channel}
              song={song}
              likes={likes}
              messages={messages}
              description={description}
              shares={shares}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
