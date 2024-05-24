export interface updateUserRequest {
  activeDirectoryUserId: number;
  samAccountName: string;
  firstName: string;
  lastName: string;
  eMail: string;
  telephoneNumber: string;
  password: string;
  roles: string;
}
