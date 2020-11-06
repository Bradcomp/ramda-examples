const assert = require('assert');
const { equals, is } = require('ramda');
const query = require('./query');
const ops = require('./operations');

// Query should coerce replacements to an array
const testOne = () => {

  const response = [[{id: 1}, {id: 2}, {id: 3}], 3]
  const testConnection = {
    query(sql, replacements) {
      assert(is(String, sql));
      assert(equals(replacements, ['test']));

      return Promise.resolve(response);
    }
  };

  return query(testConnection, 'SELECT blah FROM blah', 'test')
    .then(result => {
      assert(equals(result, {
      data: response[0],
      count: 3
      }), 'should coerce params to array');
    });
};

const test = async () => {
  try {
  await testOne();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  console.log('all tests pass');
};

test();
