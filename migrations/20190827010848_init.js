exports.up = function(knex) {
	return knex.schema
		.createTable('testTable', (table) => {
			table.string('someText')
		})
}

exports.down = function(knex) {
	return knex.schema.dropTable('testTable')
}
