/* @flow */
/**
 * Copyright (c) 2017, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import { $$asyncIterator } from 'iterall';

/**
 * Given an error, returns an AsyncIterable which will fail with that error.
 *
 * Similar to Promise.reject(error)
 */
export default function asyncIteratorReject(error: Error): AsyncIterator<void> {
  let isComplete = false;
  /* TODO: Flow doesn't support symbols as keys:
     https://github.com/facebook/flow/issues/3258 */
  return ({
    next() {
      const result = isComplete ?
        Promise.resolve({ value: undefined, done: true }) :
        Promise.reject(error);
      isComplete = true;
      return result;
    },
    return() {
      isComplete = true;
      return Promise.resolve({ value: undefined, done: true });
    },
    throw() {
      isComplete = true;
      return Promise.reject(error);
    },
    [$$asyncIterator]() {
      return this;
    },
  }: any);
}
