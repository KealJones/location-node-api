module.exports = function(app) {
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
    var loopback = require("loopback");
    var there = {
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng)
    };
    there = new app.GeoPoint(there);
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
        /*for (let index = 0; index < accounts.length; index++) {
          var here = accounts[index].location;

          accounts[index].distance = here.distanceTo(there, {
            type: "miles"
          });
        }*/
        return accounts;
      }
    );
  });
};
