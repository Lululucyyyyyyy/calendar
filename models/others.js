var db = require('../config/config');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Others = sequelize.define('Others', {
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.DOUBLE
  }, {});
  Others.associate = function(models) {
    // associations can be defined here
  };
  return Others;
};


module.exports={
	get_events: function (userid) {
    return new Promise ((resolve, reject) => {
  	  const queryString = 'SELECT * FROM Others WHERE user=?';
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
      const queryString = 'INSERT INTO Others (description, date, time, user) VALUES (?, ?, ?)';
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


