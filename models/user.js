var db = require('../config/config');

'use strict';

exports.method = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = models => {
    Users.hasOne(models.Events);
  };
  return User;
};

module.exports={
  findOne: function (user) {
    console.log('In find one', user);
    return new Promise ((resolve, reject) => {
      const queryString = 'SELECT * FROM Users WHERE username=?';
      db.query(queryString, [user.username], (err, res) => {
        console.log('23 in findOne');
        if (err) {
         // send back an error
          console.log('errorrrrr');
          reject(err);
        } else {
          if (res.length) {
            console.log('found one', res);
            // found a user with username that was passed in
            resolve(res[0]);
          } else {
            console.log('did not find one');
            // did not find a user with username
            resolve(false);
          }
        }
      });
    });
  },
  create: function (name, user, pass) {
    return new Promise ((resolve, reject) => {
      const queryString = 'INSERT INTO Users (name, username, password) VALUES (?, ?, ?)';
      db.query(queryString, [name, user, pass], (err, res) => {
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