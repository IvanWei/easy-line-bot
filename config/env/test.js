module.exports = {
  env: 'test',
  port: process.env.PORT || Math.floor((Math.random() * 55536) + 10000),
  logger: true,
  mongoDB: undefined,
  sequelize: undefined,
};
