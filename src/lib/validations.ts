import { z } from "zod";

export const CheckoutSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit mobile number"),
  houseBuilding: z.string().min(2, "House / Flat / Building is required"),
  streetArea: z.string().min(4, "Street / Area is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code"),
  country: z.string().min(1, "Country is required"),
  deliveryMethod: z.enum(["standard", "express"]),
  paymentMethod: z.enum(["simulated_upi", "simulated_card", "simulated_cod"]),
});

export type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export const OrderApiSchema = z.object({
  customer: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    houseBuilding: z.string().min(2),
    streetArea: z.string().min(4),
    city: z.string().min(2),
    state: z.string().min(2),
    pinCode: z.string().min(4),
    country: z.string().default("India"),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
      image: z.string(),
    })
  ).min(1, "Your cart is currently empty."),
  deliveryMethod: z.enum(["standard", "express"]),
  paymentMethod: z.string(),
});

export type OrderApiPayload = z.infer<typeof OrderApiSchema>;
