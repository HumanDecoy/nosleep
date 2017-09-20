import React, { Component } from 'react';
import firebase from '../firebase.js';
import Header from '../component/header/Header.js';
import Login from '../component/forms/Login.js';
import Register from '../component/forms/Register.js';
class Main extends Component {
    
    state ={
    username:'', // Email
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
           // Setting Currentusername State 
            if(user.displayName){
             this.setState({currentUsername:user.displayName}) 
            } else{
              
       firebase.database().ref("users").orderByChild("uid")
       .equalTo(user.uid)
        .on('value', (snapshot) => {
           let sortedUID = [];
           snapshot.forEach(item => {
               sortedUID.push(item.val());
               this.setState({currentUsername:sortedUID[0].username})
           })
       })
            }
            console.log(this.state.currentUsername);
            
               } 
               // If failed to log in , dont set user or logout
               else{
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

      signInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // set name : 
           this.setState({})
          //DB function
            firebase
            .database()
            .ref(`users/${user.uid}`)
            .set({email: user.email, uid: user.uid , username:user.displayName});
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }

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
        this.setState({register:false,
          errormsg:"",
          errormsgreg:"",
          username:"",
          password:"",
          currentUsername:"",
        })
        firebase.auth().signOut();
       
    }
    render() {
    
    
    
      return (
      <div>
        
  
  
   <Header user={this.state.user} signout={this.signOut}/> 
  {!this.state.user ?  this.state.register ?  
  <Register errormsg={this.state.errormsgreg} onChange={this.onChange} onClick={this.onChange} onSubmit={this.onSubmitNewUser}/> : 
  <Login google={this.signInWithGoogle} errormsg={this.state.errormsg} signin={this.signIn} onChange={this.onChange} onSubmit={this.signIn}/>  
  : null }
  
  {this.state.currentUsername && this.state.user ? <p> welcome {this.state.currentUsername} </p>: null}
    
    
    
    
    {/*<div className="circleGif"></div>*/}
      </div>
    
  
  
    
    );
  
  
  
  }
}

export default Main;
