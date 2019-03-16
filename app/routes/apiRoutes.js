var friendsData = require ("../data/friends");


module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
      
    });

    app.post("/api/friends" , function(req, res){
        // console.log(req.body);

        var bestMatch = {};
        var bestMatchDiff = 50;
        var newScores = req.body.scores; // scores is an array
        //Loop over existing friends
        for(var i = 0; i < friendsData.length;i++) {
          var currentdifference = 0;
          for(var j = 0; j < newScores.length;j++) {
            currentdifference+= Math.abs(friendsData[i].scores[j] - newScores[j]); //abs ignores + or - values // this adds the value to diff
          }

          if(currentdifference < bestMatchDiff) {
             bestMatch = {
              name: friendsData[i].name,
              photo:friendsData[i].photo,
              scores:currentdifference
              }
            }
        } 

          friendsData.push(req.body);
          res.json(bestMatch);

    });

};