import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    // dont use type ,bcz overwrite
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user: JwtPayload | null;
    }
  }
}
