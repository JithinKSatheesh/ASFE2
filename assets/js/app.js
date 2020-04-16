  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCPnC9k8vMGC1PcVfCvBfXmVJaWCD93AlI",
    authDomain: "asfe-2020.firebaseapp.com",
    databaseURL: "https://asfe-2020.firebaseio.com",
    projectId: "asfe-2020",
    storageBucket: "asfe-2020.appspot.com",
    messagingSenderId: "900171937490",
    appId: "1:900171937490:web:a6a6957ad0d65d8df09f0b",
    measurementId: "G-NYPL1DD5S3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.database();
var docRef = firestore.ref("membership");
var docRef_message = firestore.ref("messages");

document
.getElementById('form1')
.addEventListener('submit', formSubmit);

document
.getElementById('form-contact')
.addEventListener('submit', formSubmitcontact);


// on member registration
function formSubmit(e) {

            e.preventDefault();

            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone").value;
            var company = document.getElementById("company").value;
            var timestamp = Date();
            var message1 = document.getElementById("message-1")

            console.log(name);

            docRef.push({
                name : name,
                phone : phone,
                email : email,
                company:company,
                timestamp : timestamp
            }).then(function(){
                console.log("Message saved");
                message1.innerHTML = '<div class="alert alert-success">Your request is registered. we will contact you soon.</div> ';
                
            }).catch(function(error) {
                console.log("Got an error: ", error);
                message1.innerHTML = '<div class="Something went wrong. Please try again.</div> ';
            });


}

// on dropping a message
function formSubmitcontact(e) {
    
    e.preventDefault();

    var name = document.getElementById("name-contact").value;
    var email = document.getElementById("email-contact").value;
    var timestamp = Date();
    var message = document.getElementById("message-contact").value;
    var messagebox = document.getElementById("messagebox");

    console.log(name);

    docRef_message.push({
        name : name,
        email : email,
        message:message,
        timestamp : timestamp
    }).then(function(){
        console.log("Message saved");
        messagebox.innerHTML = '<div class="alert alert-success">Your message have been sent.</div> ';
        
    }).catch(function(error) {
        console.log("Got an error: ", error);
        messagebox.innerHTML = '<div class="alert alert-danger">Something went wrong. Please try again.</div> ';
    });


}


function readData(){
    docRef_message.on("value", function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();              // childData will be the actual contents of the child
            var name_val = childSnapshot.val().name;
            console.log(name_val);
        })

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
}
