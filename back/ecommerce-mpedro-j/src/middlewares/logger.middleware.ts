import { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  console.log(`${date}, ${time}, Metodo: ${req.method}, Ruta: ${req.url}`);

  next();
};
