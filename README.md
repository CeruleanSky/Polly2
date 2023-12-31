Original: https://github.com/zakius/Polly
Forked from: https://github.com/hawkeye116477/Polly

Added ES2020-ES2022, Babel, Regenerator, and some Misc scripts.

This is an extension created to allow users of Waterfox Classic (and possibly other Firefox derivatives) to load polyfills at will.

Currently available polyfills:
- [ResizeObserver](https://github.com/que-etc/resize-observer-polyfill)
- [Webcomponents](https://github.com/webcomponents/polyfills)
- [BigInt](https://github.com/peterolson/BigInteger.js) with slight modifications (there is no way to actually polyfill BigInt as it's a new type that needs internal operators to work with it, if website creator used JSBI properly everything should be fine, in other cases it will likely break anyway)
- [AbortController](https://polyfill.io)
- [Array extensions bundle](https://polyfill.io)
- [ArrayBuffer](https://polyfill.io)
- [DataView](https://polyfill.io)
- [Element extensions bundle](https://polyfill.io)
- [es2018 bundle](https://polyfill.io)
- [es2019 bundle](https://polyfill.io)
- [es2020 bundle](https://polyfill.io)
- [es2021 bundle](https://polyfill.io)
- [es2022 bundle](https://polyfill.io)
- [globalThis](https://polyfill.io)
- [Intl extensions](https://polyfill.io)
- [Promise.finally](https://polyfill.io)
- [String extensions](https://polyfill.io)
- [TypedArrays](https://polyfill.io)
- [Babel](https://babeljs.io/docs/babel-standalone)
- [Regenerator](https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js)

This extension uses libraries:

- [Text Encoding](https://github.com/inexorabletash/text-encoding) *with a slight modification to override built in encoder, otherwise it wouldn't be possible to encode text to charsets other than `utf-8`* 

Licensing information regarding included polyfills is included both in repository and in package in `legal` directory
