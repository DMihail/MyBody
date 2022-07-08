const config = require("./config");
module.exports = {
  type: "sqlite",
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: `data/myBody.sqlite`,
  entities: [
    process.env.NODE_ENV === 'production'
        ? 'dist/src/database/models/*.js'
        : 'src/database/models/*.ts',
  ],
  synchronize: false,
  migrationsRun: true,
  migrations: [
    process.env.NODE_ENV === 'production'
        ? 'dist/src/database/migrations/*.js'
        : 'src/database/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  logging: ['error'],
};
