import * as express from "express";
import { MaintenanceService } from "../service/maintenance-service";
import { MaintenanceLog } from "../model/assets/maintenance-log-asset";
import { BigchainInitializer } from "../utils/bigchain-utils";
import { MongoInitializer } from "../utils/mongo-utils";

let maintenance!: MaintenanceService;

const bigchainConnection = BigchainInitializer.initializeBigchain();
MongoInitializer.initializeMongo().then(sensorCollection => {
    maintenance = new MaintenanceService(sensorCollection, bigchainConnection);
});

const sensorRouter = express.Router();
sensorRouter.use(express.json());

const maintenanceRouter = express.Router();
maintenanceRouter.use(express.json());

sensorRouter.get("/:sensor_id", async (req: express.Request, res: express.Response) => {
    
    const id = req?.params?.sensor_id;

    try {
        const data = await maintenance.getSensorLogs(id);
        res.status(200).send(data);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

sensorRouter.get("/:sensor_id/:timestamp", async (req: express.Request, res: express.Response) => {

    const id = req?.params?.sensor_id;
    const timestamp = req?.params?.timestamp;

    try {
        const data = await maintenance.getSensorTimestampLogs(id, parseInt(timestamp));
        res.status(200).send(data);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

sensorRouter.get("/location/:location_id", async (req: express.Request, res: express.Response) => {

    const id = req?.params?.location_id;

    try {
        const data = await maintenance.getSensorLogsFromLocation(id);
        res.status(200).send(data);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

sensorRouter.get("/location/:location_id/:timestamp", async (req: express.Request, res: express.Response) => {

    const id = req?.params?.location_id;
    const timestamp = req?.params?.timestamp;

    try {
        const data = await maintenance.getSensorLogsFromTimestampLocation(id, parseInt(timestamp));
        res.status(200).send(data);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

maintenanceRouter.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const maintenanceData = req.body as MaintenanceLog;
        const maintenanceLog = new MaintenanceLog(maintenanceData.companyId,
                                                  maintenanceData.employeeId,
                                                  maintenanceData.sensorId,
                                                  maintenanceData.substationId,
                                                  maintenanceData.payload
                                                );
        console.log(maintenanceLog.sensorId);
        const result = await maintenance.addMaintenanceRecord(maintenanceLog);
        
        result
            ? res.status(201).send(`Successfully added new maintenance log to DLT`)
            : res.status(500).send("Failed to add new maintenance log.");
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

maintenanceRouter.get("/:sensor_id", async (req: express.Request, res: express.Response) => {
    try {
        console.log(req?.params?.sensor_id)
        const id = req?.params?.sensor_id as string;
        const data = await maintenance.getMaintenanceRecords(id);
        res.status(200).send(data);
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


export {sensorRouter, maintenanceRouter}