import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RouteLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode } = res;
      const statusMessage = res.statusMessage;

      this.logger.log(`${method} ${originalUrl} ${statusCode} ${statusMessage}`);
    });

    next();
  }
}
