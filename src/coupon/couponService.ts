import CouponModel from "./couponModel";
import { Coupon } from "./couponTypes";

export class CouponService {
  crate = async (couponData: Coupon) => {
    return await CouponModel.create(couponData);
  };
}
