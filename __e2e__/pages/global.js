Feature('test func')

Scenario('test element exist 功能 ? && func', ({ I }) => {
  const MAGIC_NUM = 123456
  I.amOnPage('https://google.com')
  I.wait(1)
  I.log(MAGIC_NUM)
  I.seeElement('[name="q"]')
})
