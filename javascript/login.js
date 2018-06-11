

$("#registerBtn").on("click",function(event){
    event.preventDefault();
    var name=$("#name1-input").val().trim();
    var email=$("#email1-input").val().trim();
    var password=$("#password1-input").val().trim();
    if(!email || !password)
    {
        return console.log("email and Password required")
    }
   firebase.auth().createUserWithEmailAndPassword(email,password)
   .then(function()
  {
   
    firebase.auth().currentUser.updateProfile({displayName:name})
   // user.updateProfile({});
  })
  .catch(function(error){
      console.log("error,"+error)
  });
//   firebase.auth().signInWithEmailAndPassword(email,password)
//   .catch(function(error){
//     console.log("error,"+error.message)
//   });
//   console.log("welcome"+firebase.auth().currentUser.displayName)
//   var p=$("<p>").text("welcome"+firebase.auth().currentUser.displayName).
//   $("#name").append(p);
  //LogInUsers( firebase.auth().currentUser);
   
   }) 
  
  $("#loginBtn").on("click",function(event){
    event.preventDefault();
  
    var email=$("#email2-input").val().trim();
    var password=$("#password2-input").val().trim();
    
  firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
    bootbox.alert("welcome "+firebase.auth().currentUser.displayName)
   // window.location.href = 'index.html';
     //  alert("welcome"+firebase.auth().currentUser.displayName)
  })
  .catch(function(error){
    console.log("error,"+error.message)
  });


  
    
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