import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import { initialView, mapboxToken, terrainStyle } from "../js/maps";
import { ColumnLayer } from "deck.gl";

const MapView = ({ nodes, sensors }) => {
  console.log({ nodes });



  return (
    <>
      <h3>MMMAMAMAPPP</h3>
      <DeckGL initialViewState={initialView} controller={{ dragPan: true }} getTooltip={({ object }) => {
          if (object) {
            const { name, description, lng, lat } =
              object;
            return `Name: ${name}
         Desc: ${description}
         Lng: ${lng?.toFixed(6)} 
         Lng: ${lng?.toFixed(6)} 
         
        `;
          }
        }}>
        <Map mapboxAccessToken={mapboxToken} mapStyle={terrainStyle}>
          <NavigationControl />
        </Map>
        <ColumnLayer
          data={nodes}
          diskResolution={6}
          radius={205}
          elevationScale={1}
          getElevation={220}
          getPosition={(d) => [d.lng, d.lat]}
          getFillColor={[255, 165, 0]}
          getLineColor={[255, 165, 0, 50]}
          wireframe
          pickable
          onClick={(e) => {
            console.log(e)
          }}
        />
      </DeckGL>
    </>
  );
};

export default MapView;
