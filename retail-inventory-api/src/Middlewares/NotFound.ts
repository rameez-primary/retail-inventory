import type { Request, Response } from "express";

export function NotFound(_Req: Request, Res: Response) {
  Res.status(404).json({
    Ok: false,
    Error: {
      Message: "Route not found",
      StatusCode: 404,
    },
  });
}