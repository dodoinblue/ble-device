function Profile(profile) {
  if (profile) {
    this.profile = profile
  } else {
    this.profile = {
      age: 18,
      gender: 0,
      height: 180,
      weight: 65
    }
  }
}

Profile.prototype.toPayload = function() {
  let arrayBuffer = new ArrayBuffer(6)
  let dv = new DataView(arrayBuffer)
  dv.setUint8(0, this.profile.age)
  dv.setUint8(1, this.profile.gender)
  dv.setUint16(2, this.profile.height, true)
  dv.setUint16(4, this.profile.weight, true)
  let payload = new Uint8Array(arrayBuffer)
  return payload
}

Profile.prototype.fromPayload = function(payload) {
  let dv = new DataView(payload)
  let type = dv.getUint8(0)
  let result = 0 // success
  switch (type) {
    case 0: // age
      let age = dv.getUint8(1)
      if (age > 10 && age < 150) {
        this.profile.age = age
      } else {
        result = 2 // parameter out of range
      }
      break
    case 1: // gender
      let gender = dv.getUint8(1)
      if (gender === 1 || gender === 0) {
        this.profile.gender = gender
      } else {
        result = 2
      }
      break
    case 2: // height
      let height = dv.getUint16(1, true)
      if (height > 20 && height < 800) {
        this.profile.height = dv.getUint16(1, true)
      } else {
        result = 2
      }
      break
    case 3: // wight
      let weight = dv.getUint16(1, true)
      if (weight > 20 && weight < 800) {
        this.profile.wight = dv.getUint16(1, true)
      } else {
        result = 2
      }
      break
    default:
      console.log(`Type ${type} not recognzied`)
      result = 4 // invalid parameter
  }
  return result
}

module.exports = {
  Profile
}
