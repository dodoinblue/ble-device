var util = require('util')

var bleno = require('bleno')

var BlenoPrimaryService = bleno.PrimaryService

var HeartrateCharacteristic = require('./HeartRateCharacteristic')

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

HeartRateService.prototype.updateHrData = function(data) {
  heartrateCharacter.updateHrData(data)
}

module.exports = HeartRateService
