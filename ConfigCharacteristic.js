var util = require('util')
var bleno = require('bleno')
var Config = require('./Config')

var Characteristic = bleno.Characteristic

var ConfigCharacteristic = function() {
  ConfigCharacteristic.super_.call(this, {
    uuid: 'de4f80ae-a006-4e2c-89aa-30dadc10478e',
    properties: ['write', 'read']
  })

  this.profile = new Config.Profile()
}

util.inherits(ConfigCharacteristic, Characteristic)

ConfigCharacteristic.prototype.onReadRequest = function(offset, callback) {
  let result = this.profile.toPayload()
  console.log(`onReadRequest: ${result}`)
  callback(this.RESULT_SUCCESS, Buffer.from(result))
}

ConfigCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log(typeof data)
  console.log(data)
  let uint8Array = new Uint8Array(data)
  let result = this.profile.fromPayload(uint8Array.buffer)
  console.log(`onWriteRequest: ${result}`)
  callback(this.RESULT_SUCCESS, Buffer.from([result]))
}

module.exports = ConfigCharacteristic
