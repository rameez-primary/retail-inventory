import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default("*"),
});

export type Env = z.infer<typeof EnvSchema>;

export function GetEnv(): Env {
  const Parsed = EnvSchema.safeParse(process.env);

  if (!Parsed.success) {
    // Make it readable in the terminal
    console.error("Invalid environment variables:", Parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  return Parsed.data;
}