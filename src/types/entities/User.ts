export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
