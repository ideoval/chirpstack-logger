const { supabase } = require("./supabase");

const period = 5;

supabase
  .from("sensors")
  .select("id")
  .then(({ data }) => {
    const ids = data.map((d) => d.id);
    setInterval(() => {
      ids.forEach((id) => {
        const value = Math.random() * 100;
        supabase
          .from("sensors")
          .update({ value })
          .eq("id", id)
          .then(({ data, error }) => {
            console.log("id:", id, "data:", value.toFixed(2));
          });
      });
    }, period * 1000);
  });
