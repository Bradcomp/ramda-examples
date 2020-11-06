const assert = require('assert');
const userHandler = require('.');

const validUser = {
  firstName: 'Dale',
  lastName: 'Cooper',
  email: 'd.cooper@tp.show'
};

const testOne = () => {
  return userHandler({ body: validUser })
    .then(result => {
      assert(result.valid);
      assert(result.status === 201);
    });
};

const testTwo = () => {
  return userHandler({body: {}})
  .then(result => {
    assert(!result.valid);
    assert(result.status === 400);
  });
}

const test = async () => {
  try {
    await testOne();
    await testTwo();
    console.log('all tests pass');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

test();
