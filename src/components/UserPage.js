import React from 'react'
import RoomsList from './RoomsList'

const baseUrl = 'http://localhost:3001'
// const baseUrl =
//   process.env["NODE_ENV"] === "development"
//     ? "http://localhost:3001"
//     : "https://lucky-bidwell-backend.herokuapp.com/";
class UserPage extends React.Component {
  state = {
      user: null
  };
  componentWillMount () {
    let token = localStorage.getItem('token')
    fetch(`${baseUrl}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
        .then(json => {
          this.setState({ user: json });
        })
      
  }
   
  render () {
    return <div>
     
      {this.state.user ? <div>
           
<h2>LUCKY BIDWELL</h2>
       
      {console.log(this.state.user.id)}
    
        <RoomsList userName={this.state.user.name} userInfo={this.state.user.id} />

      </div> : <p>Please login</p>}
      {/* <Board user={this.state.user} /> */}

    </div>
  }
}

export default UserPage
