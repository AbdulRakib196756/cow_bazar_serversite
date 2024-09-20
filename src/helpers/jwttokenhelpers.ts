import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createtoken = (
  payload: Record<string, unknown>,
  secret: Secret,
  exprirestime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: exprirestime });
};

const verifeidtoken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwthelpers = {
  createtoken,
  verifeidtoken,
};
