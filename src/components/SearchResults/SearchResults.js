import React from "react";
import Track from "../Track/Track";

function SearchResults(props){

    return(
        <section id='searchResults'>
        <h2>Search Results</h2>
        <ul>
          {
            props.searchResults.map((track, index) => {
              return (
                <Track 
                  index={index}
                  handleEvent={props.handleAddToPlaylist}
                  symbol='+'
                  albumImage={track.albumImage}
                  trackName={track.name}
                  artist={track.artist}
                  album={track.album}
                />
              )
            })
          }
        </ul>
      </section>
    )
}

export default SearchResults;