var util = require('util')
var bleno = require('bleno')
var ConfigCharacteristic = require('./ConfigCharacteristic')

var BlenoPrimaryService = bleno.PrimaryService
var configCharacteristic = new ConfigCharacteristic()

function PrivateService() {
  PrivateService.super_.call(this, {
    uuid: '6d54c75c-cdb1-4a82-83e6-d62d04adeaf2',
    characteristics: [
      configCharacteristic
    ]
  })
}

util.inherits(PrivateService, BlenoPrimaryService)

module.exports = PrivateService
