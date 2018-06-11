

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
   firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       // User is signed in.
       console.log("user in is "+user.displayName);
       $("#loginNav").addClass("d-none");
       $("#logoutNav").removeClass("d-none")
       $("#logoutNav").addClass("d-block")
       var p=$("<p>").text("welcome "+user.displayName);
         $("#name").empty();
       $("#name").append(p);
     }
       else{
       console.log("noo")
       }
     })

// console.log(firebase.auth()
// );
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("user in is "+user.displayName)
     
      var ref=firebase.database().ref("/books");
      $("#favourite-view").empty();
     ref.on("child_added",function(childSnapshot){
     var books=childSnapshot.val();
  
    // console.log(books.name);

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
  
  else {
    // No user is signed in.
    $("#favourite-view").text("no user logged in ");
  }
});
$(".logoutBtn").on("click",function(event){ 
  event.preventDefault();
     console.log("out")
     firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      location.reload();
    }, function(error) {
      console.error('Sign Out Error', error);
    });
 })

})
