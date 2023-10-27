/* Polyfill service v3.111.0
 * For detailed credits and licence information see https://github.com/JakeChampion/polyfill-service.
 * 
 * Features requested: es2021
 * 
 * - Object.defineProperty, License: CC0
 * - _ESAbstract.ArrayCreate, License: CC0
 * - _ESAbstract.Call, License: CC0
 * - _ESAbstract.CreateDataProperty, License: CC0
 * - _ESAbstract.CreateDataPropertyOrThrow, License: CC0
 * - _ESAbstract.CreateMethodProperty, License: CC0
 * - Object.freeze, License: CC0
 * - Object.getPrototypeOf, License: CC0
 * - Object.keys, License: MIT
 * - _ESAbstract.Get, License: CC0
 * - _ESAbstract.HasOwnProperty, License: CC0
 * - _ESAbstract.HasProperty, License: CC0
 * - _ESAbstract.IsArray, License: CC0
 * - Array.isArray, License: CC0
 * - _ESAbstract.IsCallable, License: CC0
 * - Function.prototype.bind, License: MIT
 * - _ESAbstract.RequireObjectCoercible, License: CC0
 * - _ESAbstract.SameValueNonNumber, License: CC0
 * - _ESAbstract.ToBoolean, License: CC0
 * - _ESAbstract.ToObject, License: CC0
 * - _ESAbstract.GetV, License: CC0
 * - _ESAbstract.GetMethod, License: CC0
 * - _ESAbstract.Type, License: CC0
 * - RegExp.prototype.flags, License: MIT
 * - _ESAbstract.GetPrototypeFromConstructor, License: CC0
 * - _ESAbstract.GetSubstitution, License: CC0
 * - _ESAbstract.IsConstructor, License: CC0
 * - _ESAbstract.IsRegExp, License: CC0
 * - _ESAbstract.IteratorComplete, License: CC0
 * - _ESAbstract.IteratorNext, License: CC0
 * - _ESAbstract.IteratorStep, License: CC0
 * - _ESAbstract.IteratorValue, License: CC0
 * - _ESAbstract.OrdinaryToPrimitive, License: CC0
 * - _ESAbstract.SameValueZero, License: CC0
 * - _ESAbstract.StringIndexOf, License: CC0
 * - _ESAbstract.ToInteger, License: CC0
 * - _ESAbstract.ToLength, License: CC0
 * - _ESAbstract.ToPrimitive, License: CC0
 * - _ESAbstract.ToString, License: CC0
 * - Array.prototype.forEach, License: CC0
 * - Array.prototype.includes, License: MIT
 * - Array.prototype.indexOf, License: CC0
 * - Object.getOwnPropertyNames, License: CC0
 * - _ESAbstract.ToPropertyKey, License: CC0
 * - Object.getOwnPropertyDescriptor, License: CC0
 * - Object.defineProperties, License: CC0
 * - Object.create, License: CC0
 * - _ESAbstract.OrdinaryCreateFromConstructor, License: CC0
 * - _ESAbstract.Construct, License: CC0
 * - _ESAbstract.ArraySpeciesCreate, License: CC0
 * - Array.prototype.filter, License: CC0
 * - Array.prototype.map, License: CC0
 * - Symbol, License: MIT
 * - Symbol.iterator, License: MIT
 * - _ESAbstract.GetIterator, License: CC0
 * - _ESAbstract.IterableToList, License: CC0
 * - AggregateError, License: MIT
 * - Symbol.replace, License: MIT
 * - String.prototype.replaceAll, License: MIT
 * - Symbol.toStringTag, License: MIT
 * - Promise, License: MIT
 * - Promise.any, License: MIT */

