var myInterval;
myInterval = setInterval(displayQuote, 5000);

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
   console.log(response.quoteText);
   
    $("#quote").text("“"+response.quoteText+".“ ―"+response.quoteAuthor)
   // $("#author").text(response.quoteAuthor)


}

  })
}