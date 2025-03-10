"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movies", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      poster: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movies");
  },
};
