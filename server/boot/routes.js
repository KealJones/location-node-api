module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get("/getMatches", function(req, res) {
    var Account = app.models.Account;
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
        return accounts;
      }
    );
  });
};
