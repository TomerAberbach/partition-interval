/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Partitions the given closed `interval` into the given number of `partitions`
 * as evenly as possible.
 *
 * Returns a lazy iterable of closed intervals.
 *
 * @throws if the start or end of `interval` is not an integer, the start of
 * `interval` is greater than its end, or `partitions` is not a positive
 * integer.
 *
 * @example
 * ```js
 * // Lazily iterate over the returned iterable.
 * for (const interval of partitionInterval([0, 99], 4)) {
 *   console.log(interval)
 * }
 * //=> [ 0, 24 ]
 * //=> [ 25, 49 ]
 * //=> [ 50, 74 ]
 * //=> [ 75, 99 ]
 *
 * const intervals = [...partitionInterval([-31, 89], 5)]
 * console.log(intervals)
 * //=> [ [-31, -8], [-7, 16], [17, 40], [41, 64], [65, 89] ]
 * ```
 */
const partitionInterval = <
  Start extends number,
  End extends number,
  Partitions extends number,
>(
  interval: readonly [Integer<Start>, Integer<End>],
  partitions: PositiveInteger<Partitions>,
): Iterable<[number, number]> => {
  const [start, end] = interval
  if (
    !isSafeInteger(start) ||
    !isSafeInteger(end) ||
    start > end ||
    !isSafeInteger(partitions) ||
    partitions <= 0
  ) {
    throw new TypeError(
      `Expected ints: start < end, partitions > 0; got: [${start}, ${end}], ${partitions}`,
    )
  }

  const intervalSize = end - start + 1
  return {
    *[Symbol.iterator]() {
      let partitionStart = 0
      for (let partition = 0; partition < partitions; partition++) {
        yield [
          start + Math.trunc(partitionStart / partitions),
          start + Math.trunc((partitionStart + intervalSize) / partitions) - 1,
        ]
        partitionStart += intervalSize
      }
    },
  }
}

const { isSafeInteger } = Number

type StrictNegative<Numeric extends number> = Numeric extends 0
  ? never
  : `${Numeric}` extends `-${string}`
    ? Numeric
    : never

type StrictPositive<Numeric extends number> = Numeric extends 0
  ? never
  : StrictNegative<Numeric> extends never
    ? Numeric
    : never

type StrictInteger<Numeric extends number> = `${Numeric}` extends `${bigint}`
  ? Numeric
  : never

type CheckNumericLiteral<
  Numeric extends number,
  LiteralNumber extends number,
> = number extends Numeric ? Numeric : LiteralNumber

type Integer<Numeric extends number> = CheckNumericLiteral<
  Numeric,
  StrictInteger<Numeric>
>

type PositiveInteger<Numeric extends number> = CheckNumericLiteral<
  Numeric,
  StrictPositive<Numeric>
>

export default partitionInterval
