import React, { Fragment } from 'react'
import { ActionCable } from 'react-actioncable-provider'

const Cable = ({ rooms, handleReceivedGuess }) => {
  return (
    <Fragment>
      {rooms.map(room => {
        return (
          <ActionCable
            key={room.id}
            channel={{
              channel: "GuessesChannel",
              room: room.id
            }}
            onReceived={handleReceivedGuess}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable
