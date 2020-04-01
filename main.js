const { Builder, By } = require("selenium-webdriver");
const url =
  "https://docs.google.com/forms/d/e/1FAIpQLScDi6PG10Zb5xfFSF6NyIuCY4TODYwVPDeqVWACan-2tiQ-xw/viewform";

(async () => {
  let driver = await new Builder().forBrowser("firefox").build();
  const next = {
    key: "jsname",
    val: "OCpkoe"
  };
  const valKeys = [
    {
      name: "emailAddress",
      val: "ghufronfr@student.telkomuniversity.ac.id"
    },
    {
      name: "entry.1864916576",
      val: "1202184126"
    },
    {
      name: "entry.1366909835",
      val: "Ghufron Fikrianto"
    },
    {
      name: "entry.2056294766",
      val: "08817741476"
    },
    {
      name: "entry.330348125",
      val: "085155010876"
    },
    {
      key: "data-value",
      val: "Non-Asrama"
    },
    { ...next },
    {
      key: "data-value",
      val: "Family House/Rumah Keluarga"
    },
    { ...next },
    {
      script: `
			document.querySelector("input[jsname='L9xHkb']").setAttribute('value', "Rumah Orang Tua/Parent's House");
			document.querySelector("div[jsname='wQNmvb']").setAttribute('data-value', "Rumah Orang Tua/Parent's House");
			`
    },
    {
      name: "entry.1737804232",
      val: "Kota Bandung"
    },
    { ...next },
    {
      key: "data-value",
      val: "Sehat/Healthy"
    },
    { ...next },
    {
      key: "jsname",
      val: "M2UYVd"
    }
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
