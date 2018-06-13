$(document).ready(function () {
  //fire base configeration
  var config = {
    apiKey: "AIzaSyDddZ0MY3GQzW0dCAvEJGHzwN7KpdndyTc",
    authDomain: "bookworm-f822f.firebaseapp.com",
    databaseURL: "https://bookworm-f822f.firebaseio.com",
    projectId: "bookworm-f822f",
    storageBucket: "bookworm-f822f.appspot.com",
    messagingSenderId: "361463431080"
  };
  firebase.initializeApp(config);
  //listener for user status changed 
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("user in is " + user.displayName);
      //if the user log in hide log in from nav and show log out 
      $("#loginNav").addClass("d-none");
      $("#logoutNav").removeClass("d-none")
      $("#logoutNav").addClass("d-block")
      //add user name when logged in at the nav 
      var p = $("<p>").text("welcome " + user.displayName);
      $("#name").empty();
      $("#name").append(p);
    }
    else {
      console.log("no user logged in ")
    }
  })
  //declair my interval 
  var myInterval;
  //call displayQuote function every 10 seconds
  myInterval = setInterval(displayQuote, 10000);

  //function to display quotes 
  function displayQuote() {
    //call ajax function for qoute API
    $.ajax({
      url: 'https://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: function (response) {
        // console.log(response.quoteText);

        $("#quote").text("“" + response.quoteText + ".“ ―" + response.quoteAuthor)
        // $("#author").text(response.quoteAuthor)


      }

    })
  }
  //when user press log out button 
  $(".logoutBtn").on("click", function (event) {
    event.preventDefault();
    console.log("logging out")
    //sign out from fire base 
    firebase.auth().signOut().then(function () {
      console.log('Signed Out');
      location.reload();
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  })

})