(function(self, undefined) {
if (!("defineProperty"in Object&&function(){try{var e={}
return Object.defineProperty(e,"test",{value:42}),!0}catch(t){return!1}}()
)) {

// Object.defineProperty
(function (nativeDefineProperty) {

	var supportsAccessors = Object.prototype.hasOwnProperty.call(Object.prototype, '__defineGetter__');
	var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
	var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

	// Polyfill.io - This does not use CreateMethodProperty because our CreateMethodProperty function uses Object.defineProperty.
	Object.defineProperty = function defineProperty(object, property, descriptor) {

		// Where native support exists, assume it
		if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
			return nativeDefineProperty(object, property, descriptor);
		}

		if (object === null || !(object instanceof Object || typeof object === 'object')) {
			throw new TypeError('Object.defineProperty called on non-object');
		}

		if (!(descriptor instanceof Object)) {
			throw new TypeError('Property description must be an object');
		}

		var propertyString = String(property);
		var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
		var getterType = 'get' in descriptor && typeof descriptor.get;
		var setterType = 'set' in descriptor && typeof descriptor.set;

		// handle descriptor.get
		if (getterType) {
			if (getterType === undefined) {
				return object;
			}
			if (getterType !== 'function') {
				throw new TypeError('Getter must be a function');
			}
			if (!supportsAccessors) {
				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			Object.__defineGetter__.call(object, propertyString, descriptor.get);
		} else {
			object[propertyString] = descriptor.value;
		}

		// handle descriptor.set
		if (setterType) {
			if (setterType === undefined) {
				return object;
			}
			if (setterType !== 'function') {
				throw new TypeError('Setter must be a function');
			}
			if (!supportsAccessors) {
				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			Object.__defineSetter__.call(object, propertyString, descriptor.set);
		}

		// OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
		if ('value' in descriptor) {
			object[propertyString] = descriptor.value;
		}

		return object;
	};
}(Object.defineProperty));

}


// _ESAbstract.ArrayCreate
// 9.4.2.2. ArrayCreate ( length [ , proto ] )
function ArrayCreate(length /* [, proto] */) { // eslint-disable-line no-unused-vars
	// 1. Assert: length is an integer Number ≥ 0.
	// 2. If length is -0, set length to +0.
	if (1 / length === -Infinity) {
		length = 0;
	}
	// 3. If length>2^32-1, throw a RangeError exception.
	if (length > (Math.pow(2, 32) - 1)) {
		throw new RangeError('Invalid array length');
	}
	// 4. If proto is not present, set proto to the intrinsic object %ArrayPrototype%.
	// 5. Let A be a newly created Array exotic object.
	var A = [];
	// 6. Set A's essential internal methods except for [[DefineOwnProperty]] to the default ordinary object definitions specified in 9.1.
	// 7. Set A.[[DefineOwnProperty]] as specified in 9.4.2.1.
	// 8. Set A.[[Prototype]] to proto.
	// 9. Set A.[[Extensible]] to true.
	// 10. Perform ! OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor{[[Value]]: length, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false}).
	A.length = length;
	// 11. Return A.
	return A;
}

// _ESAbstract.Call
/* global IsCallable */
// 7.3.12. Call ( F, V [ , argumentsList ] )
function Call(F, V /* [, argumentsList] */) { // eslint-disable-line no-unused-vars
	// 1. If argumentsList is not present, set argumentsList to a new empty List.
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	// 2. If IsCallable(F) is false, throw a TypeError exception.
	if (IsCallable(F) === false) {
		throw new TypeError(Object.prototype.toString.call(F) + 'is not a function.');
	}
	// 3. Return ? F.[[Call]](V, argumentsList).
	return F.apply(V, argumentsList);
}

// _ESAbstract.CreateDataProperty
// 7.3.4. CreateDataProperty ( O, P, V )
// NOTE
// This abstract operation creates a property whose attributes are set to the same defaults used for properties created by the ECMAScript language assignment operator.
// Normally, the property will not already exist. If it does exist and is not configurable or if O is not extensible, [[DefineOwnProperty]] will return false.
function CreateDataProperty(O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let newDesc be the PropertyDescriptor{ [[Value]]: V, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
	var newDesc = {
		value: V,
		writable: true,
		enumerable: true,
		configurable: true
	};
	// 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
	try {
		Object.defineProperty(O, P, newDesc);
		return true;
	} catch (e) {
		return false;
	}
}

// _ESAbstract.CreateDataPropertyOrThrow
/* global CreateDataProperty */
// 7.3.6. CreateDataPropertyOrThrow ( O, P, V )
function CreateDataPropertyOrThrow(O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let success be ? CreateDataProperty(O, P, V).
	var success = CreateDataProperty(O, P, V);
	// 4. If success is false, throw a TypeError exception.
	if (!success) {
		throw new TypeError('Cannot assign value `' + Object.prototype.toString.call(V) + '` to property `' + Object.prototype.toString.call(P) + '` on object `' + Object.prototype.toString.call(O) + '`');
	}
	// 5. Return success.
	return success;
}

// _ESAbstract.CreateMethodProperty
// 7.3.5. CreateMethodProperty ( O, P, V )
function CreateMethodProperty(O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let newDesc be the PropertyDescriptor{[[Value]]: V, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}.
	var newDesc = {
		value: V,
		writable: true,
		enumerable: false,
		configurable: true
	};
	// 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
	Object.defineProperty(O, P, newDesc);
}
if (!("freeze"in Object
)) {

// Object.freeze
/* global CreateMethodProperty */
// 19.1.2.6. Object.freeze ( O )
CreateMethodProperty(Object, 'freeze', function freeze(O) {
	// This feature cannot be implemented fully as a polyfill.
	// We choose to silently fail which allows "securable" code
	// to "gracefully" degrade to working but insecure code.
	return O;
});

}

if (!("getPrototypeOf"in Object
)) {

// Object.getPrototypeOf
/* global CreateMethodProperty */
// Based on: https://github.com/es-shims/es5-shim/blob/master/es5-sham.js

// https://github.com/es-shims/es5-shim/issues#issue/2
// http://ejohn.org/blog/objectgetprototypeof/
// recommended by fschaefer on github
//
// sure, and webreflection says ^_^
// ... this will nerever possibly return null
// ... Opera Mini breaks here with infinite loops
CreateMethodProperty(Object, 'getPrototypeOf', function getPrototypeOf(object) {
	if (object !== Object(object)) {
		throw new TypeError('Object.getPrototypeOf called on non-object');
	}
	var proto = object.__proto__;
	if (proto || proto === null) {
		return proto;
	} else if (typeof object.constructor == 'function' && object instanceof object.constructor) {
		return object.constructor.prototype;
	} else if (object instanceof Object) {
		return Object.prototype;
	} else {
		// Correctly return null for Objects created with `Object.create(null)`
		// (shammed or native) or `{ __proto__: null}`.  Also returns null for
		// cross-realm objects on browsers that lack `__proto__` support (like
		// IE <11), but that's the best we can do.
		return null;
	}
});

}

if (!("keys"in Object&&function(){return 2===Object.keys(arguments).length}(1,2)&&function(){try{return Object.keys(""),!0}catch(t){return!1}}()
)) {

// Object.keys
/* global CreateMethodProperty */
CreateMethodProperty(Object, "keys", (function() {
	'use strict';

	// modified from https://github.com/es-shims/object-keys

	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasPrototypeEnumBug = isEnumerable.call(function () { }, 'prototype');
	function hasProtoEnumBug() {
		// Object.create polyfill creates an enumerable __proto__
		var createdObj;
		try {
			createdObj = Object.create({});
		} catch (e) {
			// If this fails the polyfil isn't loaded yet, but will be.
			// Can't add it to depedencies because of it would create a circular depedency.
			return true;
		}

		return isEnumerable.call(createdObj, '__proto__')
	}

	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	function isArgumentsObject(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	}

	return function keys(object) {
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgumentsObject(object);
		var isString = toStr.call(object) === '[object String]';
		var theKeys = [];

		if (object === undefined || object === null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var skipPrototype = hasPrototypeEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(hasProtoEnumBug() && name === '__proto__') && !(skipPrototype && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}()));

}


// _ESAbstract.Get
// 7.3.1. Get ( O, P )
function Get(O, P) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Return ? O.[[Get]](P, O).
	return O[P];
}

// _ESAbstract.HasOwnProperty
// 7.3.11 HasOwnProperty (O, P)
function HasOwnProperty(o, p) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Let desc be ? O.[[GetOwnProperty]](P).
	// 4. If desc is undefined, return false.
	// 5. Return true.
	// Polyfill.io - As we expect user agents to support ES3 fully we can skip the above steps and use Object.prototype.hasOwnProperty to do them for us.
	return Object.prototype.hasOwnProperty.call(o, p);
}

// _ESAbstract.HasProperty
// 7.3.10. HasProperty ( O, P )
function HasProperty(O, P) { // eslint-disable-line no-unused-vars
	// Assert: Type(O) is Object.
	// Assert: IsPropertyKey(P) is true.
	// Return ? O.[[HasProperty]](P).
	return P in O;
}

// _ESAbstract.IsArray
// 7.2.2. IsArray ( argument )
function IsArray(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	// 2. If argument is an Array exotic object, return true.
	// 3. If argument is a Proxy exotic object, then
		// a. If argument.[[ProxyHandler]] is null, throw a TypeError exception.
		// b. Let target be argument.[[ProxyTarget]].
		// c. Return ? IsArray(target).
	// 4. Return false.

	// Polyfill.io - We can skip all the above steps and check the string returned from Object.prototype.toString().
	return Object.prototype.toString.call(argument) === '[object Array]';
}
if (!("isArray"in Array
)) {

// Array.isArray
/* global CreateMethodProperty, IsArray */
// 22.1.2.2. Array.isArray ( arg )
CreateMethodProperty(Array, 'isArray', function isArray(arg) {
	// 1. Return ? IsArray(arg).
	return IsArray(arg);
});

}


// _ESAbstract.IsCallable
// 7.2.3. IsCallable ( argument )
function IsCallable(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	// 2. If argument has a [[Call]] internal method, return true.
	// 3. Return false.

	// Polyfill.io - Only function objects have a [[Call]] internal method. This means we can simplify this function to check that the argument has a type of function.
	return typeof argument === 'function';
}
if (!("bind"in Function.prototype
)) {

// Function.prototype.bind
/* global CreateMethodProperty, IsCallable */
// 19.2.3.2. Function.prototype.bind ( thisArg, ...args )
// https://github.com/es-shims/es5-shim/blob/d6d7ff1b131c7ba14c798cafc598bb6780d37d3b/es5-shim.js#L182
CreateMethodProperty(Function.prototype, 'bind', function bind(that) { // .length is 1
	// add necessary es5-shim utilities
	var $Array = Array;
	var $Object = Object;
	var ArrayPrototype = $Array.prototype;
	var Empty = function Empty() { };
	var array_slice = ArrayPrototype.slice;
	var array_concat = ArrayPrototype.concat;
	var array_push = ArrayPrototype.push;
	var max = Math.max;
	// /add necessary es5-shim utilities

	// 1. Let Target be the this value.
	var target = this;
	// 2. If IsCallable(Target) is false, throw a TypeError exception.
	if (!IsCallable(target)) {
		throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	}
	// 3. Let A be a new (possibly empty) internal list of all of the
	//   argument values provided after thisArg (arg1, arg2 etc), in order.
	// XXX slicedArgs will stand in for "A" if used
	var args = array_slice.call(arguments, 1); // for normal call
	// 4. Let F be a new native ECMAScript object.
	// 11. Set the [[Prototype]] internal property of F to the standard
	//   built-in Function prototype object as specified in 15.3.3.1.
	// 12. Set the [[Call]] internal property of F as described in
	//   15.3.4.5.1.
	// 13. Set the [[Construct]] internal property of F as described in
	//   15.3.4.5.2.
	// 14. Set the [[HasInstance]] internal property of F as described in
	//   15.3.4.5.3.
	var bound;
	var binder = function () {

		if (this instanceof bound) {
			// 15.3.4.5.2 [[Construct]]
			// When the [[Construct]] internal method of a function object,
			// F that was created using the bind function is called with a
			// list of arguments ExtraArgs, the following steps are taken:
			// 1. Let target be the value of F's [[TargetFunction]]
			//   internal property.
			// 2. If target has no [[Construct]] internal method, a
			//   TypeError exception is thrown.
			// 3. Let boundArgs be the value of F's [[BoundArgs]] internal
			//   property.
			// 4. Let args be a new list containing the same values as the
			//   list boundArgs in the same order followed by the same
			//   values as the list ExtraArgs in the same order.
			// 5. Return the result of calling the [[Construct]] internal
			//   method of target providing args as the arguments.

			var result = target.apply(
				this,
				array_concat.call(args, array_slice.call(arguments))
			);
			if ($Object(result) === result) {
				return result;
			}
			return this;

		} else {
			// 15.3.4.5.1 [[Call]]
			// When the [[Call]] internal method of a function object, F,
			// which was created using the bind function is called with a
			// this value and a list of arguments ExtraArgs, the following
			// steps are taken:
			// 1. Let boundArgs be the value of F's [[BoundArgs]] internal
			//   property.
			// 2. Let boundThis be the value of F's [[BoundThis]] internal
			//   property.
			// 3. Let target be the value of F's [[TargetFunction]] internal
			//   property.
			// 4. Let args be a new list containing the same values as the
			//   list boundArgs in the same order followed by the same
			//   values as the list ExtraArgs in the same order.
			// 5. Return the result of calling the [[Call]] internal method
			//   of target providing boundThis as the this value and
			//   providing args as the arguments.

			// equiv: target.call(this, ...boundArgs, ...args)
			return target.apply(
				that,
				array_concat.call(args, array_slice.call(arguments))
			);

		}

	};

	// 15. If the [[Class]] internal property of Target is "Function", then
	//     a. Let L be the length property of Target minus the length of A.
	//     b. Set the length own property of F to either 0 or L, whichever is
	//       larger.
	// 16. Else set the length own property of F to 0.

	var boundLength = max(0, target.length - args.length);

	// 17. Set the attributes of the length own property of F to the values
	//   specified in 15.3.5.1.
	var boundArgs = [];
	for (var i = 0; i < boundLength; i++) {
		array_push.call(boundArgs, '$' + i);
	}

	// XXX Build a dynamic function with desired amount of arguments is the only
	// way to set the length property of a function.
	// In environments where Content Security Policies enabled (Chrome extensions,
	// for ex.) all use of eval or Function costructor throws an exception.
	// However in all of these environments Function.prototype.bind exists
	// and so this code will never be executed.
	bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

	if (target.prototype) {
		Empty.prototype = target.prototype;
		bound.prototype = new Empty();
		// Clean up dangling references.
		Empty.prototype = null;
	}

	// TODO
	// 18. Set the [[Extensible]] internal property of F to true.

	// TODO
	// 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	// 20. Call the [[DefineOwnProperty]] internal method of F with
	//   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	//   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	//   false.
	// 21. Call the [[DefineOwnProperty]] internal method of F with
	//   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	//   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	//   and false.

	// TODO
	// NOTE Function objects created using Function.prototype.bind do not
	// have a prototype property or the [[Code]], [[FormalParameters]], and
	// [[Scope]] internal properties.
	// XXX can't delete prototype in pure-js.

	// 22. Return F.
	return bound;
});

}


// _ESAbstract.RequireObjectCoercible
// 7.2.1. RequireObjectCoercible ( argument )
// The abstract operation ToObject converts argument to a value of type Object according to Table 12:
// Table 12: ToObject Conversions
/*
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Argument Type | Result                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Undefined     | Throw a TypeError exception.                                                                                                       |
| Null          | Throw a TypeError exception.                                                                                                       |
| Boolean       | Return argument.                                                                                                                   |
| Number        | Return argument.                                                                                                                   |
| String        | Return argument.                                                                                                                   |
| Symbol        | Return argument.                                                                                                                   |
| Object        | Return argument.                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
*/
function RequireObjectCoercible(argument) { // eslint-disable-line no-unused-vars
	if (argument === null || argument === undefined) {
		throw TypeError(Object.prototype.toString.call(argument) + ' is not coercible to Object.');
	}
	return argument;
}

// _ESAbstract.SameValueNonNumber
// 7.2.12. SameValueNonNumber ( x, y )
function SameValueNonNumber(x, y) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(x) is not Number.
	// 2. Assert: Type(x) is the same as Type(y).
	// 3. If Type(x) is Undefined, return true.
	// 4. If Type(x) is Null, return true.
	// 5. If Type(x) is String, then
		// a. If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return true; otherwise, return false.
	// 6. If Type(x) is Boolean, then
		// a. If x and y are both true or both false, return true; otherwise, return false.
	// 7. If Type(x) is Symbol, then
		// a. If x and y are both the same Symbol value, return true; otherwise, return false.
	// 8. If x and y are the same Object value, return true. Otherwise, return false.

	// Polyfill.io - We can skip all above steps because the === operator does it all for us.
	return x === y;
}

// _ESAbstract.ToBoolean
// 7.1.2. ToBoolean ( argument )
// The abstract operation ToBoolean converts argument to a value of type Boolean according to Table 9:
/*
--------------------------------------------------------------------------------------------------------------
| Argument Type | Result                                                                                     |
--------------------------------------------------------------------------------------------------------------
| Undefined     | Return false.                                                                              |
| Null          | Return false.                                                                              |
| Boolean       | Return argument.                                                                           |
| Number        | If argument is +0, -0, or NaN, return false; otherwise return true.                        |
| String        | If argument is the empty String (its length is zero), return false; otherwise return true. |
| Symbol        | Return true.                                                                               |
| Object        | Return true.                                                                               |
--------------------------------------------------------------------------------------------------------------
*/
function ToBoolean(argument) { // eslint-disable-line no-unused-vars
	return Boolean(argument);
}

// _ESAbstract.ToObject
// 7.1.13 ToObject ( argument )
// The abstract operation ToObject converts argument to a value of type Object according to Table 12:
// Table 12: ToObject Conversions
/*
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Argument Type | Result                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Undefined     | Throw a TypeError exception.                                                                                                       |
| Null          | Throw a TypeError exception.                                                                                                       |
| Boolean       | Return a new Boolean object whose [[BooleanData]] internal slot is set to argument. See 19.3 for a description of Boolean objects. |
| Number        | Return a new Number object whose [[NumberData]] internal slot is set to argument. See 20.1 for a description of Number objects.    |
| String        | Return a new String object whose [[StringData]] internal slot is set to argument. See 21.1 for a description of String objects.    |
| Symbol        | Return a new Symbol object whose [[SymbolData]] internal slot is set to argument. See 19.4 for a description of Symbol objects.    |
| Object        | Return argument.                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
*/
function ToObject(argument) { // eslint-disable-line no-unused-vars
	if (argument === null || argument === undefined) {
		throw TypeError();
	}
	return Object(argument);
}

// _ESAbstract.GetV
/* global ToObject */
// 7.3.2 GetV (V, P)
function GetV(v, p) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. Let O be ? ToObject(V).
	var o = ToObject(v);
	// 3. Return ? O.[[Get]](P, V).
	return o[p];
}

// _ESAbstract.GetMethod
/* global GetV, IsCallable */
// 7.3.9. GetMethod ( V, P )
function GetMethod(V, P) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. Let func be ? GetV(V, P).
	var func = GetV(V, P);
	// 3. If func is either undefined or null, return undefined.
	if (func === null || func === undefined) {
		return undefined;
	}
	// 4. If IsCallable(func) is false, throw a TypeError exception.
	if (IsCallable(func) === false) {
		throw new TypeError('Method not callable: ' + P);
	}
	// 5. Return func.
	return func;
}

// _ESAbstract.Type
// "Type(x)" is used as shorthand for "the type of x"...
function Type(x) { // eslint-disable-line no-unused-vars
	switch (typeof x) {
		case 'undefined':
			return 'undefined';
		case 'boolean':
			return 'boolean';
		case 'number':
			return 'number';
		case 'string':
			return 'string';
		case 'symbol':
			return 'symbol';
		default:
			// typeof null is 'object'
			if (x === null) return 'null';
			// Polyfill.io - This is here because a Symbol polyfill will have a typeof `object`.
			if ('Symbol' in self && (x instanceof self.Symbol || x.constructor === self.Symbol)) return 'symbol';

			return 'object';
	}
}
if (!("flags"in RegExp.prototype
)) {

// RegExp.prototype.flags
/* global Get, ToBoolean, Type */
Object.defineProperty(RegExp.prototype, 'flags', {
	configurable: true,
	enumerable: false,
	get: function () {
		// 21.2.5.3.1 Let R be the this value.
		var R = this;

		// 21.2.5.3.2 If Type(R) is not Object, throw a TypeError exception.
		if (Type(R) !== 'object') {
			throw new TypeError('Method called on incompatible type: must be an object.');
		}
		// 21.2.5.3.3 Let result be the empty String.
		var result = '';

		// 21.2.5.3.4 Let global be ToBoolean(? Get(R, "global")).
		var global = ToBoolean(Get(R, 'global'));

		// 21.2.5.3.5 If global is true, append the code unit 0x0067 (LATIN SMALL LETTER G) as the last code unit of result.
		if (global) {
			result += 'g';
		}

		// 21.2.5.3.6 Let ignoreCase be ToBoolean(? Get(R, "ignoreCase")).
		var ignoreCase = ToBoolean(Get(R, 'ignoreCase'));

		// 21.2.5.3.7 If ignoreCase is true, append the code unit 0x0069 (LATIN SMALL LETTER I) as the last code unit of result.
		if (ignoreCase) {
			result += 'i';
		}

		// 21.2.5.3.8 Let multiline be ToBoolean(? Get(R, "multiline")).
		var multiline = ToBoolean(Get(R, 'multiline'));

		// 21.2.5.3.9 If multiline is true, append the code unit 0x006D (LATIN SMALL LETTER M) as the last code unit of result.
		if (multiline) {
			result += 'm';
		}

		// 21.2.5.3.10 Let unicode be ToBoolean(? Get(R, "unicode")).
		var unicode = ToBoolean(Get(R, 'unicode'));

		// 21.2.5.3.11 If unicode is true, append the code unit 0x0075 (LATIN SMALL LETTER U) as the last code unit of result.
		if (unicode) {
			result += 'u';
		}

		// 21.2.5.3.12 Let sticky be ToBoolean(? Get(R, "sticky")).
		var sticky = ToBoolean(Get(R, 'sticky'));

		// 21.2.5.3.13 If sticky is true, append the code unit 0x0079 (LATIN SMALL LETTER Y) as the last code unit of result.
		if (sticky) {
			result += 'y';
		}

		// 21.2.5.3.14 Return result.
		return result;
	}
});

}


// _ESAbstract.GetPrototypeFromConstructor
/* global Get, Type */
// 9.1.14. GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
	// 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object. The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
	// 2. Assert: IsCallable(constructor) is true.
	// 3. Let proto be ? Get(constructor, "prototype").
	var proto = Get(constructor, "prototype");
	// 4. If Type(proto) is not Object, then
	if (Type(proto) !== 'object') {
		// a. Let realm be ? GetFunctionRealm(constructor).
		// b. Set proto to realm's intrinsic object named intrinsicDefaultProto.
		proto = intrinsicDefaultProto;
	}
	// 5. Return proto.
	return proto;
}

// _ESAbstract.GetSubstitution
/* global Type */
// 21.1.3.17.1 GetSubstitution ( matched, str, position, captures, namedCaptures, replacement )
var GetSubstitution = (function() { // eslint-disable-line no-unused-vars
	function isDigit(string) {
		return /^[0-9]$/.test(string);
	}
	return function GetSubstitution ( matched, str, position, captures, namedCaptures, replacement ) { // eslint-disable-line no-unused-vars
		// 1. Assert: Type(matched) is String.
		// 2. Let matchLength be the number of code units in matched.
		var matchLength = matched.length;
		// 3. Assert: Type(str) is String.
		// 4. Let stringLength be the number of code units in str.
		var stringLength = str.length;
		// 5. Assert: ! IsNonNegativeInteger(position) is true.
		// 6. Assert: position ≤ stringLength.
		// 7. Assert: captures is a possibly empty List of Strings.
		// 8. Assert: Type(replacement) is String.
		// 9. Let tailPos be position + matchLength.
		var tailPos = position + matchLength;
		// 10. Let m be the number of elements in captures.
		var m = captures.length;
		// 11. Let result be the String value derived from replacement by copying
		// code unit elements from replacement to result while performing replacements
		// as specified in Table 53. These $ replacements are done left-to-right, and,
		// once such a replacement is performed, the new replacement text is not subject to further replacements.
		var result = '';
		for (var i = 0; i < replacement.length; i += 1) {
			// if this is a $, and it's not the end of the replacement
			var current = replacement.charAt(i);
			var isLast = (i + 1) >= replacement.length;
			var nextIsLast = (i + 2) >= replacement.length;
			if (current === '$' && !isLast) {
				var next = replacement.charAt(i + 1);
				if (next === '$') {
					result += '$';
					i += 1;
				} else if (next === '&') {
					result += matched;
					i += 1;
				} else if (next === '`') {
					result += position === 0 ? '' : str.slice(0, position - 1);
					i += 1;
				} else if (next === "'") {
					result += tailPos >= stringLength ? '' : str.slice(tailPos);
					i += 1;
				} else {
					var nextNext = nextIsLast ? null : replacement.charAt(i + 2);
					if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
						// $1 through $9, and not followed by a digit
						var n = parseInt(next, 10);
						// if (n > m, impl-defined)
						result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
						i += 1;
					} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
						// $00 through $99
						var nn = next + nextNext;
						var nnI = parseInt(nn, 10) - 1;
						// if nn === '00' or nn > m, impl-defined
						result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
						i += 2;
					} else {
						result += '$';
					}
				}
			} else {
				// the final $, or else not a $
				result += replacement.charAt(i);
			}
		}
		// 12. Return result.
		return result;
	};
}());

