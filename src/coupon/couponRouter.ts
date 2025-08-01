import express from "express";
import authenticate from "../common/middleware/authenticate";
import { canAccess } from "../common/middleware/canAccess";
import { Roles } from "../constants";
import { CouponController } from "./couponController";
import { CouponService } from "./couponService";
import logger from "../config/logger";
import { asyncWrapper } from "../utils";

const router = express.Router();

const couponService = new CouponService();
const couponController = new CouponController(couponService, logger);

router.post(
  "/",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  asyncWrapper(couponController.create),
);

export default router;
