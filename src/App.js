import "./App.css";
import React from "react";
import axios from "axios";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      breed: "husky",
      images: []
    };
  }
  // componet did mount will be call only one time
  componentDidMount() {
    this.fetchDogImages();
  }
  // compoent Did update is only change when the props change or state
  componentDidUpdate(prevProps, prevState) {
    if (prevState.breed !== this.state.breed) {
      this.setState({
        images: []
      });

      this.fetchDogImages();
    }
  }

  fetchDogImages = () => {
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
      .then(result => {
        this.setState({
          images: result.data.message
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  handkeChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  render() {
    return (
      <>
        <h1>The dog website</h1>
        <select value={this.state.breed} onChange={this.handkeChange}>
          <option value="Husky">Husky</option>
          <option value="Beagle">Beagle</option>
          <option value="Corgi">Corgi</option>
        </select>

        <div>
          {this.state.images.map((image, index) => (
            <img key={index} src={image} alt={"dog"} />
          ))}
        </div>
      </>
    );
  }
}
export default App;
