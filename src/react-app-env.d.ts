/// <reference types="react-scripts" />

declare namespace NodeJs {
    interface ProcessEnv {
        REACT_APP_API_URL: string;
    }
}