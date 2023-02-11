import { supabase } from "./supabase";

export const getDevices = async () => {
  return await supabase.from("devices").select("*");
};

export const getSensors = async () => {
  return await supabase.from("sensors").select("*");
};

export const getRecords = async (device) => {
  console.log("device:", device);
  return await supabase
    .from("records")
    .select("*")
    .eq("device_id", device)
    .limit(100);
};

export const recordsChannel = (callback) => {
  return supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "records" },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
};

export const unsubscribe = (subscription) => {
  supabase.removeChannel(subscription);
};
