import express, { Request, Response } from "express";
import { MaintenanceService } from "../service/maintenance-service";

const maintenance = new MaintenanceService();

const sensorRouter = express.Router();
sensorRouter.use(express.json());

sensorRouter.get("/:sensor_id", async (req: Request, res: Response) => {

    const id = req?.params?.sensor_id;

    try {
        const data = await maintenance.getSensorLogs(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

sensorRouter.get("/:sensor_id/:timestamp", async (req: Request, res: Response) => {

    const id = req?.params?.sensor_id;
    const timestamp = req?.params?.timestamp;

    try {
        const data = await maintenance.getSensorTimestampLogs(id, timestamp);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

sensorRouter.get("/location/:location_id", async (req: Request, res: Response) => {

    const id = req?.params?.location_id;

    try {
        const data = await maintenance.getSensorLogsFromLocation(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

sensorRouter.get("/location/:location_id/:timestamp", async (req: Request, res: Response) => {

    const id = req?.params?.location_id;
    const timestamp = req?.params?.timestamp;

    try {
        const data = await maintenance.getSensorLogsFromTimestampLocation(id, timestamp);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

sensorRouter.post("/maintenance/", async (req: Request, res: Response) => {
    try {
        const maintenanceData = req.body as MaintenanceLog;
        const result = await maintenance.addMaintenanceRecord(maintenanceData);
        
        result
            ? res.status(201).send(`Successfully added new maintenance log to DLT`)
            : res.status(500).send("Failed to add new maintenance log.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

sensorRouter.get("/maintenance/:sensor_id", async (req: Request, res: Response) => {
    try {
    
        const id = req?.params?.sensor_id;
        const data = await maintenance.getMaintenanceRecords(id);
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

export { sensorRouter };