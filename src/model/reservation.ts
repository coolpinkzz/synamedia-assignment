import { Schema, model, Document } from "mongoose";
import Joi from "joi";

export interface IReservation extends Document {
  name: string;
  email: string;
  guestCount: number;
  tableId: Schema.Types.ObjectId;
  reservationTime: Date;
  specialRequests?: string;
}

// Mongoose Schema
const reservationSchema = new Schema<IReservation>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  guestCount: { type: Number, required: true },
  tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },
  reservationTime: { type: Date, required: true },
  specialRequests: { type: String },
});

// Joi Validation Schema
export const validateReservation = (data: IReservation) => {
  return Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    guestCount: Joi.number().integer().min(1).max(12).required(),
    tableId: Joi.string().required(), // Assuming ObjectId is passed as a string
    reservationTime: Joi.date().required(),
    specialRequests: Joi.string().optional(),
  }).validate(data);
};

export const Reservation = model<IReservation>(
  "Reservation",
  reservationSchema
);
