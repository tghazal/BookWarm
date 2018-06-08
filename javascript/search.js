$("#search-btn").on("click", function (event) {
    //call event .preventDefault to prevent submit the form 
    event.preventDefault();
    //get the value in search text 
    console.log("hi");
    var q = $("#search-text").val().trim();
    //if the value is null then ask user to enter value 
    if (q === "") {

    }
    //if the value is not null then do the seach for the book
    else {
        //url for calling google book API 
        var url = "https://www.googleapis.com/books/v1/volumes?Key=AIzaSyBiP1NMmkUqkbKrg1Q3B9ou9HvUvP-t5xc&q=" + q;

        axios.get(url).then(function (response) {

            // console.log( response.data.items);
             $("#book-view").empty(); 
            for (var i = 0; i < response.data.items.length; i++) { 
               
              
                //check if this empty then mention that to user 

                var item = response.data.items[i];
                   console.log(item.volumeInfo);
                var isbn=item.volumeInfo.industryIdentifiers[1].identifier;
                var bookTitle = item.volumeInfo.title;
                var imgSrc = item.volumeInfo.imageLinks.smallThumbnail;
                var authors = item.volumeInfo.authors[0];
                var category = item.volumeInfo.categories[0];
                var desription = item.volumeInfo.description;

                console.log("des is "+desription);




                console.log(category);

                console.log(authors);



                var bookImg = $("<img>");
                bookImg.attr("src", imgSrc);
                bookImg.css("width", "180px");
                bookImg.css("height", "180px");
                bookImg.addClass("book-img");
                var titleP = $("<p>").text("Title :" + bookTitle);
                //var descriptionP=$("<p>").text(desription);
               $("#desc-body").empty();
               $("#desc-body").text(desription);
                
                var modalBtn = $("<button type='Button' class='btn btn-info btn-lg decBtn' data- toggle='modal' data-target='#myModal'>Description</button>")
                var col = $("<div class='col-md-3 col-sm-6 mt-2 '>").append([bookImg, titleP, modalBtn]);
                $("#book-view").append(col);

                
            //    bootbox.alert("Hello world!");





            }

        }).catch(function (err) {
            console.error(err)
        })


    }




})