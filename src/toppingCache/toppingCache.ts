import mongoose from "mongoose";

export interface ToppingCache {
  toppingId: string;
  toppingPrice: number;
  tenantId: string;
}

const toppingCacheSchema = new mongoose.Schema<ToppingCache>({
  toppingId: {
    type: String,
    required: true,
    unique: true,
  },
  toppingPrice: {
    type: Number,
    required: true,
  },
  tenantId: {
    type: String,
    required: true,
  },
});

export const ToppingCacheModel = mongoose.model<ToppingCache>(
  "ToppingCache",
  toppingCacheSchema,
);
