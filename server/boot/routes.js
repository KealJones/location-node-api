module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
    var there = {
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng)
    };
    console.log(there);
    return Account.find(
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
          var here = {
            lat: accounts[index].location.lat,
            lng: accounts[index].location.lng
          };
          console.log(here);
          accounts[index].distance = there.distanceTo(here, { type: "miles" });
        }
        return accounts;
      }
    );
  });
};
