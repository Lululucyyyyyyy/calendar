var db = require('..//config/config');

'use strict';

exports.method = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = models => {
    Payment.hasOne(models.Events)
  };
  return User;
};

module.exports={
	findOne: function (user) {
    return new Promise ((resolve, reject) => {
      const queryString = 'SELECT * FROM Users WHERE username=?';
      db.query(queryString, [user.username], (err, res) => {
        if (err) {
          // send back an error
          reject(err);
        } else {
          if (res.length) {
            // found a user with username that was passed in
            resolve(res[0]);
          } else {
            // did not find a user with username
            resolve(false);
          }
        }
      });
    });
  },
  create: function (user, pass) {
    return new Promise ((resolve, reject) => {
      const queryString = 'INSERT INTO Users (name, username, password) VALUES (?, ?, ?)';
      db.query(queryString, [name, user, pass], (err, res) => {
       console.log('name:', name);
       console.log("username:", user);
       console.log("password:", pass);
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