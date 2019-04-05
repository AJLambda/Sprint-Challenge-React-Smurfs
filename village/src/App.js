import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

import { Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  // Construct an AXIOS request to retrieve an array all the Smurfs in the Smurf DB simply write a GET to the endpoint /smurfs.
  componentDidMount() {
    // ajax request to get the items from a server on mount
    // 1. invoke .get()
    // 2. pass in the server url - base url + endpoint
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //Construct an AXIOS request to POST to add a Smurf to the Smurf DB you'll need all three fields.
  addNewSmurf = newSmurf => {
    axios
      .post("http://localhost:3333/smurfs", newSmurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  // Create two `routes` in your `App` component, one at `'/'` for your `Smurfs` component,and one at `/smurf-form` for your form.

  //Then make it so you can navigate to your routes using `Link`.

  //Then in your `App` component, create a nav bar that will use `NavLink` to route to your different pages.

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <NavLink exact to="/" className="nav-link">
            Smurfs
          </NavLink>
          <NavLink to="/smurf-form" className="nav-link">
            Smurf Form
          </NavLink>
        </div>

        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} addNewSmurf={this.addNewSmurf} />
          )}
        />
      </div>
    );
  }
}

export default App;
