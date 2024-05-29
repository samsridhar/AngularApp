import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddUserRequest } from '../../model/add-user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../model/user.model';
import { updateUserRequest } from '../../model/update-user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editUserSubscription?: Subscription;
  user?: User;
  updateUserRequest: updateUserRequest;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateUserRequest = {
      activeDirectoryUserId: 0,
      samAccountName: '',
      firstName: '',
      lastName: '',
      eMail: '',
      telephoneNumber: '',
      password: '',
      roles: '',
    };
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this user Id
          this.userService.getUserById(this.id).subscribe({
            next: (response) => {
              this.user = response;
              this.updateUserRequest.activeDirectoryUserId =
                response.activeDirectoryUserId;
            },
          });
        }
      },
    });
  }
  convertToNumber(str: string, defaultValue = 0): number {
    const num = parseInt(str, 10); // Assuming decimal base
    return isNaN(num) ? defaultValue : num;
  }

  onFormSubmit() {
    // pass this object to service
    console.log(this.updateUserRequest);
    this.editUserSubscription = this.userService
      .updateUser(
        this.updateUserRequest.activeDirectoryUserId,
        this.updateUserRequest
      )
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/user');
        },
      });
  }

  onDelete(): void {}

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
  }
}
