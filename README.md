# koa-with-rate-limiter

## Requirements
- node.js >= `8.1.4`
- npm
- yarn (optional)

Note that this repository is developed and tested with Node.js `v9.8.0`.

## Install Dependencies
```
yarn
```

or

```
npm i
```

## Run
```
npm start
```

## Test
```
npm test
```

Note that this will exec `jest --silent`. If you want to check logs, please exec `jest`.

## Explanations

### index.js
The entry point of the back-end, implemented in Koa.js.

### lib/RateLimiter
RateLimiter is a object of the rate limiter implementation. It uses `Map` object, which benefits from ES6 features, to store request counts from different ip sources. A `Map` may perform better in scenarios involving frequent addition and removal of key pairs. Thanks to the characteristics of hash map, we can access and manipulate the resources in a constant time complexity.

Also, it uses `getter` feature to check whether the lookup table should be refreshed. Every time we access the lookup table, it will check the timestamp of the last access. The granularity of a timestamp is at the minute level. If the timestamps are different, the lookup table will be cleared and then be returned.

#### Time Complexity
- lookup: O(1)
- increment: O(1)

#### Space Complexity
It only uses a hash map to act as a counter. The space complexity is constant O(1).

### middleware/rate-limiter
A rate limiter middleware utilizes `RateLimiter`. It increments counts for each unique ip, storing request counts and `shouldResponse` value to `ctx.state`.

### middleware/rate-logger
A middleware printing logs with the following format:
```
Request(<Counts>) from <IP> <ALLOWED_OR_NOT> (<GMT_TIMESTAMP>)
```

For example,
```
Request(1) from ::1 Allowed (Wed, 18 Jul 2018 07:18:54 GMT)
Request(2) from ::1 Allowed (Wed, 18 Jul 2018 07:18:54 GMT)
Request(3) from ::1 Allowed (Wed, 18 Jul 2018 07:18:54 GMT)
Request(1) from ::1 Allowed (Wed, 18 Jul 2018 07:19:03 GMT)
```
