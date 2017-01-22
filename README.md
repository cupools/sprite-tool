## sprite-tool

sprite utility that merges images and provides coordinates.



## Todo

-[ ] support jpeg


-[ ] test coverage

## Getting Started

```bash
$ npm i -D cupools/sprite-tool
```

```js
import sprite from 'sprite-tool'

const option = {
  padding: 10,
  algorithm: 'binary-tree'
}
const buffers = [
  fs.readFileSync('foo.png'),
  fs.readFileSync('bar.png')
]

const result = sprite(option, buffers, meta)
// => { buffer, width, height, coordinates }
```

## Parameters

### options

- padding: Padding between images. Default to 0.
- algorithm: Layout algorithm of sprite. Default to 'binary-tree'.

### buffers

An array of buffers that will be merge into one sprite image.

### meta

An optional array of metas that reference to buffers.

## Test

```bash
$ npm i && npm test
```
