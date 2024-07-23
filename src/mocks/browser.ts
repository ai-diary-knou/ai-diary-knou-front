import { setupWorker } from "msw/browser";
import { usersHandlers } from "./users/handlers";
import { diaryHandlers } from "./diary/handlers";

export const worker = setupWorker(...usersHandlers, ...diaryHandlers);
