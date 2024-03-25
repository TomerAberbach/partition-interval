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
    <img src="http://img.badgesize.io/https://unpkg.com/partition-interval/dist/index.min.js?compression=gzip&label=gzip" alt="gzip size" />
  </a>
  <a href="https://unpkg.com/partition-interval/dist/index.min.js">
    <img src="http://img.badgesize.io/https://unpkg.com/partition-interval/dist/index.min.js?compression=brotli&label=brotli" alt="brotli size" />
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

For pull requests, please read the
[contributing guidelines](https://github.com/TomerAberbach/partition-interval/blob/main/contributing.md).

## License

[Apache License 2.0](https://github.com/TomerAberbach/partition-interval/blob/main/license)

This is not an official Google product.
