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
                //check if this empty then mention that to user 
                var item = response.data.items[i];

                console.log(item.volumeInfo);
                if(item.volumeInfo.industryIdentifiers)
                {
                var isbn = item.volumeInfo.industryIdentifiers[1].identifier;
                
                //call ajax for goodreads API using isbn

                var url = "https://cors.io/?http://www.goodreads.com/book/review_counts.json?key=UyhBVmqCWPtrAZdeZOn51A&isbns=" + isbn;
                axios.get(url)
                    .then(function (response) {
                        console.log(response)
                        rating = response.data.books[0].average_rating;
                        console.log("rating is "+rating)

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
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
                var button=$("<button class='btn bg-dark text-light '> 𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣</buton>")
                button.attr("onClick", "bootbox.alert('"+description+"')");
                var col = $("<div class='col-md-3 col-sm-6 mt-2 mt-3 mb-5  myFont '>").append([b, titleP, ratingP, authorP, categoryP,button]);
                $("#book-view").append(col);


            }
        }
        }).catch(function (err) {
            console.error(err)
        })


    }




})