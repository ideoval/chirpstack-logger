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

## Integration

The mqqt already enabled aproach was used to listen to LoRaWan events.
More information can be found here: https://www.chirpstack.io/docs/chirpstack/integrations/mqtt.html

The mostquito `mosquito_sub` command was used to listen to events

```bash
mosquitto_sub -t "application/APPLICATION_ID/device/+/event/up" -v  # display only the uplink payloads for the given APPLICATION_ID
```

The code including the node.js routine to read the logs is on `api/adapter.js`

loraserver2023JM
