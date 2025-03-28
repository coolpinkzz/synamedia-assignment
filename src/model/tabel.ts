import { Schema, model, Document } from "mongoose";
import Joi from "joi";

export interface ITable extends Document {
  tableNumber: number;
  capacity: number;
  isAvailable: boolean;
}

// Mongoose Schema
const tableSchema = new Schema<ITable>({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true, default: true },
});

// Joi Validation Schema
export const validateTable = (data: ITable) => {
  return Joi.object({
    tableNumber: Joi.number().integer().positive().required(),
    capacity: Joi.number().integer().min(1).required(),
    isAvailable: Joi.boolean().required(),
  }).validate(data);
};

export const Table = model<ITable>("Table", tableSchema);
