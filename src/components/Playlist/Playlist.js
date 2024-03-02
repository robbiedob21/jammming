import React, { useState } from "react";
import axios from 'axios';
import { response } from "express";

function Playlist(props){
    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [userId, setUserId] = useState('');

    function handlePlaylistNameChange(e){
        setPlaylistName(e.target.value);
    }

    function addSongsToPlaylist(playlist_id){
      const addItemToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
      const playlistArray = props.playlist.map(track => track.uri);
      const options = {
        method: 'post',
        headers: {
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
        data: {
          'uris': playlistArray
        }
      };

      axios(addItemToPlaylistEndpoint, options)
        .response(response => console.log(response))
    }

    async function handleSaveToSpotify(e){
      e.preventDefault();
      // API Call to add playlist to Spotify account
      if(!userId){
        const {data} = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        })

        setUserId(data.uri.split(':')[2]);
      }

      const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

      const playlistData = {
        name: playlistName,
        description: 'New playlist description',
        public: false,
      };
      
      const options = {
        method: 'post',
        headers: {
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
        data: playlistData,
      };
      
      axios(url, options)
        .then(response => addSongsToPlaylist(response.data.uri.split(':')[2]))
        .catch(error => console.error(error));
    }

    return (
        <section id='playlist'>
        <h2>Playlist</h2>
        <form><input value={playlistName} onChange={handlePlaylistNameChange}/></form>
        <ul>
          {
            props.playlist.map((track, index) => {
              return (
                <li key={index}>
                  <img width={'100px'} src={track.albumImage} alt=""/>
                  <div>
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                  </div>
                  <button onClick={props.handleRemoveFromPlaylist} value={track.id}>-</button>
                </li>
              )})
          }
        </ul>
        <button onClick={handleSaveToSpotify}>Save to Spotify</button>
      </section>
    )
}

export default Playlist;
