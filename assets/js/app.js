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
var docRef_activities= firestore.ref("activities");
// storage of file
var storageRef = firebase.storage().ref();



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
            var surname = document.getElementById("surname").value;
            var dob = document.getElementById("DOB").value;
            var nationality = document.getElementById("nationality").value;
            var address_c = document.getElementById("address_c").value;
            var pincode_c = document.getElementById("pincode_c").value;
            var state_c = document.getElementById("state_c").value;
            var address_p = document.getElementById("address_p").value;
            var pincode_p = document.getElementById("pincode_p").value;
            var state_p = document.getElementById("state_p").value;
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone").value;
            var degree = document.getElementById("degree").value;
            var yoj = document.getElementById("yoj").value;
            var college = document.getElementById("college").value;
            var position = document.getElementById("position").value;
            var doh = document.getElementById("doh").value;
            var place_of_posting = document.getElementById("place_of_posting").value;
            var company_address = document.getElementById("company_address").value;
            var payment_info = document.getElementById("payment_info").value;
            var date_payment = document.getElementById("date_payment").value;
            var payment_bank = document.getElementById("payment_bank").value;
            var timestamp = Date();


            var message1 = document.getElementById("message-1")

            console.log(name);

            docRef.push({
                name : name,
                surname:surname,
                date_of_birth:dob,
                nationality:nationality,
                address_c:address_c,
                pincode_c:pincode_c,
                state_c:state_c,
                address_p:address_p,
                pincode_p:pincode_p,
                state_p:state_p,
                phone : phone,
                email : email,
                degree:degree,
                year_of_joining:yoj,
                college:college,
                position:position,
                date_of_holding:doh,
                place_of_posting:place_of_posting,
                company_address:company_address,
                payment_info:payment_info,
                date_payment:date_payment,
                payment_bank:payment_bank,
                timestamp : timestamp
            }).then(function(){
                console.log("Message saved");
                alert("Request send successfully.")
                document.getElementById("form1").reset();
                message1.innerHTML = '<div class="alert alert-success">Your request is registered. we will contact you soon.</div> ';
                
            }).catch(function(error) {
                console.log("Got an error: ", error);
                message1.innerHTML = '<div class="Something went wrong!. Please try again.</div> ';
            });


}

// on dropping a message
function formSubmitcontact(e) {
    
    e.preventDefault();

    var name = document.getElementById("name-contact").value;
    var email = document.getElementById("email-contact").value;
    var message = document.getElementById("message-contact").value;

    var messagebox = document.getElementById("messagebox");
    var timestamp = Date();
    console.log(name);

    docRef_message.push({
        name : name,
        email : email,
        message:message,
        timestamp : timestamp
    }).then(function(){
        console.log("Message saved");
        document.getElementById("form-contact").reset();
        messagebox.innerHTML = '<div class="alert alert-success">Your message have been sent.</div> ';
        
    }).catch(function(error) {
        console.log("Got an error: ", error);
        messagebox.innerHTML = '<div class="alert alert-danger">Something went wrong. Please try again.</div> ';
    });


}

// populating activity

function populate_activity(){

    docRef_activities.on("value", function(snapshot) {

        document.getElementById("spinner-1").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            var title_val = childSnapshot.val().title;
            var content_val = childSnapshot.val().content;
            var image_val = childSnapshot.val().image;

            var starsRef = storageRef.child(image_val);
            starsRef.getDownloadURL().then(function(url) {
                            var imageUrl =  url;
                            var data = '<div class="col col-12 col-lg-4 mr-4"><div class="card" style="width: 18rem;"><img src="'+imageUrl+'" class="card-img-top" alt="..." class="space-holder"><div class="card-body"><h5 class="card-title">'+ title_val +'</h5><p class="card-text">'+ content_val +'</p></div></div></div> ';
                            document.getElementById("activities_box").innerHTML += data;

                        }).catch(function(error) {
                            var dummyImage = 'assets/img/bg-1.png'; 
                            var data = '<div class="col col-12 col-lg-4 mr-4"><div class="card" style="width: 18rem;"><img src="'+dummyImage+'" class="card-img-top" alt="..." class="space-holder"><div class="card-body"><h5 class="card-title">'+ title_val +'</h5><p class="card-text">'+ content_val +'</p></div></div></div>';
                            document.getElementById("activities_box").innerHTML += data;
                            console.log("error in geting image file");
            
                        });

           
        })

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });


}
// calling function
populate_activity();




