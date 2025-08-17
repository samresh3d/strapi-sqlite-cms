// ./config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: false,
      },
    },
    pool: { min: 0, max: 5 },
  },
});
