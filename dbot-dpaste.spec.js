var AsyncSpec = require('jasmine-async')(jasmine)
  , http = require('follow-redirects').http
  , dpaste = require('./dbot-dpaste');

// Mock regex matches
var testString = 'some dummy content'
  , matches = ['', testString]
  , pattern = /http:\/\/dpaste\.cc\/paste\/([a-z0-9]{24})/;

describe('dpaste', function () {
  var async = new AsyncSpec(this)
    , asyncResult;

  async.it('should return a correct url', function (done) {
    dpaste.callback(matches).then(function (result) {
      asyncResult = result;
      expect(asyncResult).toMatch(pattern);

      done();
    });
  });

  async.it('should have pasted the right content', function (done) {
    var params = {
          host: 'dpaste.cc',
          port: 80,
          method: 'GET',
          path: '/paste/' + asyncResult.split('/').pop(),
          headers: {
            'User-Agent': 'curl'
          }
        }

      , req = http.request(params, function (res) {
          res.setEncoding('utf8');
          var buffer = '';

          res.on('data', function (chunk) {
            buffer += chunk;
          });

          res.on('end', function () {
            expect(buffer).toEqual(testString);
          });
        });

    req.end();
    done();
  });
});