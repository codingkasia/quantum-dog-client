import React from 'react';
import { HEADERS } from '../constants';
import { API_ROOT } from '../constants';
const award = 100

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      room_id: this.props.room_id,
      user_id: this.props.user_id,
      bgColor: null,
      found: false,
      lucky: this.props.newLucky    
    };
    this.evaluateClick = this.evaluateClick.bind(this);
  }

  generateLuckyNumber = () => {
    const lucky = Math.floor(Math.random() * 50) + 1;
    console.log(`NEW RANDOM Lucky, ${lucky}`);
    return lucky
  }

  

  fetchNewLucky = () => {
    fetch(`${API_ROOT}/numbers`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  }

  evaluateClick() {
    let values = [];
    this.props.guesses.map(guess => {
      values.push(guess.value);
    });
    console.log(values);
    console.log(`clicked! ${this.props.value}`);
    if (values.includes(this.props.value)) {
      console.log("includes!");
      return this.setState({ bgColor: "orange" });
    } else {
      console.log("does NOT include");
      if (this.props.value === this.props.newLucky) {
        console.log("luckyy!");
        // this.props.generateNewLucky();
        console.log(`NEW LUCKY IS, ${this.props.newLucky}`);
        this.setState({found: true})
        this.props.updateStatePoints()
        this.props.postPointsToDB()
        const newLuckyNum = this.generateLuckyNumber()
        console.log(`new lucky num is, ${newLuckyNum}`) //WORKS!
        //update lucky number to DB
          const roomID = this.state.room_id;
          fetch(`${API_ROOT}/numbers/${roomID}`, {
            // fetch(`${API_ROOT}/numbers/${roomID}`, {
            method: "PATCH",
            body: JSON.stringify({ number: newLuckyNum, room_id: roomID }),
            headers: HEADERS
          });
        // this.patchLuckyNumber(newLuckyNum)
        this.props.calculateJackpot()
        return this.setState({ bgColor: "green" });
      } else {
        console.log("no lucky!");
        return this.setState({ bgColor: "orange" });
      }
    }
  }
 

  handleClick = () => {
    // e.preventDefault();
    this.props.trackUserGuesses()
    this.setState({ value: this.props.value });
    this.evaluateClick();
    this.postGuess();

  };

  componentWillReceiveProps = nextProps => {
    this.setState({ room_id: nextProps.room_id });
  };

  postGuess = () => {
    console.log("READY FOR FETCH");
    fetch(`${API_ROOT}/guesses`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: HEADERS
    });
  };

  render() {
    // console.log(`lucky number is ${this.state.lucky}`);
    // console.log(`this props new lucky ${this.props.newLucky}`)
    return (
      <button
        className="square"
        style={{ background: this.state.bgColor }}
        onClick={this.handleClick}
      />
    );
  }
}

export default Square;


