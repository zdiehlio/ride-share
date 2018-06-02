const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
const Driver = mongoose.model('driver')

describe('Drivers Controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {

      request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end(() => {
        Driver.count().then(newCount => {
          assert(count + 1 === newCount)
        })
        done()
      })

    })
  })

  it('PUT to /api/drivers/:id updates existing driver', done => {
    const driver = new Driver({ email: 't@t.com', driving: false })

    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true})
          .end(() => {
            Driver.findById({ _id: driver._id })
              .then(drive => {
                assert(drive.driving === true)
                done()
              })
          })
      })
  })

  it('DELETE request to /api/driver/:id removes existing driver', done => {
    const driver = new Driver({ email: 't@t.com' })

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 't@t.com' })
              .then(driver => {
                assert(!driver)
                done()
              })
          })
      })
  })

  it('GET request to /api/drivers finds drivers in a given locations', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628]}
    })
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791]}
    })

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, res) => {
            console.log(res)
            done()
          })
      })
  })
})