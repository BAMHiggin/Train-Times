
var myKey = config.myKey; // hidden in config.js with a gitignore file so sensitive api key doesn't show up in github
firebase.initializeApp(config);

var database = firebase.database();

//globals
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = 0;


$("#submitButton").on("click", function (event) { //on submit click, 
    event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTime = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years"); // one year back so we aren't dealing with times in the future
    console.log(firstTimeConverted);

    $('#trainNameInput').val(""); //clears input fields
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");

    database.ref().push({  // pushes value to firebase
        trainName: trainName,
        destination: destination,
        firstTime: firstTimeConverted.format(), //errors display without format() for Firebase, must use
        frequency: frequency
    })


});


database.ref().on("child_added", function (childSnapshot) { //scans database objects for updates
 
    var trainData = childSnapshot.val(); //snapshot of current object that were on

    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(trainData.firstTime), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainData.frequency;

    // Minute Until Train
    var tMinutesTillTrain = trainData.frequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");



    $('#tBody')
        .append(
            `<tr>
            <th scope="row">${trainData.trainName}</th>
            <td>${trainData.destination}</td>
            <td>${nextTrain}</td>
            <td>${trainData.frequency}</td>
            <td>${tMinutesTillTrain}</td>
           
            </tr>`)

});




{/* <td>${currentTime}</td> */}


// var row = $("<tr>");
    // row.append( $("<td>").val().trainName);

    // var newRow= $("#tBody").append(row);
    // newRow.append= $("<td>" + trainData.trainName + "/<td>") ///don't forget to use clear command so data doesn't duplicate
    // newRow.append= $("<td>" + trainData.destination + "/<td>")
    // newRow.append= $("<td>" + trainData.firstTime + "/<td>")
    // newRow.append= $("<td>" + trainData.frequency + "/<td>")

    // function populateTable(){
    // $('#tBody').empty();
    // for (var i = 0; i < trainData.length; i++) {
    //     var currentTrain = trainData[i];
    //     $('#tBody')
    //         .append(
    //             `<tr>
    //         <th scope="row">${currentTrain.trainName}</th>
    //         <td>${currentTrain.destination}</td>
    //         <td>${currentTrain.firstTime}</td>
    //         <td>${currentTrain.frequency}</td>
    //         </tr>`)
    // }

    // $('#tBody').empty();
    // for (var i = 0; i < trainData.length; i++) {
    //     var currentTrain = trainData[i];
    //     $('#tBody')
    //         .append(
    //             `<tr>
    //         <th scope="row">test</th>
    //         <td>${currentTrain.destination}</td>
    //         <td>${currentTrain.firstTime}</td>
    //         <td>${currentTrain.frequency}</td>
    //         </tr>`)
    // }
