const connect = require('./connect');
const query = require('./connect');
const operations = require('./operations');

const cfg = {/*some stuff to connect to the db*/};
const connection = connect({});
const db = query(connection);

module.exports = operations(db);

