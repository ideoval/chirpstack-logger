const Nav = ({ deviceList, queries, deviceHandler, queryHandler, device }) => {
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
            <select style={{ width: "15em" }} onChange={deviceHandler}>
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
            <select style={{ width: "15em" }} onChange={queryHandler}>
              <option disabled selected>
                Seleccionar modo
              </option>
              {queries.map((q) => (
                <option value={q.id}>Lecturas {q.name}</option>
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
