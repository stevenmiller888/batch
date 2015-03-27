
/**
 * Expose `Batch`.
 */

module.exports = Batch;

/**
 * Batch.
 */

function Batch() {
  if (!(this instanceof Batch)) return new Batch();
  this.queue = [];
}

/**
 * Push the function into the queue.
 *
 * @param {Function} fn
 * @return {Object} this
 */

Batch.prototype.push = function(fn) {
  this.queue.push(fn);
  return this;
};

/**
 * Execute the functions in parallel.
 *
 * @param {Function} cb
 */

Batch.prototype.end = function(cb) {
  var results = [];

  this.queue.forEach(function(fn){
    fn(function(err, res){
      if (err) return cb(err, null);
      results.push(res);
    });
  });

  cb(null, results);
};
