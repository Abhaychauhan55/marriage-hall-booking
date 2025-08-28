import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../../app/models/booking';
import { BookingRequest } from '../../../app/models/booking-request';
import { BookingService } from '../../../app/services/booking.service';
import { UserService } from '../../../app/services/user.service';
import { HallService } from '../../../app/services/hall.service';
import { User } from '../../../app/models/user';
import { Hall } from '../../../app/models/hall';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  users: User[] = [];
  halls: Hall[] = [];
  selectedBooking: Booking = {
    userName: '',
    date: '',
    status: '',
    hall: {} as Hall,
    user: {} as User
  };
  isEditMode = false;

  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private hallService: HallService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadUsers();
    this.loadHalls();
  }

  loadBookings() {
    this.bookingService.getAllBookings().subscribe(data => this.bookings = data);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  loadHalls() {
    this.hallService.getAllHalls().subscribe(data => this.halls = data);
  }

  saveBooking() {
    if (!this.selectedBooking.user?.id || !this.selectedBooking.hall?.id) {
      console.error('User or Hall not selected!');
      return;
    }

    if (this.isEditMode && this.selectedBooking.id) {
      // Update existing booking
      this.bookingService.updateBooking(this.selectedBooking.id, this.selectedBooking).subscribe({
        next: () => {
          this.loadBookings();
          this.cancelEdit();
        },
        error: err => console.error('Update error:', err)
      });
    } else {
      // Create new booking
      const bookingRequest: BookingRequest = {
        userName: this.selectedBooking.userName,
        date: this.selectedBooking.date,
        status: this.selectedBooking.status,
        userId: this.selectedBooking.user.id,
        hallId: this.selectedBooking.hall.id
      };

      this.bookingService.createBooking(bookingRequest).subscribe({
        next: () => {
          this.loadBookings();
          this.cancelEdit();
        },
        error: err => console.error('Create error:', err)
      });
    }
  }

  editBooking(booking: Booking) {
    this.selectedBooking = { ...booking };
    this.isEditMode = true;
  }

  deleteBooking(id: number | undefined) {
    if (!id) return;
    this.bookingService.deleteBooking(id).subscribe(() => this.loadBookings());
  }

  cancelEdit() {
    this.selectedBooking = {
      userName: '',
      date: '',
      status: '',
      hall: {} as Hall,
      user: {} as User
    };
    this.isEditMode = false;
  }
}
