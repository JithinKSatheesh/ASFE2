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
var docRef_get = firestore.ref("membership");


// get data


function readData(){
    docRef_get.on("value", function(snapshot) {
        document.getElementById("tbody").innerHTML = "" ;
        document.getElementById("spinner-1").innerHTML = "";
        var i = 0;
        snapshot.forEach(function(childSnapshot) {
            i++;
            var key = childSnapshot.key;           
            var name = childSnapshot.val().name;
            var surname = childSnapshot.val().surname;
            var date_of_birth = childSnapshot.val().date_of_birth;
            var nationality = childSnapshot.val().nationality;
            var address_c = childSnapshot.val().address_c;
            var pincode_c = childSnapshot.val().pincode_c;
            var state_c = childSnapshot.val().state_c;
            var address_p = childSnapshot.val().address_p;
            var pincode_p = childSnapshot.val().pincode_p;
            var state_p = childSnapshot.val().state_p;
            var degree = childSnapshot.val().degree;
            var year_of_joining = childSnapshot.val().year_of_joining;
            var college = childSnapshot.val().college;
            var position = childSnapshot.val().position;
            var date_of_holding = childSnapshot.val().date_of_holding;
            var place_of_posting = childSnapshot.val().place_of_posting;
            var company_address = childSnapshot.val().company_address;
            var payment_info = childSnapshot.val().payment_info;
            var date_payment = childSnapshot.val().date_payment;
            var payment_bank = childSnapshot.val().payment_bank;
            var timestamp = childSnapshot.val().timestamp;
           
            
            var data = '<tr><th scope="row">'+ i +'</th><td>'+ name +'</td><td>'+ surname +'</td><td>'+ date_of_birth +'</td><td>'+ nationality +'</td><td>'+ address_c +'</td><td>'+ pincode_c +'</td><td>'+ state_c +'</td><td>'+ address_p +'</td><td>'+ pincode_p +'</td><td>'+ state_p +'</td><td>'+ degree +'</td><td>'+ year_of_joining +'</td><td>'+ college +'</td><td>'+ position +'</td><td>'+ date_of_holding +'</td><td>'+ place_of_posting +'</td><td>'+ company_address +'</td><td>'+ payment_info +'</td><td>'+ date_payment +'</td><td>'+ payment_bank +'</td><td>'+ timestamp +'</td></tr>'
            document.getElementById("tbody").innerHTML += data ;
        })

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
}

readData();