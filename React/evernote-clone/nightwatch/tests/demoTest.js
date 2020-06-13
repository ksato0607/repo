module.exports = {
    'Test Evernote Clone' : function (browser) {
      browser
        .url('http://localhost:3000/')
        .useXpath()
        .assert.titleContains('React App')
        .waitForElementVisible('//span[@class="MuiButton-label"]')
        .assert.visible('//button[contains(.,"New Note")]')
        .pause(3000)
        .click('//button[contains(.,"New Note")]')
        .assert.visible('//button[contains(.,"Cancel")]')
        .pause(3000)
        .click('//button[contains(.,"Cancel")]')
        .pause(3000)
        .end();
    }
  };
  