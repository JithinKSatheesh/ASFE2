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
            var email = childSnapshot.val().email;
            var phone = childSnapshot.val().phone;
            var company = childSnapshot.val().company;
            var data = '<tr><th scope="row">'+ i +'</th><td>'+ name +'</td><td>'+ email +'</td><td>'+ phone +'</td><td>'+ company +'</td></tr>'
            document.getElementById("tbody").innerHTML += data ;
        })

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
}

readData();