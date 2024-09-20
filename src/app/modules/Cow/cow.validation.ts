import zod, { z } from "zod";

export const cowvalidation = zod.object({
  body: zod.object({
    name: z.string({ required_error: "name is required" }),
    age: z.number({ required_error: "age is required" }),
    price: z.number({ required_error: "price is required" }),
    location: z.enum(
      [
        "Dhaka",
        "Chattogram",
        "Barishal",
        "Rajshahi",
        "Sylhet",
        "Comilla",
        "Rangpur",
        "Mymensingh",
      ],
      { required_error: "location is required" }
    ),
    breed: z.enum(
      [
        "Brahman",
        "Nellore",
        "Sahiwal",
        "Gir",
        "Indigenous",
        "Tharparkar",
        "Kankrej",
      ],
      { required_error: "breed is required" }
    ),
    weight: z.number({ required_error: "wight is required" }),
    label: z.enum(["forsale", "soldout"], {
      required_error: "label is required",
    }),
    category: z.enum(["Dairy", "Beef", "Dual Purpose"], {
      required_error: "category is required",
    }),
    seller: z.string({ required_error: "seller is required" }),
  }),
});
