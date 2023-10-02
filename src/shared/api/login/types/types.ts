import { z } from "zod";

const Response = z.object({
  token: z.string()
})

const Data = z.object({
  username: z.string(),
  password: z.string()
})

export type ZLoginData = z.infer<typeof Data>
export type ZLoginResponse = z.infer<typeof Response>