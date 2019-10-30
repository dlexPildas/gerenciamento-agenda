module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "iatec_db",
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};
