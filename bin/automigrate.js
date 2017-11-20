var path = require("path");

var app = require(path.resolve(__dirname, "../server/server"));
var ds = app.datasources.accountDS;
ds.automigrate("Account", function(err) {
  if (err) throw err;
  function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }
  var accounts = [
    {
      name: "John Doe",
      location: [getRandomInRange(-90, 90, 3), getRandomInRange(-180, 180, 3)],
      email: "john.doe@ibm.com",
      createdAt: new Date(),
      lastSeenAt: new Date()
    },
    {
      name: "Jane Doe",
      role: "artist",
      location: [getRandomInRange(-90, 90, 3), getRandomInRange(-180, 180, 3)],
      email: "jane.doe@ibm.com",
      createdAt: new Date(),
      lastModifiedAt: new Date()
    }
  ];
  var count = accounts.length;
  accounts.forEach(function(account) {
    app.models.Account.create(account, function(err, model) {
      if (err) throw err;

      console.log("Created:", model);

      count--;
      if (count === 0) ds.disconnect();
    });
  });
});

var server = app;
var lbTables = ["User", "AccessToken", "ACL", "RoleMapping", "Role"];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log(
    "Loopback tables [" - lbTables - "] created in ",
    ds.adapter.name
  );
  ds.disconnect();
});
