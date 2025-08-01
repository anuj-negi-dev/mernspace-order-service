import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Request } from "express-jwt";
import { CouponService } from "./couponService";
import { Logger } from "winston";

export class CouponController {
  constructor(private couponService: CouponService, private logger: Logger) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }

    if (req.body.tenantId !== req.auth.tenantId) {
      const error = createHttpError(403, "You don't have enough permissions");
      next(error);
      return;
    }

    const { title, code, validUpto, discount, tenantId } = req.body;

    const coupon = await this.couponService.crate({
      title,
      code,
      validUpto,
      discount,
      tenantId,
    });
    res.json(coupon);
  };
}
