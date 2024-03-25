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

import { fc, test } from 'tomer'
import { map, pipe, sum } from 'lfi'
import partitionInterval from '../src/index.js'

const getIntervalArb = (numberArb: fc.Arbitrary<number> = fc.integer()) =>
  fc
    .tuple(numberArb, numberArb)
    .map(([start, end]): [number, number] =>
      start > end ? [end, start] : [start, end],
    )

test.prop([
  fc
    .tuple(getIntervalArb(), fc.integer({ min: 1, max: 500 }))
    .filter(
      ([interval, partitions]) => partitions <= computeIntervalSize(interval),
    ),
])(`partitionInterval works`, ([interval, partitions]) => {
  const intervalsIterable = partitionInterval(interval, partitions)
  const intervals = [...intervalsIterable]

  // The returned iterable should be iterable more than once.
  expect(intervals).toStrictEqual([...intervalsIterable])

  // The number of subintervals should equal the requested number.
  expect(intervals).toHaveLength(partitions)

  // The sizes of the subintervals should sum to the size of the input interval.
  const intervalSize = computeIntervalSize(interval)
  expect(pipe(intervals, map(computeIntervalSize), sum)).toBe(intervalSize)

  const minSubintervalSize = Math.floor(intervalSize / partitions)
  const maxSubinteralSize = Math.ceil(intervalSize / partitions)
  for (const subinterval of intervals) {
    // The start and end in each subinterval should be sorted.
    expect(subinterval[0]).toBeLessThanOrEqual(subinterval[1])

    // The input interval should be divided as evenly as possible.
    const subintervalSize = computeIntervalSize(subinterval)
    expect(subintervalSize).toBeGreaterThanOrEqual(minSubintervalSize)
    expect(subintervalSize).toBeLessThanOrEqual(maxSubinteralSize)
  }

  // The subintervals should be sorted and non-overlapping.
  for (let i = 1; i < intervals.length; i++) {
    const [, previousSubintervalEnd] = intervals[i - 1]!
    const [currentSubintervalStart] = intervals[i]!
    expect(previousSubintervalEnd).toBeLessThan(currentSubintervalStart)
  }
})

const computeIntervalSize = ([start, end]: readonly [number, number]): number =>
  end - start + 1

test.prop([getIntervalArb(fc.double()), fc.integer()])(
  `partitionInterval throws for non-integer interval`,
  (interval, partitions) => {
    expect(() => partitionInterval(interval, partitions)).toThrow(TypeError)
  },
)

test.prop([
  getIntervalArb().filter(([start, end]) => start !== end),
  fc.integer({ max: 0 }),
])(
  `partitionInterval throws for unsorted interval`,
  ([start, end], partitions) => {
    expect(() => partitionInterval([end, start], partitions)).toThrow(TypeError)
  },
)

test.prop([getIntervalArb(), fc.double()])(
  `partitionInterval throws for non-integer partitions`,
  (interval, partitions) => {
    expect(() => partitionInterval(interval, partitions)).toThrow(TypeError)
  },
)

test.prop([getIntervalArb(), fc.integer({ max: 0 })])(
  `partitionInterval throws for non-positive partitions`,
  (interval, partitions) => {
    expect(() => partitionInterval(interval, partitions)).toThrow(TypeError)
  },
)

test(`partitionInterval examples`, () => {
  expect([...partitionInterval([3, 52], 4)]).toStrictEqual([
    [3, 14],
    [15, 27],
    [28, 39],
    [40, 52],
  ])
  expect([...partitionInterval([-31, 89], 5)]).toStrictEqual([
    [-31, -8],
    [-7, 16],
    [17, 40],
    [41, 64],
    [65, 89],
  ])
})
