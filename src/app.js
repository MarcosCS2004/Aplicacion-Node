import express from "express";
import morgan from "morgan";
import equiposRoutes from "./routes/equipos.routes";
import ligasRoutes from "./routes/ligas.routes";

const app=express();




app.use(morgan("dev"));
app.use(express.json());
app.use("/api/equipos",equiposRoutes);
app.use("/api/ligas",ligasRoutes);


export default app;
