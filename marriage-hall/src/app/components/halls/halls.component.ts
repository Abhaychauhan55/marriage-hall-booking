import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hall } from '../../../app/models/hall';
import { HallService } from '../../../app/services/hall.service';

@Component({
  selector: 'app-halls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {

  halls: Hall[] = [];
  selectedHall: Hall = { id: 0, name: '', location: '', capacity: 0 };
  isEditMode: boolean = false;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.loadHalls();
  }

  loadHalls(): void {
    this.hallService.getAllHalls().subscribe((data: Hall[]) => {
      this.halls = data;
    });
  }

  editHall(hall: Hall): void {
    this.selectedHall = { ...hall };
    this.isEditMode = true;
  }

  deleteHall(id: number): void {
    if (confirm('Are you sure you want to delete this hall?')) {
      this.hallService.deleteHall(id).subscribe(() => {
        this.loadHalls();
      });
    }
  }

saveHall() {
  console.log('Hall to save:', this.selectedHall);

  if (this.isEditMode && this.selectedHall.id) {
    // Update existing hall
    this.hallService.updateHall(this.selectedHall.id, this.selectedHall).subscribe({
      next: () => {
        this.loadHalls();
        this.cancelEdit();
      },
      error: err => console.error("Update error:", err)
    });
  } else {
    // Create new hall (don’t send id)
    const newHall = {
      name: this.selectedHall.name,
      location: this.selectedHall.location,
      capacity: this.selectedHall.capacity
    };
    this.hallService.createHall(newHall).subscribe({
      next: () => {
        this.loadHalls();
        this.cancelEdit();
      },
      error: err => console.error("Create error:", err)
    });
  }
}


  cancelEdit(): void {
    this.selectedHall = { id: 0, name: '', location: '', capacity: 0 };
    this.isEditMode = false;
  }
}
