
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

  it('should pass back the results in order', function(done){
    batch
      .push(function(done){
        setTimeout(function(){
          done(null, 'foo');
        }, 500);
      })
      .push(function(done){
        setTimeout(function(){
          done(null, 'bar');
        }, 100);
      })
      .end(function(err, res){
        if (err) return done(err);
        res.should.eql(['foo', 'bar']);
        done();
      });
  });

  it('should only pass the first error back', function(done){
    batch
      .push(function(done){
        done('Error1', 'foo');
      })
      .push(function(done){
        done('Error2', 'bar');
      })
      .end(function(err, res){
        err.should.eql('Error1');
        done();
      });
  });
});