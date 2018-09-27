import React from 'react';
import SearchBarFormContainer from './SearchBarFormContainer';
import SearchBoardTemplate from './SearchBoardTemplate';

let SERVER_URL = process.env.REACT_APP_SERVER_URL;

// console.log(process.env);

class ImageSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSearchResults: []
    }
  }
  fetchImages() {
    let query = this.props.match.params.query;
      fetch(`${SERVER_URL}/api/search/${query}`, {
        method: "GET", 
        headers: {
          Accept: 'application/json'
        },
      })
      .then(response => response.text())
      .then(stringResponse => JSON.parse(stringResponse))
      .then(data => this.setState({ imageSearchResults: data}))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.query !== this.props.match.params.query) {
      this.fetchImages();
    }
  }
 render() {
  if (this.state.imageSearchResults.length > 0) {
    return (
      <div className='image-search-screen'>
        <SearchBarFormContainer history={this.props.history}/>
        <SearchBoardTemplate images={this.state.imageSearchResults} />
      </div>)
  } else {
    return null
  }
 }
}

export default ImageSearchScreen;