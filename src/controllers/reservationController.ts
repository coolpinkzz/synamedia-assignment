import { Request, Response } from "express";
import { ReservationService } from "../services/reservation";
import { validateReservation } from "../model/reservation";
import {
  validateCancelReservation,
  validateModifyReservation,
} from "../validation/reservation";

export class ReservationController {
  static async createReservation(req: Request, res: Response) {
    const { error } = validateReservation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const validatedData = req.body;

      const reservation = await ReservationService.createReservation({
        ...validatedData,
        reservationTime: new Date(validatedData.reservationTime),
      });
      res.status(201).json({ success: true, data: reservation });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getReservations(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      if (!email) return res.status(400).json({ error: "Email is required" });

      const reservations = await ReservationService.getReservationsByEmail(
        email
      );
      if (reservations.length === 0) {
        return res
          .status(404)
          .json({ error: "No reservations found for this email" });
      }
      res.json({ success: true, data: reservations });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getReservationsByTime(req: Request, res: Response) {
    try {
      const timeStr = req.query.time as string;
      if (!timeStr)
        return res.status(400).json({ error: "Time parameter is required" });

      const time = new Date(timeStr);
      if (isNaN(time.getTime()))
        return res.status(400).json({ error: "Invalid time format" });

      const reservations = await ReservationService.getReservationsByTime(time);
      res.json({ success: true, data: reservations });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async cancelReservation(req: Request, res: Response) {
    const { error } = validateCancelReservation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const validatedData = req.body;

      const cancelled = await ReservationService.cancelReservation(
        validatedData.email,
        new Date(validatedData.reservationTime)
      );
      if (!cancelled)
        return res
          .status(404)
          .json({ error: "Reservation not found or could not be cancelled" });

      res.json({
        success: true,
        message: "Reservation successfully cancelled",
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async modifyReservation(req: Request, res: Response) {
    const { error } = validateModifyReservation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const validatedData = req.body;

      const updatedReservation = await ReservationService.modifyReservationTime(
        validatedData.email,
        new Date(validatedData.currentReservationTime),
        new Date(validatedData.newReservationTime)
      );
      if (!updatedReservation)
        return res.status(404).json({ error: "Reservation not found" });

      res.json({ success: true, data: updatedReservation });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAllTables(req: Request, res: Response) {
    try {
      const tables = await ReservationService.getAllTables();
      res.json({ success: true, data: tables });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getTodaysReservations(req: Request, res: Response) {
    try {
      const today = new Date();
      const reservations = await ReservationService.getReservationsByTime(
        today
      );
      res.json({ success: true, data: reservations });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
