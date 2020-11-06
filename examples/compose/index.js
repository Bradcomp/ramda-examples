const { 
  allPass, andThen, compose, ifElse, has, map, merge, 
  otherwise, pipe, pipeWith, prop, propEq, unless, when
} = require('ramda');


const db = {
  saveUser(user) {
    return Promise.resolve(1234);
  }
};

// dummy function
const sendResponse = res => res;
// use compose to add our status before we send the response
const withStatus = (status) => compose(sendResponse, merge({ status: status }))(object);

const badRequest = withStatus(400);
const serverError = withStatus(500)({body});
const sendCreated = withStatus(201);

const userIsValid = allPass(map(has, ['firstName', 'lastName', 'email']));
const validateUser = when(userIsValid, merge({valid: true}));

const saveAndAddId = (user) => 
  pipe( 
    db.saveUser,
    andThen(id => merge(user, {id}))
  )(user);

const userHandler = pipeWith(andThen, [
  Promise.resolve.bind(Promise), // necessary to kick off our promise chain in this case
  prop('body'),
  validateUser,
  when(
    propEq('valid', true), 
    saveAndAddId 
  ),
  ifElse(
    prop('valid'), 
    sendCreated, 
    badRequest
  )
]);

const userHandler = pipe(  
  prop('body'),
  validateUser,
  ifElse(
    propEq('valid', true), 
    saveAndAddId,
    Promise.resolve.bind(Promise)
  ),
  andThen(ifElse(
    prop('valid'), 
    sendCreated, 
    badRequest
  )),
  otherwise(serverError)
);

module.exports = compose(otherwise(serverError), userHandler);
