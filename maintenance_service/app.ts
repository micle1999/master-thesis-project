import { MaintenanceService } from "./service/maintenance-service";
import { sensorRouter } from "./api/sensor-routes";
import express from "express";

const app = express();
const service = new MaintenanceService();  
service.run()
    .then(() => {
        app.use("/sensors", sensorRouter);
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Application setup failed", error);
        process.exit();
    });
