/* https://medium.com/@stheodorejohn/findlast-method-polyfill-in-javascript-bridging-browser-gaps-c3baf6aabae1  
   https://archive.vn/LpQbU 
   https://web.archive.org/web/20231027001742/https://medium.com/@stheodorejohn/findlast-method-polyfill-in-javascript-bridging-browser-gaps-c3baf6aabae1
*/

if (!Array.prototype.findLast) {
  Array.prototype.findLast = function(callback) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = len - 1; i >= 0; i--) {
      if (callback(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return undefined;
  };
}

/* https://javascript.plainenglish.io/crafting-a-javascript-polyfill-for-array-prototype-reduce-b6fae5dcebec */

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const array = Object(this);
    const length = array.length >>> 0;
    let accumulator = initialValue;

    if (accumulator === undefined) {
      for (const element of array) {
        accumulator = element;
        break;
      }
    }

    for (const element of array) {
      accumulator = callback(accumulator, element);
    }

    return accumulator;
  };
}

/*	https://medium.com/@stheodorejohn/crafting-a-findindex-polyfill-in-javascript-67df675e8728 
	https://archive.vn/onZxm
	https://web.archive.org/web/20231027002930/https://medium.com/@stheodorejohn/javascript-filter-method-polyfill-for-cross-browser-compatibility-bridging-the-gap-with-polyfills-9fcac8b0e19a
*/ 
 
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(callback) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = 0; i < len; i++) {
      if (callback(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}

/* 	https://medium.com/@stheodorejohn/javascripts-fill-method-creating-a-polyfill-in-javascript-e3fd3384f025 
	https://web.archive.org/web/20231027003218/https://medium.com/@stheodorejohn/javascripts-fill-method-creating-a-polyfill-in-javascript-e3fd3384f025
	https://archive.vn/4YRI4
*/

if (!Array.prototype.fill) {
  Array.prototype.fill = function(value, start, end) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    const arr = Object(this);
    const len = arr.length >>> 0;
    const relativeStart = start >> 0;
    const relativeEnd = end === undefined ? len : end >> 0;
    const finalStart = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
    const finalEnd = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
    for (let i = finalStart; i < finalEnd; i++) {
      arr[i] = value;
    }
    return arr;
  };
}

/*	https://medium.com/@stheodorejohn/javascript-filter-method-polyfill-for-cross-browser-compatibility-bridging-the-gap-with-polyfills-9fcac8b0e19a
	https://archive.vn/v5306
	https://web.archive.org/web/20231027002930/https://medium.com/@stheodorejohn/javascript-filter-method-polyfill-for-cross-browser-compatibility-bridging-the-gap-with-polyfills-9fcac8b0e19a
*/

if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback) {
    const filteredArray = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) { // The heart of the filter process
        filteredArray.push(this[i]);
      }
    }
    return filteredArray;
  };
}