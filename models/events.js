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