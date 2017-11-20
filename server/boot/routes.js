var loopback = require("loopback");
module.exports = function(app) {
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
    var there = new loopback.GeoPoint({
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
          var here = new loopback.GeoPoint({
            lat: accounts[index].location.lat,
            lng: accounts[index].location.lng
          });

          accounts[index].distance = there.distanceTo(here, {
            type: "miles"
          });
        }
        return accounts;
      }
    );
  });
};
