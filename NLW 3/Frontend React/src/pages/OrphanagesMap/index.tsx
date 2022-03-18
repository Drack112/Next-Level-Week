import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";

import mapMarkerImg from "../../assets/images/map-marker.svg";

import "./styles.css";

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão te esperando :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
