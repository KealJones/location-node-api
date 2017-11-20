var path = require("path");

var app = require(path.resolve(__dirname, "../server/server"));
var ds = app.datasources.accountDS;
ds.automigrate("Account", function(err) {
  if (err) throw err;
  /*
  // https://www.json-generator.com
  [
    '{{repeat(100)}}',
    {
      email: '{{email()}}',
      name: '{{firstName()}} {{surname()}}',
      role: '{{random("user", "artist")}}',
      location: {
          lat: '{{floating(23, 48)}}',
          lng: '{{floating(-123, -65)}}'
        },
      createdAt: '{{date(new Date("2015-1-1"))}}',
      lastSeenAt: '{{random(date(new Date("2016-1-1")), date(new Date("2017-11-1")), date(new Date("2017-11-1")), date(new Date()))}}'
    }
  ]
  */
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
