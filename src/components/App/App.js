import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');

  function inputChangeHandler(e){
    setSearchInput(e.target.value);
  }

  function tokenChangeHandler(token){
    setToken(token);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();

    const {data} = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchInput,
        type: 'track',
        limit: '10'
      }
    })

    const searchData = data.tracks.items;
    setSearchResults(searchData.map((track, index) => {
      return {
        id: index,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        albumImage: track.album.images[0].url,
        uri: track.uri
      };
    }));
  }

  function handleAddToPlaylist(e) {
    setPlaylist([...playlist, searchResults[e.target.value]]);
  }

  function handleRemoveFromPlaylist(e) {
    setPlaylist(playlist.filter((track) => {
      return track.id != e.target.value;
    }))
  }

  return (
    <>
      <SearchBar handleSearchSubmit={handleSearchSubmit} searchInput={searchInput} onInputChange={inputChangeHandler} token={token} onTokenChange={tokenChangeHandler}/>
      <main>
        <SearchResults searchResults={searchResults} handleAddToPlaylist={handleAddToPlaylist}/>
        <Playlist playlist={playlist} handleRemoveFromPlaylist={handleRemoveFromPlaylist} token={token}/>
        
      </main>
    </>
  );
}

export default App;
