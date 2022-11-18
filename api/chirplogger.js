const { supabase } = require("./supabase");

const period = 10*1000

supabase
  .from("sensors")
  .select("id")
  .then(({ data }) => {
    const ids = data.map((d) => d.id);
    setInterval(() => {
      ids.forEach((id) => {
        supabase
          .from("sensors")
          .update({ value: Math.random() * 100 })
          .eq("id", id)
          .then(({ data, error }) => {
            console.log(data, error);
          });
      });
    }, period);
  });
