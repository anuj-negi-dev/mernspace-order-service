import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Request } from "express-jwt";
import { CouponService } from "./couponService";
import { Logger } from "winston";

export class CouponController {
  constructor(
    private couponService: CouponService,
    private logger: Logger,
  ) {}

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

    this.logger.info("Coupon created successfully", {
      _id: coupon._id,
    });

    res.json(coupon);
  };

  verify = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const { code, tenantId } = req.body;

    const coupon = await this.couponService.verify(code, tenantId);

    if (!coupon) {
      const error = createHttpError(400, "Coupon does not exists");
      return next(error);
    }
    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);

    if (currentDate > couponDate) {
      return res.json({ valid: false, discount: 0 });
    }

    this.logger.info("Coupon code is valid", {
      code,
      tenantId,
    });

    return res.json({ valid: true, discount: coupon.discount });
  };
}
