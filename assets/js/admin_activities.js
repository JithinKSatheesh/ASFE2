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
var docRef_put = firestore.ref("activities");

var storageRef = firebase.storage().ref();

document
.getElementById('form-putdata')
.addEventListener('submit', formSubmit);

// on member registration
function formSubmit(e) {

            e.preventDefault();

            var title = document.getElementById("title").value;
            var content = document.getElementById("content").value;
            var timestamp = Date();
            // file uploading 
            var file =  document.querySelector('#uploadImg').files[0];
            var file_name = (+new Date()) + '-' + file.name;
            var metadata = {
                contentType: file.type
              };
            console.log(file_name)
            var task = storageRef.child(file_name).put(file, metadata);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                  console.log(url);
                    //////////////////////
                    // inserting data to 
                    docRef_put.push({
                        title : title,
                        content : content,
                        image : file_name,
                        timestamp : timestamp
                    }).then(function(){
                        console.log("Message saved");
                        readData();
                        
                    }).catch(function(error) {
                        console.log("Got an error: ", error);
                        
                    });              
                    /////////////////
                })
                .catch(console.error);
            


}


// get data


function readData(){
    docRef_put.on("value", function(snapshot) {
        document.getElementById("tbody").innerHTML = "" ;
        document.getElementById("spinner-1").innerHTML = "";
        var i = 0;
        snapshot.forEach(function(childSnapshot) {
            i++;
            var key = childSnapshot.key;           
            var title_val = childSnapshot.val().title;
            var content_val = childSnapshot.val().content;
            var image_val = childSnapshot.val().image;
            var data = '<tr><th scope="row">'+  i +'</th><td>'+ title_val +'</td><td>'+ content_val +'</td><td>'+ image_val +'</td></tr>'
            document.getElementById("tbody").innerHTML += data ;
        })

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
}

readData();