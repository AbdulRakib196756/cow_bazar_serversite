import zod, { z } from "zod";

const Uservalidation = zod.object({
  body: zod.object({
    password: z.string().min(6, "password atleast 6 charecter"),
    role: z.string(),
    name: zod.object({
      firstname: z.string(),
      lastname: z.string(),
    }),
    Phonenumber: z.string().regex(/^[0-9]+$/, "phone number must be digit 0-9"),
    email: z.string({ required_error: "email is required" }).email(),
    Adress: z.string(),
    Budget: z.number().optional(),
    Income: z.number().optional(),
  }),
});

export default Uservalidation;
