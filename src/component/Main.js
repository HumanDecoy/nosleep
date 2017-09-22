import React, { Component } from 'react';
import firebase from '../firebase.js';
import Header from '../component/header/Header.js';
import Login from '../component/forms/Login.js';
import Register from '../component/forms/Register.js';
import Search from '../component/search/Search.js';
import Loading from '../component/loading/Loading.js';
class Main extends Component {
    
    state ={
    username:'', // Email
    password:'',
    errormsg:'',
    errormsgreg:'',
    currentUsername:'',
    user:'',
    register:'',
    connected:'',
    work:'',
    energy:'',
    any:'',
    searching:'',


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
    
    onChangeChecked = (e) => this.setState({[e.target.name]: e.target.checked})
    
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
      // FunctionMCFuncFace, calls all the functions to create a chat.
      searchInsomnia = (e) => {
      e.preventDefault();
      this.setSearchObjects();
      this.checkForMatch();
      this.findMatch();
      }

      checkForMatch  = () => {
        firebase.database().ref('searchObj')
      }
      // Pushes user into correct preferences objects
      setSearchObjects = () => {
        this.state.energy ? firebase.database().ref(`searchObj/energy/${this.state.user.uid}`).set({
          userId:this.state.user.uid,
        }): null
        this.state.work ? firebase.database().ref(`searchObj/work/${this.state.user.uid}`).set({
          userId:this.state.user.uid,
        }): null
        this.state.any ? firebase.database().ref(`searchObj/any/${this.state.user.uid}`).set({
          userId:this.state.user.uid,
        }): null
      }
        // Searches for matching preferences
        findMatch = () => { 
        // CHECK ENERGY
         this.checkEnerg();
        // CHECK WORK
         this.state.work && this.checkWork();
        // CHECK ANY
        this.state.any &&  this.checkAny();
      }

        checkAny = () => {
          this.state.any ? firebase.database().ref(`searchObj/any`).orderByChild('userId')
          .equalTo(this.state.user.uid)
          .on('value', (snapshotAny) => {
            if(snapshotAny.val() !== null) {
              console.log(snapshotAny.val());
              firebase.database().ref(`searchObj/any`).orderByChild('userId')
              .once('value',(snapshotAny) => {
                if(Object.keys(snapshotAny.val())[1] !== undefined){
                  this.setState({
                    energy:false,
                    work:false,
                    any:false,
                  })
                Object.keys(snapshotAny.val())[0] !== this.state.user.uid ?
                this.createChatRoom(this.state.user.uid, Object.keys(snapshotAny.val())[0])
              : this.createChatRoom(this.state.user.uid, Object.keys(snapshotAny.val())[1])
              }else{
                console.log("no match")
              }
            
          })
        } else {
          console.log (snapshotAny.val()) ;
        }
      
        }):null;
    
        }

        checkWork = () => {
          
        console.log(this.state.work);
        this.state.work ? firebase.database().ref(`searchObj/work`).orderByChild('userId')
        .equalTo(this.state.user.uid)
        .on('value', (snapshotWork) => {
          console.log(snapshotWork.val());
          if(snapshotWork.val() !== null) {
            console.log(snapshotWork.val());
            firebase.database().ref(`searchObj/work`).orderByChild('userId')
            .once('value',(snapshotWork) => {
        
              
              if(Object.keys(snapshotWork.val())[1] !== undefined){
                this.setState({
                  energy:false,
                  work:false,
                  any:false,
                })
              Object.keys(snapshotWork.val())[0] !== this.state.user.uid ?
              this.createChatRoom(this.state.user.uid, Object.keys(snapshotWork.val())[0])
            : this.createChatRoom(this.state.user.uid, Object.keys(snapshotWork.val())[1])
            }else{
              console.log("no match")
            }
          
        })
      } else {
        console.log (snapshotWork.val()) ;
      }
    
      }):null;

        }


        checkEnerg = () => {
          this.state.energy ? firebase.database().ref(`searchObj/energy`).orderByChild('userId')
          .equalTo(this.state.user.uid)
          .on('value', (snapshot) => {
            if(snapshot.val() !== null) {
              console.log(snapshot.val());
              firebase.database().ref(`searchObj/energy`).orderByChild('userId')
              .once('value',(snapshot) => {
                console.log( Object.keys(snapshot.val())[1]);
                
                if(Object.keys(snapshot.val())[1] !== undefined){
                  this.setState({
                    energy:'',
                    work:'',
                    any:'',
                  })
                Object.keys(snapshot.val())[0] !== this.state.user.uid ?
                this.createChatRoom(this.state.user.uid, Object.keys(snapshot.val())[0])
              : this.createChatRoom(this.state.user.uid, Object.keys(snapshot.val())[1])
              }else{
                console.log("no match")
              }
            
          })
        } else {
          console.log (snapshot.val()) ;
        }
      
        }):null;
        }
        //Creates chat-object
        createChatRoom = (userid1, userid2) => {
          firebase.database().ref(`chatRooms/${userid1+userid2}`).set({
            userid1:userid1,
            userid2:userid2,
            posts:'',
          })
          this.clearDB(userid1,userid2);
          this.setState({
            searching:false,
            connected:true,
          
          });

        }
     
        // Deletes user/users from DB 
        clearDB = (user1, user2) => {
          // DELETE ALL IN ENERGY
          firebase.database().ref(`searchObj/energy/${user1}`).remove();
          firebase.database().ref(`searchObj/energy/${user2}`).remove();
          //DELETE ALL IN WORK
          firebase.database().ref(`searchObj/work/${user1}`).remove();
          firebase.database().ref(`searchObj/work/${user2}`).remove();
          //DELETE ALL IN ANY
          firebase.database().ref(`searchObj/any/${user1}`).remove();
          firebase.database().ref(`searchObj/any/${user2}`).remove();
          

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
      toggleSearch = () => {
        this.setState({searching:true})
      }
    render() {
    
    
    
      return (
      <div>
        
  
  
   <Header user={this.state.user} signout={this.signOut}/> 
  
  {!this.state.user ?  this.state.register ?  
  <Register   errormsg={this.state.errormsgreg} onChange={this.onChange} onClick={this.onChange} onSubmit={this.onSubmitNewUser}/> : 
  <Login google={this.signInWithGoogle} errormsg={this.state.errormsg} signin={this.signIn} onChange={this.onChange} onSubmit={this.signIn}/>  
  : null }
  
  {this.state.currentUsername && this.state.user ? <p> welcome {this.state.currentUsername} </p>: null}
  {this.state.currentUsername && this.state.user && !this.state.searching ? <Search onSubmit={this.searchInsomnia} onChange={this.onChangeChecked}/>:null}
  {this.state.searching && this.state.user ? <Loading onChange={this.onChange}/> : null}
    
    

      </div>
    
  
  
    
    );
  
  
  
  }
}

export default Main;
