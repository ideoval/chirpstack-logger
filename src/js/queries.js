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
