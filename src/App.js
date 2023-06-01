import './App.css';
import React , { Component } from 'react';
import Roll from './components/roll';

class App extends Component {
  state = {};

  render () {


    return (
      <React.Fragment>
          <Roll />
      </React.Fragment>
    );
  } 
}
// user can add image from pc or img api
// add blur option to img and quotes background
// rotate and resize qoutes

export default App;