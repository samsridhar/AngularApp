import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
})
export class ManageUserComponent implements OnInit {
  userData$?: Observable<User[]>;
  inputValue: string = '';
  isButtonDisabled: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.updateUserDataList();
  }

  updateUserDataList(): void {
    setTimeout(() => (this.userData$ = this.userService.getAllUser()), 2000);
  }

  onSearch(query: string): void {
    this.userData$ = this.userService.getAllUserBySearch(query);
  }

  checkInput() {
    this.isButtonDisabled = this.inputValue.trim() === '';
  }

  //Delete User Data
  onDelete(id: number): void {
    if (id) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          this.updateUserDataList();
        },
      });
    }
  }
}
