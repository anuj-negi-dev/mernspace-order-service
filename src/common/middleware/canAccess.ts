import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createHttpError from "http-errors";

export const canAccess = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const rolesFromToken = req.auth.role;

    if (!roles.includes(rolesFromToken)) {
      const error = createHttpError(403, "You don't have enough permissions");
      next(error);
      return;
    }
    next();
  };
};
