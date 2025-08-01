import { body } from "express-validator";

export default [
  body("code").exists().withMessage("Coupon code is required"),
  body("tenantId").exists().withMessage("Title is required"),
];
