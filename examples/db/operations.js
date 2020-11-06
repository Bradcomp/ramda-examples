const { pipe, props } = require('ramda');

const operations = (query) => ({
  // partially apply query with the sql, the consumer provides the ID
  getByUserId: query('SELECT * FROM users where ID = ?'),

  // pull the props from the passed in object, then pass to query
  updateUser: pipe(
    props(['firstName', 'lastName', 'email', 'id']),
    query(
      `UPDATE users
        SET firstName = ?,
        lastName = ?,
        email = ?,
       WHERE id = ? 
      `
    )
  )
});

module.exports = operations;

