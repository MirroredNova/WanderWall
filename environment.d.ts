/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_CONN_STRING: string;
    API_URL: string;
    NEXT_PUBLIC_CLOUDINARY_NAME: string;
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
    ADMIN_PASSWORD: string;
  }
}
