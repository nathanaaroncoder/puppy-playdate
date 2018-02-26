import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';

const textGlow={
  textShadow: "#6AD8C9 0 0 10px",
  fontStyle: 'strong'
}

const MessagesList = props => {

    return ( 
          <div className="col-4">
            <ListGroup>
              {props.matches.map((thisMatch, i) => 
                {
                  return(
                  <ListGroupItem key={i} onClick={ () => props.selectMatch(thisMatch)}>
                    {thisMatch}
                    </ListGroupItem>
                    )
                }
              )}
            </ListGroup>
          </div>
          )

}

export default MessagesList;