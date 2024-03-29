// alert ("Resetting..")

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
    var trainFrequency = $("#frequency-input").val().trim();
    var trainTime = $("#time-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDesination,
        frequency: trainFrequency,
        time: trainTime
    };

    database.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.time);
    // console.log(newTrain.frequency);

    alert("Train added Successfully");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
});

database.ref().on("child_added", function(childSnapshot){
     console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainTime);

    // convert military time to AM / PM
    var newTrainTime = (moment(trainTime, 'HH:mm').format('hh:mm a'));

    // calculate next train arrival

    // // calculate minutes to next train
    var tFrequency = trainFrequency;
    var firstTime = newTrainTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextArrival = (moment(nextTrain, 'HH:mm').format('hh:mm a'));

   // $("#CurrentTime").text(moment().format('MMMM Do YYYY, h:mm:ss a'));



    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text("every " + trainFrequency + " minutes"),
       // $("<td>").text(newTrainTime),
        $("<td>").text(nextArrival),
        $("<td>").text(tMinutesTillTrain + " minutes")
    );

    $("#train-table > tbody").append(newRow);
});