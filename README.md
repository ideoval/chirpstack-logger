# Chirpstack logger

This application was build to store data streamed from chirpstack to Supabase. The dashboard was built with supabase

## Triggers

When the value of a sensor is updated, a new record is created.
The following code was used to create the trigger

```sql
begin
  insert into public.sensor_records (sensor_id, value)
  values (new.id, new.value);
  return new;
end;
```
