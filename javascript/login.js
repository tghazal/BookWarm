// var config = {
//     apiKey: "AIzaSyDddZ0MY3GQzW0dCAvEJGHzwN7KpdndyTc",
//     authDomain: "bookworm-f822f.firebaseapp.com",
//     databaseURL: "https://bookworm-f822f.firebaseio.com",
//     projectId: "bookworm-f822f",
//     storageBucket: "bookworm-f822f.appspot.com",
//     messagingSenderId: "361463431080"
//   };

//   firebase.initializeApp(config);



//   $("#registerBtn").on("click",function(event){
//     event.preventDefault();
//     var name=$("#name1-input").val().trim();
//     var email=$("#email1-input").val().trim();
//     var password=$("#password1-input").val().trim();
//     if(!email || !password)
//     {
//         return console.log("email and Password required")
//     }
//    firebase.auth().createUserWithEmailAndPassword(email,password)
//    .then(function()
//   {
   
//     firebase.auth().currentUser.updateProfile({displayName:name})
//    // user.updateProfile({});
//   })
//   .catch(function(error){
//       console.log("error,"+error)
//   });
//   firebase.auth().signInWithEmailAndPassword(email,password)
//   .catch(function(error){
//     console.log("error,"+error.message)
//   });
//   console.log("welcome"+firebase.auth().currentUser.displayName)
// //   var p=$("<p>").text("welcome"+firebase.auth().currentUser.displayName).
// //   $("#name").append(p);
//   //LogInUsers( firebase.auth().currentUser);
   
//    }) 
  
//   $("#loginBtn").on("click",function(event){
//     event.preventDefault();
  
//     var email=$("#email2-input").val().trim();
//     var password=$("#password2-input").val().trim();
    
//   firebase.auth().signInWithEmailAndPassword(email,password);
//   alert("welcome"+firebase.auth().currentUser.displayName)
//   var p=$("<p>").text("welcome"+firebase.auth().currentUser.displayName).
//   $("#name").append(p);
//   // LogInUsers( firebase.auth().currentUser.displayName);
//    }) 
  