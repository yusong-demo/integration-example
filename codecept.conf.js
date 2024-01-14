const { setHeadlessWhen } = require('@codeceptjs/configure')
const packageConfig = require('./package.json')

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS)

const {
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  RUNNER,
  IS_GLOBAL_WEBSITE
} = process.env

const RUN_WITH_SAUCE = RUNNER === 'SAUCE'
const RUN_WITH_SELENOID = RUNNER === 'SELENOID'
const DEFAULT_TIMEOUT = 30000
const TUNNEL_IDENTIFIER = 'my-tunnel'

const getSauceConfig = (browserName) => ({
  ...(
    !IS_GLOBAL_WEBSITE &&
    { 'tunnel-identifier': TUNNEL_IDENTIFIER }
  ),
  name: `${packageConfig.name}-${browserName}`,
  build: `local-${Date.now()}`
})

const getCodeceptHelper = helper => `./__e2e__/helper/${helper}.js`

const config = {
  tests: './__e2e__/**/*.js',
  output: `${process.cwd()}/output`,
  include: {
    I: './__e2e__/config/steps_file.js'
  },
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome',
      platformName: 'Windows 10',
      windowSize: 'maximize',
      waitForTimeout: DEFAULT_TIMEOUT,
      desiredCapabilities: {
        ...(
          RUN_WITH_SELENOID &&
          {
            selenoidOptions: {
              enableVNC: true
            }
          }
        )
      },
      uniqueScreenshotNames: true
    },
    CommonHelper: {
      require: getCodeceptHelper('CommonHelper')
    },
    SelenoidHelper: {
      require: getCodeceptHelper('SelenoidHelper')
    },
    SauceLabsHelper: {
      require: getCodeceptHelper('SauceLabsHelper')
    }
  },
  multiple: {
    sacue: {
      chunks: 3,
      browsers: [
        {
          browser: 'chrome',
          desiredCapabilities: {
            platform: 'Windows 10',
            ...getSauceConfig('Windows Chrome')
          }
        },
        {
          browser: 'chrome',
          desiredCapabilities: {
            platform: 'macOS 13',
            ...getSauceConfig('macOS 13 Chrome')
          }
        }
      ]
    }
  },
  bootstrap: null,
  name: `${packageConfig.name} functional test`,
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy'
    },
    ...(
      RUN_WITH_SELENOID &&
      {
        selenoid: {
          name: 'selenoid',
          enabled: true,
          deletePassed: false,
          autoCreate: false,
          autoStart: true,
          sessionTimeout: `${DEFAULT_TIMEOUT / 1000}m`,
          enableVideo: true,
          enableLog: true
        }
      }
    ),
    ...(
      RUN_WITH_SAUCE &&
      {
        wdio: {
          enabled: true,
          services: ['sauce'],
          user: SAUCE_USERNAME,
          key: SAUCE_ACCESS_KEY
        }
      }
    )
  },
  smartWait: true
}

module.exports = {
  TUNNEL_IDENTIFIER,
  config
}
