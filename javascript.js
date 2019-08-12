alert ("Resetting..")

var firebaseConfig = {
    apiKey: "AIzaSyDTTN_C3nKl6xhX-Wp0UrDBZ_d5gdIFUnE",
    authDomain: "train-scheduler-efe5d.firebaseapp.com",
    databaseURL: "https://train-scheduler-efe5d.firebaseio.com",
    projectId: "train-scheduler-efe5d",
    storageBucket: "",
    messagingSenderId: "583511190220",
    appId: "1:583511190220:web:13c9cb5ee6316deb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

//button for adding employees
$("#submit-btn").on("click", function(event){
    event.preventDefault()
    console.log("CLICKED")

    var trainName = $("#train-name-input").val().trim();
    var trainDesination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDesination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train added Successfully");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainTime),
        $("<td>").text(trainFrequency)
    );

    $("#train-table > tbody").append(newRow)
});