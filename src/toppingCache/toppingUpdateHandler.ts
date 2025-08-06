import ToppingCacheModel from "./toppingCache";

export const handleToppingUpdate = async (message: string) => {
  const topping = JSON.parse(message);
  return await ToppingCacheModel.updateOne(
    {
      toppingId: topping._id,
    },
    {
      $set: {
        toppingPrice: topping.price,
        tenantId: topping.tenantId,
      },
    },
    {
      upsert: true,
    },
  );
};
