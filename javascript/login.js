
// when register button pressed 
$("#registerBtn").on("click",function(event){
    event.preventDefault();
    console.log ("hi")
    $("#error2").empty();
       //get the values that user input 
    var name=$("#name1-input").val().trim();
    var email=$("#email1-input").val().trim();
    var password=$("#password1-input").val().trim();
    console.log(name);
    //if any field is empty then ask user to input all fields
    if(name==="" || email==="" || password ==="")
    {
        $("#error2").text("All fields are required")
        return 
    }
    else
    {
        //call firebase auth function to create username and password
   firebase.auth().createUserWithEmailAndPassword(email,password)
   .then(function()
  {
    firebase.auth().currentUser.updateProfile({displayName:name})
    
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
        bootbox.alert("welcome "+firebase.auth().currentUser.displayName)
        window.location.href = 'index.html';
    })



  
   
  })
  .catch(function(error){
      console.log("error,"+error)
      //show the error on html 
      $("#error2").text(error.message);
  });
  
    }
   }) 
  
  // if login button pressed
  $("#loginBtn").on("click",function(event){
    event.preventDefault();
    $("#error").empty();
    //get the values that user input 
    var email=$("#email2-input").val().trim();
    var password=$("#password2-input").val().trim();
     //if any field is empty then ask user to input all fields
    if( email==="" || password ==="")
    {
        $("#error").text("All fields are required")
        return 
    }
    else{
            //call firebase auth function to sign in using user name and password 
  firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
    bootbox.alert("welcome "+firebase.auth().currentUser.displayName)
    window.location.href = 'index.html';
 
  })
  .catch(function(error){
      
    $("#error").text(error.message);
    console.log("error,"+error.message)
  });

    }
  
    
   }) 

   
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