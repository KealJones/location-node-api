var path = require("path");

var app = require(path.resolve(__dirname, "../server/server"));
var ds = app.datasources.accountDS;
ds.automigrate("Account", function(err) {
  if (err) throw err;
  var accounts = require("./dummydata.json");
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