// _ESAbstract.IsConstructor
/* global Type */
// 7.2.4. IsConstructor ( argument )
function IsConstructor(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	if (Type(argument) !== 'object') {
		return false;
	}
	// 2. If argument has a [[Construct]] internal method, return true.
	// 3. Return false.

	// Polyfill.io - `new argument` is the only way  to truly test if a function is a constructor.
	// We choose to not use`new argument` because the argument could have side effects when called.
	// Instead we check to see if the argument is a function and if it has a prototype.
	// Arrow functions do not have a [[Construct]] internal method, nor do they have a prototype.
	return typeof argument === 'function' && !!argument.prototype;
}

// _ESAbstract.IsRegExp
/* global Type, Get, ToBoolean */
// 7.2.8. IsRegExp ( argument )
function IsRegExp(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Object, return false.
	if (Type(argument) !== 'object') {
		return false;
	}
	// 2. Let matcher be ? Get(argument, @@match).
	var matcher = 'Symbol' in self && 'match' in self.Symbol ? Get(argument, self.Symbol.match) : undefined;
	// 3. If matcher is not undefined, return ToBoolean(matcher).
	if (matcher !== undefined) {
		return ToBoolean(matcher);
	}
	// 4. If argument has a [[RegExpMatcher]] internal slot, return true.
	try {
		var lastIndex = argument.lastIndex;
		argument.lastIndex = 0;
		RegExp.prototype.exec.call(argument);
		return true;
	// eslint-disable-next-line no-empty
	} catch (e) {} finally {
		argument.lastIndex = lastIndex;
	}
	// 5. Return false.
	return false;
}

// _ESAbstract.IteratorComplete
/* global Type, ToBoolean, Get */
// 7.4.3 IteratorComplete ( iterResult )
function IteratorComplete(iterResult) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(iterResult) is Object.
	if (Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	// 2. Return ToBoolean(? Get(iterResult, "done")).
	return ToBoolean(Get(iterResult, "done"));
}

// _ESAbstract.IteratorNext
/* global Call, Type */
// 7.4.2. IteratorNext ( iteratorRecord [ , value ] )
function IteratorNext(iteratorRecord /* [, value] */) { // eslint-disable-line no-unused-vars
	// 1. If value is not present, then
	if (arguments.length < 2) {
		// a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « »).
		var result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]']);
	// 2. Else,
	} else {
		// a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « value »).
		result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]'], [arguments[1]]);
	}
	// 3. If Type(result) is not Object, throw a TypeError exception.
	if (Type(result) !== 'object') {
		throw new TypeError('bad iterator');
	}
	// 4. Return result.
	return result;
}

// _ESAbstract.IteratorStep
/* global IteratorNext, IteratorComplete */
// 7.4.5. IteratorStep ( iteratorRecord )
function IteratorStep(iteratorRecord) { // eslint-disable-line no-unused-vars
	// 1. Let result be ? IteratorNext(iteratorRecord).
	var result = IteratorNext(iteratorRecord);
	// 2. Let done be ? IteratorComplete(result).
	var done = IteratorComplete(result);
	// 3. If done is true, return false.
	if (done === true) {
		return false;
	}
	// 4. Return result.
	return result;
}

// _ESAbstract.IteratorValue
/* global Type, Get */
// 7.4.4 IteratorValue ( iterResult )
function IteratorValue(iterResult) { // eslint-disable-line no-unused-vars
	// Assert: Type(iterResult) is Object.
	if (Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	// Return ? Get(iterResult, "value").
	return Get(iterResult, "value");
}

// _ESAbstract.OrdinaryToPrimitive
/* global Get, IsCallable, Call, Type */
// 7.1.1.1. OrdinaryToPrimitive ( O, hint )
function OrdinaryToPrimitive(O, hint) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: Type(hint) is String and its value is either "string" or "number".
	// 3. If hint is "string", then
	if (hint === 'string') {
		// a. Let methodNames be « "toString", "valueOf" ».
		var methodNames = ['toString', 'valueOf'];
		// 4. Else,
	} else {
		// a. Let methodNames be « "valueOf", "toString" ».
		methodNames = ['valueOf', 'toString'];
	}
	// 5. For each name in methodNames in List order, do
	for (var i = 0; i < methodNames.length; ++i) {
		var name = methodNames[i];
		// a. Let method be ? Get(O, name).
		var method = Get(O, name);
		// b. If IsCallable(method) is true, then
		if (IsCallable(method)) {
			// i. Let result be ? Call(method, O).
			var result = Call(method, O);
			// ii. If Type(result) is not Object, return result.
			if (Type(result) !== 'object') {
				return result;
			}
		}
	}
	// 6. Throw a TypeError exception.
	throw new TypeError('Cannot convert to primitive.');
}

// _ESAbstract.SameValueZero
/* global Type, SameValueNonNumber */
// 7.2.11. SameValueZero ( x, y )
function SameValueZero (x, y) { // eslint-disable-line no-unused-vars
	// 1. If Type(x) is different from Type(y), return false.
	if (Type(x) !== Type(y)) {
		return false;
	}
	// 2. If Type(x) is Number, then
	if (Type(x) === 'number') {
		// a. If x is NaN and y is NaN, return true.
		if (isNaN(x) && isNaN(y)) {
			return true;
		}
		// b. If x is +0 and y is -0, return true.
		if (1/x === Infinity && 1/y === -Infinity) {
			return true;
		}
		// c. If x is -0 and y is +0, return true.
		if (1/x === -Infinity && 1/y === Infinity) {
			return true;
		}
		// d. If x is the same Number value as y, return true.
		if (x === y) {
			return true;
		}
		// e. Return false.
		return false;
	}
	// 3. Return SameValueNonNumber(x, y).
	return SameValueNonNumber(x, y);
}

// _ESAbstract.StringIndexOf
/* global */
function StringIndexOf(string, searchValue, fromIndex) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(string) is String.
	// 2. Assert: Type(searchValue) is String.
	// 3. Assert: ! IsNonNegativeInteger(fromIndex) is true.
	// 4. Let len be the length of string.
	var len = string.length;
	// 5. If searchValue is the empty String and fromIndex ≤ len, return fromIndex.
	if (searchValue === "" && fromIndex <= len) {
		return fromIndex;
	}
	// 6. Let searchLen be the length of searchValue.
	var searchLen = searchValue.length;
	// 7. If there exists any integer k such that fromIndex ≤ k ≤ len - searchLen
	// and for all nonnegative integers j less than searchLen, the code unit at
	// index k + j within string is the same as the code unit at index j within searchValue,
	// let pos be the smallest (closest to -∞) such integer. Otherwise, let pos be -1.
	var k = fromIndex;
	var pos = -1;
	while (k + searchLen <= len) {
		var match = true;
		for (var j = 0; j < searchLen; j += 1) {
			if (string[k + j] !== searchValue[j]) {
				match = false;
				break;
			}
		}
		if (match) {
			pos = k;
			break;
		}
		k += 1;
	}
	// 8. Return pos.
	return pos;
}

// _ESAbstract.ToInteger
/* global Type */
// 7.1.4. ToInteger ( argument )
function ToInteger(argument) { // eslint-disable-line no-unused-vars
	if (Type(argument) === 'symbol') {
		throw new TypeError('Cannot convert a Symbol value to a number');
	}

	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, return +0.
	if (isNaN(number)) {
		return 0;
	}
	// 3. If number is +0, -0, +∞, or -∞, return number.
	if (1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return number;
	}
	// 4. Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
	return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
}

// _ESAbstract.ToLength
/* global ToInteger */
// 7.1.15. ToLength ( argument )
function ToLength(argument) { // eslint-disable-line no-unused-vars
	// 1. Let len be ? ToInteger(argument).
	var len = ToInteger(argument);
	// 2. If len ≤ +0, return +0.
	if (len <= 0) {
		return 0;
	}
	// 3. Return min(len, 253-1).
	return Math.min(len, Math.pow(2, 53) -1);
}

// _ESAbstract.ToPrimitive
/* global Type, GetMethod, Call, OrdinaryToPrimitive */
// 7.1.1. ToPrimitive ( input [ , PreferredType ] )
function ToPrimitive(input /* [, PreferredType] */) { // eslint-disable-line no-unused-vars
	var PreferredType = arguments.length > 1 ? arguments[1] : undefined;
	// 1. Assert: input is an ECMAScript language value.
	// 2. If Type(input) is Object, then
	if (Type(input) === 'object') {
		// a. If PreferredType is not present, let hint be "default".
		if (arguments.length < 2) {
			var hint = 'default';
			// b. Else if PreferredType is hint String, let hint be "string".
		} else if (PreferredType === String) {
			hint = 'string';
			// c. Else PreferredType is hint Number, let hint be "number".
		} else if (PreferredType === Number) {
			hint = 'number';
		}
		// d. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
		var exoticToPrim = typeof self.Symbol === 'function' && typeof self.Symbol.toPrimitive === 'symbol' ? GetMethod(input, self.Symbol.toPrimitive) : undefined;
		// e. If exoticToPrim is not undefined, then
		if (exoticToPrim !== undefined) {
			// i. Let result be ? Call(exoticToPrim, input, « hint »).
			var result = Call(exoticToPrim, input, [hint]);
			// ii. If Type(result) is not Object, return result.
			if (Type(result) !== 'object') {
				return result;
			}
			// iii. Throw a TypeError exception.
			throw new TypeError('Cannot convert exotic object to primitive.');
		}
		// f. If hint is "default", set hint to "number".
		if (hint === 'default') {
			hint = 'number';
		}
		// g. Return ? OrdinaryToPrimitive(input, hint).
		return OrdinaryToPrimitive(input, hint);
	}
	// 3. Return input
	return input;
}

