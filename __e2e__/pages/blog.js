Feature('test yusong blog')

Scenario('yusong blog', ({ I }) => {
  I.amOnPage('https://yusong.io/')
  I.wait(1)
  I.see('Hi I\'m Yusong', 'h3')
})
