var db = require('../config/config');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.DOUBLE,
    user: DataTypes.INT
  }, {});
  Events.associate = function(models) {
    // associations can be defined here
  };
  return Events;
};


module.exports={
    get_events: function (userid) {
    return new Promise ((resolve, reject) => {
      const queryString = 'SELECT * FROM Events WHERE user=?';
      db.query(queryString, [userid], (err, res) => {
        if (err) {
          // send back an error
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  create: function (type, description, date, time, userid) {
    console.log('in create func');
    return new Promise ((resolve, reject) => {
      console.log('here ha.');
      const queryString = 'INSERT INTO Events (type, description, date, time, user) VALUES (?, ?, ?, ?, ?)';
      console.log('jk here now ha.');
      console.log(type, description, date, time, userid);
      db.query(queryString, [type, description, date, time, userid], (err, res) => {
        console.log("45:", res, err);
        if (err) {
          // send back an error
          console.log('error', err);
          reject(err);
        } else {
          console.log('resolved', res);
          resolve(true);    
        }
      });
    });
  },
}
