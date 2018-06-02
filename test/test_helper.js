const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/muber_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Error', err)
    })
})

beforeEach(done => {
  const { drivers } = mongoose.connection.collections
  drivers.drop()
  //ensures before tests are run that index for geometry for location finding exists
    // .then(() => drivers.ensureIndex({ 'geometry.near': '2dsphere' }))
    .then(() => done())
    .catch(() => done())
})