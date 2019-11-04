"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_event: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_event_final: {
        type: Sequelize.DATE,
        allowNull: false
      },
      owner: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        default: "exclusivo"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("events");
  }
};
