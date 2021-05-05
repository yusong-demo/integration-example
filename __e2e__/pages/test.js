Feature('test local')

Scenario('test localhost content', async ({ I }) => {
  I.amOnMySite()
  I.wait(1)
  I.see('Learn React', 'a.App-link')
})
