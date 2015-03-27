
# batch

Queue functions and run them in parallel

## Example

```js
var Batch = require('batch');
var batch = new Batch();

batch
  .push(function(done){ done(null, 'foo') })
  .push(function(done){ done(null, 'bar') })
  .end(function(err, res){
    if (err) return done(err);
    res.should.eql(['foo', 'bar']);
    done();
  });
```

## License

MIT
