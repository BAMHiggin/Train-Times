
var myKey = config.myKey;
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = "";
var frequency = 0;
var currentTime = moment();
var minutesAway = ()


$("#submitButton").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTime = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    $('#trainNameInput').val("");
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
    })
    // database.ref().orderByChild(database.destination).limitToLast(1); //look into these -- unsure what to do with it right now


});


database.ref().on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());
    // console.log(childSnapshot.val().trainName);
    // console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().firstTime);
    // console.log(childSnapshot.val().frequency);


    var trainData = childSnapshot.val();
    $('#tBody')
        .append(
            `<tr>
            <th scope="row">${trainData.trainName}</th>
            <td>${trainData.destination}</td>
            <td>${trainData.firstTime}</td>
            <td>${trainData.frequency}</td>
            <td></td>
            </tr>`)

});






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
