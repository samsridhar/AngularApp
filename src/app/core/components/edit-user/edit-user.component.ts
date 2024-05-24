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
  activeDirectoryUserId: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.activeDirectoryUserId = this.id ? parseInt(this.id, 10) : 0;
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
              console.log(this.user);
            },
          });
        }
      },
    });
  }

  onFormSubmit() {
    const updateUserRequest: updateUserRequest = {
      activeDirectoryUserId:
        this.user?.activeDirectoryUserId ?? this.activeDirectoryUserId,
      samAccountName: this.user?.samAccountName ?? '',
      firstName: this.user?.firstName ?? '',
      lastName: this.user?.lastName ?? '',
      eMail: this.user?.eMail ?? '',
      telephoneNumber: this.user?.telephoneNumber ?? 0,
      password: this.user?.password ?? '',
      roles: this.user?.roles ?? '',
    };

    // pass this object to service
    if (this.id) {
      this.editUserSubscription = this.userService
        .updateCategory(this.id, updateUserRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/user');
          },
        });
    }
  }

  onDelete(): void {}

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
  }
}
