import React from "react";

function SearchResults(props){

    return(
        <section id='searchResults'>
        <h2>Search Results</h2>
        <ul>
          {
            props.searchResults.map((track) => {
              return (
                <li id={`song${track.id}`} key={track.id}>
                  <img width={'100px'} src={track.albumImage} alt=""/>
                  <div>
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                  </div>
                  <button onClick={props.handleAddToPlaylist} value={track.id}>+</button>
                </li>
              )})
          }
        </ul>
      </section>
    )
}

export default SearchResults;