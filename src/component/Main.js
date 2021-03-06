import React, { Component } from 'react';
import firebase from '../firebase.js';
import Header from '../component/header/Header.js';
import Login from '../component/forms/Login.js';
import Register from '../component/forms/Register.js';
import Search from '../component/search/Search.js';
import Loading from '../component/loading/Loading.js';
import Chatroom from '../component/chatroom/Chatroom.js';
import PostCard from '../component/chatroom/PostCard.js';

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
    searching:"",
    chat:'',
    posttext:'',
    user2:'',
    errorSearch:'',


 }
 componentDidMount(){

           // LISTENERS
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
           

                // Listens to DB if user is connected : 
       firebase.database().ref(`users/${this.state.user.uid}/chatroom`).on("value", (snapshot) => {
       if (snapshot.val()){
        firebase.database().ref(`chatRooms/${snapshot.val()}`).once('value',(innersnapshot)=> {
          if(innersnapshot.val().userid1 === this.state.user.uid){
            firebase.database().ref(`users/${innersnapshot.val().userid2}`).once('value',(inceptionsnap)=>{
              this.setState({user2:inceptionsnap.val().username})
            })
          }
          else{
            firebase.database().ref(`users/${innersnapshot.val().userid1}`).once('value',(inceptionsnap)=>{
              this.setState({user2:inceptionsnap.val().username})
            })
          }
        })
         var result = snapshot.val();
         
          this.setState({
            connected:result,
            searching:false,
          })
         
         
         
          firebase.database().ref(`chatRooms/${this.state.connected}/posts`).on('child_added', (snapshot) => {
            let newChat = [...this.state.chat];
            newChat.push({
              key: snapshot.key,
              val: snapshot.val()
            });
            this.setState({
              chat: newChat
            });
         
         });
          
        }
         else{
           this.setState({connected:''}) 
           }
      });
    } 
               // If failed to log in , dont set user or logout
               else{
            this.setState({user:''})
          
               }
            })
         }

    // Handle state 
    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    // Handle the checkboxes
    onChangeChecked = (e) =>   this.setState({[e.target.name]: e.target.checked})
    // Push post into database
    onSubmitChat = (e) =>{
      e.preventDefault();

      firebase.database().ref(`chatRooms/${this.state.connected}/posts`).push(
        {
        text:this.state.posttext,
        userId:this.state.user.uid,
        }
      )
      .then (()=> {
        this.setState({
          posttext:'',
        })
      })
     
    }


    // Create new user  
    onSubmitNewUser = (e) => {
        e.preventDefault();
        if(this.state.currentUsername!=="") {
        firebase.auth()
          .createUserWithEmailAndPassword(this.state.username, this.state.password)
          .then((user) => {
            firebase
              .database()
              .ref(`users/${user.uid}`)
              .set({ email: user.email, uid: user.uid , username:this.state.currentUsername , chatroom:'' })
            })
          .catch(error => this.setState({errormsgreg:error.message}))
        }
        else{
          this.setState({
            errormsgreg:"Please enter Username",
          })
        }
      };
      // Create / sign in with Google
      signInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
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
      if(!this.state.energy && !this.state.work && !this.state.any) {
        this.setState({
          errorSearch:true,
        })
       
        

      }
    
      else{
        this.toggleSearch();
        this.setSearchObjects();
        this.checkForMatch();
        this.findMatch();
        this.setState({
          errorSearch:'',
      })
       
      }
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
         this.checkEnerg();
      }
        // Functions that check preferences 
        checkAny = () => {
          this.state.any ? firebase.database().ref(`searchObj/any`).orderByChild('userId')
          .equalTo(this.state.user.uid)
          .on('value', (snapshotAny) => {
            if(snapshotAny.val() !== null) {
              firebase.database().ref(`searchObj/any`).orderByChild('userId')
              .once('value',(snapshotAny) => {
                if(snapshotAny.val() !== null){
                if(Object.keys(snapshotAny.val())[1] !== undefined){
                  this.setState({
                    energy:false,
                    work:false,
                    any:false,
                    searching:false,
                  })
                Object.keys(snapshotAny.val())[0] !== this.state.user.uid ?
                this.createChatRoom(this.state.user.uid, Object.keys(snapshotAny.val())[0])
              : this.createChatRoom(this.state.user.uid, Object.keys(snapshotAny.val())[1])
              }
            }
          })
        } 
      }):null;
    
        }

        checkWork = () => {
        this.state.work ? firebase.database().ref(`searchObj/work`).orderByChild('userId')
        .equalTo(this.state.user.uid)
        .on('value', (snapshotWork) => {
          if(snapshotWork.val() !== null) {
            firebase.database().ref(`searchObj/work`).orderByChild('userId')
            .once('value',(snapshotWork) => {
        if(snapshotWork.val() !== null){
              
              if(Object.keys(snapshotWork.val())[1] !== undefined){
                this.setState({
                  energy:false,
                  work:false,
                  any:false,
                  searching:false,
                })
              Object.keys(snapshotWork.val())[0] !== this.state.user.uid ?
              this.createChatRoom(this.state.user.uid, Object.keys(snapshotWork.val())[0])
            : this.createChatRoom(this.state.user.uid, Object.keys(snapshotWork.val())[1])
            }else{
              this.checkAny();
            }
          }
        })
      }
     }):this.checkAny();

        }


        checkEnerg = () => {
          this.state.energy ? firebase.database().ref(`searchObj/energy`).orderByChild('userId')
          .equalTo(this.state.user.uid)
          .on('value', (snapshot) => {
            if(snapshot.val() !== null) {
              firebase.database().ref(`searchObj/energy`).orderByChild('userId')
              .once('value',(snapshot) => {
                if(snapshot.val() !== null){
                
                if(Object.keys(snapshot.val())[1] !== undefined){
                  this.setState({
                    energy:'',
                    work:'',
                    any:'',
                    searching:false,
                  })
                Object.keys(snapshot.val())[0] !== this.state.user.uid ?
                this.createChatRoom(this.state.user.uid, Object.keys(snapshot.val())[0])
              : this.createChatRoom(this.state.user.uid, Object.keys(snapshot.val())[1])
              }else{
                this.checkWork();
              }
            }
          })
        }   
       }):this.checkWork();
     }


        //Creates chat-object
        createChatRoom = (userid1, userid2) => {
          firebase.database().ref(`chatRooms/${userid1+userid2}`).set({
            userid1:userid1,
            userid2:userid2,
            posts:'',
          })
          // SETS CHATROOM FOR USERS
          firebase.database().ref(`users/${userid1}`).update({
           chatroom:userid1+userid2,
          })
          firebase.database().ref(`users/${userid2}`).update({
            chatroom:userid1+userid2,
           })
          this.clearDB(userid1,userid2);
         
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

        // DELETE CURRENT CHATROOM
        clearChatrooms = (user1) =>{
              
          firebase.database().ref(`users/${user1}/chatroom`).remove();
     
        }
        // Sign in with email
      signIn = (e) => { 
        e.preventDefault();
        firebase.auth()
          .signInWithEmailAndPassword(this.state.username, this.state.password)
          .catch(error => this.setState({errormsg:error.message}));
      }
        // Signout function
      signOut = (e) => {
        e.preventDefault();
        this.clearDB(this.state.user.uid);
        this.clearChatrooms(this.state.user.uid);
        this.setState({
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
          searching:"",
          chat:'',
          posttext:'',
          user2:'',
          errorSearch:'',
        })
        firebase.auth().signOut();
       
    }
    // Leave chatroom
     leaveChat = () => {
      this.setState({
        connected:'',
        chat:'',
        posttext:'',
        register:'',
        connected:'',
        work:'',
        energy:'',
        any:'',
        user2:'',
        errorSearch:'',
     })
      this.clearDB(this.state.user.uid);
      this.clearChatrooms(this.state.user.uid);
  
     }
     // Cancel register 
     noReg = () => {
       this.setState({
         register:'',
         errormsgreg:'',
       })
     
     }
     // Cancel search for chatroom
     noSearch = () => {
      this.clearDB(this.state.user.uid);
      this.clearChatrooms(this.state.user.uid);
      this.setState({
        connected:'',
        searching:'',
        user2:'',
        work:'',
        energy:'',
        any:'',
      })
     }
     // Start search for chatroom 
      toggleSearch = () => {
        this.setState({searching:true})
      }
      
    render() {
    // Renderar ut nya posts i chat
      const renderPost = [...this.state.chat].map((elem, index)=>{
       return  <PostCard key={index} myKey={this.state.user.uid} rKey={elem.val.userId} username={this.state.currentUsername} user2={this.state.user2} posttext={elem.val.text} />
        })

        
    
    
      return (
      <div>
   
  
  
   <Header username={this.state.currentUsername} user={this.state.user} signout={this.signOut}/> 
  {!this.state.user ?  this.state.register ?  
  <Register onClick={this.noReg}  errormsg={this.state.errormsgreg} onChange={this.onChange}  onSubmit={this.onSubmitNewUser}/> : 
  <Login google={this.signInWithGoogle} errormsg={this.state.errormsg} signin={this.signIn} onChange={this.onChange} onSubmit={this.signIn}/>  
  : null }
  {this.state.currentUsername && this.state.user ? <p> {this.state.currentUsername} </p>: null}
  {this.state.connected ? <Chatroom  onSubmit={this.onSubmitChat} posttext={this.state.posttext}  name="posttext" onChange={this.onChange} exit={this.leaveChat} posts={renderPost} p2={this.state.user2}/> : null}
  {this.state.currentUsername && this.state.user && !this.state.searching && !this.state.connected ? <Search  error={this.state.errorSearch}onSubmit={this.searchInsomnia}  onChange={this.onChangeChecked}/>:null}
  {this.state.searching && this.state.user ? <Loading  onClick={this.noSearch}/> : null}

    
    

      </div>
    
  
  
    
    );
  
  
  
  }
}

export default Main;
