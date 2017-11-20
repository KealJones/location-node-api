const loopback = require("loopback");
module.exports = function(Account) {
  Account.observe("before save", function(ctx, next) {
    let now = new Date();
    if (ctx.isNewInstance) {
      ctx.instance.createdAt = now;
      ctx.instance.lastModifiedAt = now;
    } else {
      ctx.data.lastModifiedAt = new Date();
    }

    next();
  });

  Account.getByLocation = (latitude, longitude, role) => {
    let there = new loopback.GeoPoint({
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    });
    let searchCriteria = {
      fields: {
        id: true,
        name: true,
        location: true
      },
      where: {
        location: {
          near: there
        }
      }
    };
    if (role) searchCriteria.where.role = role;

    return Account.find(searchCriteria)
      .then(data => {
        for (var account in data) {
          data[account].distance = new loopback.GeoPoint(
            data[account].location
          ).distanceTo(there, {
            type: "meters"
          });
          delete data[account].location;
        }
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  Account.remoteMethod("getByLocation", {
    accepts: [
      { arg: "latitude", type: "number", required: true },
      { arg: "longitude", type: "number", required: true },
      { arg: "role", type: "string" }
    ],
    returns: { type: "array", root: true },
    http: {
      path: "/getMatches",
      verb: "get"
    }
  });
};
