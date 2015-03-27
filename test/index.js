
/**
 * Dependencies.
 */

var Batch = require('..');
var assert = require('assert');
var should = require('should');

/**
 * Tests.
 */

describe('batch', function(){
  var batch;

  beforeEach(function(){
    batch = Batch();
  })

  it('should pass back an array of results', function(done){
    batch
      .push(function(done){ done(null, 'foo') })
      .push(function(done){ done(null, 'bar') })
      .end(function(err, res){
        if (err) return done(err);
        res.should.eql(['foo', 'bar']);
        done();
      });
  });
});