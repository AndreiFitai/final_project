module.exports = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/final_project",
  SECRET_JWT_PASSPHRASE: "TWLom9RDbmGYBtkHHPe4m8pKswyUY",
  CLOUDINARY_NAME: "dgxhw3h7g",
  CLOUDINARY_KEY: "244223531618416",
  CLOUDINARY_SECRET: "FDZGhP2mSB9CxTz9H9fYA5ZNGag",
  NOMICS_API: "da9ce71a4a09e26b5fb738c517b5fff5",
  SOCKETSIO_PORT: 8000,
  TELEGRAM_TOKEN: "638245745:AAEYdKVBxPgYclMKndKkFZdOjrXe-deDoOY"
};
