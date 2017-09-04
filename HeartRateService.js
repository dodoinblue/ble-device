var util = require('util')
var bleno = require('bleno')

var HeartrateCharacteristic = require('./HeartRateCharacteristic')

var BlenoPrimaryService = bleno.PrimaryService
var heartrateCharacter = new HeartrateCharacteristic()

function HeartRateService() {
  HeartRateService.super_.call(this, {
    uuid: '180D',
    characteristics: [
      heartrateCharacter
    ]
  })
}

util.inherits(HeartRateService, BlenoPrimaryService)

module.exports = HeartRateService
