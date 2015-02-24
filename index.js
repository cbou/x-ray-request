/**
 * Module Dependencies
 */

var Request = require('request');

/**
* Export `driver`
*/

module.exports = driver;

/**
* Initialize the `driver`
* with the following `opts`
*
* @param {Object} opts
* @return {Function}
* @api public
*/

function driver(opts) {

  return function plugin(xray) {
    xray.request = function request(url, fn) {
      opts = opts || {};
	  opts.requestOptions = opts.requestOptions || {};
      
      opts.requestOptions.url = url;
      var bodyProcessor = (opts.bodyProcessor) ? opts.bodyProcessor : function(body, callback) {
        callback(body);
      };
      
      Request(opts.requestOptions, function(err, response, body) {
        if (err) {
			return fn(err);
		} else {
			return bodyProcessor(body, function(body) {
				fn(null, body);
			});
		}
      });
      
    };
  };
}
