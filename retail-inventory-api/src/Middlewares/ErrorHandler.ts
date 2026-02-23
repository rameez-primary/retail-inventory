import type { NextFunction, Request, Response } from "express";
import { Logger } from "../Utils/Logger";

type ApiError = {
  StatusCode?: number;
  Message?: string;
};

export function ErrorHandler(
  Err: unknown,
  _Req: Request,
  Res: Response,
  _Next: NextFunction
) {
  const Safe = Err as ApiError;

  const StatusCode = Safe?.StatusCode ?? 500;
  const Message = Safe?.Message ?? "Internal Server Error";

  Logger.Error("Unhandled error", Err);

  Res.status(StatusCode).json({
    Ok: false,
    Error: {
      Message,
      StatusCode,
    },
  });
}