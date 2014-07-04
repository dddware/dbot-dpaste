var deferred = require('deferred')
  , http = require('follow-redirects').http
  , qs = require('qs');

module.exports = {
  description: 'Saves the given content and gives you an URL',
  regex: /^dpaste (.+)$/,

  callback: function(matches) {
    var d = deferred()

      , data = qs.stringify({
          paste: matches[1]
        })

      , params = {
          host: 'dpaste.cc',
          port: 80,
          method: 'POST',
          path: '/paste/new',
          headers: {
            'User-Agent': 'curl',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
          }
        }

      , req = http.request(params, function (res) {
          res.setEncoding('utf8');
          var buffer = '';

          res.on('data', function (chunk) {
            buffer += chunk;
          });

          res.on('end', function () {
            d.resolve(buffer);
          });
        });

    req.write(data);
    req.end();

    return d.promise;
  }
};
