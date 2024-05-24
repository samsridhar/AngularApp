export interface AddUserRequest {
  samAccountName: string;
  firstName: string;
  lastName: string;
  eMail: string;
  telephoneNumber: number;
  password: string;
  roles: string;
}
