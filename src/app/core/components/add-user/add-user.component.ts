import { Component, OnDestroy } from '@angular/core';
import { AddUserRequest } from '../../model/add-user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnDestroy {
  model: AddUserRequest;
  private addUserSubscribtion?: Subscription;

  constructor(private userService: UserService, private router: Router) {
    this.model = {
      samAccountName: '',
      firstName: '',
      lastName: '',
      eMail: '',
      telephoneNumber: 0,
      password: '',
      roles: '',
    };
  }

  onFormSubmit() {
    this.addUserSubscribtion = this.userService.addUser(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/user');
      },
    });
  }

  ngOnDestroy(): void {
    this.addUserSubscribtion?.unsubscribe();
  }
}
