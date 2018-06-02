const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('Express App', () => {

  it('handles GET request to /api', done => {
    request(app)
      .get('/api')
      .end((err, res) => {
        assert(res.body.hi === 'there')
        done()
      })
  })

})