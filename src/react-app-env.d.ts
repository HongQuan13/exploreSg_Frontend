/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL: string;
    REACT_APP_BACKEND_PORT: string;
    REACT_APP_MAPBOX_TOKEN: string;
  }
}
