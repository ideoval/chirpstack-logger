const Nav = ({
  deviceList = [{ id: 1, name: "test" }],
  queryMode = [
    { id: 1, name: "Recientes", table: "records", limit: 60 },
    { id: 2, name: "Hora", table: "hourly", limit: 24 },
    { id: 3, name: "Dia", table: "daily", limit: 30 },
    { id: 4, name: "Mes", table: "monthly", limit: 12 },
  ],
  handler,
  device,
}) => {
  return (
    <div
      className="has-background-info is-flex"
      style={{
        justifyContent: "space-between",
        alignContent: "center",
        padding: "1em",
      }}
    >
      <div>
        <p className="control">
          <span className="select">
            <select style={{ width: "15em" }} onChange={handler}>
              <option disabled selected>
                Seleccionar medidor
              </option>
              {deviceList.map((d) => (
                <option value={d.id}>{d.name}</option>
              ))}
            </select>
          </span>
        </p>
        <p className="control">
          <span className="select">
            <select style={{ width: "15em" }}>
              <option disabled selected>
                Seleccionar modo
              </option>
              {queryMode.map((q) => (
                <option value={q.id}>{q.name}</option>
              ))}
            </select>
          </span>
        </p>
      </div>
      <h3 className="title" style={{ padding: "0.5em 0", textAlign: "center" }}>
        {device?.name}
      </h3>
    </div>
  );
};
export default Nav;
