import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = { id: 0, name: '', email: '', phone: '' };
  isEditMode = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(res => this.users = res);
  }

 saveUser() {
  console.log('User to save:', this.selectedUser);
  if (this.isEditMode && this.selectedUser.id) {
    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: () => {
        this.loadUsers();
        this.cancelEdit();
      },
      error: err => console.error("Update error:", err)
    });
  } else {
    const newUser = {
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      phone: this.selectedUser.phone
    };
    this.userService.createUser(newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.cancelEdit();
      },
      error: err => console.error("Create error:", err)
    });
  }
}


  editUser(user: User) {
    this.selectedUser = { ...user };
    this.isEditMode = true;
  }

  deleteUser(id: number | undefined) {
    if (confirm('Are you sure to delete this user?')) {
      if(id == null) return;
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  cancelEdit() {
    this.selectedUser = { id: 0, name: '', email: '', phone: '' };
    this.isEditMode = false;
  }
}
