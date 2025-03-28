import { Router } from "express";
import { ReservationController } from "../controllers/reservationController";

const router = Router();

router.post("/reservations", async (req, res, next) => {
  try {
    await ReservationController.createReservation(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
router.get("/reservations", async (req, res, next) => {
  try {
    await ReservationController.getReservations(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
router.get("/reservations/by-time", async (req, res, next) => {
  try {
    await ReservationController.getReservationsByTime(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
router.delete("/reservations", async (req, res, next) => {
  try {
    await ReservationController.cancelReservation(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
router.patch("/reservations", async (req, res, next) => {
  try {
    await ReservationController.modifyReservation(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
router.get("/tables", async (req, res, next) => {
  try {
    await ReservationController.getAllTables(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});
router.get("/reservations/today", async (req, res, next) => {
  try {
    await ReservationController.getTodaysReservations(req, res);
  } catch (err) {
    next(err); // Pass the error to Express error handling middleware
  }
});

export default router;
