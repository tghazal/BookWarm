

  // Initialize Firebase
  $( document ).ready(function() {
    var config = {
     apiKey: "AIzaSyDddZ0MY3GQzW0dCAvEJGHzwN7KpdndyTc",
     authDomain: "bookworm-f822f.firebaseapp.com",
     databaseURL: "https://bookworm-f822f.firebaseio.com",
     projectId: "bookworm-f822f",
     storageBucket: "bookworm-f822f.appspot.com",
     messagingSenderId: "361463431080"
   };
   firebase.initializeApp(config);
   //firebase listener for user status changed
   firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       // User is signed in.
       console.log("user in is "+user.displayName);
       //if user logged in hide log in and show log out button
       $("#loginNav").addClass("d-none");
       $("#logoutNav").removeClass("d-none")
       $("#logoutNav").addClass("d-block")
       var p=$("<p>").text("welcome "+user.displayName);
         $("#name").empty();
       $("#name").append(p);
       //get the saved books from firebase from (books)ref
       var ref=firebase.database().ref("/books");
       $("#favourite-view").empty();
      ref.on("child_added",function(childSnapshot){
      var books=childSnapshot.val();
   // if the user logged in is the same name on book saved then get that book and display it on favourite.html
     if(books.name===user.displayName)
      {  
 
    var imgSrc=books.imgSrc;
    var bookTitle=books.bookTitle;
    var infolink=books.infoLink;
 
    var bookImg = $("<img>");
    bookImg.attr("src", imgSrc);
    bookImg.css("width", "180px");
    bookImg.css("height", "180px");  
    var a=$("<a  target='_blank' href="+infolink+"></a>");
    b=a.append(bookImg);
 
    var titleP = $("<p class='mt-2'>").text("𝐓𝐢𝐭𝐥𝐞 :" + bookTitle);
    var col = $("<div class='col-md-3 col-sm-6 mt-2 mt-3 mb-5  myFont '>").append([b, titleP]);
    $("#favourite-view").append(col);
 
      }
 
     })
     }
       else{
         //if no user logged in 
        $("#favourite-view").text("no user logged in ");
       }
     })
// when press log out button
$(".logoutBtn").on("click",function(event){ 
  event.preventDefault();
     console.log("out")
     //call fire base sogn out function
     firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      location.reload();
    }, function(error) {
      console.error('Sign Out Error', error);
    });
 })

})
