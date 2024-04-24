import * as express from "express";
import { sensorRouter, maintenanceRouter } from "./api/routers";


let app = express();
app.use("/sensors", sensorRouter);
app.use("/maintenance", maintenanceRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
}) 



    
    
