import axios from 'axios';
import API from '../../utils/API';
import React from "react";
import MessagesList from "./Messages_List";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import './Chat.css';


class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      match: this.props.match,
      users: [],
      message: '',
      messages: []
    }

    const addMessage = data => {
      console.log(this.state.messages);
      console.log(data);
      let messages = this.state.messages;
      messages.push(data);
      console.log(messages);
      this.setState({messages: messages}) 
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      let messageObj = {author: this.props.user, recipient: this.props.match, message: this.state.message};
      console.log(messageObj);
      addMessage(messageObj);
      console.log(this.props.user);
      API.signUp({
          thisUser: this.props.user,
          thatUser: this.props.match,
          messages: messageObj
        }).then(res => {
          console.log(res);
          this.setState({message: ''});
        }).catch(err => console.log(err))
    };

    this.getMessages = () => {
      axios.get('/auth/user').then(response => {
          if (response.data.user) {
            this.setState({
              user: response.data.user.local.username
            })
          }
        })
        
        axios.get('/auth/signup').then(res => {
          console.log(res.data);
          const allDogs = res.data;
        
          //gives you the current user's data from the whole list
          const currentUserData = allDogs.filter(dog => dog.local.username == this.state.user);
          console.log("current user data", currentUserData[0]);
          const messages = currentUserData[0].messages;
          messages.forEach(message => {
            if(message.recipient == this.props.match || message.author == this.props.match){
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
          });
          console.log(`Get Messages: ${this.state.messages}`);

      })
    }

  }

  componentDidMount(){
    this.getMessages();
  }

  // componentDidUpdate(){
  //   this.sendMessage();
  // }

  componentWillReceiveProps(nextProps){
    this.setState({
      user: this.props.user,
      match: this.props.match,
      messages: []
    });
    this.getMessages();
  }

  render() {
    return ( 
      <div className="col-8">
        {
          this.props.match !== null ?(
            <div className="card">
              <div className="card-body">
                <div className="card-title"> Messages with {this.props.match} </div> 
                <hr />
                <ListGroup className="messages"> 
                  {
                    this.state.messages.map((message, i) => {
                      if(message.author == this.state.user){
                        return ( 
                          <ListGroupItem className='list-group-item-info' style={{margin: '2% 0% 2% 45%'}} key={i}> 
                            <div className='current-user'>{message.message}</div> 
                          </ListGroupItem> 
                        );
                      } else {
                      return ( 
                        <ListGroupItem style={{margin: '2% 45% 2% 0%'}} key={i}> 
                          <div className='other-person'>{message.message}</div> 
                        </ListGroupItem> 
                      )
                    }
                    })
                  } 
                </ListGroup>
              </div> 
              <div className="card-footer">
                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })}/> 
                <br />
                <button onClick={this.sendMessage} className="btn btn-primary form-control"> 
                Send 
                </button>
              </div> 
            </div>
          ):
          (
            <div>
              <h3>No messages selected!</h3>
            </div>
          )
        }
    </div>
    )
  }
};

export default Chat;