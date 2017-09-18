import React, { Component } from 'react';
import firebase from '../firebase.js';
import Header from '../component/header/Header.js';
import Form from '../component/forms/Form.js';
import Login from '../component/forms/Login.js';
import Register from '../component/forms/Register.js';
class Main extends Component {
    
    state ={
    username:'',
    password:'',
    user:"",
 }
 componentDidMount(){
    
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
            //Logged in, change states!
            this.setState({user:user})
            
               } else{
            this.setState({user:''})
          
                }
            })
        }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})
 
    onSubmitNewUser = e => {
        e.preventDefault();
        firebase.auth()
          .createUserWithEmailAndPassword(this.state.username, this.state.password)
          .then(user => console.log("Created user", user))
          .catch(error => console.log(error))
      };

      signIn = (e) => {
        e.preventDefault();
        firebase.auth()
          .signInWithEmailAndPassword(this.state.username, this.state.password)
          .then(user => console.log("Signed in !", user))
          .catch(error => console.log(error));
      }
 
      signOut = (e) => {
        e.preventDefault();
        console.log("SIGN OUT!")
        firebase.auth().signOut();
    }
    render() {
    return (
      <div>
        
    <Header user={this.state.user} signout={this.signOut}/>
    <Login signin={this.signIn} onChange={this.onChange} onSubmit={this.signIn}/>
    <Register onChange={this.onChange} onSubmit={this.onSubmitNewUser}/>
    <div className="circleGif"></div>
      </div>
    );
  }
}

export default Main;
