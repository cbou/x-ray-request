
# x-ray-request

  request driver for [x-ray](https://github.com/lapwinglabs/x-ray). It uses [request/request](https://github.com/request/request)

## Installation

```
npm install x-ray-request
```

## Usage

```js
xray('http://google.com')
  .use(request())
  .select([{
    $root: '.result',
    title: '.title',
    link: 'a[href]'
  }])
  .write('out.json');
```

## API

#### xray#request(url, fn)

Make the request using Request

#### Body processor

This driver accept an optional body processor. First usecase was to convert the body to utf-8 for website not serving unicode.

DSL is a bit different from other x-ray drivers mainly to avoid conflict between driver options and request engine options.

```
var xray = require('x-ray'),
	request = require('./index.js'),
	Iconv  = require('iconv').Iconv;
	
	var iconv = new Iconv('Windows-1252', 'UTF-8');
	
	var driver = request({
		requestOptions: {
			encoding: null,
		},
		bodyProcessor: function(body, callback) {
			callback(iconv.convert(body).toString());
		}
	});
	
xray('http://example.com/non-utf-8-page')
	.select({
		title: 'h1'
	})
	.use(driver)
	.run(function(err, object) {
		if (err) {
			throw err;
		}

		console.log(object);
	});
````

## Test

```
npm install
make test
```

## License

(The MIT License)

Copyright (c) 2015 Charles Bourasseau &lt;charles.bourasseau@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
