import { supabase } from "./supabase";

export const getDevices = async () => {
  return await supabase.from("devices").select("*");
};

export const getSensors = async () => {
  return await supabase.from("sensors").select("*");
};

export const getRecords = async (sensor) => {
  return await supabase
    .from("sensor_records")
    .select("*")
    .eq("sensor_id", sensor);
};

export const recordsChannel = (callback) => {
  return supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "sensor_records" },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
};

export const unsubscribe = (subscription) => {
  supabase.removeChannel(subscription);
};
