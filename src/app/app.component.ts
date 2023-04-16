import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent {
  // Initialize all seats as available
  seats: boolean[] = new Array(80).fill(true);

  // Method to handle seat booking
  bookSeats(numSeats: number): void {
    let bookedSeats: number[] = [];

    // Look for available seats in one row
    for (let i = 0; i < 80; i += 7) {
      let rowSeats = this.seats.slice(i, i + 7);
      let startIndex = rowSeats.indexOf(true);
      if (startIndex >= 0 && startIndex + numSeats <= 7) {
        // Found available seats in one row
        for (let j = startIndex; j < startIndex + numSeats; j++) {
          this.seats[i + j] = false;
          bookedSeats.push(i + j + 1);
        }
        break;
      }
    }

    // If no seats available in one row, look for nearby seats
    if (bookedSeats.length === 0) {
      for (let i = 0; i < 80; i++) {
        if (this.seats[i] === true) {
          this.seats[i] = false;
          bookedSeats.push(i + 1);
          if (bookedSeats.length === numSeats) {
            break;
          }
        }
      }
    }

    if (bookedSeats.length === 0) {
      // No available seats
      alert('Sorry, no seats available.');
    } else {
      // Display booked seats
      alert(`Booked seats: ${bookedSeats.join(', ')}`);
    }
  }
}

