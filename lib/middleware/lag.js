function timeoutAsync(ms, callback) {
  setTimeout(function () {
    callback(null, {});
  }, Math.round(Math.random()*ms));
};

function timeoutThunk(ms) {
  return function(callback) {
    timeoutAsync(ms, callback);
  }
};
/**
 * Lag middleware.
 *
 * @param {Integer} ms
 * @return {GeneratorFunction}
 * @api public
 */
module.exports = function(ms) {
  ms = (ms || 0);
  return function *(next) {
    if ( ms > 0) {
      yield timeoutThunk(ms);
    }
    yield next;
  };
};
