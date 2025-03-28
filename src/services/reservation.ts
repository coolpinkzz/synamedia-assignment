import { IReservation, Reservation } from "../model/reservation";

export class ReservationService {
  static async createReservation(data: IReservation) {
    const reservation = new Reservation(data);
    return await reservation.save();
  }

  static async getReservationsByEmail(email: string) {
    return await Reservation.find({ email });
  }

  static async getReservationsByTime(time: Date) {
    return await Reservation.find({ reservationTime: time });
  }

  static async cancelReservation(email: string, reservationTime: Date) {
    const result = await Reservation.findOneAndDelete({
      email,
      reservationTime,
    });
    return result !== null; // Return true if deleted, false otherwise
  }

  static async modifyReservationTime(
    email: string,
    currentTime: Date,
    newTime: Date
  ) {
    return await Reservation.findOneAndUpdate(
      { email, reservationTime: currentTime },
      { reservationTime: newTime },
      { new: true } // Return the updated document
    );
  }

  static async getAllTables() {
    // Assuming you have a Table model in your database
    return []; // Implement this if necessary
  }
}
