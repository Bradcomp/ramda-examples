const dbDriver = {/* probably a module like mysql or mongo */};
module.exports = (config) => {
  // for example
  const pool = dbDriver.createConnectionPool(config);

  return pool;
};
