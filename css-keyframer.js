/*!
 * css-keyframer
 * 
 * @author tsuyoshiwada
 * @license MIT
 * @version 0.0.1
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('css-vendor')) :
	typeof define === 'function' && define.amd ? define(['css-vendor'], factory) :
	(factory(global.cssVendor));
}(this, function (cssVendor) { 'use strict';

	cssVendor = 'default' in cssVendor ? cssVendor['default'] : cssVendor;

	console.log(cssVendor);

}));