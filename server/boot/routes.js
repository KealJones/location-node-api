module.exports = function(app) {
  /*
Expected URL:
https://hairdoo.co/getMatches?latitude=24.421&longitude=127.391

Expected Example Response:

[{
	'Name': "John Artist 1",
  'Distance': 512.74
}, {
	'Name': "Ted Artist 2",
	'Distance': 953.2
}, {
	'Name': "Vince Artist 3",
	'Distance': 1329.68
}]

  *
  */
  app.get("/getMatches", (req, res) => {
    let Account = app.models.Account;
    let role = "artist";
    if (!req.query.latitude)
      return res.status(400).send({
        status: 400,
        message: "parameter `latitude` is required."
      });
    if (!req.query.longitude)
      return res.status(400).send({
        status: 400,
        message: "parameter `longitude` is required."
      });
    if (req.query.role == "user" || req.query.role == "artist") {
      role = req.query.role;
    }

    return Account.getByLocation(req.query.latitude, req.query.longitude, role)
      .then(data => res.json(data))
      .catch(err =>
        res.status(500).json({
          status: 500,
          message: "Sorry, Something went terribly wrong."
        })
      );
  });
};
