"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductBookmarked = sequelize.define("ProductBookmarked", {
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

  return ProductBookmarked;
};
