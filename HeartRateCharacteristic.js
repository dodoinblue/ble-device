var util = require('util')

var bleno = require('bleno')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var HeartRateCharacteristic = function() {
  HeartRateCharacteristic.super_.call(this, {
    uuid: '2A37',
    properties: ['read', 'notify'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Heartrate readings'
      })
    ]
  })

  // set default value
  this.dataSource = [64, 62, 63, 62, 65, 66, 67, 69, 67]
  this.loop = true
  this.samplerate = 1000

  // Started timer
  this.updateValueService = null
  this.dataPointer = 0
}

HeartRateCharacteristic.prototype.updateValue = function(updateValueCallback) {
  this.dataPointer = 0
  this.updateValueService = setInterval(() => {
    if (this.dataPointer >= this.dataSource.length && this.loop) {
      this.dataPointer = 0
    }
    var value = this.dataSource[this.dataPointer] ? this.dataSource[this.dataPointer] : 0
    var hr = new Uint8Array([0, value])
    updateValueCallback(Buffer.from(hr.buffer))
    this.dataPointer++
  }, this.samplerate)
}

HeartRateCharacteristic.prototype.stopUpate = function() {
  if (!this.updateValueService) {
    console.log('updateValueService was null before stop')
  }
  clearInterval(this.updateValueService)
}

util.inherits(HeartRateCharacteristic, Characteristic)

HeartRateCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (this.dataPointer >= this.dataSource.length && this.loop) {
    this.dataPointer = 0
  }
  var value = this.dataSource[this.dataPointer] ? this.dataSource[this.dataPointer] : 0
  var hr = new Uint8Array([0, value])
  callback(this.RESULT_SUCCESS, Buffer.from(hr.buffer))
}

HeartRateCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('HeartRateCharacteristic - onSubscribe')
  this.updateValue(updateValueCallback)
}

HeartRateCharacteristic.prototype.onUnsubscribe = function() {
  console.log('HeartRateCharacteristic - onUnsubscribe')
  this.stopUpate()
}

module.exports = HeartRateCharacteristic
