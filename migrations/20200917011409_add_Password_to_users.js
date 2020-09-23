exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('Password').defaultTo(1234);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('quantity');
    });
};