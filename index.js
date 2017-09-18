var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until,
promise = webdriver.promise;

var driver;
var useFirefox = true;

if (useFirefox) {
    var firefox = require('selenium-webdriver/firefox');
    let options = ConfigureFirefoxToNeverAskOnSavingJPG(firefox);
    var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
}
else {
    var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
}

driver.get('http://www.clickgratis.com.br/fotos-imagens/search/?q=kungfu+panda');

var element = driver.findElement(By.xpath("//div[@class='overflow-thumb']/img[@class='radius']"));
element.getAttribute("src").then(function (src) {
    console.log("Downloading Image " + src + "...");
    driver.get(src).then(function() {
        console.log("Downloaded.");

        console.log("Closing the Browser...");
        driver.sleep(5000);
        
        driver.quit();
    });
});


function ConfigureFirefoxToNeverAskOnSavingJPG(firefox) {

  //https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/firefox/index.html
  //https://stackoverflow.com/a/9329022/3424212
  let profile = new firefox.Profile();
  profile.setPreference('browser.download.manager.showWhenStarting', false);
  profile.setPreference('browser.helperApps.neverAsk.saveToDisk', 'image/jpeg, image/jpg, text/csv');

  let options = new firefox.Options().setProfile(profile);

  return options;
}