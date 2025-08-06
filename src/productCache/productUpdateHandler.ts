import productCache from "./productCache";

export const handleProductUpdate = async (message: string) => {
  const product = JSON.parse(message);
  return await productCache.updateOne(
    { productId: product._id },
    {
      $set: {
        priceConfiguration: product.priceConfiguration,
      },
    },
    { upsert: true },
  );
};
