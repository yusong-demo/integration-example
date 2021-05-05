const event = require('codeceptjs/lib/event')
const SauceLabs = require('saucelabs').default
const CommonHelper = require('./CommonHelper')

const { SAUCE_USERNAME, SAUCE_ACCESS_KEY } = process.env
const sauce = new SauceLabs({
  user: SAUCE_USERNAME,
  key: SAUCE_ACCESS_KEY
})

class SauceLabsHelper extends CommonHelper {
  _init () {
    if (!this.getEnv().isSauce) {
      return
    }

    event.dispatcher.on(event.test.passed, test => {
      this._setSauceJob(test, true)
    })
  }

  _failed (test) {
    this._setSauceJob(test, false)
  }

  _before () {
    const allure = this._getAllure()
    const { browserName } = this._getBrowser().capabilities
    allure.addLabel('browserName', browserName)
  }

  _setSauceJob (test, isSuccess) {
    const sessionId = this._getSessionId()
    this._updateSauceJob(sessionId, { passed: isSuccess, name: test.title })
  }

  _updateSauceJob (sessionId, data) {
    const allure = this._getAllure()
    const sauceUrl = `https://saucelabs.com/jobs/${sessionId}`
    const {
      platform = 'unknown',
      browserName = 'unknown'
    } = this._getBrowser().capabilities
    const newData = {
      ...data,
      name: `(${platform}:${browserName}) ${data.name}`,
      public: 'public'
    }
    allure.addAttachment('🎦 SAUCE LINK', sauceUrl, 'text/uri-list')
    sauce.updateJob(SAUCE_USERNAME, sessionId, newData)
  }
}

module.exports = SauceLabsHelper
