import React, {useEffect} from "react";

function SearchBar(props) {
    const CLIENT_ID = '9e6a1e6b44af42459539301caa3dad84';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const SCOPE = "playlist-modify-public playlist-modify-private"
  
    useEffect(() => {
      const hash = window.location.hash;
      let token = window.localStorage.getItem('token');
  
      if(!token && hash){
        token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
  
        window.location.hash = '';
        window.localStorage.setItem('token', token);
      }

      props.onTokenChange(token);
    }, [])
  
    function logout(){
      props.onTokenChange('');
      window.localStorage.removeItem('token');
    }

    return (
      <header>
        <h1>Jammming</h1>
        {!props.token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>: <button onClick={logout}>Logout</button>}
        <div id='search-bar'>
          <form onSubmit={props.handleSearchSubmit}>
            <input type='text' id='search' name='search' placeholder='Search for a playlist' value={props.searchInput} onChange={props.onInputChange}/>
            <input type='submit' id='search' name='search' value='Search'/>
          </form>
        </div>
      </header>
    )
}

export default SearchBar;