
  var config = {
    apiKey: "AIzaSyDddZ0MY3GQzW0dCAvEJGHzwN7KpdndyTc",
    authDomain: "bookworm-f822f.firebaseapp.com",
    databaseURL: "https://bookworm-f822f.firebaseio.com",
    projectId: "bookworm-f822f",
    storageBucket: "bookworm-f822f.appspot.com",
    messagingSenderId: "361463431080"
  };
  firebase.initializeApp(config);


var myInterval;
myInterval = setInterval(displayQuote, 10000);

function displayQuote()
{
  $.ajax({
   url:'http://api.forismatic.com/api/1.0/',
   jsonp:'jsonp',
   dataType:'jsonp',
   data:{
   method:'getQuote',
   lang:'en',
   format:'jsonp'},
   success:function(response){
  // console.log(response.quoteText);
   
    $("#quote").text("“"+response.quoteText+".“ ―"+response.quoteAuthor)
   // $("#author").text(response.quoteAuthor)


}

  })
}


$("#registerBtn").on("click",function(event){
  event.preventDefault();
  var name=$("#name1-input").val().trim();
  var email=$("#email1-input").val().trim();
  var password=$("#password1-input").val().trim();
  
 firebase.auth().createUserWithEmailAndPassword(email,password)
 .then(function()
{
 
  firebase.auth().currentUser.updateProfile({displayName:name})
 // user.updateProfile({});
});
firebase.auth().signInWithEmailAndPassword(email,password);
alert("welcome"+firebase.auth().currentUser.displayName)
var p=$("<p>").text("welcome"+firebase.auth().currentUser.displayName).
$("#name").append(p);
//LogInUsers( firebase.auth().currentUser);
 
 }) 

$("#loginBtn").on("click",function(event){
  event.preventDefault();

  var email=$("#email2-input").val().trim();
  var password=$("#password2-input").val().trim();
  
firebase.auth().signInWithEmailAndPassword(email,password);
alert("welcome"+firebase.auth().currentUser.displayName)
var p=$("<p>").text("welcome"+firebase.auth().currentUser.displayName).
$("#name").append(p);
// LogInUsers( firebase.auth().currentUser.displayName);
 }) 
