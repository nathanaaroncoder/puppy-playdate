import React from 'react';
import Chat from "./Chat";
import MessagesList from "./Messages_List";
import axios from 'axios';

    class Messages extends React.Component {
      constructor(props) {
        super(props);
      // get user and all matches
        this.state = {
          user: null,
          matches: [],
          match: null
        }
      }

      // use setState to set stateful variables (user, matches, match)
      getMatches = () => {
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
          const matches = currentUserData[0].matches;
          matches.forEach(match => {
            this.setState({
              matches: [...this.state.matches, match]
            })
          });
          console.log(`Set Matches: ${this.state.matches}`);

        })
      }

      componentDidMount(){
        this.getMatches();
      }

      selectMatch = matchName => {
        this.setState({ match: matchName });
      }

      // pass matches to messages list
      // pass user to chat
      // on click, set the state of the chat room the particular match from messages list
      // pass the clicked match to chat as prop
      render(){
      return (
        <div id="messages">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-4">
              	<MessagesList 
                  user={this.state.user}
                  matches={this.state.matches} 
                  selectMatch={this.selectMatch}
                />
              </div>
              <div className="col-xs-12 col-md-8">
                <Chat 
                  user={this.state.user} 
                  match={this.state.match}
                />
              </div>
            </div>
          </div>
        </div>
     )
    }
  }
  

 export default Messages;