import { ToppingCacheModel } from "./toppingCache";

export const handleToppingUpdate = async (message: string) => {
  const topping = JSON.parse(message);
  await ToppingCacheModel.updateOne(
    {
      toppingId: topping.id,
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
