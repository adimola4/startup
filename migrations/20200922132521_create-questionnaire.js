
exports.up = function (knex) {
    return knex.schema.createTable('questions', function (table) {

        table.increments('ID').unsigned().primary();
        table.text('Title').notNull();
        table.text('Choices').nullable();
        table.text('Answer').notNull();
        table.enum('Type ', ['truefalse', 'american', 'fillblanks']).notNull();
    });
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTable('questions');
};