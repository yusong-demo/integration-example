const fs = require('fs')
const { getJsonReport } = require('./helper')
const _ = require('lodash')

const getLogsPath = async (path = './output') => {
  const isExist = fs.existsSync(path)
  if (!isExist) {
    return []
  }

  const entries = fs.readdirSync(path, { withFileTypes: true })

  const files = entries
    .filter(file => !file.isDirectory() && file.name.endsWith('xml'))
    .map(file => `${path}${file.name}`)

  const folders = entries.filter(folder => folder.isDirectory())
  for (const folder of folders) {
    files.push(...await getLogsPath(`${path}/${folder.name}/`))
  }

  return files
}

const getLogsJSONContent = async (files) => {
  let flatTestCases = []
  for (const file of files) {
    if (!file.endsWith('xml')) {
      continue
    }

    const json = await getJsonReport(file)
    const suitTestCases = _.get(json, 'ns2:test-suite.test-cases')
    flatTestCases.push(..._.map(suitTestCases, suitTestCase => {
      return _.map(_.get(suitTestCase, 'test-case'), test => _.get(test, '$'))
    }))
  }
  flatTestCases = _.concat(...flatTestCases)
  return flatTestCases
}

module.exports = {
  getLogsPath,
  getLogsJSONContent
}
