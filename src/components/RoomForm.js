import React from 'react';
import { API_ROOT, HEADERS } from '../constants';


class RoomForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/rooms`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ name: " "});
  };
  

  render = () => {
    return <div className="newRoomForm">
     
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" name="name" placeholder="ROOM NAME" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="CREATE NEW ROOM" />
          </form>
        </div>
  }
}

export default RoomForm;
