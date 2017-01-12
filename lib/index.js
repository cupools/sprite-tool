'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = process;

var _images = require('images');

var _images2 = _interopRequireDefault(_images);

var _checkin = require('checkin');

var _checkin2 = _interopRequireDefault(_checkin);

var _lint = require('./lint');

var _lint2 = _interopRequireDefault(_lint);

var _layout = require('./utils/layout');

var _layout2 = _interopRequireDefault(_layout);

var _cache = require('./utils/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INFINITE = 10e9; /* eslint-disable new-cap */

_images2.default.setLimit(INFINITE, INFINITE);

/**
 * build sprite images
 * @param  {Object} options padding & algorithm
 * @param  {Array} buffers   buffer of images
 * @return {Object}         coordinates & size
 */
function process(opt, buffers) {
  var metas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var options = (0, _checkin2.default)(opt, _lint2.default);
  var fromCache = _cache2.default.get(options, buffers);
  if (fromCache) {
    return fromCache;
  }

  var padding = options.padding,
      algorithm = options.algorithm;

  var base64 = buffers.map(function (buffer) {
    return buffer.toString('base64');
  });
  var layer = buffers.reduce(function (ret, buffer, index) {
    var parent = base64.slice(0, index).indexOf(base64[index]);
    var image = (0, _images2.default)(buffer);
    var size = image.size();

    ret.addItem({
      parent: parent,
      index: index,
      image: image,
      width: parent === -1 ? size.width + padding : 0,
      height: parent === -1 ? size.height + padding : 0,
      meta: metas[index] || null
    });

    return ret;
  }, (0, _layout2.default)(algorithm));

  var result = layer.export();

  var width = result.width - padding;
  var height = result.height - padding;
  var coordinates = result.items.map(function (item) {
    var parent = item.parent,
        meta = item.meta;

    var real = parent === -1 ? item : result.items[parent];
    var x = real.x,
        y = real.y;


    return {
      x: x,
      y: y,
      width: real.width - padding,
      height: real.height - padding,
      meta: meta
    };
  });

  var sprite = (0, _images2.default)(width, height);
  result.items.forEach(function (_ref) {
    var image = _ref.image,
        parent = _ref.parent,
        x = _ref.x,
        y = _ref.y;
    return parent === -1 && sprite.draw(image, x, y);
  });

  return _cache2.default.set(options, buffers, {
    buffer: sprite.encode('png'),
    width: width,
    height: height,
    coordinates: coordinates
  });
}