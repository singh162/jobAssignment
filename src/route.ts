import express from "express";
import { Router } from "express";
import app from "./router/vehicle-admin-api";
const router: Router = express.Router();
router.use("/v1", app);

export default router;
