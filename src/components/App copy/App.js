import './App.css';
import React, { useState} from 'react';
import mockData from '../../mockData.json';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchData = mockData.tracks.items;
    setSearchResults(searchData.map((track, index) => {
      return {
        id: index,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        albumImage: track.album.images[0].url
      };
    }));
  }

  function handleAddToPlaylist(e) {
    setPlaylist([...playlist, searchResults[e.target.value]])
  }

  function handleRemoveFromPlaylist(e) {
    setPlaylist(playlist.filter((track) => {
      return track.id != e.target.value;
    }))
  }

  return (
    <>
      <header>
        <h1>Jammming</h1>
        <div id='search-bar'>
          <form onSubmit={handleSearchSubmit}>
            <input type='text' id='search' name='search' placeholder='Search for a playlist' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            <input type='submit' id='search' name='search' value='Search'/>
          </form>
        </div>
      </header>
      <main>
        <section id='searchResults'>
          <h2>Search Results</h2>
          <ul>
            {
              searchResults.map((track) => {
                return (
                  <li id={`song${track.id}`} key={track.id}>
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                    <button onClick={handleAddToPlaylist} value={track.id}>+</button>
                  </li>
                )})
            }
          </ul>
        </section>
        <section id='playlist'>
          <h2>Playlist</h2>
          <ul>
            {
              playlist.map((track) => {
                return (
                  <li>
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                    <button onClick={handleRemoveFromPlaylist} value={track.id}>-</button>
                  </li>
                )})
            }
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
