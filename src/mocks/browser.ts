import { setupWorker } from "msw/browser";
import { usersHandlers } from "./users/handlers";

export const worker = setupWorker(...usersHandlers);