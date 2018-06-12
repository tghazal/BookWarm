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


$("#search-btn").on("click", function (event) {
    //call event .preventDefault to prevent submit the form 
    event.preventDefault();
    //get the value in search text 
    console.log("hi");
    var q = $("#search-text").val().trim();
    //if the value is null then ask user to enter value 
    if (q === "") {
        $("#book-view").text("No results!!!you didn't enter any value")
    }
    //if the value is not null then do the seach for the book
    else {
        //url for calling google book API 
        var url = "https://www.googleapis.com/books/v1/volumes?Key=AIzaSyBiP1NMmkUqkbKrg1Q3B9ou9HvUvP-t5xc&q=" + q;
        axios.get(url).then(function (response) {
            //clear books div 
            $("#book-view").empty();
            //for every item in response
            console.log(response.data.items.length)
            if (response.data.items.length===0)
            {
                $("#book-view").text("no results");
            }
            else 
            {
            for (var i = 0; i < response.data.items.length; i++)
             {
                var rating;
                var ratingBtn;
                //check if this empty then mention that to user 
                var item = response.data.items[i];

                console.log(item.volumeInfo);
                if(item.volumeInfo.industryIdentifiers)
                {
                var isbn = item.volumeInfo.industryIdentifiers[1].identifier;
                
                //call ajax for goodreads API using isbn
                 ratingBtn=$("<button class='btn bg-dark text-light '>Get Rating</buton>")
               
                 ratingBtn.attr("class", "getRating");
                 ratingBtn.attr("isbn",isbn);
               
                var ratingp=$("<p>").append(ratingBtn);

                }
                var bookTitle = item.volumeInfo.title;
                var imgSrc = item.volumeInfo.imageLinks.smallThumbnail;
                if (item.volumeInfo.authors){
                var authors = item.volumeInfo.authors[0];
                }
                if(item.volumeInfo.categories){
                var category = item.volumeInfo.categories[0];
                }

                var description = item.volumeInfo.description;
                var infolink=item.volumeInfo.infoLink;
                console.log(infolink);
                var bookImg = $("<img>");
                bookImg.attr("src", imgSrc);
                bookImg.css("width", "180px");
                bookImg.css("height", "180px");  
                var a=$("<a  target='_blank' href="+infolink+"></a>");
                b=a.append(bookImg);
                var titleP = $("<p class='mt-2'>").text("𝐓𝐢𝐭𝐥𝐞 :" + bookTitle);
                if (authors){
                var authorP = $("<p class='mt-1'>").text("𝐀𝐮𝐭𝐡𝐨𝐫 :" + authors);}
                if(category){
                var categoryP = $("<p class='mt-1'>").text("𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲  :" + category);}
                var ratingP = $("<p class='mt-1'>").text("𝐑𝐚𝐭𝐢𝐧𝐠 :" + rating);
                var desButton=$("<button class='btn bg-dark text-light '> 𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣</buton>")
               
                desButton.attr("class", "desModal");
                desButton.attr("desription",description);
               
                var desp=$("<p>").append(desButton);
                 var saveBtn=$("<button class='far fa-save'> Save</button>")
                 saveBtn.attr("class", "saveBook");
                 saveBtn.attr("title",bookTitle);
                 saveBtn.attr("imgSrc",imgSrc);
                 saveBtn.attr("infoLink",infolink);
                 var savep=$("<p>").append(saveBtn);

                var col = $("<div class='col-md-3 col-sm-6 mt-2 mt-3 mb-5  myFont '>").append([b, titleP, ratingP, authorP, categoryP,desp,ratingp,savep]);
                $("#book-view").append(col);

            }
        }
        }).catch(function (err) {
            console.error(err)
        })

    }

})
saveBook = function () {

    if(firebase.auth().currentUser)
    {
  console.log( firebase.auth().currentUser.displayName);
    var title = $(this).attr("title");
    var imgSrc = $(this).attr("imgSrc");
    var infoLink = $(this).attr("infoLink");
    console.log(title);
    ref=firebase.database().ref("/books");

ref.push().set({
name:firebase.auth().currentUser.displayName,
bookTitle:title,
imgSrc:imgSrc,
infoLink:infoLink

})
    }
    else{
        bootbox.alert("please log in before saving");
    }
}

desModal = function () {

    var description = $(this).attr("desription");
    bootbox.alert(description);
    console.log(description);
}


getRating=function(){
    console.log("hi");
    var isbn=$(this).attr("isbn");
    console.log(isbn)

    var url = "https://cors.io/?http://www.goodreads.com/book/review_counts.json?key=UyhBVmqCWPtrAZdeZOn51A&isbns=" + isbn;
    axios.get(url)
        .then(function (response) {
            console.log(response)
           rating = response.data.books[0].average_rating;
           review = response.data.books[0].reviews_count
           bootbox.alert("Rating = "+rating +"  AND Reviews count = "+review);

        })
        .catch(function (error) {
            console.log(error)
        })
    }





// Adding click event listeners to the elements with a class of "saveBook"
$(document).on("click", ".saveBook", saveBook);
$(document).on("click", ".desModal", desModal);
$(document).on("click",".getRating",getRating);


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