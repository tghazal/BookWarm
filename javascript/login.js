

$("#registerBtn").on("click",function(event){
    event.preventDefault();
    console.log ("hi")
    $("#error2").empty();
    var name=$("#name1-input").val().trim();
    var email=$("#email1-input").val().trim();
    var password=$("#password1-input").val().trim();
    console.log(name);
    if(name==="" || email==="" || password ==="")
    {
        $("#error2").text("All fields are required")
        return 
    }
    else
    {
   firebase.auth().createUserWithEmailAndPassword(email,password)
   .then(function()
  {
    firebase.auth().currentUser.updateProfile({displayName:name})
   
  })
  .catch(function(error){
      console.log("error,"+error)
      $("#error2").text(error.message);
  });
  
    }
   }) 
  
  
  $("#loginBtn").on("click",function(event){
    event.preventDefault();
    $("#error").empty();
    var email=$("#email2-input").val().trim();
    var password=$("#password2-input").val().trim();
    if( email==="" || password ==="")
    {
        $("#error").text("All fields are required")
        return 
    }
    else{
  firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
    bootbox.alert("welcome "+firebase.auth().currentUser.displayName)
    window.location.href = 'index.html';
     //  alert("welcome"+firebase.auth().currentUser.displayName)
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