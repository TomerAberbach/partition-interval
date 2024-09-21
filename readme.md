<h1 align="center">
  partition-interval
</h1>

<div align="center">
  <a href="https://npmjs.org/package/partition-interval">
    <img src="https://badgen.now.sh/npm/v/partition-interval" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/partition-interval/actions">
    <img src="https://github.com/TomerAberbach/partition-interval/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://unpkg.com/partition-interval/dist/index.min.js">
    <img src="https://deno.bundlejs.com/?q=partition-interval&badge" alt="gzip size" />
  </a>
  <a href="https://unpkg.com/partition-interval/dist/index.min.js">
    <img src="https://deno.bundlejs.com/?q=partition-interval&config={%22compression%22:{%22type%22:%22brotli%22}}&badge" alt="brotli size" />
  </a>
  <a href="https://github.com/sponsors/TomerAberbach">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor">
  </a>
</div>

<div align="center">
  Partitions an interval as evenly as possible.
</div>

## Features

- **Lazy:** returns an `Iterable` for the common case of not needing everything
  in memory at once
- **Small:** just ~260 B minzipped
- **Robust:** property-based testing with
  [`fast-check`](https://github.com/dubzzz/fast-check)

## Install

```sh
$ npm i partition-interval
```

## Usage

```js
import partitionInterval from 'partition-interval'

// Lazily iterate over the returned iterable.
for (const interval of partitionInterval([0, 99], 4)) {
  console.log(interval)
}
//=> [ 0, 24 ]
//=> [ 25, 49 ]
//=> [ 50, 74 ]
//=> [ 75, 99 ]

// Collect the returned iterable into an array.
const intervals = [...partitionInterval([-31, 89], 5)]
console.log(intervals)
//=> [ [-31, -8], [-7, 16], [17, 40], [41, 64], [65, 89] ]
```

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/partition-interval/issues/new).

## License

[MIT](https://github.com/TomerAberbach/partition-interval/blob/main/license) ©
[Tomer Aberbach](https://github.com/TomerAberbach) \
[Apache 2.0](https://github.com/TomerAberbach/partition-interval/blob/main/license-apache)
© [Google](https://github.com/TomerAberbach/partition-interval/blob/main/notice-apache)
