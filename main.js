const { Builder, By } = require("selenium-webdriver");
const url =
  "https://docs.google.com/forms/d/e/1FAIpQLScDi6PG10Zb5xfFSF6NyIuCY4TODYwVPDeqVWACan-2tiQ-xw/viewform";
const data = require("./data");
// const sso =
//   "https://sso.telkomuniversity.ac.id/simplesaml/module.php/core/loginuserpass.php?AuthState=_85950369a110caf0adcf33e156b376ff8e9767fe12%3Ahttp%3A%2F%2Fsso.telkomuniversity.ac.id%2Fsimplesaml%2Fmodule.php%2Fcore%2Fas_login.php%3FAuthId%3Doracle%26ReturnTo%3Dhttp%253A%252F%252Fsso.telkomuniversity.ac.id%252Fsimplesaml%252Fmodule.php%252Fcore%252Fauthenticate.php%253Fas%253Doracle";

(async () => {
  let driver = await new Builder().forBrowser("firefox").build();
  const next = {
    key: "jsname",
    val: "OCpkoe",
  };
  const valKeys = [
    {
      name: "emailAddress",
      val: data.email,
    },
    {
      name: "entry.1864916576",
      val: data.nim,
    },
    {
      name: "entry.1366909835",
      val: data.name,
    },
    {
      name: "entry.2056294766",
      val: data.phone,
    },
    {
      name: "entry.330348125",
      val: data.altPhone,
    },
    {
      key: "data-value",
      val: data.status,
    },
    { ...next },
    {
      key: "data-value",
      val: data.location,
    },
    { ...next },
    {
      script: `
			document.querySelector("input[jsname='L9xHkb']").setAttribute('value', ${data.liveIn});
			document.querySelector("div[jsname='wQNmvb']").setAttribute('data-value', ${data.liveIn});
			`,
    },
    {
      name: "entry.1737804232",
      val: data.city,
    },
    { ...next },
    {
      key: "data-value",
      val: data.healthCondition,
    },
    { ...next },
    // Using submit button may cause recaptcha to prompt
    // {
    //   key: "jsname",
    //   val: "M2UYVd"
    // }
  ];

  try {
    await driver.get(url);

    for (let i = 0; i < valKeys.length; i++) {
      const element = valKeys[i];
      if (element.script) {
        await driver.executeScript(element.script);
        continue;
      }
      if (element.key) {
        const elem = await driver.findElement(
          By.xpath(`//div[@${element.key}="${element.val}"]`)
        );
        await elem.click();
      } else {
        await driver.findElement(By.name(element.name)).sendKeys(element.val);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
