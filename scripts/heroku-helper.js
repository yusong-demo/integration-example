const _ = require('lodash')
const packageConfig = require('../package.json')

const getHerokuReviewApp = async ({ context }) => {
  const prefix = packageConfig.name
  const prNumber = _.get(context, 'payload.pull_request.number')
  const reviewApp = `https://${prefix}-pr-${prNumber}.herokuapp.com`
  return reviewApp
}

module.exports = {
  getHerokuReviewApp
}
