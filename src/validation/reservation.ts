import Joi from "joi";

// Validation for canceling a reservation
export const validateCancelReservation = (data: {
  email: string;
  reservationTime: string;
}) => {
  return Joi.object({
    email: Joi.string().email().required(),
    reservationTime: Joi.date().required(),
  }).validate(data);
};

// Validation for modifying a reservation
export const validateModifyReservation = (data: {
  email: string;
  currentReservationTime: string;
  newReservationTime: string;
}) => {
  return Joi.object({
    email: Joi.string().email().required(),
    currentReservationTime: Joi.date().required(),
    newReservationTime: Joi.date().required(),
  }).validate(data);
};
