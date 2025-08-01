import { body } from "express-validator";

export default [
  body("title").exists().withMessage("Title is required"),
  body("code").exists().withMessage("Coupon code is required"),
  body("discount").exists().withMessage("Title is required"),
  body("tenantId").exists().withMessage("Tenant id is required"),
  body("validUpto").exists().withMessage("Expiry Date is required"),
];
