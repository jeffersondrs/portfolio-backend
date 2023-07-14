import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE_URL!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

mongoose.set("strictQuery", true);

mongoose.connect(DB).then(() => console.log("Conectado ao banco de dados"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
