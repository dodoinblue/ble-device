var bleno = require('bleno')
var HeartRateService = require('./HeartRateService')
var PrivateService = require('./PrivateService')

var heartRateService = new HeartRateService()
var privateService = new PrivateService()

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state)

  if (state === 'poweredOn') {
    bleno.startAdvertising('Fake-Tracker', ['180D'])
  } else {
    bleno.stopAdvertising()
  }
})

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'))

  if (!error) {
    bleno.setServices([
      heartRateService,
      privateService
    ], function(error) {
      console.log('setServices: ' + (error ? 'error ' + error : 'success'))
    })
  } else {
    console.log('advertisingStart error: ' + error)
  }
})
