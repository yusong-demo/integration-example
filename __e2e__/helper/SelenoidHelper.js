const event = require('codeceptjs/lib/event')
const _ = require('lodash')
const CommonHelper = require('./CommonHelper')

class SelenoidHelper extends CommonHelper {
  _init () {
    if (!this.getEnv().isSelenoid) {
      return
    }

    event.dispatcher.on(event.test.passed, () => { 
      const videoName = _.get(
        this._getHelper(),
        'options.capabilities["selenoid:options"].videoName'
      )
      const file = `file://${global.output_dir}/video/${videoName}`
      const allure = this._getAllure()
      allure.addAttachment('🎦 VIDEO', file, 'text/uri-list')
    })
  }
}

module.exports = SelenoidHelper
