const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Schedule;
