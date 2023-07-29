import {NextFunction, RequestHandler} from "express";
import {server} from "../..";
import APIError from "../../utils/ApiError";
import {UNAUTHORIZED} from "http-status";

// @ERROR_TYPE 404_ROUTES
const routeNotFoundError: RequestHandler = (req, _, next) => {
  next(APIError.notFound(`Can't find ${req.originalUrl} on this server!`));
};

// @ERROR_TYPE  UNHANDLED_EXCEPTIONS
function uncaughtException(err: Error): void {
  console.log(err.name, err.message);
  console.log("UNCAUGHT_EXCEPTIONS! Server Shutting down...");
  process.exit(1);
}

// @ERROR_TYPE  UNHANDLED_REJECTION
function unhandledRejection(err: Error): void {
  console.error(err.name, err.message);
  server.close(() => {
    console.log("UNHANDLED_REJECTIONS! Server Shutting down...");
    process.exit(1);
  });
}

// @ERROR_TYPE  INVALID_TOKEN_ERROR
const handleJwtInvalidError = () =>
  APIError.unauthorized(`Invalid token, please login again`);

// @ERROR_TYPE EXPIRED_TOKEN_ERROR
const handleJwtExpiredError = () =>
  APIError.unauthorized(`Expired token, please login again`);

export {
  routeNotFoundError,
  uncaughtException,
  unhandledRejection,
  handleJwtInvalidError,
  handleJwtExpiredError,
};
