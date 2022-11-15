const { supabase } = require("./supabase");

supabase
  .from("devices")
  .select("*")
  .then(({ data }) => console.log(data));
