const { supabase } = require("./supabase");

const { spawn } = require("node:child_process");

const application = "application/13a7d9f2-8db1-4533-ad44-06f7810f3ead";
const mqtt = spawn("mosquitto_sub", ["-t", `${application}/#`, "-v"]);
const target = `${application}/device/1234567898765432/event/up`;
const sanitize = (lazy) =>
  lazy.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');

console.log("... listening to events");

mqtt.stdout.on("data", (data) => {
  const stream = data.toString();
  if (stream.includes(target)) {
    data = stream.replace(target, "");
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
        console.log("... data inserted:", { id, ...measurements });
      });
  }
});
