import React, { Component } from 'react';
import './App.css' 
import Login from './components/Login'
import UserPage from './components/UserPage';


class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null
    }
  }

  render () {
    return (
      <div>
        <Login />
        <UserPage  />
        
      </div>
    )
  }
}

export default App
