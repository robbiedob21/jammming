import React from "react";

function Track(props) {
    return (
        <li id={`song${props.id}`} key={props.id}>
          <h3>{props.name}</h3>
          <p>{props.artist} | {props.album}</p>
        </li>
    )
}

export default Track;