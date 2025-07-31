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

  updateAddress = async (customerId: string, userId: string, text: string) => {
    return await CustomerModel.findByIdAndUpdate(
      {
        _id: customerId,
        userId,
      },
      {
        $push: {
          addresses: {
            text,
            isDefault: false,
          },
        },
      },
      {
        new: true,
      },
    );
  };
}
