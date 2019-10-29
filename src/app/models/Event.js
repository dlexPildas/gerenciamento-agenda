const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        date_event: Sequelize.DATE,
        place: Sequelize.STRING,
        category: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "owner" });
  }
}

module.exports = Event;
