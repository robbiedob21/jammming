import React, { useState } from "react";
import axios from 'axios';
import styles from '../../styles/Playlist.module.css'
import Track from "../Track/Track";

function Playlist(props){
    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [userId, setUserId] = useState('');
    const [saving, setSaving] = useState(false)

    function handlePlaylistNameChange(e){
        setPlaylistName(e.target.value);
    }

    async function createPlaylist(user) {
      const url = `https://api.spotify.com/v1/users/${user}/playlists`;

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
      
      await axios(url, options)
        .then(response => addSongsToPlaylist(response.data.uri.split(':')[2]))
        .catch(error => console.error(error));
    }

    async function addSongsToPlaylist(playlist_id){
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

      await axios(addItemToPlaylistEndpoint, options)
        .then(alert(`${playlistName} saved to Spotify`))
        .catch(error => console.error(error));

        setSaving(false);
    }

    async function handleSaveToSpotify(e){
      e.preventDefault();
      setSaving(true);
      // API Call to add playlist to Spotify account
      if(!userId){
        await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        })
        .then(response => {
          setUserId(response.data.uri.split(':')[2]);
          createPlaylist(response.data.uri.split(':')[2]);
        })
        .catch(error => console.error(error));
      } else {
        createPlaylist(userId);
      }
    }

    return (
        <section id='playlist'>
        <form className={styles.playlistForm}><input value={playlistName} onChange={handlePlaylistNameChange} className={styles.playlistTitle}/></form>
        <ul id='playlistTracks'>
          {
            props.playlist.map((track, index) => {
              if(index >= 100){
                alert('Max number of songs added.')
              }
              return (
                <Track 
                  index={index}
                  handleEvent={props.handleRemoveFromPlaylist}
                  symbol='-'
                  albumImage={track.albumImage}
                  trackName={track.name}
                  artist={track.artist}
                  album={track.album}
                />
              )
            })
          }
        </ul>
        <button onClick={handleSaveToSpotify} className={styles.saveToSpotify}>{saving ? 'Saving...' : 'Save to Spotify'}</button>
      </section>
    )
}

export default Playlist;
