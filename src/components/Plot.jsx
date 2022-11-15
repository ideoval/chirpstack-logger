const Plot = ({ measurements }) => {
  return <pre>{JSON.stringify(measurements, null, 2)}</pre>;
};
export default Plot;
