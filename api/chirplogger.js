const { supabase } = require("./supabase");

supabase
  .from("sensors")
  .update({ value: Math.random() * 100 })
  .eq("id", 2)
  .then(({ data, error }) => {
    console.log(data, error);
  });
