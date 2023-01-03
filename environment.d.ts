/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_CONN_STRING: string;
    API_URL: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_NAME: string;
  }
}
