import { http, HttpResponse } from "msw";

const USER_URL_PREFIX = "http://server.com/api/v1/users";

export const usersHandlers = [
  http.post(USER_URL_PREFIX, () => {
    return HttpResponse.json({
      status: "SUCCESS",
      data: null,
    });
  }),
  http.post(USER_URL_PREFIX + "/email/verify", async ({ request }) => {
    const body = await request.json();

    const { code } = body as { code: string };

    if (code === "123456") {
      return HttpResponse.json({
        status: "SUCCESS",
        data: null,
      });
    } else if (code === "000000") {
      return HttpResponse.json({
        status: "FAIL",
        code: "INVALID_PARAMETER",
        message: "Invalid Parameter. Please Check Request Documentation",
      });
    } else if (code === "111111") {
      return HttpResponse.json({
        status: "FAIL",
        code: "AUTH_CODE_EXPIRED",
        message: "Auth Code Expired. Please Try Again",
      });
    }
  }),
  http.post(USER_URL_PREFIX + "/email/auth", async ({ request }) => {
    const body = await request.json();

    const { email } = body as { email: string };

    if (email === "fail@test.com") {
      return HttpResponse.json({
        status: "FAIL",
        code: "UNKNOWN_ERROR",
        message: "Unknown Server Error.",
      });
    }
  }),

  http.get(USER_URL_PREFIX + "/duplicate", async ({ params }) => {
    const { type, value } = params as { type: string; value: string };

    if (type === "email" && value === "duplicate@test.com") {
      return HttpResponse.json({
        status: "FAIL",
        code: "USER_ALREADY_REGISTERED",
        message:
          "User already registered. Please use another email or nickname",
      });
    }
  }),
];
