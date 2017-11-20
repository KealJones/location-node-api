module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
    var there = app.GeoPoint({
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng)
    });
    return Account.find(
      {
        where: {
          location: {
            near: {
              lat: parseFloat(req.query.lat),
              lng: parseFloat(req.query.lng)
            },
            maxDistance: 2000
          }
        }
      },
      function(err, accounts) {
        for (let index = 0; index < accounts.length; index++) {
          var there = new app.GeoPoint({
            lat: accounts[index].location.lat,
            lng: accounts[index].location.lng
          });

          accounts[index].distance = there.distanceTo(here, { type: "miles" });
        }
        return accounts;
      }
    );
  });
};
