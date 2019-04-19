// LOAD DATA


var userData = require("../data/friends");


// ROUTING


module.exports = function(app) {


  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(userData);
  });

  var comparisonUserTotalScore = 0;

  var friendScores = [];


  // API POST Requests


  app.post("/api/friends", function(req, res) {

  
    var currentUserScores = req.body.scores;

    console.log("Current user scores: " + currentUserScores);

    // Determine the user's most compatible friend.
    for (var i = 0; i < userData.length; i++) {

   
      var comparisonUserScores = userData[i].scores;

  
      comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

      friendScores.push(comparisonUserTotalScore);

    }

    console.log("Array of friend scores: " + friendScores);

    var index = 0;
    var value = friendScores[0];

    for (var i = 0; i < friendScores.length; i++) {
      console.log("Value of item in array: " + friendScores[i]);
      if (friendScores[i] < value) {
        value = friendScores[i];
        index = i;
      }
    }

    console.log("Best friend name: " + userData[index].name);

    res.send(userData[index]);

   
    userData.push(req.body);

  });
};

var totalDifference = 0;

// Find total difference between current user and another user.
function calculateUserCompatibilityScore(currentUserScores, comparisonUserScores) {

  // Reset the total difference 
  totalDifference = 0;

  for (var i = 0; i < currentUserScores.length; i++) {

    totalDifference+=Math.abs(currentUserScores[i] - comparisonUserScores[i]);
  }

  console.log("Final total difference for friend: " + totalDifference);

  return totalDifference;
};

