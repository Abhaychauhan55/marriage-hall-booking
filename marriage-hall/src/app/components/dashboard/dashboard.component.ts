import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HallService } from '../../services/hall.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  totalHalls = 0;
  totalBookings = 0;

  constructor(
    private userService: UserService,
    private hallService: HallService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res => this.totalUsers = res.length);
    this.hallService.getAllHalls().subscribe(res => this.totalHalls = res.length);
    this.bookingService.getAllBookings().subscribe(res => this.totalBookings = res.length);
  }
}
