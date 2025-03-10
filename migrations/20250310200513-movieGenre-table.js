"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movie_genre", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      movies_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "movies",
          key: "id",
        },
      },
      genre_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "genres",
          key: "id",
        },
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
    await queryInterface.dropTable("movie_genre");
  },
};
