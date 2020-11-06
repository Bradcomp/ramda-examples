// the typical JS way - an optional config at the end
const api = (method, url, body, config = {}) => { /* blah */}
// a more ramda-like version
const better = curry((config, method, url, data) => { /* blah */ })

const myApi = better({/* api config */});
const get = myApi('GET');

// lodash
const _map = (arr, fn) => arr.map(fn);
// ramda
const map = (fn, arr) => arr.map(fn);

// when composing
const getUsers = pipe(
  (search) => api('GET', '/users', search, {/* api config */}),
  (userPromise) => userPromise.then(users => _map(users, processUser))
);
// or
const getUsers = (search) =>
  api('GET', '/users', search, {/* api config */})
    .then(users => _map(users, processUser));

const myGetUsers = pipe(
  get('/users'), // or myApi('GET', '/users') if you want
  andThen(map(processUser))
);
