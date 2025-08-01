import CouponModel from "./couponModel";
import { Coupon } from "./couponTypes";

export class CouponService {
  crate = async (couponData: Coupon) => {
    return await CouponModel.create(couponData);
  };

  verify = async (code: string, tenantId: number) => {
    return await CouponModel.findOne({
      code,
      tenantId,
    });
  };
}
