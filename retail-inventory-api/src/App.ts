import express, { type Express } from "express";
import cors from "cors";
import  Routes  from "./Routes/Index";
import { NotFound } from "./Middlewares/NotFound";
import { ErrorHandler } from "./Middlewares/ErrorHandler";
import { GetEnv } from "./Config/Env";
import { Logger } from "./Utils/Logger";

export function CreateApp(): Express {
  const Env = GetEnv();
  const App = express();

  // Trust reverse proxies (Render/Fly/NGINX) so req.ip etc. works correctly.
  // Safe for local dev too.
  App.set("trust proxy", 1);

  // CORS
  App.use(
    cors({
      origin: Env.CORS_ORIGIN === "*" ? true : Env.CORS_ORIGIN,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Body parsing
  App.use(express.json({ limit: "1mb" }));

  // Request logging (basic + useful fields)
  App.use((Req, Res, Next) => {
    const Start = Date.now();

    Res.on("finish", () => {
      const DurationMs = Date.now() - Start;
      Logger.Info(
        `${Req.method} ${Req.originalUrl} ${Res.statusCode} ${DurationMs}ms`
      );
    });

    Next();
  });

  // Health endpoint (keeps it available even if you later change Routes)
  App.get("/health", (_Req, Res) => {
    Res.json({
      ok: true,
      service: "retail-inventory-api",
      env: Env.NODE_ENV,
    });
  });

  // Versioned API routes
  App.use("/api/v1", Routes);

  // 404 + error handling
  App.use(NotFound);
  App.use(ErrorHandler);

  return App;
}