import CustomerModel from "./customerModel";

export class CustomerService {
  getCustomer = async (userId: string) => {
    return await CustomerModel.findOne({
      userId,
    });
  };

  createCustomer = async (customerInfo) => {
    return await CustomerModel.create(customerInfo);
  };
}
