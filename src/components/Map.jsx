import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import { initialView, mapboxToken, terrainStyle } from "../js/maps";
import { IconLayer } from "deck.gl";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const MapView = ({ nodes, sensors }) => {
  console.log({ nodes });

  return (
    <div style={{ zIndex: -100 }}>
      <DeckGL
        style={{ zIndex: -99 }}
        initialViewState={initialView}
        controller={{ dragPan: true }}
        getTooltip={({ object }) => {
          if (object) {
            const { name, description, lng, lat } = object;
            return `Name: ${name}
         Desc: ${description}
         Lng: ${lng?.toFixed(6)} 
         Lat: ${lat?.toFixed(6)} 
         
        `;
          }
        }}
      >
        <Map mapboxAccessToken={mapboxToken} mapStyle={terrainStyle}>
          <NavigationControl />
        </Map>
        {/* <ColumnLayer
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
            console.log(e);
          }}
        /> */}
        <IconLayer
          data={nodes}
          iconMapping={ICON_MAPPING}
          radius={205}
          elevationScale={1}
          getElevation={220}
          getPosition={(d) => [d.lng, d.lat]}
          getFillColor={[255, 165, 0]}
          getLineColor={[255, 165, 0, 50]}
          wireframe
          pickable
          onClick={(e) => {
            console.log(e);
          }}
        />
      </DeckGL>
    </div>
  );
};

export default MapView;
