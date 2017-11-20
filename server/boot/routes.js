module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
    var there = new app.loopback.GeoPoint({
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng)
    });

    let Nearby = Account.find({
      fields: {
        id: true,
        name: true,
        location: true
      },
      where: {
        location: {
          near: there,
          maxDistance: 2000
        }
      }
    })
      .then(data => {
        for (var account in data) {
          data[account].distance = new app.loopback.GeoPoint(
            data[account].location
          ).distanceTo(there, {
            type: "meters"
          });
          delete data[account].location;
        }
        return res.json(data);
      })
      .catch(function(error) {
        console.error(error);
      });
  });
};
