import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name"),
  lastName: z.string().min(2, "Please enter your last name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your street address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state or province"),
  postalCode: z.string().min(3, "Please enter a valid postal code"),
  country: z.string().min(2, "Please select a country"),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
