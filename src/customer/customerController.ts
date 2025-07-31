import { Response } from "express";
import { Request } from "express-jwt";
import { CustomerService } from "./customerService";
import { Logger } from "winston";

export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private logger: Logger,
  ) {}

  getCustomer = async (req: Request, res: Response) => {
    const { sub: userId, firstname, lastname, email } = req.auth;

    const customer = await this.customerService.getCustomer(userId);

    if (!customer) {
      const customerInfo = {
        userId,
        firstname,
        lastname,
        email,
        addresses: [],
      };

      const newCustomer =
        await this.customerService.createCustomer(customerInfo);

      this.logger.info("new customer created and fetched successfully", {
        id: newCustomer._id,
      });

      res.json(newCustomer);
    }

    this.logger.info("Customer fetched successfully", {
      id: customer._id,
    });

    res.json(customer);
  };
}
