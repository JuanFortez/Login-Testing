import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import usersRouter from "./routes/user.router.js";
// import { userModel } from './models/user.model.js';
import path from "path";
import cors from "cors"; // Necesitarás instalar cors: npm install cors

const app = express();
const SERVER_PORT = 9090;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../")));

//Declaracion de un router
app.use("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/users", usersRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});

//Conexion a la BD
// const DB_PATH =
//   "mongodb+srv://juanfortez112:jja1655U9vdAYbxU@clusterjuanf.phzda08.mongodb.net/prueba-mongo?retryWrites=true&w=majority&appName=ClusterJuanF";

const DB_PATH = "mongodb://localhost:27017/prueba-login";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB_PATH);
    console.log("Conectado con exito a la base de datos");

    // const result = await userModel.find().explain('executionStats');
    // console.log(result);
  } catch (error) {
    console.error("Error al conectar a la base de datos" + error);
    process.exit(); // Termina el proceso si no se puede conectar
  }
};
connectMongoDB();
