/* eslint-env mocha */
import fs from 'fs'
import path from 'path'
import Chai from 'chai'

import sprite from '../index'

Chai.should()

describe('index', () => {
  it('should work', () => {
    const buffers = new Array(7).fill('').map((_, i) => `test/fixtures/${i}.png`)
    const options = {
      padding: 10,
      algorithm: 'binary-tree'
    }

    const result = sprite(options, buffers)

    result.should.have.property('width', 932)
    result.should.have.property('height', 522)
  })
})
