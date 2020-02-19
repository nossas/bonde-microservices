import React from 'react';
import { Marker } from 'react-map-gl';
import { isVolunteer } from '../../../services/utils'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const Pins = ({ data, onClick }) =>
  data.map((user, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={Number(user.longitude)}
      latitude={Number(user.latitude)}
    >
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          fill: `${isVolunteer(user.organization_id) ? 'rgba(98,37,101,1)' : 'rgba(249, 225, 219, 1)'}`,
          stroke: 'none',
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
        }}
        onClick={() => onClick(user.user_id)}
      >
        <path d={ICON} />
      </svg>
    </Marker>
  ));

export default Pins