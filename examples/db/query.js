const { andThen, curry, invoker, is, of, pipe, unless } = require('ramda');

const toArray = unless(is(Array), of);
const query = invoker(2, 'query');
//This does the same thing
const query2 = curry((sql, replacements, connection) => conn.query(sql, replacements));

const constructResult = ([ data, count ]) => ({ data, count });

module.exports = curry((connection, sqlString, replacements) => 
  pipe(
    query(sqlString, toArray(replacements)),
    andThen(constructResult)
  )(connection)
);
