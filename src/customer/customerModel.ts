import mongoose from "mongoose";
import { Address, Customer } from "./customerTypes";

const AddressSchema = new mongoose.Schema<Address>(
  {
    text: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { _id: false },
);

const customerSchema = new mongoose.Schema<Customer>(
  {
    userId: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    addresses: {
      type: [AddressSchema],
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
