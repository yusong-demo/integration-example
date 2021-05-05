const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const unitTest = require('./unit-test')
const funcTest = require('./functional-test')

const STATUS = {
  PASSED: '✅',
  FAILED: '❌'
}

const MESSAGE = {
  NOT_EXECUTE: 'Script might not execute, log not found.',
  LINT_FAILED: 'Lint check get some error.'
}

const readFileIfExist =  (filePath) => {
  const isFileExist = fs.existsSync(filePath)
  if (!isFileExist) {
    const folderPath = path.parse(filePath).dir
    const isFolderExist = fs.existsSync(folderPath)
    const listFolder = isFolderExist ? fs.readdirSync(folderPath) : []
    console.log({ filePath, isFolderExist, listFolder })
    return [false, `${STATUS.FAILED} ${MESSAGE.NOT_EXECUTE}`]
  }

  const fileContent = fs.readFileSync(filePath)
  return [true, fileContent]
}

const getLintStatus = () => {
  const [isExist, log] = readFileIfExist('./lint.log')
  if (!isExist) {
    return log
  }

  if (_.includes(log, 'error')) {
    return `${STATUS.FAILED} ${MESSAGE.LINT_FAILED}`
  }

  return STATUS.PASSED
}

const getUnitStatus = async () => {
  const logPath = await unitTest.getLogPath()
  const [isExist, log] = readFileIfExist(logPath)
  if (!isExist) {
    return log
  }
  
  const {
    tests,
    failures,
    errors
  } = await unitTest.getLogJSONContent(logPath)
  const totalTests = +tests
  const passedTests = totalTests - (failures + errors)
  const status = (totalTests === passedTests) ? STATUS.PASSED : STATUS.FAILED

  return `${status} ${passedTests} passed, ${failures} failed, ${errors} error, ${totalTests} total tests.`
}

const getFuncStatus = async () => {
  const logsPath = await funcTest.getLogsPath()
  const [isExist, log] = readFileIfExist(logsPath[0])
  if (!isExist) {
    return log
  }
  
  const jsonLog = await funcTest.getLogsJSONContent(logsPath)
  const totalTests = _.size(jsonLog)
  const passedTests = _.size(
    _.filter(jsonLog, test => test.status === 'passed')
  )
  const failedTests = totalTests - passedTests
  const status = (totalTests === passedTests) ? STATUS.PASSED : STATUS.FAILED
  console.log(totalTests, passedTests)

  return `${status} ${passedTests} passed, ${failedTests} failed, ${totalTests} total tests.`
}

const getComment = async ({ context = {} }) => {
  const repo = _.get(context, 'payload.repository.html_url')
  const runId = _.get(context, 'runId')
  const buildUrl = `${repo}/actions/runs/${runId}`
  const functionalTestReport = process.env.GH_PAGE_URL
  const allStatus = [
    getLintStatus(),
    await getUnitStatus(),
    await getFuncStatus()
  ]
  const isBuildPassed = !_.some(allStatus, status => _.includes(status, STATUS.FAILED))
  const buildStatus = isBuildPassed ? STATUS.PASSED : STATUS.FAILED
  const [lintStatus, unitStatus, funcStatus] = allStatus
  return `
## Build Result ${buildStatus}
  - Lint test: ${lintStatus}
  - Unit test: ${unitStatus}
  - Functional test: ${funcStatus}
  - Functional report: ${functionalTestReport}
  - Full build result: ${buildUrl}

  `
}

// getComment({}).then(console.log)

module.exports = getComment
