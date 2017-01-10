## sprite-tool

sprite utility that merges images and provides coordinates.

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

const result = sprite(option, buffers)
// => { buffer, width, height, coordinate }
```

## Test

```bash
$ npm i && npm test
```
