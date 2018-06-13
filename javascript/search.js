$(document).ready(function () {
    //firebase configeration
    var config = {
        apiKey: "AIzaSyDddZ0MY3GQzW0dCAvEJGHzwN7KpdndyTc",
        authDomain: "bookworm-f822f.firebaseapp.com",
        databaseURL: "https://bookworm-f822f.firebaseio.com",
        projectId: "bookworm-f822f",
        storageBucket: "bookworm-f822f.appspot.com",
        messagingSenderId: "361463431080"
    };
    firebase.initializeApp(config);
    //fire base listener for user status changed
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log("user in is " + user.displayName);
            //hide log in and show log out button at the nav 
            $("#loginNav").addClass("d-none");
            $("#logoutNav").removeClass("d-none")
            $("#logoutNav").addClass("d-block")
            //display user name 
            var p = $("<p>").text("welcome " + user.displayName);
            $("#name").empty();
            $("#name").append(p);
        }
        else {
            console.log("noo")
        }
    })

    // when search button pressed
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
                if (response.data.items.length === 0) {
                    $("#book-view").text("no results");
                }
                else {
                    for (var i = 0; i < response.data.items.length; i++) {

                        var ratingBtn;
                        //check if this empty then mention that to user 
                        var item = response.data.items[i];
                        if (item.volumeInfo.industryIdentifiers) {
                            //if isbn is available in the response  then create button to call goodreads API and get rating and reviews 
                            var isbn = item.volumeInfo.industryIdentifiers[1].identifier;
                            ratingBtn = $("<button class='btn bg-dark text-light '  style='color:black;font-weight:bold'>Get Rating</buton>")
                            ratingBtn.attr("class", "getRating");
                            ratingBtn.attr("isbn", isbn);
                            var ratingp = $("<p>").append(ratingBtn);

                        }
                        //get book title from response
                        var bookTitle = item.volumeInfo.title;
                        //get image source from response
                        var imgSrc = item.volumeInfo.imageLinks.smallThumbnail;
                        //get author name
                        if (item.volumeInfo.authors) {
                            var authors = item.volumeInfo.authors[0];
                        }
                        //get vategory name
                        if (item.volumeInfo.categories) {
                            var category = item.volumeInfo.categories[0];
                        }
                        //get description 
                        var description = item.volumeInfo.description;
                        var infolink = item.volumeInfo.infoLink;
                        console.log(infolink);
                        //add the image into HTML 
                        var bookImg = $("<img>");
                        bookImg.attr("src", imgSrc);
                        bookImg.css("width", "180px");
                        bookImg.css("height", "180px");
                        var a = $("<a  target='_blank' href=" + infolink + "></a>");
                        b = a.append(bookImg);
                        var titleP = $("<p class='mt-2'>").html("<span style='color:black;font-weight:bold'>Title :</span>" + bookTitle);
                        if (authors) {
                            var authorP = $("<p class='mt-1'>").html("<span style='color:black;font-weight:bold'>Auther :</span>" + authors);
                        }
                        if (category) {
                            var categoryP = $("<p class='mt-1'>").html("<span style='color:black;font-weight:bold'>Category :</span>" + category);
                        }
                        //create button to open modal for book description 
                        var desButton = $("<button class='btn bg-dark text-light  ' style='color:black;font-weight:bold'> Description</buton>")
                        desButton.attr("class", "desModal");
                        desButton.attr("desription", description);
                        var desp = $("<p>").append(desButton);
                        //create button to save book to firebase
                        var saveBtn = $("<button  style='color:black;font-weight:bold'> <i class='fa fa-save'> Save</i> </button>")
                        saveBtn.attr("class", "saveBook");
                        saveBtn.attr("title", bookTitle);
                        saveBtn.attr("imgSrc", imgSrc);
                        saveBtn.attr("infoLink", infolink);
                        var savep = $("<p>").append(saveBtn);
                        //create col with all the info and append it to the div in search.htmlto 
                        var col = $("<div class='col-md-3 col-sm-6 mt-2 mt-3 mb-5  myFont '>").append([b, titleP, authorP, categoryP, desp, ratingp, savep]);
                        $("#book-view").append(col);

                    }
                }
            }).catch(function (err) {
                console.error(err)
            })

        }

    })
    // function to save books to firebase 
    saveBook = function () {
       //check if the user logged in 
        if (firebase.auth().currentUser) {
            //get Title and ImgeSrc and linkInfo from button attributes
            var title = $(this).attr("title");
            var imgSrc = $(this).attr("imgSrc");
            var infoLink = $(this).attr("infoLink");
            // declair ref for firebase database 
            ref = firebase.database().ref("/books");
           // push data to firebase 
            ref.push().set({
                name: firebase.auth().currentUser.displayName,
                bookTitle: title,
                imgSrc: imgSrc,
                infoLink: infoLink
            })
        }
        else {
            //if no user logged in 
            bootbox.alert("please log in before saving");
        }
    }
  // function to display description for each book 
    desModal = function () {
        var description = $(this).attr("desription");
// display description modal by using bootbox
        bootbox.alert(description);
        console.log(description);
    }

  //get rating function to get book rating using isbn 
    getRating = function () {
        console.log("hi");
        var isbn = $(this).attr("isbn");
        console.log(isbn)
//axios to call goodreads API 
        var url = "https://cors.io/?http://www.goodreads.com/book/review_counts.json?key=UyhBVmqCWPtrAZdeZOn51A&isbns=" + isbn;
        axios.get(url)
            .then(function (response) {
                console.log(response)
                //get the rating and reviews count 
                rating = response.data.books[0].average_rating;
                review = response.data.books[0].reviews_count
                //display rating and review counts modals by using bootbox 
                bootbox.alert("Rating = " + rating + "  AND Reviews count = " + review);

            })
            .catch(function (error) {
                console.log(error)
            })
    }





    // Adding click event listeners to the elements with a class of "saveBook", "desModal"."getRating"
    $(document).on("click", ".saveBook", saveBook);
    $(document).on("click", ".desModal", desModal);
    $(document).on("click", ".getRating", getRating);

//when user press logout 
    $(".logoutBtn").on("click", function (event) {
        event.preventDefault();
        console.log("out")
        //call firebase sign out function
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
            location.reload();
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    })
})