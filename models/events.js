var db = require('../config/config');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.DOUBLE
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
  create: function (user) {
    return new Promise ((resolve, reject) => {
      const queryString = 'INSERT INTO Events (description, date, time, user) VALUES (?, ?, ?)';
      db.query(queryString, [description, date, time, user], (err, res) => {
        console.log("45:", res, err);
        if (err) {
          // send back an error
          reject(err);
        } else {
          resolve(true);    
        }
      });
    });
  },
}


