const { supabase } = require("./supabase");
const { spawn } = require("node:child_process");

const application = "application/13a7d9f2-8db1-4533-ad44-06f7810f3ead";
const mqtt = spawn("mosquitto_sub", ["-t", `${application}/#`, "-v"]);
const target = `${application}/device/1234567898765432/event/up`;
const sanitize = (lazy) =>
  lazy.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');

console.log("... listening to events");

mqtt.stdout.on("data", (data) => {
  const timeStamp = new Date().toLocaleString();
  const stream = data.toString();
  if (stream.includes(target)) {
    data = stream.replace(target, "");

    try {
      let payload = JSON.parse(data);
      let buff = Buffer.from(payload.data, "base64");
      let measurement = buff.toString("ascii");
      measurement = sanitize(measurement);
      measurement = JSON.parse(measurement);
      const measurements = {
        ...measurement,
        rssi: payload.rxInfo[0].rssi,
      };
      const id = measurements.id;
      delete measurements.id;
      supabase
        .from("latest")
        .update(measurements)
        .eq("device_id", id)
        .then(({ data, error }) => {
          if (error) console.error(error);
          console.log(timeStamp, "... data inserted, id:", id);
        });
    } catch (error) {
      console.error(timeStamp, error);
      console.log(timeStamp, JSON.parse(data));
    }
  }
});

const hourly = (now) => {
  return now.getMinutes() === 0 && now.getSeconds() === 0;
};

const daily = (now) => {
  return now.getHours() === 0;
};

const monthly = (now) => {
  return now.getDate() === 1 && now.getHours() === 0;
};

const getLatestRecords = async () => {
  const { data } = await supabase.from("latest").select("*");
  return data;
};

setInterval(() => {
  const now = new Date();

  if (hourly(now)) {
    const timeStamp = new Date().toLocaleString();
    getLatestRecords().then((res) => {
      res.forEach((latest) => {
        delete latest.updated_at;

        supabase
          .from("hourly")
          .insert(latest)
          .then((res) => console.log(timeStamp, "... hourly", res.statusText));

        if (daily(now)) {
          supabase
            .from("daily")
            .insert(latest)
            .then((res) => console.log(timeStamp, "... daily", res.statusText));
        }

        if (monthly(now)) {
          supabase
            .from("monthly")
            .insert(latest)
            .then((res) =>
              console.log(timeStamp, "... monthly", res.statusText)
            );
        }
      });
    });
  }
}, 1000);
