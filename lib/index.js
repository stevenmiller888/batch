
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
  var startingLength = this.queue.length;
  var counter = 0;
  var finished = false;

  this.queue.forEach(function(fn, i){
    fn(function(err, res){
      if (finished) return;
  
      if (err) {
        finished = true;
        return cb(err, null);
      }
      
      results[i] = res;
      counter += 1;

      if (counter === startingLength) {
        cb(null, results);
      }
    });
  });
};
