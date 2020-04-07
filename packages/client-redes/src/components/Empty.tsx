import React from 'react'
import styled from 'styled-components';
import { Header } from 'bonde-components';

const EmptyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="56"
      fill="none"
      viewBox="0 0 38 56"
    >
      <path
        fill="#000"
        d="M35.435 28.166c-.678-.665-1.865-1.148-2.823-1.148l-8.484-.002v9.216h8.484c.958 0 2.145-.483 2.823-1.148l1.891-1.858A2.23 2.23 0 0038 31.624c0-.606-.24-1.175-.675-1.601l-1.89-1.857zM24.129 22.174h8.483c.958 0 2.146-.483 2.823-1.149l1.891-1.858A2.23 2.23 0 0038 17.565a2.23 2.23 0 00-.675-1.601l-1.89-1.856c-.677-.665-1.865-1.148-2.823-1.148l-8.607-.002c.08.352.124.717.124 1.093v8.123zM19 11.2c-1.6 0-2.902 1.279-2.902 2.851V47.44c0 .604.498 1.093 1.113 1.093h3.578c.614 0 1.113-.49 1.113-1.093V14.05C21.902 12.48 20.6 11.2 19 11.2zM2.564 21.135l-1.89 1.858A2.23 2.23 0 000 24.595c0 .606.24 1.175.675 1.602l1.89 1.855c.677.665 1.864 1.148 2.823 1.148l8.484.002v-9.216H5.388c-.958 0-2.146.483-2.824 1.15zM25.65 5.6c-1.571 0-2.85-1.256-2.85-2.8 0-1.544 1.279-2.8 2.85-2.8 1.571 0 2.85 1.256 2.85 2.8 0 1.544-1.279 2.8-2.85 2.8zm0-3.733a.943.943 0 00-.95.933c0 .515.427.933.95.933.523 0 .95-.418.95-.933a.943.943 0 00-.95-.933z"
      ></path>
      <path
        fill="#000"
        d="M34.2 11.2h-6.812c-2.007 0-3.638-1.603-3.638-3.573v-.32c0-1.97 1.631-3.574 3.638-3.574.97 0 1.883.372 2.571 1.047l4.914 4.827a.92.92 0 01.206 1.017.952.952 0 01-.879.576zm-6.812-5.6c-.96 0-1.738.765-1.738 1.706v.321c0 .941.779 1.706 1.738 1.706h4.519L28.617 6.1a1.744 1.744 0 00-1.23-.499z"
      ></path>
      <path
        fill="#000"
        d="M26.6 10.267h1.9V14h-1.9v-3.733zM30.4 10.267h1.9V14h-1.9v-3.733zM21.09 2.8c0-.515.421-.933.94-.933H23c.52 0 .94.418.94.933 0 .515-.42.933-.94.933h-.97a.937.937 0 01-.94-.933z"
      ></path>
      <path
        fill="#000"
        d="M27.55 2.8c0 1.03-.85 1.867-1.9 1.867-1.05 0-1.9-.836-1.9-1.867 0-1.03.85-1.867 1.9-1.867 1.05 0 1.9.836 1.9 1.867zM34.2 10.267h-6.813c-1.484 0-2.687-1.182-2.687-2.64v-.32c0-1.459 1.203-2.64 2.687-2.64.712 0 1.396.278 1.9.773l4.913 4.827zM5.503 53.268a2.742 2.742 0 012.752-2.731h20.638a2.742 2.742 0 012.752 2.731A2.742 2.742 0 0128.893 56H8.255a2.742 2.742 0 01-2.752-2.732z"
      ></path>
    </svg>
  );
};


const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export default ({ message }) => (
  <EmptyWrap>
    <EmptyIcon />
    <Header.h4>{message}</Header.h4>
  </EmptyWrap>
);