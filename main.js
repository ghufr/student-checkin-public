const { Builder, By, Key } = require("selenium-webdriver");
const baseUrl = "https://checkin.telkomuniversity.ac.id";
const data = require("./data");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const helpers = {
  contain: (val, elem) => `//${elem || "*"}[contains(text(), '${val}')]`,
};

const shortcodes = {
  next: {
    query: By.xpath(helpers.contain("Selanjutnya")),
    action: {
      type: "click",
    },
  },
};

const parseTime = (time) => {
  const [start, signal] = time.split(" ");
  const [hour, minute] = start.split(".");

  return {
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
    signal,
  };
};

const selectTime = (time) => {
  return [
    {
      query: By.className(`time-picker-${time.signal}`),
      action: {
        type: "click",
      },
    },
    {
      query: By.id(`timepicker-item-id-${time.hour}`),
      action: {
        type: "click",
      },
    },
    {
      query: By.className("time-picker-minute"),
      action: {
        type: "click",
      },
    },
    {
      query: By.id(`timepicker-item-id-${time.minute}`),
      action: {
        type: "click",
      },
    },
    {
      query: By.className("atp-ref-dialog-close"),
      action: {
        type: "click",
      },
    },
  ];
};

const selectDropdown = (name, val) => {
  const queries = [
    {
      query: By.name(name),
      action: {
        type: "click",
      },
    },
    {
      query: By.xpath("//input[@autocomplete='off']"),
      action: {
        type: "input",
        val: val,
      },
    },
    {
      query: By.xpath("//input[@autocomplete='off']"),
      action: {
        type: "input",
        val: Key.RETURN,
      },
    },
  ];
  return queries;
};

const createLectures = (lectures) => {
  const queries = [];
  for (let i = 0; i < lectures.length; i++) {
    const lecture = lectures[i];
    const start = parseTime(lecture.start);
    const end = parseTime(lecture.end);

    queries.push(
      {
        query: By.xpath(helpers.contain(lecture.type, "label")),
        action: {
          type: "click",
        },
      },
      {
        query: By.name("mataKuliah"),
        action: {
          type: "input",
          val: lecture.note,
        },
      },
      {
        query: By.id("date"),
        action: {
          type: "click",
        },
      },
      ...selectTime(start),
      {
        action: {
          type: "timeout",
          val: 500,
        },
      },
      {
        query: By.id("date2"),
        action: {
          type: "click",
        },
      },
      ...selectTime(end),
      {
        action: {
          type: "timeout",
          val: 500,
        },
      },
      {
        query: By.xpath(helpers.contain("Simpan")),
        action: {
          type: "click",
        },
      },
      // {
      //   action: {
      //     type: "timeout",
      //     val: 5000,
      //   },
      // },
      {
        query: By.className("close-button"),
        action: {
          type: "click",
        },
      }
    );
  }
  return queries;
};

(async () => {
  let driver = await new Builder().forBrowser("firefox").build();

  const commands = [
    {
      query: By.name("username"),
      action: {
        type: "input",
        val: data.username,
      },
    },
    {
      query: By.name("password"),
      action: {
        type: "input",
        val: data.password,
      },
    },
    {
      query: By.xpath(helpers.contain("Login")),
      action: {
        type: "click",
      },
    },
    {
      action: {
        type: "timeout",
        val: 3000,
      },
    },
    {
      action: {
        type: "go",
        val: `${baseUrl}/presence`,
      },
    },
    {
      query: By.id(data.lectures.length > 0 ? "isWeekday1" : "isWeekday2"),
      action: {
        type: "click",
      },
    },
  ];

  if (data.lectures.length > 0) {
    commands.push(
      {
        action: {
          type: "timeout",
          val: 500,
        },
      },
      {
        query: By.xpath(helpers.contain("Tambah Data", "button")),
        action: {
          type: "click",
        },
      },
      ...createLectures(data.lectures),
      {
        query: By.xpath(helpers.contain("Keluar", "button")),
        action: {
          type: "click",
        },
      },
      {
        action: {
          type: "timeout",
          val: 500,
        },
      },
      shortcodes.next
    );
  } else {
    commands.push(shortcodes.next);
  }

  commands.push(
    ...selectDropdown("tempatTinggal", data.tempatTinggal),
    ...selectDropdown("houseType", data.houseType),
    ...selectDropdown("famhouseDestination", data.famhouseDestination),
    {
      query: By.name("famhouseCity"),
      action: {
        type: "input",
        val: data.famhouseCity,
      },
    },
    {
      query: By.xpath("(//button[@nextstep=''])[2]"),
      action: {
        type: "click",
      },
    },
    {
      query: By.xpath(`//input[@name='isHealthy' and @value='${data.health}']`),
      action: {
        type: "click",
      },
    },
    {
      query: By.xpath(helpers.contain("Kirim")),
      action: {
        type: "click",
      },
    }
  );
  const executor = {
    input: (element, { val }) => {
      return element.sendKeys(val);
    },
    click: (element) => {
      return element.click();
    },
    go: ({ val }) => {
      return driver.get(val);
    },
    timeout: ({ val }) => {
      return timeout(val);
    },
  };
  try {
    await driver.get(`${baseUrl}/auth/login`);
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command.query) {
        let element = await driver.findElement(command.query);
        await executor[command.action.type](element, command.action);
      } else {
        await executor[command.action.type](command.action);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
