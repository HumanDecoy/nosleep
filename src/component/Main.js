import React, { Component } from 'react';
import firebase from '../firebase.js';
import Header from '../component/header/Header.js';
import HeaderIn from '../component/header/HeaderIn.js';
import Form from '../component/forms/Form.js';
import Login from '../component/forms/Login.js';
import Register from '../component/forms/Register.js';
import ButtonReg from '../component/forms/ButtonReg.js';
class Main extends Component {
    
    state ={
    username:'',
    password:'',
    errormsg:'',
    errormsgreg:'',
    currentUsername:'',
    user:"",
    register:""
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
          .then((user) => {
            firebase
              .database()
              .ref(`users/${user.uid}`)
              .set({ email: user.email, uid: user.uid , username:this.state.currentUsername })
            })
          .catch(error => this.setState({errormsgreg:error.message}))
      };

      signIn = (e) => {
        e.preventDefault();
        firebase.auth()
          .signInWithEmailAndPassword(this.state.username, this.state.password)
          .then(user => console.log("Signed in !", user))
          .catch(error => this.setState({errormsg:error.message}));
      }
 
      signOut = (e) => {
        e.preventDefault();
        console.log("SIGN OUT!")
        this.setState({register:false})
        this.setState({errormsg:""})
        this.setState({errormsgreg:""})
        firebase.auth().signOut();
    }
    render() {
    
    
    
      return (
      <div>
        
  
  
   <Header user={this.state.user} signout={this.signOut}/> 
      
  {!this.state.user ?  this.state.register ?  
  <Register errormsg={this.state.errormsgreg} onChange={this.onChange} onClick={this.onChange} onSubmit={this.onSubmitNewUser}/> : 
  <Login errormsg={this.state.errormsg} signin={this.signIn} onChange={this.onChange} onSubmit={this.signIn}/>  
  : null }
  
    
    
    
    
    {/*<div className="circleGif"></div>*/}
      </div>
    
  
  
    
    );
  
  
  
  }
}

export default Main;
