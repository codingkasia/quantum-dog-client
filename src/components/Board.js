import React from 'react'
import Square from './Square'
import { API_ROOT, HEADERS } from "../constants";
const award = 100;
const guessesLeft = 20
const jackpotCut = 0.05
const jackpotSize = 40


class Board extends React.Component {
  state = {
    jackpot: 0,
    guessesLeft: guessesLeft,
    points: 1,
    jackpotShare: 38
  };

  buyGuesses = () => {
    this.setState({ guessesLeft: this.state.guessesLeft + 10 });

  }
  postPointsToDB = () => {
    const roomID = this.props.room.id;
    fetch(`${API_ROOT}/scores/${roomID}`, {
      method: "PATCH",
      body: JSON.stringify({ sumPoints: award }),
      headers: HEADERS
    });
  };

  // componentWillMount() {
  //   this.fetchScores()
  // }
  // fetchScores = () => {
  //   fetch(`${API_ROOT}/scores`)
  //     .then(res => res.json())
  //     .then(result => console.log(`SCORES, ${result}`));
  // };

  // generateLuckyNumber = () => {
  //     const lucky = Math.floor(Math.random() * 50) + 1;
  //     console.log(`NEW RANDOM Lucky, ${lucky}`);
  //     return lucky
  // }

  // //update lucky number to DB
  // patchLuckyNumber = () => {
  //   fetch(`${API_ROOT}/numbers/${roomID}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ number: newLuckyNum }),
  //     headers: HEADERS
  //   });
  // }


  calculateJackpot = () => {
    // userJackpotShare = this.state.points/totalPoints * jackpotSize * (1 - jackpotCut)
    const userJackpotShare =
    ((this.state.points / 100) * jackpotSize * (1 - jackpotCut)) * 100;
    console.log(`points ${this.state.points}`)
      //0.01 * 40 * (0.95)
    return this.setState({ jackpotShare: userJackpotShare });
  };

  trackUserGuesses = () => {
    let total = this.state.guessesLeft - 1;
    this.setState({ guessesLeft: total });
  };

  updateStatePoints = () => {
    this.setState({ points: this.state.points + award });
  };

  // fetchPoints = () => {
  //   fetch(`${API_ROOT}/points`)
  //     .then(res => res.json())
  //     .then(points => {
  //       console.log(`POINTS, ${point.points}`)
  //       this.setState({ points: points.points })
  //     });
  // };

  renderSquare(i) {
    return (
      <Square
        calculateJackpot={this.calculateJackpot}
        newLucky={this.props.newLucky}
        points={this.state.points}
        guesses={this.props.room.guesses}
        value={i}
        room_id={this.props.room.id}
        user_id={this.props.activeUser}
        newLucky={this.props.newLucky}
        updateStatePoints={this.updateStatePoints}
        trackUserGuesses={this.trackUserGuesses}
        generateNewLucky={this.props.generateNewLucky}
        postPointsToDB={this.postPointsToDB}
      />
    );
  }

  render() {
    // console.log(`USER is, ${this.props.activeUser}`)
    return <div>
        <div>
          <div className="points">POINTS: {this.state.points}</div>
          {/* <div className="jackpot">
            {" "}
            JACKPOT SHARE: {this.state.jackpotShare}%
          </div> */}
         
          <div className="bidsLeft">
            {" "}
            GUESSES LEFT: {this.state.guessesLeft}
          </div>
        <button className="buy" type="button" onClick={this.buyGuesses}>BUY <br />GUESSES </button>
        </div>

        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
        </div>
        <div className="board-row">
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
        </div>
        <div className="board-row">
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
        </div>
        <div className="board-row">
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
        </div>
      </div>;
  }
}

export default Board




// import React from 'react'
// import Square from './Square'
// import { API_ROOT, HEADERS } from "../constants";
// const award = 100


// class Board extends React.Component {
//   state = {
//     points: 100,
//     currentLucky: null
//   };
//   generateCurrentLucky = () => {
//     const num = Math.floor(Math.random() * 27) + 1;
//     console.log(`INIT RANDOM NUMBER, ${num}`);
//     return this.setState({ currentLucky: num });
//   };
//   // //tem solution => will update based on json from points fetch
//   updateStatePoints = () => {
//     this.setState({ points: this.state.points + award });
//   };
//   // checkColor(i) {
//   //   console.log(this.props.room.guesses);
//   //   this.props.room.guesses.map(guess => {
//   //     if (guess.value == i && i === 13) {
//   //       console.log("green");
//   //       console.log(`guess value, ${guess.value} and i=, ${i}`);
//   //       return "green";
//   //     } else if (guess.value === i && i !== 13) {
//   //       console.log(`guess value, ${guess.value} and i=, ${i}`);
//   //       console.log("orange");
//   //       return "orange";
//   //     } else if (guess.value) {
//   //       console.log(`guess value, ${guess.value} and i=, ${i}`);
//   //       console.log("white");
//   //       console.log(i);
//   //       return "white";
//   //     }
//   //   });
//   // }
//   // handleClick = () => {
//   //   console.log("Clicked!");
//   //   fetch(`${API_ROOT}/guesses`, {
//   //     method: "POST",
//   //     headers: { "content-type": "application/json" },
//   //     body: JSON.stringify({
//   //       value: this.props.value,
//   //       room_id: this.props.room_id,
//   //       user_id: this.props.user_id
//   //     })
//   //   });
//   // };
//   renderSquare(i) {
//     return (
//       <Square
//         points={this.state.points}
//         guesses={this.props.room.guesses}
//         value={i}
//         room_id={this.props.room.id}
//         user_id={this.props.activeUser}
//         initLucky={this.props.initLucky}
//         updateStatePoints={this.updateStatePoints}
//         currentLucky={this.state.currentLucky}
//         checkColor={this.checkColor}
//       />
//     );
//   }
//   render() {
//     return <div>
//         <div>POINTS: {this.state.points} </div>

//         <div className="board-row">
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//           {this.renderSquare(9)}
//           {this.renderSquare(10)}
         
//         </div>
//         <div className="board-row">
//           {this.renderSquare(11)}
//           {this.renderSquare(12)}
//           {this.renderSquare(13)}
//           {this.renderSquare(14)}
//           {this.renderSquare(15)}
//           {this.renderSquare(16)}
//           {this.renderSquare(17)}
//           {this.renderSquare(18)}
//           {this.renderSquare(19)}
//           {this.renderSquare(20)}
  
          
//         </div>
//         <div className="board-row">
//           {this.renderSquare(21)}
//           {this.renderSquare(22)}
//           {this.renderSquare(23)}
//           {this.renderSquare(24)}
//           {this.renderSquare(25)}
//           {this.renderSquare(26)}
//           {this.renderSquare(27)}
//           {this.renderSquare(28)}
//           {this.renderSquare(29)}
//           {this.renderSquare(30)}

//         </div>
//       </div>;
//   }
// }

// export default Board

