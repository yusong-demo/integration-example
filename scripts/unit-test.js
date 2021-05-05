const { getJsonReport } = require('./helper')
const _ = require('lodash')
const packageConfig = require('../package.json')

const getLogPath = () => {
  const unitTestReportName = _.get(packageConfig, 'jest-junit.outputName')
  const reportDir = _.get(packageConfig, 'jest-junit.outputDirectory', '')
  return `${reportDir}/${unitTestReportName}`
}

const getLogJSONContent = async (filePath) => {
  const json = await getJsonReport(filePath)
  return _.get(json, 'testsuites.$')
}

module.exports = {
  getLogPath,
  getLogJSONContent
}
