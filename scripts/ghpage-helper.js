const _ = require('lodash')
const packageConfig = require('../package.json')

const getGHPageInfo = async ({ context }) => {
  const prefix = packageConfig.name
  const prNumber = _.get(context, 'payload.pull_request.number')
  const prRunId = _.get(context, 'runId')
  const destination_dir = `pr${prNumber}-${prRunId}`
  const ghPage = `https://sky172839465.github.io/${prefix}/${destination_dir}`
  return { ghPage, destination_dir }
}

module.exports = {
  getGHPageInfo
}
