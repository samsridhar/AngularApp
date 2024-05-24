export interface User {
  activeDirectoryUserId: number;
  samAccountName: string;
  firstName: string;
  lastName: string;
  eMail: string;
  telephoneNumber: number;
  password: string;
  roles: string;
}
