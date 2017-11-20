module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
    var there = {
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng)
    };
    return res.json(
      Account.find(
        {
          where: {
            location: {
              near: there,
              maxDistance: 2000
            }
          }
        },
        function(err, accounts) {
          for (let index = 0; index < accounts.length; index++) {
            accounts[index].distance = accounts[
              index
            ].location.distanceTo(there, {
              type: "miles"
            });
          }
          return accounts;
        }
      ) || []
    );
  });
};
