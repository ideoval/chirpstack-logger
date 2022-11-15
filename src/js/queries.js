import { supabase } from "./supabase";

export const getDevices = async () => {
  return await supabase.from("devices").select("*");
};
