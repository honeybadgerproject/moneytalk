"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductLikes = sequelize.define("ProductLikes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return ProductLikes;
};
