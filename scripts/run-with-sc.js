const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { spawn } = require('child_process')
const _ = require('lodash')
const SauceLabs = require('saucelabs').default
const { TUNNEL_IDENTIFIER, config } = require('../codecept.conf')
const { SAUCE_USERNAME, SAUCE_ACCESS_KEY, IS_GLOBAL_WEBSITE } = process.env

const runWithSC = async () => {
  const isPrivateWebsite = !IS_GLOBAL_WEBSITE
  let sc
  if (isPrivateWebsite) {
    const sauce = new SauceLabs({
      user: SAUCE_USERNAME,
      key: SAUCE_ACCESS_KEY
    })
    sc = await sauce.startSauceConnect({
      logger: (stdout) => console.log(`[with-sc] ${stdout}`),
      tunnelIdentifier: TUNNEL_IDENTIFIER
    })
    
    if (process.argv.length < 3) {
      console.log('Need some npm script for execute')
      process.exit(1)
    }
  }
  
  const run = spawn(
    `npm run ${process.argv.slice(2).join(' ')}`,
    { shell: true, stdio: 'inherit' }
  )
  await new Promise(resolve => run.on('exit', resolve))

  if (isPrivateWebsite) {
    await sc.close()
  }

  const rootOutputFolder = config.output
  const sauceOuputFolders = _.flow(
    () => readdirSync(rootOutputFolder, { withFileTypes: true }),
    dirents => _.filter(dirents, dirent => dirent.isDirectory()),
    dirs => _.map(dirs, dir => dir.name)
  )()
  for (const folder of sauceOuputFolders) {
    const currentFolder = `${rootOutputFolder}/${folder}`
    _.flow(
      () => readdirSync(currentFolder, { withFileTypes: true }),
      dirents => _.filter(dirents, dirent => dirent.isFile() && dirent.name.endsWith('xml')),
      files => _.forEach(files, ({ name: fileName }) => {
        const currentFile = `${currentFolder}/${fileName}`
        const content = readFileSync(currentFile, 'utf-8')
        const browserName = _.get(
          content.match(/<label name='browserName' value='(.*)'\/>/),
          '1'
        )
        const [matchTestSuiteContent, suitName] = content.match(
          /<ns2:test-suite.*[\s\n\r]*?<name>(.*)<\/name>[\s\n\r]*?<title>(.*)<\/title>/
        )
        const suiteWithBrowserName = _.replace(
          matchTestSuiteContent,
          new RegExp(suitName, 'g'),
          `[${browserName}] ${suitName}`
        )
        const contentWithBrowserName = _.replace(
          content,
          matchTestSuiteContent,
          suiteWithBrowserName
        )
        writeFileSync(currentFile, contentWithBrowserName, 'utf8')
      })
    )()
  }
}

runWithSC()
