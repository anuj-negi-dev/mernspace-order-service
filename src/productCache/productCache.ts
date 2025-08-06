import mongoose from "mongoose";

export interface ProductCache {
  productId: string;
  priceConfiguration: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

const PriceSchema = new mongoose.Schema({
  priceType: {
    type: String,
    enum: ["base", "additional"],
  },
  availableOptions: {
    type: Object,
    of: Number,
  },
});

const productCacheSchema = new mongoose.Schema<ProductCache>({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  priceConfiguration: {
    type: Object,
    of: PriceSchema,
  },
});

export default mongoose.model("ProductCache", productCacheSchema);
