require('dotenv').config()

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			port: "5433",
			host: process.env.PG_HOST,
			database: "postgres",
			user: "postgres",
			password: "password"
		},
		migrations: {
			directory: './migrations',
			tableName: 'knex_migrations'
		}
		//wrapIdentifier: (x) => x // Disable double quotes around identifiers
	}
}