// _ESAbstract.ToString
/* global Type, ToPrimitive */
// 7.1.12. ToString ( argument )
// The abstract operation ToString converts argument to a value of type String according to Table 11:
// Table 11: ToString Conversions
/*
|---------------|--------------------------------------------------------|
| Argument Type | Result                                                 |
|---------------|--------------------------------------------------------|
| Undefined     | Return "undefined".                                    |
|---------------|--------------------------------------------------------|
| Null	        | Return "null".                                         |
|---------------|--------------------------------------------------------|
| Boolean       | If argument is true, return "true".                    |
|               | If argument is false, return "false".                  |
|---------------|--------------------------------------------------------|
| Number        | Return NumberToString(argument).                       |
|---------------|--------------------------------------------------------|
| String        | Return argument.                                       |
|---------------|--------------------------------------------------------|
| Symbol        | Throw a TypeError exception.                           |
|---------------|--------------------------------------------------------|
| Object        | Apply the following steps:                             |
|               | Let primValue be ? ToPrimitive(argument, hint String). |
|               | Return ? ToString(primValue).                          |
|---------------|--------------------------------------------------------|
*/
function ToString(argument) { // eslint-disable-line no-unused-vars
	switch(Type(argument)) {
		case 'symbol':
			throw new TypeError('Cannot convert a Symbol value to a string');
		case 'object':
			var primValue = ToPrimitive(argument, String);
			return ToString(primValue); // eslint-disable-line no-unused-vars
		default:
			return String(argument);
	}
}
if (!("forEach"in Array.prototype
)) {

// Array.prototype.forEach
/* global Call, CreateMethodProperty, Get, HasProperty, IsCallable, ToLength, ToObject, ToString */
// 22.1.3.10. Array.prototype.forEach ( callbackfn [ , thisArg ] )
CreateMethodProperty(Array.prototype, 'forEach', function forEach(callbackfn /* [ , thisArg ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// Polyfill.io - If O is a String object, split it into an array in order to iterate correctly.
	// We will use arrayLike in place of O when we are iterating through the list.
	var arraylike = O instanceof String ? O.split('') : O;
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
	if (IsCallable(callbackfn) === false) {
		throw new TypeError(callbackfn + ' is not a function');
	}
	// 4. If thisArg is present, let T be thisArg; else let T be undefined.
	var T = arguments.length > 1 ? arguments[1] : undefined;
	// 5. Let k be 0.
	var k = 0;
	// 6. Repeat, while k < len
	while (k < len) {
		// a. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// b. Let kPresent be ? HasProperty(O, Pk).
		var kPresent = HasProperty(arraylike, Pk);
		// c. If kPresent is true, then
		if (kPresent) {
			// i. Let kValue be ? Get(O, Pk).
			var kValue = Get(arraylike, Pk);
			// ii. Perform ? Call(callbackfn, T, « kValue, k, O »).
			Call(callbackfn, T, [kValue, k, O]);
		}
		// d. Increase k by 1.
		k = k + 1;
	}
	// 7. Return undefined.
	return undefined;
});

}

if (!("includes"in Array.prototype
)) {

// Array.prototype.includes
/* global CreateMethodProperty, Get, SameValueZero, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.11. Array.prototype.includes ( searchElement [ , fromIndex ] )
CreateMethodProperty(Array.prototype, 'includes', function includes(searchElement /* [ , fromIndex ] */) {
	'use strict';
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If len is 0, return false.
	if (len === 0) {
		return false;
	}
	// 4. Let n be ? ToInteger(fromIndex). (If fromIndex is undefined, this step produces the value 0.)
	var n = ToInteger(arguments[1]);
	// 5. If n ≥ 0, then
	if (n >= 0) {
		// a. Let k be n.
		var k = n;
		// 6. Else n < 0,
	} else {
		// a. Let k be len + n.
		k = len + n;
		// b. If k < 0, let k be 0.
		if (k < 0) {
			k = 0;
		}
	}
	// 7. Repeat, while k < len
	while (k < len) {
		// a. Let elementK be the result of ? Get(O, ! ToString(k)).
		var elementK = Get(O, ToString(k));
		// b. If SameValueZero(searchElement, elementK) is true, return true.
		if (SameValueZero(searchElement, elementK)) {
			return true;
		}
		// c. Increase k by 1.
		k = k + 1;
	}
	// 8. Return false.
	return false;
});

}

if (!("indexOf"in Array.prototype
)) {

// Array.prototype.indexOf
/* global CreateMethodProperty, Get, HasProperty, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.12. Array.prototype.indexOf ( searchElement [ , fromIndex ] )
CreateMethodProperty(Array.prototype, 'indexOf', function indexOf(searchElement /* [ , fromIndex ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If len is 0, return -1.
	if (len === 0) {
		return -1;
	}
	// 4. Let n be ? ToInteger(fromIndex). (If fromIndex is undefined, this step produces the value 0.)
	var n = ToInteger(arguments[1]);
	// 5. If n ≥ len, return -1.
	if (n >= len) {
		return -1;
	}
	// 6. If n ≥ 0, then
	if (n >= 0) {
		// a. If n is -0, let k be +0; else let k be n.
		var k = 1/n === -Infinity ? 0 : n;
		// 7. Else n < 0,
	} else {
		// a. Let k be len + n.
		k = len + n;
		// b. If k < 0, let k be 0.
		if (k < 0) {
			k = 0;
		}
	}
	// 8. Repeat, while k < len
	while (k < len) {
		// a. Let kPresent be ? HasProperty(O, ! ToString(k)).
		var kPresent = HasProperty(O, ToString(k));
		// b. If kPresent is true, then
		if (kPresent) {
			// i. Let elementK be ? Get(O, ! ToString(k)).
			var elementK = Get(O, ToString(k));
			// ii. Let same be the result of performing Strict Equality Comparison searchElement === elementK.
			var same = searchElement === elementK;
			// iii. If same is true, return k.
			if (same) {
				return k;
			}
		}
		// c. Increase k by 1.
		k = k + 1;
	}
	// 9. Return -1.
	return -1;
});

}

if (!("getOwnPropertyNames"in Object&&function(){try{return Object.getOwnPropertyNames(1),!0}catch(t){return!1}}()
)) {

// Object.getOwnPropertyNames
/* global CreateMethodProperty, ToObject */
(function() {
	var toString = {}.toString;
	var split = "".split;
	var concat = [].concat;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var nativeGetOwnPropertyNames = Object.getOwnPropertyNames || Object.keys;
	var cachedWindowNames =
		typeof self === "object" ? nativeGetOwnPropertyNames(self) : [];

	// 19.1.2.10 Object.getOwnPropertyNames ( O )
	CreateMethodProperty(
		Object,
		"getOwnPropertyNames",
		function getOwnPropertyNames(O) {
			var object = ToObject(O);

			if (toString.call(object) === "[object Window]") {
				try {
					return nativeGetOwnPropertyNames(object);
				} catch (e) {
					// IE bug where layout engine calls userland Object.getOwnPropertyNames for cross-domain `window` objects
					return concat.call([], cachedWindowNames);
				}
			}

			// Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
			object =
				toString.call(object) == "[object String]"
					? split.call(object, "")
					: Object(object);

			var result = nativeGetOwnPropertyNames(object);
			var extraNonEnumerableKeys = ["length", "prototype"];
			for (var i = 0; i < extraNonEnumerableKeys.length; i++) {
				var key = extraNonEnumerableKeys[i];
				if (hasOwnProperty.call(object, key) && !result.includes(key)) {
					result.push(key);
				}
			}

			if (result.includes("__proto__")) {
				var index = result.indexOf("__proto__");
				result.splice(index, 1);
			}

			return result;
		}
	);
})();

}


// _ESAbstract.ToPropertyKey
/* globals ToPrimitive, Type, ToString */
// 7.1.14. ToPropertyKey ( argument )
function ToPropertyKey(argument) { // eslint-disable-line no-unused-vars
	// 1. Let key be ? ToPrimitive(argument, hint String).
	var key = ToPrimitive(argument, String);
	// 2. If Type(key) is Symbol, then
	if (Type(key) === 'symbol') {
		// a. Return key.
		return key;
	}
	// 3. Return ! ToString(key).
	return ToString(key);
}
if (!("getOwnPropertyDescriptor"in Object&&"function"==typeof Object.getOwnPropertyDescriptor&&function(){try{return"3"===Object.getOwnPropertyDescriptor("13.7",1).value}catch(t){return!1}}()
)) {

// Object.getOwnPropertyDescriptor
/* global CreateMethodProperty, ToObject, ToPropertyKey, HasOwnProperty, Type */
(function () {
	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	var supportsDOMDescriptors = (function () {
		try {
			return Object.defineProperty(document.createElement('div'), 'one', {
				get: function () {
					return 1;
				}
			}).one === 1;
		} catch (e) {
			return false;
		}
	});

	var toString = ({}).toString;
	var split = ''.split;

	// 19.1.2.8 Object.getOwnPropertyDescriptor ( O, P )
	CreateMethodProperty(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(O, P) {
		// 1. Let obj be ? ToObject(O).
		var obj = ToObject(O);
		// Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
		obj = (Type(obj) === 'string' || obj instanceof String) && toString.call(O) == '[object String]' ? split.call(O, '') : Object(O);

		// 2. Let key be ? ToPropertyKey(P).
		var key = ToPropertyKey(P);

		// 3. Let desc be ? obj.[[GetOwnProperty]](key).
		// 4. Return FromPropertyDescriptor(desc).
		// Polyfill.io Internet Explorer 8 natively supports property descriptors only on DOM objects.
		// We will fallback to the polyfill implementation if the native implementation throws an error.
		if (supportsDOMDescriptors) {
			try {
				return nativeGetOwnPropertyDescriptor(obj, key);
			// eslint-disable-next-line no-empty
			} catch (error) {}
		}
		if (HasOwnProperty(obj, key)) {
			return {
				enumerable: true,
				configurable: true,
				writable: true,
				value: obj[key]
			};
		}
	});
}());

}

if (!("defineProperties"in Object
)) {

// Object.defineProperties
/* global CreateMethodProperty, Get, ToObject, Type */
// 19.1.2.3. Object.defineProperties ( O, Properties )
CreateMethodProperty(Object, 'defineProperties', function defineProperties(O, Properties) {
	// 1. If Type(O) is not Object, throw a TypeError exception.
	if (Type(O) !== 'object') {
		throw new TypeError('Object.defineProperties called on non-object');
	}
	// 2. Let props be ? ToObject(Properties).
	var props = ToObject(Properties);
	// 3. Let keys be ? props.[[OwnPropertyKeys]]().
	/*
		Polyfill.io - This step in our polyfill is not complying with the specification.
		[[OwnPropertyKeys]] is meant to return ALL keys, including non-enumerable and symbols.
		TODO: When we have Reflect.ownKeys, use that instead as it is the userland equivalent of [[OwnPropertyKeys]].
	*/
	var keys = Object.keys(props);
	// 4. Let descriptors be a new empty List.
	var descriptors = [];
	// 5. For each element nextKey of keys in List order, do
	for (var i = 0; i < keys.length; i++) {
		var nextKey = keys[i];
		// a. Let propDesc be ? props.[[GetOwnProperty]](nextKey).
		var propDesc = Object.getOwnPropertyDescriptor(props, nextKey);
		// b. If propDesc is not undefined and propDesc.[[Enumerable]] is true, then
		if (propDesc !== undefined && propDesc.enumerable) {
			// i. Let descObj be ? Get(props, nextKey).
			var descObj = Get(props, nextKey);
			// ii. Let desc be ? ToPropertyDescriptor(descObj).
			// Polyfill.io - We skip this step because Object.defineProperty deals with it.
			// TODO: Implement this step?
			var desc = descObj;
			// iii. Append the pair (a two element List) consisting of nextKey and desc to the end of descriptors.
			descriptors.push([nextKey, desc]);
		}
	}
	// 6. For each pair from descriptors in list order, do
	for (var j = 0; j < descriptors.length; j++){
		// a. Let P be the first element of pair.
		var P = descriptors[j][0];
		// b. Let desc be the second element of pair.
		desc = descriptors[j][1];
		// c. Perform ? DefinePropertyOrThrow(O, P, desc).
		Object.defineProperty(O, P, desc);
	}
	// 7. Return O.
	return O;
});

}

if (!("create"in Object
)) {

// Object.create
/* global CreateMethodProperty, Type */
(function () {
	var supportsProto = !({ __proto__: null } instanceof Object);
	if (supportsProto) {
		var createEmpty = function () {
			return {
				__proto__: null
			};
		};
	} else {
		// Taken from https://github.com/es-shims/es5-shim/blob/a265a136d6220146cfbb09026c2de1fa42e220ec/es5-sham.js#L247
		// In old IE __proto__ can't be used to manually set `null`, nor does
		// any other method exist to make an object that inherits from nothing,
		// aside from Object.prototype itself. Instead, create a new global
		// object and *steal* its Object.prototype and strip it bare. This is
		// used as the prototype to create nullary objects.
		createEmpty = function () {
			// Determine which approach to use
			// see https://github.com/es-shims/es5-shim/issues/150
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			var parent = document.body || document.documentElement;
			parent.appendChild(iframe);
			iframe.src = 'javascript:';
			var empty = iframe.contentWindow.Object.prototype;
			parent.removeChild(iframe);
			iframe = null;
			delete empty.constructor;
			delete empty.hasOwnProperty;
			delete empty.propertyIsEnumerable;
			delete empty.isPrototypeOf;
			delete empty.toLocaleString;
			delete empty.toString;
			delete empty.valueOf;
			var Empty = function Empty() {};
			Empty.prototype = empty;
			// short-circuit future calls
			createEmpty = function () {
				return new Empty();
			};
			return new Empty();
		};
	}

	function T() {}

	CreateMethodProperty(Object, 'create', function create(O, properties) {
		// 1. If Type(O) is neither Object nor Null, throw a TypeError exception.
		if (Type(O) !== 'object' && Type(O) !== 'null') {
			throw new TypeError('Object prototype may only be an Object or null');
		}
		if (Type(O) === 'null') {
			var obj = createEmpty();
		} else {
			// 2. Let obj be ObjectCreate(O).
			T.prototype = O;
			obj = new T();
			obj.__proto__ = O;


			obj.constructor.prototype = O;
			obj.__proto__ = O;
		}

		// 3. If Properties is not undefined, then
		if (1 in arguments) {
			// a. Return ? ObjectDefineProperties(obj, Properties).
			return Object.defineProperties(obj, properties);
		}

		return obj;
	});
}());

}


