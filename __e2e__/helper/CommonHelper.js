const Helper = require('@codeceptjs/helper')
const codeceptjs = require('codeceptjs')
const _ = require('lodash')

class CommonHelper extends Helper {
  _getAllure () {
    return codeceptjs.container.plugins('allure')
  }

  _getHelper () {
    return this.helpers.WebDriver
  }

  _getBrowser () {
    return this._getHelper().browser
  }

  _getSessionId () {
    return this._getBrowser().sessionId
  }

  getEnv () {
    const { RUNNER } = process.env
    const env = {
      isSelenoid: RUNNER === 'SELENOID',
      isSauce: RUNNER === 'SAUCE'
    }
    return env
  }

  amOnMySite () {
    const { FLY_IO_URL } = process.env
    const { isSelenoid } = this.getEnv()
    const helper = this._getHelper()
    let url = FLY_IO_URL || 'http://localhost:3000'
    if (isSelenoid) {
      url = 'http://test.local.com:3000'
    }
    console.log('url', url)
    helper.amOnPage(url)
  }

  log (message, prefix = 'log') {
    const allure = this._getAllure()
    const convertedMessage = _.isString(message) || _.isBoolean(message)
      ? message
      : JSON.stringify(message)
    allure.createStep (`[${prefix}] ${convertedMessage}`, () => {})
  }
}

module.exports = CommonHelper
