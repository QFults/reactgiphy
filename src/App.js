import React, { Component } from 'react'

import axios from 'axios'

class App extends Component {
  state = {
    search: '',
    gifs: []
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearchGif = event => {
    event.preventDefault()
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.state.search}&limit=10&rating=g&api_key=u4rAYxllxUNWfPgN96lOLHKCGxdEuHZt`)
      .then(({ data }) => {
        const gifs = data.data.map(gif => gif.images.original.url)
        this.setState({ gifs, search: '' })
      })
      .catch(err => console.error(err))
  }

  render () {
    return (
      <>
        <form>
          <p>
            <label htmlFor="search">search</label>
            <input 
              type="text" 
              name="search" 
              id="search"
              onChange={this.handleInputChange} 
              value={this.state.search} />
          </p>
          <p>
            <button onClick={this.handleSearchGif}>Search Gif</button>
          </p>
        </form>
        {
          this.state.gifs.map(gif => <img src={gif} alt="gif" />)
        }
      </>
    )
  }
}

export default App