// _ESAbstract.OrdinaryCreateFromConstructor
/* global GetPrototypeFromConstructor */
// 9.1.13. OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ , internalSlotsList ] )
function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
	var internalSlotsList = arguments[2] || {};
	// 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object.
	// The corresponding object must be an intrinsic that is intended to be used as the[[Prototype]] value of an object.

	// 2. Let proto be ? GetPrototypeFromConstructor(constructor, intrinsicDefaultProto).
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);

	// 3. Return ObjectCreate(proto, internalSlotsList).
	// Polyfill.io - We do not pass internalSlotsList to Object.create because Object.create does not use the default ordinary object definitions specified in 9.1.
	var obj = Object.create(proto);
	for (var name in internalSlotsList) {
		if (Object.prototype.hasOwnProperty.call(internalSlotsList, name)) {
			Object.defineProperty(obj, name, {
				configurable: true,
				enumerable: false,
				writable: true,
				value: internalSlotsList[name]
			});
		}
	}
	return obj;
}

// _ESAbstract.Construct
/* global IsConstructor, OrdinaryCreateFromConstructor, Call */
// 7.3.13. Construct ( F [ , argumentsList [ , newTarget ]] )
function Construct(F /* [ , argumentsList [ , newTarget ]] */) { // eslint-disable-line no-unused-vars
	// 1. If newTarget is not present, set newTarget to F.
	var newTarget = arguments.length > 2 ? arguments[2] : F;

	// 2. If argumentsList is not present, set argumentsList to a new empty List.
	var argumentsList = arguments.length > 1 ? arguments[1] : [];

	// 3. Assert: IsConstructor(F) is true.
	if (!IsConstructor(F)) {
		throw new TypeError('F must be a constructor.');
	}

	// 4. Assert: IsConstructor(newTarget) is true.
	if (!IsConstructor(newTarget)) {
		throw new TypeError('newTarget must be a constructor.');
	}

	// 5. Return ? F.[[Construct]](argumentsList, newTarget).
	// Polyfill.io - If newTarget is the same as F, it is equivalent to new F(...argumentsList).
	if (newTarget === F) {
		return new (Function.prototype.bind.apply(F, [null].concat(argumentsList)))();
	} else {
		// Polyfill.io - This is mimicking section 9.2.2 step 5.a.
		var obj = OrdinaryCreateFromConstructor(newTarget, Object.prototype);
		return Call(F, obj, argumentsList);
	}
}

