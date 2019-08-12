alert ("Resetting..")

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

    //database.ref().push(newTrain);

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