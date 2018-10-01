module.exports = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/final_project",
  SECRET_JWT_PASSPHRASE: ,
  CLOUDINARY_NAME: ,
  CLOUDINARY_KEY: ,
  CLOUDINARY_SECRET: ,
  NOMICS_API: ,
  SOCKETSIO_PORT: 8000,
  TELEGRAM_TOKEN: 
};
