export interface Address {
  text: string;
  isDefault: boolean;
}

export interface Customer {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  addresses: Address[];
}
