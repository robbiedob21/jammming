import React from "react";
import styles from '../../styles/Track.module.css'

function Track(props) {
    return (
      <li id={props.index} key={props.index} className={styles.track}>
        <img src={props.albumImage} alt=""/>
        <div>
          <h3 className={styles.trackName}>{props.trackName}</h3>
          <h4 className={styles.artist}>{props.artist}</h4>
          <p className={styles.albumName}>{props.album}</p>
        </div>
        <button onClick={props.handleEvent} value={props.index}>{props.symbol}</button>
      </li>
    )
}

export default Track;