// _ESAbstract.ArraySpeciesCreate
/* global IsArray, ArrayCreate, Get, Type, IsConstructor, Construct */
// 9.4.2.3. ArraySpeciesCreate ( originalArray, length )
function ArraySpeciesCreate(originalArray, length) { // eslint-disable-line no-unused-vars
	// 1. Assert: length is an integer Number ≥ 0.
	// 2. If length is -0, set length to +0.
	if (length === 0 && 1/length === -Infinity) {
		length = 0;
	}

	// 3. Let isArray be ? IsArray(originalArray).
	var isArray = IsArray(originalArray);

	// 4. If isArray is false, return ? ArrayCreate(length).
	if (isArray === false) {
		return ArrayCreate(length);
	}

	// 5. Let C be ? Get(originalArray, "constructor").
	var C = Get(originalArray, 'constructor');

	// Polyfill.io - We skip this section as not sure how to make a cross-realm normal Array, a same-realm Array.
	// 6. If IsConstructor(C) is true, then
	// if (IsConstructor(C)) {
		// a. Let thisRealm be the current Realm Record.
		// b. Let realmC be ? GetFunctionRealm(C).
		// c. If thisRealm and realmC are not the same Realm Record, then
			// i. If SameValue(C, realmC.[[Intrinsics]].[[%Array%]]) is true, set C to undefined.
	// }
	// 7. If Type(C) is Object, then
	if (Type(C) === 'object') {
		// a. Set C to ? Get(C, @@species).
		C = 'Symbol' in self && 'species' in self.Symbol ? Get(C, self.Symbol.species) : undefined;
		// b. If C is null, set C to undefined.
		if (C === null) {
			C = undefined;
		}
	}
	// 8. If C is undefined, return ? ArrayCreate(length).
	if (C === undefined) {
		return ArrayCreate(length);
	}
	// 9. If IsConstructor(C) is false, throw a TypeError exception.
	if (!IsConstructor(C)) {
		throw new TypeError('C must be a constructor');
	}
	// 10. Return ? Construct(C, « length »).
	return Construct(C, [length]);
}
if (!("filter"in Array.prototype
)) {

// Array.prototype.filter
/* global CreateMethodProperty, ToObject, ToLength, Get, IsCallable, ArraySpeciesCreate, ToString, HasProperty, ToBoolean, Call, CreateDataPropertyOrThrow */
// 22.1.3.7. Array.prototype.filter ( callbackfn [ , thisArg ] )
CreateMethodProperty(Array.prototype, 'filter', function filter(callbackfn /* [ , thisArg ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
	if (IsCallable(callbackfn) === false) {
		throw new TypeError(callbackfn + ' is not a function');
	}
	// 4. If thisArg is present, let T be thisArg; else let T be undefined.
	var T = arguments.length > 1 ? arguments[1] : undefined;
	// 5. Let A be ? ArraySpeciesCreate(O, 0).
	var A = ArraySpeciesCreate(O, 0);
	// 6. Let k be 0.
	var k = 0;
	// 7. Let to be 0.
	var to = 0;
	// 8. Repeat, while k < len
	while (k < len) {
		// a. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// b. Let kPresent be ? HasProperty(O, Pk).
		var kPresent = HasProperty(O, Pk);
		// c. If kPresent is true, then
		if (kPresent) {
			// i. Let kValue be ? Get(O, Pk).
			var kValue = Get(O, Pk);
			// ii. Let selected be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
			var selected = ToBoolean(Call(callbackfn, T, [kValue, k, O]));
			// iii. If selected is true, then
			if (selected) {
				// 1. Perform ? CreateDataPropertyOrThrow(A, ! ToString(to), kValue)
				CreateDataPropertyOrThrow(A, ToString(to), kValue);
				// 2. Increase to by 1.
				to = to + 1;
			}

		}
		// d. Increase k by 1.
		k = k + 1;
	}
	// 9. Return A.
	return A;
});

}

if (!("map"in Array.prototype
)) {

// Array.prototype.map
/* global ArraySpeciesCreate, Call, CreateDataPropertyOrThrow, CreateMethodProperty, Get, HasProperty, IsCallable, ToLength, ToObject, ToString */
// 22.1.3.16. Array.prototype.map ( callbackfn [ , thisArg ] )
CreateMethodProperty(Array.prototype, 'map', function map(callbackfn /* [ , thisArg ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
	if (IsCallable(callbackfn) === false) {
		throw new TypeError(callbackfn + ' is not a function');
	}
	// 4. If thisArg is present, let T be thisArg; else let T be undefined.
	var T = arguments.length > 1 ? arguments[1] : undefined;
	// 5. Let A be ? ArraySpeciesCreate(O, len).
	var A = ArraySpeciesCreate(O, len);
	// 6. Let k be 0.
	var k = 0;
	// 7. Repeat, while k < len
	while (k < len) {
		// a. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// b. Let kPresent be ? HasProperty(O, Pk).
		var kPresent = HasProperty(O, Pk);
		// c. If kPresent is true, then
		if (kPresent) {
			// i. Let kValue be ? Get(O, Pk).
			var kValue = Get(O, Pk);
			// ii. Let mappedValue be ? Call(callbackfn, T, « kValue, k, O »).
			var mappedValue = Call(callbackfn, T, [kValue, k, O]);
			// iii. Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
			CreateDataPropertyOrThrow(A, Pk, mappedValue);
		}
		// d. Increase k by 1.
		k = k + 1;
	}
	// 8. Return A.
	return A;
});

}

if (!("Symbol"in self&&0===self.Symbol.length
)) {

// Symbol
// A modification of https://github.com/WebReflection/get-own-property-symbols
// (C) Andrea Giammarchi - MIT Licensed

/* global Type */
(function (Object,  GOPS, global) {
	'use strict'; //so that ({}).toString.call(null) returns the correct [object Null] rather than [object Window]

	var supportsGetters = (function () {
		// supports getters
		try {
			var a = {};
			Object.defineProperty(a, "t", {
				configurable: true,
				enumerable: false,
				get: function () {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}());

	var	setDescriptor;
	var id = 0;
	var random = '' + Math.random();
	var prefix = '__\x01symbol:';
	var prefixLength = prefix.length;
	var internalSymbol = '__\x01symbol@@' + random;
	var emptySymbolLookup = {};
	var DP = 'defineProperty';
	var DPies = 'defineProperties';
	var GOPN = 'getOwnPropertyNames';
	var GOPD = 'getOwnPropertyDescriptor';
	var PIE = 'propertyIsEnumerable';
	var ObjectProto = Object.prototype;
	var hOP = ObjectProto.hasOwnProperty;
	var pIE = ObjectProto[PIE];
	var toString = ObjectProto.toString;
	var concat = Array.prototype.concat;
	var cachedWindowNames = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(self) : [];
	var nGOPN = Object[GOPN];
	var gOPN = function getOwnPropertyNames (obj) {
		if (toString.call(obj) === '[object Window]') {
			try {
				return nGOPN(obj);
			} catch (e) {
				// IE bug where layout engine calls userland gOPN for cross-domain `window` objects
				return concat.call([], cachedWindowNames);
			}
		}
		return nGOPN(obj);
	};
	var gOPD = Object[GOPD];
	var objectCreate = Object.create;
	var objectKeys = Object.keys;
	var freeze = Object.freeze || Object;
	var objectDefineProperty = Object[DP];
	var $defineProperties = Object[DPies];
	var descriptor = gOPD(Object, GOPN);
	var addInternalIfNeeded = function (o, uid, enumerable) {
		if (!hOP.call(o, internalSymbol)) {
			try {
				objectDefineProperty(o, internalSymbol, {
					enumerable: false,
					configurable: false,
					writable: false,
					value: {}
				});
			} catch (e) {
				o[internalSymbol] = {};
			}
		}
		o[internalSymbol]['@@' + uid] = enumerable;
	};
	var createWithSymbols = function (proto, descriptors) {
		var self = objectCreate(proto);
		gOPN(descriptors).forEach(function (key) {
			if (propertyIsEnumerable.call(descriptors, key)) {
				$defineProperty(self, key, descriptors[key]);
			}
		});
		return self;
	};
	var copyAsNonEnumerable = function (descriptor) {
		var newDescriptor = objectCreate(descriptor);
		newDescriptor.enumerable = false;
		return newDescriptor;
	};
	var get = function get(){};
	var onlyNonSymbols = function (name) {
		return name != internalSymbol &&
			!hOP.call(source, name);
	};
	var onlySymbols = function (name) {
		return name != internalSymbol &&
			hOP.call(source, name);
	};
	var propertyIsEnumerable = function propertyIsEnumerable(key) {
		var uid = '' + key;
		return onlySymbols(uid) ? (
			hOP.call(this, uid) &&
			this[internalSymbol] && this[internalSymbol]['@@' + uid]
		) : pIE.call(this, key);
	};
	var setAndGetSymbol = function (uid) {
		var descriptor = {
			enumerable: false,
			configurable: true,
			get: get,
			set: function (value) {
			setDescriptor(this, uid, {
				enumerable: false,
				configurable: true,
				writable: true,
				value: value
			});
			addInternalIfNeeded(this, uid, true);
			}
		};
		try {
			objectDefineProperty(ObjectProto, uid, descriptor);
		} catch (e) {
			ObjectProto[uid] = descriptor.value;
		}
		source[uid] = objectDefineProperty(
			Object(uid),
			'constructor',
			sourceConstructor
		);
		var description = gOPD(Symbol.prototype, 'description');
		if (description) {
			objectDefineProperty(
				source[uid],
				'description',
				description
			);
		}
		return freeze(source[uid]);
	};

	var symbolDescription = function (s) {
		var sym = thisSymbolValue(s);

		// 3. Return sym.[[Description]].
		if (supportsInferredNames) {
			var name = getInferredName(sym);
			if (name !== "") {
				return name.slice(1, -1); // name.slice('['.length, -']'.length);
			}
		}

		if (emptySymbolLookup[sym] !== undefined) {
			return emptySymbolLookup[sym];
		}

		var string = sym.toString();
		var randomStartIndex = string.lastIndexOf("0.");
		string = string.slice(10, randomStartIndex);

		if (string === "") {
			return undefined;
		}
		return string;
	};

	var Symbol = function Symbol() {
		var description = arguments[0];
		if (this instanceof Symbol) {
			throw new TypeError('Symbol is not a constructor');
		}

		var uid = prefix.concat(description || '', random, ++id);

		if (description !== undefined && (description === null || isNaN(description) || String(description) === "")) {
			emptySymbolLookup[uid] = String(description);
		}

		var that = setAndGetSymbol(uid);

		if (!supportsGetters) {
			Object.defineProperty(that, "description", {
				configurable: true,
				enumerable: false,
				value: symbolDescription(that)
			});
		}

		return that;
	};

	var source = objectCreate(null);
	var sourceConstructor = {value: Symbol};
	var sourceMap = function (uid) {
		return source[uid];
		};
	var $defineProperty = function defineProperty(o, key, descriptor) {
		var uid = '' + key;
		if (onlySymbols(uid)) {
			setDescriptor(o, uid, descriptor.enumerable ?
				copyAsNonEnumerable(descriptor) : descriptor);
			addInternalIfNeeded(o, uid, !!descriptor.enumerable);
		} else {
			objectDefineProperty(o, key, descriptor);
		}
		return o;
	};

	var onlyInternalSymbols = function (obj) {
		return function (name) {
			return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
		};
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
		return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
		}
	;

	descriptor.value = $defineProperty;
	objectDefineProperty(Object, DP, descriptor);

	descriptor.value = $getOwnPropertySymbols;
	objectDefineProperty(Object, GOPS, descriptor);

	descriptor.value = function getOwnPropertyNames(o) {
		return gOPN(o).filter(onlyNonSymbols);
	};
	objectDefineProperty(Object, GOPN, descriptor);

	descriptor.value = function defineProperties(o, descriptors) {
		var symbols = $getOwnPropertySymbols(descriptors);
		if (symbols.length) {
		objectKeys(descriptors).concat(symbols).forEach(function (uid) {
			if (propertyIsEnumerable.call(descriptors, uid)) {
			$defineProperty(o, uid, descriptors[uid]);
			}
		});
		} else {
		$defineProperties(o, descriptors);
		}
		return o;
	};
	objectDefineProperty(Object, DPies, descriptor);

	descriptor.value = propertyIsEnumerable;
	objectDefineProperty(ObjectProto, PIE, descriptor);

	descriptor.value = Symbol;
	objectDefineProperty(global, 'Symbol', descriptor);

	// defining `Symbol.for(key)`
	descriptor.value = function (key) {
		var uid = prefix.concat(prefix, key, random);
		return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
	};
	objectDefineProperty(Symbol, 'for', descriptor);

	// defining `Symbol.keyFor(symbol)`
	descriptor.value = function (symbol) {
		if (onlyNonSymbols(symbol))
		throw new TypeError(symbol + ' is not a symbol');
		return hOP.call(source, symbol) ?
		symbol.slice(prefixLength * 2, -random.length) :
		void 0
		;
	};
	objectDefineProperty(Symbol, 'keyFor', descriptor);

	descriptor.value = function getOwnPropertyDescriptor(o, key) {
		var descriptor = gOPD(o, key);
		if (descriptor && onlySymbols(key)) {
		descriptor.enumerable = propertyIsEnumerable.call(o, key);
		}
		return descriptor;
	};
	objectDefineProperty(Object, GOPD, descriptor);

	descriptor.value = function create(proto, descriptors) {
		return arguments.length === 1 || typeof descriptors === "undefined" ?
		objectCreate(proto) :
		createWithSymbols(proto, descriptors);
	};

	objectDefineProperty(Object, 'create', descriptor);

	var strictModeSupported = (function(){ 'use strict'; return this; }).call(null) === null;
	if (strictModeSupported) {
		descriptor.value = function () {
			var str = toString.call(this);
			return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
		};
	} else {
		descriptor.value = function () {
			// https://github.com/Financial-Times/polyfill-library/issues/164#issuecomment-486965300
			// Polyfill.io this code is here for the situation where a browser does not
			// support strict mode and is executing `Object.prototype.toString.call(null)`.
			// This code ensures that we return the correct result in that situation however,
			// this code also introduces a bug where it will return the incorrect result for
			// `Object.prototype.toString.call(window)`. We can't have the correct result for
			// both `window` and `null`, so we have opted for `null` as we believe this is the more
			// common situation.
			if (this === window) {
				return '[object Null]';
			}

			var str = toString.call(this);
			return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
		};
	}
	objectDefineProperty(ObjectProto, 'toString', descriptor);

	setDescriptor = function (o, key, descriptor) {
		var protoDescriptor = gOPD(ObjectProto, key);
		delete ObjectProto[key];
		objectDefineProperty(o, key, descriptor);
		if (o !== ObjectProto) {
			objectDefineProperty(ObjectProto, key, protoDescriptor);
		}
	};

	// The abstract operation thisSymbolValue(value) performs the following steps:
	function thisSymbolValue(value) {
		// 1. If Type(value) is Symbol, return value.
		if (Type(value) === "symbol") {
			return value;
		}
		// 2. If Type(value) is Object and value has a [[SymbolData]] internal slot, then
		// a. Let s be value.[[SymbolData]].
		// b. Assert: Type(s) is Symbol.
		// c. Return s.
		// 3. Throw a TypeError exception.
		throw TypeError(value + " is not a symbol");
	}

	// Symbol.prototype.description
	if (function () {
		// supports getters
		try {
			var a = {};
			Object.defineProperty(a, "t", {
				configurable: true,
				enumerable: false,
				get: function() {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}()) {
		var getInferredName;
		try {
			// eslint-disable-next-line no-new-func
			getInferredName = Function("s", "var v = s.valueOf(); return { [v]() {} }[v].name;");
			// eslint-disable-next-line no-empty
		} catch (e) { }

		var inferred = function () { };
		var supportsInferredNames = getInferredName && inferred.name === "inferred" ? getInferredName : null;


		// 19.4.3.2 get Symbol.prototype.description
		Object.defineProperty(global.Symbol.prototype, "description", {
			configurable: true,
			enumerable: false,
			get: function () {
				// 1. Let s be the this value.
				var s = this;
				return symbolDescription(s);
			}
		});
	}

}(Object, 'getOwnPropertySymbols', self));

}

if (!("Symbol"in self&&"iterator"in self.Symbol
)) {

// Symbol.iterator
Object.defineProperty(self.Symbol, 'iterator', { value: self.Symbol('iterator') });

}


// _ESAbstract.GetIterator
/* global GetMethod, Symbol, Call, Type, GetV */
// 7.4.1. GetIterator ( obj [ , method ] )
// The abstract operation GetIterator with argument obj and optional argument method performs the following steps:
function GetIterator(obj /*, method */) { // eslint-disable-line no-unused-vars
	// 1. If method is not present, then
		// a. Set method to ? GetMethod(obj, @@iterator).
	var method = arguments.length > 1 ? arguments[1] : GetMethod(obj, Symbol.iterator);
	// 2. Let iterator be ? Call(method, obj).
	var iterator = Call(method, obj);
	// 3. If Type(iterator) is not Object, throw a TypeError exception.
	if (Type(iterator) !== 'object') {
		throw new TypeError('bad iterator');
	}
	// 4. Let nextMethod be ? GetV(iterator, "next").
	var nextMethod = GetV(iterator, "next");
	// 5. Let iteratorRecord be Record {[[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false}.
	var iteratorRecord = Object.create(null);
	iteratorRecord['[[Iterator]]'] = iterator;
	iteratorRecord['[[NextMethod]]'] = nextMethod;
	iteratorRecord['[[Done]]'] = false;
	// 6. Return iteratorRecord.
	return iteratorRecord;
}

// _ESAbstract.IterableToList
/* global GetIterator, IteratorStep, IteratorValue */
// 7.4.11 IterableToList ( items [ , method ] )
function IterableToList(items /*, method */) { // eslint-disable-line no-unused-vars
	// 1. If method is present, then
	// 1.a. Let iteratorRecord be ? GetIterator(items, sync, method).
	// 2. Else,
	// 2.a. Let iteratorRecord be ? GetIterator(items, sync).
	var iteratorRecord = arguments.length > 1
		? GetIterator(items, arguments[1])
		: GetIterator(items);
	// 3. Let values be a new empty List.
	var values = [];
	// 4. Let next be true.
	var next = true;
	// 5. Repeat, while next is not false,
	while (next !== false) {
		// 5.a. Set next to ? IteratorStep(iteratorRecord).
		next = IteratorStep(iteratorRecord);
		// 5.b. If next is not false, then
		if (next !== false) {
			// 5.b.i. Let nextValue be ? IteratorValue(next).
			var nextValue = IteratorValue(next);
			// 5.b.ii. Append nextValue to the end of the List values.
			values.push(nextValue);
		}
	}
	// 6. Return values.
	return values;
}
if (!("AggregateError"in self
)) {

// AggregateError
/* global CreateDataPropertyOrThrow, IterableToList */
(function () {
	function AggregateError (errors, message) {
		var temp = typeof message === 'undefined' ? new Error() : new Error(message);

		CreateDataPropertyOrThrow(this, 'name', 'AggregateError');
		CreateDataPropertyOrThrow(this, 'message', temp.message);
		CreateDataPropertyOrThrow(this, 'stack', temp.stack);

		var errorsList;
		if (Array.isArray(errors)) {
			errorsList = errors.slice();
		} else {
			try {
				errorsList = IterableToList(errors);
			} catch (_error) {
				throw new TypeError('Argument is not iterable');
			}
		}

		CreateDataPropertyOrThrow(this, 'errors', errorsList);
	}

	AggregateError.prototype = Object.create(Error.prototype);
	AggregateError.prototype.constructor = AggregateError;

	self.AggregateError = AggregateError;
})();

}

if (!("Symbol"in self&&"replace"in self.Symbol
)) {

// Symbol.replace
/* global Symbol */
Object.defineProperty(Symbol, 'replace', { value: Symbol('replace') });

}

if (!("replaceAll"in String.prototype
)) {

// String.prototype.replaceAll
/* global CreateMethodProperty, RequireObjectCoercible, ToString, IsRegExp, Get, GetMethod, Call, IsCallable, StringIndexOf, GetSubstitution */

// 21.1.3.18 String.prototype.replaceAll ( searchValue, replaceValue )
CreateMethodProperty(String.prototype, 'replaceAll', function replaceAll(searchValue, replaceValue ) {
	'use strict';
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. If searchValue is neither undefined nor null, then
	if (searchValue !== undefined && searchValue !== null) {
		// 2.a. Let isRegExp be ? IsRegExp(searchValue).
		var isRegExp = IsRegExp(searchValue);
		// 2.b. If isRegExp is true, then
		if (isRegExp) {
			// 2.b.i. Let flags be ? Get(searchValue, "flags").
			var flags = Get(searchValue, "flags");

			// IE8 doesn't have RegExp.prototype.flags support, it does have RegExp.prototype.global
			// 2.b.iii. If ? ToString(flags) does not contain "g", throw a TypeError exception.
			if (!('flags' in RegExp.prototype) && searchValue.global !== true) {
				throw TypeError('');
			} else if ('flags' in RegExp.prototype) {
				// 2.b.ii. Perform ? RequireObjectCoercible(flags).
				RequireObjectCoercible(flags)
				// 2.b.iii. If ? ToString(flags) does not contain "g", throw a TypeError exception.
				if (ToString(flags).indexOf('g') === -1) {
					throw TypeError('');
				}
			}
		}
		// 2.c. Let replacer be ? GetMethod(searchValue, @@replace).
		var replacer = 'Symbol' in self && 'replace' in self.Symbol ? GetMethod(searchValue, self.Symbol.replace) : undefined;
		// 2.d. If replacer is not undefined, then
		if (replacer !== undefined) {
			// 2.d.i. Return ? Call(replacer, searchValue, « O, replaceValue »).
			return Call(replacer, searchValue, [ O, replaceValue ]);
		}
	}
	// 3. Let string be ? ToString(O).
	var string = ToString(O);
	// 4. Let searchString be ? ToString(searchValue).
	var searchString = ToString(searchValue);

	// 5. Let functionalReplace be IsCallable(replaceValue).
	var functionalReplace = IsCallable(replaceValue);
	// 6. If functionalReplace is false, then
	if (functionalReplace === false) {
		// 6.a. Set replaceValue to ? ToString(replaceValue).
		replaceValue = ToString(replaceValue);
	}

	// 7. Let searchLength be the length of searchString.
	var searchLength = searchString.length;
	// 8. Let advanceBy be max(1, searchLength).
	var advanceBy = Math.max(1, searchLength);
	// 9. Let matchPositions be a new empty List.
	var matchPositions = [];
	// 10. Let position be ! StringIndexOf(string, searchString, 0).
	var position = StringIndexOf(string, searchString, 0);
	// 11. Repeat, while position is not -1,
	while (position !== -1) {
		// 11.a. Append position to the end of matchPositions.
		matchPositions.push(position);
		// 11.b. Set position to ! StringIndexOf(string, searchString, position + advanceBy).
		position = StringIndexOf(string, searchString, position + advanceBy);
	}

	// 12. Let endOfLastMatch be 0.
	var endOfLastMatch = 0;
	// 13. Let result be the empty String.
	var result = '';
	// 14. For each element position of matchPositions, do
	for (var i = 0; i < matchPositions.length; i++) {
		// 14.a. Let preserved be the substring of string from endOfLastMatch to position.
		var preserved = string.substring(endOfLastMatch, matchPositions[i]);
		// 14.b. If functionalReplace is true, then
		if (functionalReplace) {
			// 14.b.i. Let replacement be ? ToString(? Call(replaceValue, undefined, « searchString, position, string »)).
			var replacement = ToString(Call(replaceValue, undefined, [searchString, matchPositions[i], string]));
			// 14.c. Else,
		} else {
			// 14.c.i. Assert: Type(replaceValue) is String.
			// 14.c.ii. Let captures be a new empty List.
			var captures = [];
			// 14.c.iii. Let replacement be ! GetSubstitution(searchString, string, position, captures, undefined, replaceValue).
			replacement = GetSubstitution(searchString, string, matchPositions[i], captures, undefined, replaceValue);
		}
		// 14.d. Set result to the string-concatenation of result, preserved, and replacement.
		result = result + preserved + replacement;
		// 14.e. Set endOfLastMatch to position + searchLength.
		endOfLastMatch = matchPositions[i] + searchLength;
	}
	// 15. If endOfLastMatch < the length of string, then
	if (endOfLastMatch < string.length) {
		// 15.a. Set result to the string-concatenation of result and the substring of string from endOfLastMatch.
		result = result + string.substring(endOfLastMatch);
	}
	// 16. Return result.
	return result;
});

}

if (!("Symbol"in self&&"toStringTag"in self.Symbol
)) {

// Symbol.toStringTag
/* global Symbol */
Object.defineProperty(Symbol, 'toStringTag', {
	value: Symbol('toStringTag')
});

}

if (!("Promise"in self
)) {

// Promise
/*
	Yaku v0.19.3
	(c) 2015 Yad Smood. http://ysmood.org
	License MIT
*/
/*
	Yaku v0.17.9
	(c) 2015 Yad Smood. http://ysmood.org
	License MIT
*/
(function () {
	'use strict';

	var $undefined
	, $null = null
	, isBrowser = typeof self === 'object'
	, root = self
	, nativePromise = root.Promise
	, process = root.process
	, console = root.console
	, isLongStackTrace = true
	, Arr = Array
	, Err = Error

	, $rejected = 1
	, $resolved = 2
	, $pending = 3

	, $Symbol = 'Symbol'
	, $iterator = 'iterator'
	, $species = 'species'
	, $speciesKey = $Symbol + '(' + $species + ')'
	, $return = 'return'

	, $unhandled = '_uh'
	, $promiseTrace = '_pt'
	, $settlerTrace = '_st'

	, $invalidThis = 'Invalid this'
	, $invalidArgument = 'Invalid argument'
	, $fromPrevious = '\nFrom previous '
	, $promiseCircularChain = 'Chaining cycle detected for promise'
	, $unhandledRejectionMsg = 'Uncaught (in promise)'
	, $rejectionHandled = 'rejectionHandled'
	, $unhandledRejection = 'unhandledRejection'

	, $tryCatchFn
	, $tryCatchThis
	, $tryErr = { e: $null }
	, $noop = function () {}
	, $cleanStackReg = /^.+\/node_modules\/yaku\/.+\n?/mg
	;

	/**
	* This class follows the [Promises/A+](https://promisesaplus.com) and
	* [ES6](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) spec
	* with some extra helpers.
	* @param  {Function} executor Function object with two arguments resolve, reject.
	* The first argument fulfills the promise, the second argument rejects it.
	* We can call these functions, once our operation is completed.
	*/
	var Yaku = function (executor) {
	var self = this,
		err;

	// "this._s" is the internao state of: pending, resolved or rejected
	// "this._v" is the internal value

	if (!isObject(self) || self._s !== $undefined)
		throw genTypeError($invalidThis);

	self._s = $pending;

	if (isLongStackTrace) self[$promiseTrace] = genTraceInfo();

	if (executor !== $noop) {
		if (!isFunction(executor))
			throw genTypeError($invalidArgument);

		err = genTryCatcher(executor)(
			genSettler(self, $resolved),
			genSettler(self, $rejected)
		);

		if (err === $tryErr)
			settlePromise(self, $rejected, err.e);
	}
	};

	Yaku['default'] = Yaku;

	extend(Yaku.prototype, {
	/**
		* Appends fulfillment and rejection handlers to the promise,
		* and returns a new promise resolving to the return value of the called handler.
		* @param  {Function} onFulfilled Optional. Called when the Promise is resolved.
		* @param  {Function} onRejected  Optional. Called when the Promise is rejected.
		* @return {Yaku} It will return a new Yaku which will resolve or reject after
		* @example
		* the current Promise.
		* ```js
		* var Promise = require('yaku');
		* var p = Promise.resolve(10);
		*
		* p.then((v) => {
		*     console.log(v);
		* });
		* ```
		*/
	then: function (onFulfilled, onRejected) {
		if (this._s === undefined) throw genTypeError();

		return addHandler(
			this,
			newCapablePromise(Yaku.speciesConstructor(this, Yaku)),
			onFulfilled,
			onRejected
		);
	},

	/**
		* The `catch()` method returns a Promise and deals with rejected cases only.
		* It behaves the same as calling `Promise.prototype.then(undefined, onRejected)`.
		* @param  {Function} onRejected A Function called when the Promise is rejected.
		* This function has one argument, the rejection reason.
		* @return {Yaku} A Promise that deals with rejected cases only.
		* @example
		* ```js
		* var Promise = require('yaku');
		* var p = Promise.reject(new Error("ERR"));
		*
		* p['catch']((v) => {
		*     console.log(v);
		* });
		* ```
		*/
	'catch': function (onRejected) {
		return this.then($undefined, onRejected);
	},

	/**
		* Register a callback to be invoked when a promise is settled (either fulfilled or rejected).
		* Similar with the try-catch-finally, it's often used for cleanup.
		* @param  {Function} onFinally A Function called when the Promise is settled.
		* It will not receive any argument.
		* @return {Yaku} A Promise that will reject if onFinally throws an error or returns a rejected promise.
		* Else it will resolve previous promise's final state (either fulfilled or rejected).
		* @example
		* ```js
		* var Promise = require('yaku');
		* var p = Math.random() > 0.5 ? Promise.resolve() : Promise.reject();
		* p.finally(() => {
		*     console.log('finally');
		* });
		* ```
		*/
	'finally': function (onFinally) {
		return this.then(function (val) {
			return Yaku.resolve(onFinally()).then(function () {
				return val;
			});
		}, function (err) {
			return Yaku.resolve(onFinally()).then(function () {
				throw err;
			});
		});
	},

	// The number of current promises that attach to this Yaku instance.
	_c: 0,

	// The parent Yaku.
	_p: $null
	});

	/**
	* The `Promise.resolve(value)` method returns a Promise object that is resolved with the given value.
	* If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable,
	* adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
	* @param  {Any} value Argument to be resolved by this Promise.
	* Can also be a Promise or a thenable to resolve.
	* @return {Yaku}
	* @example
	* ```js
	* var Promise = require('yaku');
	* var p = Promise.resolve(10);
	* ```
	*/
	Yaku.resolve = function (val) {
	return isYaku(val) ? val : settleWithX(newCapablePromise(this), val);
	};

	/**
	* The `Promise.reject(reason)` method returns a Promise object that is rejected with the given reason.
	* @param  {Any} reason Reason why this Promise rejected.
	* @return {Yaku}
	* @example
	* ```js
	* var Promise = require('yaku');
	* var p = Promise.reject(new Error("ERR"));
	* ```
	*/
	Yaku.reject = function (reason) {
	return settlePromise(newCapablePromise(this), $rejected, reason);
	};

	/**
	* The `Promise.race(iterable)` method returns a promise that resolves or rejects
	* as soon as one of the promises in the iterable resolves or rejects,
	* with the value or reason from that promise.
	* @param  {iterable} iterable An iterable object, such as an Array.
	* @return {Yaku} The race function returns a Promise that is settled
	* the same way as the first passed promise to settle.
	* It resolves or rejects, whichever happens first.
	* @example
	* ```js
	* var Promise = require('yaku');
	* Promise.race([
	*     123,
	*     Promise.resolve(0)
	* ])
	* .then((value) => {
	*     console.log(value); // => 123
	* });
	* ```
	*/
	Yaku.race = function (iterable) {
	var self = this
		, p = newCapablePromise(self)

		, resolve = function (val) {
			settlePromise(p, $resolved, val);
		}

		, reject = function (val) {
			settlePromise(p, $rejected, val);
		}

		, ret = genTryCatcher(each)(iterable, function (v) {
			self.resolve(v).then(resolve, reject);
		});

	if (ret === $tryErr) return self.reject(ret.e);

	return p;
	};

	/**
	* The `Promise.all(iterable)` method returns a promise that resolves when
	* all of the promises in the iterable argument have resolved.
	*
	* The result is passed as an array of values from all the promises.
	* If something passed in the iterable array is not a promise,
	* it's converted to one by Promise.resolve. If any of the passed in promises rejects,
	* the all Promise immediately rejects with the value of the promise that rejected,
	* discarding all the other promises whether or not they have resolved.
	* @param  {iterable} iterable An iterable object, such as an Array.
	* @return {Yaku}
	* @example
	* ```js
	* var Promise = require('yaku');
	* Promise.all([
	*     123,
	*     Promise.resolve(0)
	* ])
	* .then((values) => {
	*     console.log(values); // => [123, 0]
	* });
	* ```
	* @example
	* Use with iterable.
	* ```js
	* var Promise = require('yaku');
	* Promise.all((function * () {
	*     yield 10;
	*     yield new Promise(function (r) { setTimeout(r, 1000, "OK") });
	* })())
	* .then((values) => {
	*     console.log(values); // => [123, 0]
	* });
	* ```
	*/
	Yaku.all = function (iterable) {
	var self = this
		, p1 = newCapablePromise(self)
		, res = []
		, ret
	;

	function reject (reason) {
		settlePromise(p1, $rejected, reason);
	}

	ret = genTryCatcher(each)(iterable, function (item, i) {
		self.resolve(item).then(function (value) {
			res[i] = value;
			if (!--ret) settlePromise(p1, $resolved, res);
		}, reject);
	});

	if (ret === $tryErr) return self.reject(ret.e);

	if (!ret) settlePromise(p1, $resolved, []);

	return p1;
	};

	/**
	* The ES6 Symbol object that Yaku should use, by default it will use the
	* global one.
	* @type {Object}
	* @example
	* ```js
	* var core = require("core-js/library");
	* var Promise = require("yaku");
	* Promise.Symbol = core.Symbol;
	* ```
	*/
	Yaku.Symbol = root[$Symbol] || {};

	// To support browsers that don't support `Object.defineProperty`.
	genTryCatcher(function () {
	Object.defineProperty(Yaku, getSpecies(), {
		get: function () { return this; }
	});
	})();

	/**
	* Use this api to custom the species behavior.
	* https://tc39.github.io/ecma262/#sec-speciesconstructor
	* @param {Any} O The current this object.
	* @param {Function} defaultConstructor
	*/
	Yaku.speciesConstructor = function (O, D) {
	var C = O.constructor;

	return C ? (C[getSpecies()] || D) : D;
	};

	/**
	* Catch all possibly unhandled rejections. If you want to use specific
	* format to display the error stack, overwrite it.
	* If it is set, auto `console.error` unhandled rejection will be disabled.
	* @param {Any} reason The rejection reason.
	* @param {Yaku} p The promise that was rejected.
	* @example
	* ```js
	* var Promise = require('yaku');
	* Promise.unhandledRejection = (reason) => {
	*     console.error(reason);
	* };
	*
	* // The console will log an unhandled rejection error message.
	* Promise.reject('my reason');
	*
	* // The below won't log the unhandled rejection error message.
	* Promise.reject('v')["catch"](() => {});
	* ```
	*/
	Yaku.unhandledRejection = function (reason, p) {
	console && console.error(
		$unhandledRejectionMsg,
		isLongStackTrace ? p.longStack : genStackInfo(reason, p)
	);
	};

	/**
	* Emitted whenever a Promise was rejected and an error handler was
	* attached to it (for example with `["catch"]()`) later than after an event loop turn.
	* @param {Any} reason The rejection reason.
	* @param {Yaku} p The promise that was rejected.
	*/
	Yaku.rejectionHandled = $noop;

	/**
	* It is used to enable the long stack trace.
	* Once it is enabled, it can't be reverted.
	* While it is very helpful in development and testing environments,
	* it is not recommended to use it in production. It will slow down
	* application and eat up memory.
	* It will add an extra property `longStack` to the Error object.
	* @example
	* ```js
	* var Promise = require('yaku');
	* Promise.enableLongStackTrace();
	* Promise.reject(new Error("err"))["catch"]((err) => {
	*     console.log(err.longStack);
	* });
	* ```
	*/
	Yaku.enableLongStackTrace = function () {
	isLongStackTrace = true;
	};

	/**
	* Only Node has `process.nextTick` function. For browser there are
	* so many ways to polyfill it. Yaku won't do it for you, instead you
	* can choose what you prefer. For example, this project
	* [next-tick](https://github.com/medikoo/next-tick).
	* By default, Yaku will use `process.nextTick` on Node, `setTimeout` on browser.
	* @type {Function}
	* @example
	* ```js
	* var Promise = require('yaku');
	* Promise.nextTick = require('next-tick');
	* ```
	* @example
	* You can even use sync resolution if you really know what you are doing.
	* ```js
	* var Promise = require('yaku');
	* Promise.nextTick = fn => fn();
	* ```
	*/
	Yaku.nextTick = isBrowser ?
	function (fn) {
		nativePromise ?
			new nativePromise(function (resolve) { resolve(); }).then(fn) :
			setTimeout(fn);
	} :
	process.nextTick;

	// ********************** Private **********************

	Yaku._s = 1;

	/**
	* All static variable name will begin with `$`. Such as `$rejected`.
	* @private
	*/

	// ******************************* Utils ********************************

	function getSpecies () {
	return Yaku[$Symbol][$species] || $speciesKey;
	}

	function extend (src, target) {
	for (var k in target) {
		src[k] = target[k];
	}
	}

	function isObject (obj) {
	return obj && typeof obj === 'object';
	}

	function isFunction (obj) {
	return typeof obj === 'function';
	}

	function isInstanceOf (a, b) {
	return a instanceof b;
	}

	function isError (obj) {
	return isInstanceOf(obj, Err);
	}

	function ensureType (obj, fn, msg) {
	if (!fn(obj)) throw genTypeError(msg);
	}

	/**
	* Wrap a function into a try-catch.
	* @private
	* @return {Any | $tryErr}
	*/
	function tryCatcher () {
	try {
		return $tryCatchFn.apply($tryCatchThis, arguments);
	} catch (e) {
		$tryErr.e = e;
		return $tryErr;
	}
	}

	/**
	* Generate a try-catch wrapped function.
	* @private
	* @param  {Function} fn
	* @return {Function}
	*/
	function genTryCatcher (fn, self) {
	$tryCatchFn = fn;
	$tryCatchThis = self;
	return tryCatcher;
	}

	/**
	* Generate a scheduler.
	* @private
	* @param  {Integer}  initQueueSize
	* @param  {Function} fn `(Yaku, Value) ->` The schedule handler.
	* @return {Function} `(Yaku, Value) ->` The scheduler.
	*/
	function genScheduler (initQueueSize, fn) {
	/**
		* All async promise will be scheduled in
		* here, so that they can be execute on the next tick.
		* @private
		*/
	var fnQueue = Arr(initQueueSize)
		, fnQueueLen = 0;

	/**
		* Run all queued functions.
		* @private
		*/
	function flush () {
		var i = 0;
		while (i < fnQueueLen) {
			fn(fnQueue[i], fnQueue[i + 1]);
			fnQueue[i++] = $undefined;
			fnQueue[i++] = $undefined;
		}

		fnQueueLen = 0;
		if (fnQueue.length > initQueueSize) fnQueue.length = initQueueSize;
	}

	return function (v, arg) {
		fnQueue[fnQueueLen++] = v;
		fnQueue[fnQueueLen++] = arg;

		if (fnQueueLen === 2) Yaku.nextTick(flush);
	};
	}

	/**
	* Generate a iterator
	* @param  {Any} obj
	* @private
	* @return {Object || TypeError}
	*/
	function each (iterable, fn) {
	var len
		, i = 0
		, iter
		, item
		, ret
	;

	if (!iterable) throw genTypeError($invalidArgument);

	var gen = iterable[Yaku[$Symbol][$iterator]];
	if (isFunction(gen))
		iter = gen.call(iterable);
	else if (isFunction(iterable.next)) {
		iter = iterable;
	}
	else if (isInstanceOf(iterable, Arr)) {
		len = iterable.length;
		while (i < len) {
			fn(iterable[i], i++);
		}
		return i;
	} else
		throw genTypeError($invalidArgument);

	while (!(item = iter.next()).done) {
		ret = genTryCatcher(fn)(item.value, i++);
		if (ret === $tryErr) {
			isFunction(iter[$return]) && iter[$return]();
			throw ret.e;
		}
	}

	return i;
	}

	/**
	* Generate type error object.
	* @private
	* @param  {String} msg
	* @return {TypeError}
	*/
	function genTypeError (msg) {
	return new TypeError(msg);
	}

	function genTraceInfo (noTitle) {
	return (noTitle ? '' : $fromPrevious) + new Err().stack;
	}


	// *************************** Promise Helpers ****************************

	/**
	* Resolve the value returned by onFulfilled or onRejected.
	* @private
	* @param {Yaku} p1
	* @param {Yaku} p2
	*/
	var scheduleHandler = genScheduler(999, function (p1, p2) {
	var x, handler;

	// 2.2.2
	// 2.2.3
	handler = p1._s !== $rejected ? p2._onFulfilled : p2._onRejected;

	// 2.2.7.3
	// 2.2.7.4
	if (handler === $undefined) {
		settlePromise(p2, p1._s, p1._v);
		return;
	}

	// 2.2.7.1
	x = genTryCatcher(callHanler)(handler, p1._v);
	if (x === $tryErr) {
		// 2.2.7.2
		settlePromise(p2, $rejected, x.e);
		return;
	}

	settleWithX(p2, x);
	});

	var scheduleUnhandledRejection = genScheduler(9, function (p) {
	if (!hashOnRejected(p)) {
		p[$unhandled] = 1;
		emitEvent($unhandledRejection, p);
	}
	});

	function emitEvent (name, p) {
	var browserEventName = 'on' + name.toLowerCase()
		, browserHandler = root[browserEventName];

	if (process && process.listeners(name).length)
		name === $unhandledRejection ?
			process.emit(name, p._v, p) : process.emit(name, p);
	else if (browserHandler)
		browserHandler({ reason: p._v, promise: p });
	else
		Yaku[name](p._v, p);
	}

	function isYaku (val) { return val && val._s; }

	function newCapablePromise (Constructor) {
	if (isYaku(Constructor)) return new Constructor($noop);

	var p, r, j;
	p = new Constructor(function (resolve, reject) {
		if (p) throw genTypeError();

		r = resolve;
		j = reject;
	});

	ensureType(r, isFunction);
	ensureType(j, isFunction);

	return p;
	}

	/**
	* It will produce a settlePromise function to user.
	* Such as the resolve and reject in this `new Yaku (resolve, reject) ->`.
	* @private
	* @param  {Yaku} self
	* @param  {Integer} state The value is one of `$pending`, `$resolved` or `$rejected`.
	* @return {Function} `(value) -> undefined` A resolve or reject function.
	*/
	function genSettler (self, state) {
	var isCalled = false;
	return function (value) {
		if (isCalled) return;
		isCalled = true;

		if (isLongStackTrace)
			self[$settlerTrace] = genTraceInfo(true);

		if (state === $resolved)
			settleWithX(self, value);
		else
			settlePromise(self, state, value);
	};
	}

	/**
	* Link the promise1 to the promise2.
	* @private
	* @param {Yaku} p1
	* @param {Yaku} p2
	* @param {Function} onFulfilled
	* @param {Function} onRejected
	*/
	function addHandler (p1, p2, onFulfilled, onRejected) {
	// 2.2.1
	if (isFunction(onFulfilled))
		p2._onFulfilled = onFulfilled;
	if (isFunction(onRejected)) {
		if (p1[$unhandled]) emitEvent($rejectionHandled, p1);

		p2._onRejected = onRejected;
	}

	if (isLongStackTrace) p2._p = p1;
	p1[p1._c++] = p2;

	// 2.2.6
	if (p1._s !== $pending)
		scheduleHandler(p1, p2);

	// 2.2.7
	return p2;
	}

	// iterate tree
	function hashOnRejected (node) {
	// A node shouldn't be checked twice.
	if (node._umark)
		return true;
	else
		node._umark = true;

	var i = 0
		, len = node._c
		, child;

	while (i < len) {
		child = node[i++];
		if (child._onRejected || hashOnRejected(child)) return true;
	}
	}

	function genStackInfo (reason, p) {
	var stackInfo = [];

	function push (trace) {
		return stackInfo.push(trace.replace(/^\s+|\s+$/g, ''));
	}

	if (isLongStackTrace) {
		if (p[$settlerTrace])
			push(p[$settlerTrace]);

		// Hope you guys could understand how the back trace works.
		// We only have to iterate through the tree from the bottom to root.
		(function iter (node) {
			if (node && $promiseTrace in node) {
				iter(node._next);
				push(node[$promiseTrace] + '');
				iter(node._p);
			}
		})(p);
	}

	return (reason && reason.stack ? reason.stack : reason) +
		('\n' + stackInfo.join('\n')).replace($cleanStackReg, '');
	}

	function callHanler (handler, value) {
	// 2.2.5
	return handler(value);
	}

	/**
	* Resolve or reject a promise.
	* @private
	* @param  {Yaku} p
	* @param  {Integer} state
	* @param  {Any} value
	*/
	function settlePromise (p, state, value) {
	var i = 0
		, len = p._c;

	// 2.1.2
	// 2.1.3
	if (p._s === $pending) {
		// 2.1.1.1
		p._s = state;
		p._v = value;

		if (state === $rejected) {
			if (isLongStackTrace && isError(value)) {
				value.longStack = genStackInfo(value, p);
			}

			scheduleUnhandledRejection(p);
		}

		// 2.2.4
		while (i < len) {
			scheduleHandler(p, p[i++]);
		}
	}

	return p;
	}

	/**
	* Resolve or reject promise with value x. The x can also be a thenable.
	* @private
	* @param {Yaku} p
	* @param {Any | Thenable} x A normal value or a thenable.
	*/
	function settleWithX (p, x) {
	// 2.3.1
	if (x === p && x) {
		settlePromise(p, $rejected, genTypeError($promiseCircularChain));
		return p;
	}

	// 2.3.2
	// 2.3.3
	if (x !== $null && (isFunction(x) || isObject(x))) {
		// 2.3.2.1
		var xthen = genTryCatcher(getThen)(x);

		if (xthen === $tryErr) {
			// 2.3.3.2
			settlePromise(p, $rejected, xthen.e);
			return p;
		}

		if (isFunction(xthen)) {
			if (isLongStackTrace && isYaku(x))
				p._next = x;

			// Fix https://bugs.chromium.org/p/v8/issues/detail?id=4162
			if (isYaku(x))
				settleXthen(p, x, xthen);
			else
				Yaku.nextTick(function () {
					settleXthen(p, x, xthen);
				});
		} else
			// 2.3.3.4
			settlePromise(p, $resolved, x);
	} else
		// 2.3.4
		settlePromise(p, $resolved, x);

	return p;
	}

	/**
	* Try to get a promise's then method.
	* @private
	* @param  {Thenable} x
	* @return {Function}
	*/
	function getThen (x) { return x.then; }

	/**
	* Resolve then with its promise.
	* @private
	* @param  {Yaku} p
	* @param  {Thenable} x
	* @param  {Function} xthen
	*/
	function settleXthen (p, x, xthen) {
	// 2.3.3.3
	var err = genTryCatcher(xthen, x)(function (y) {
		// 2.3.3.3.3
		// 2.3.3.3.1
		x && (x = $null, settleWithX(p, y));
	}, function (r) {
		// 2.3.3.3.3
		// 2.3.3.3.2
		x && (x = $null, settlePromise(p, $rejected, r));
	});

	// 2.3.3.3.4.1
	if (err === $tryErr && x) {
		// 2.3.3.3.4.2
		settlePromise(p, $rejected, err.e);
		x = $null;
	}
	}

	root.Promise = Yaku;
})();

}

if (!("Promise"in self&&"any"in self.Promise
)) {

// Promise.any
/* global AggregateError, CreateMethodProperty, IterableToList, Promise, Type */
(function () {
	// Based on https://github.com/es-shims/Promise.any/blob/master/implementation.js

	var identity = function (x) {
		return x;
	}

	CreateMethodProperty(Promise, 'any', function any (iterable) {
		var C = this;
		if (Type(C) !== 'object') {
			throw new TypeError('`this` value must be an object');
		}

		var arr;
		if (Array.isArray(iterable)) {
			arr = iterable;
		} else {
			try {
				arr = IterableToList(iterable);
			} catch (_error) {
				return Promise.reject(new TypeError('Argument of Promise.any is not iterable'));
			}
		}

		var thrower = function (value) {
			return C.reject(value);
		};

		var promises = arr.map(function (promise) {
			var itemPromise = C.resolve(promise);
			try {
				return itemPromise.then(thrower, identity);
			} catch (e) {
				return e;
			}
		});

		return C.all(promises).then(function (errors) {
			throw new AggregateError(errors, 'Every promise rejected')
		}, identity);
	});
}());

}

})
('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
