import { http, HttpResponse } from "msw";

export const USER_URL_PREFIX = "http://localhost:5173/api/v1/users";

export const usersHandlers = [
  // 회원가입
  http.post(USER_URL_PREFIX, async ({ request }) => {
    const body = await request.json();

    const { email, password, rePassword } = body as {
      email: string;
      password: string;
      nickname: string;
      rePassword: string;
    };

    if (password !== rePassword) {
      return HttpResponse.json({
        status: "FAIL",
        code: "INVALID_PARAMETER",
        message: "Invalid Parameter. password and rePassword mismatch.",
      });
    }

    if (email === "already@gmail.com") {
      return HttpResponse.json({
        status: "FAIL",
        code: "USER_ALREADY_REGISTERED",
        message: "User already registered.",
      });
    }

    if (email === "test@gmail.com") {
      return HttpResponse.json({
        status: "SUCCESS",
        data: null,
      });
    }
  }),

  // 로그인
  http.post(USER_URL_PREFIX + "/login", async ({ request }) => {
    const body = await request.json();

    const { email, password } = body as { email: string; password: string };

    if (email === "test@gmail.com" && password === "Aa!123456") {
      return HttpResponse.json({
        status: "SUCCESS",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      });
    }else{
      return HttpResponse.json({
        status: "FAIL",
        code: "INVALID_PARAMETER",
        message: "Invalid Parameter. email or password mismatch.",
      });
    }
  }),

  // 이메일 인증 코드 발송
  http.post(USER_URL_PREFIX + "/email/auth-code", async ({ request }) => {
    const body = await request.json();

    const { email } = body as { email: string };

    if (email === "fail@gmail.com") {
      return HttpResponse.json({
        status: "FAIL",
        code: "EMAIL_SEND_ERROR",
        message: "Email send error. Please check if email exists.",
      });
    }

    if (email === "1229juwon67@gmail.com") {
      return HttpResponse.json({
        status: "SUCCESS",
        data: "A!12345678",
      });
    }
  }),

  // 이메일 인증
  http.post(USER_URL_PREFIX + "/email/auth", async ({ request }) => {
    const body = await request.json();

    const { code } = body as { email: string; code: string };

    if (code === "A!00000000") {
      return HttpResponse.json({
        status: "FAIL",
        code: "AUTH_CODE_EXPIRED",
        message: "Auth Code Expired. Please Try Again",
      });
    }

    if (code === "A!99999999") {
      return HttpResponse.json({
        status: "FAIL",
        code: "EMAIL_AUTH_FAIL",
        message: "Email Auth Failed. Please Try Again",
      });
    }

    if (code === "A!12345678") {
      return HttpResponse.json({
        status: "SUCCESS",
        data: null,
      });
    }
  }),

  // 이메일, 닉네임 중복 확인
  http.get(USER_URL_PREFIX + "/duplicate", async ({ request }) => {
    const url = new URL(request.url);

    const type = url.searchParams.get("type");
    const value = url.searchParams.get("value");

    if (type === "email" && value === "duplicate@gmail.com") {
      return HttpResponse.json({
        status: "FAIL",
        code: "USER_ALREADY_REGISTERED",
        message:
          "User already registered. Please use another email or nickname",
      });
    }

    if (type === "email" && value === "test") {
      return HttpResponse.json({
        status: "FAIL",
        code: "INVALID_PARAMETER",
        message:
          "Invalid Parameter. Email can only be ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      });
    }

    if (type === "nickname" && value === "!@%23!!!!!!!") {
      return HttpResponse.json({
        status: "FAIL",
        code: "INVALID_PARAMETER",
        message:
          "Invalid Parameter. Nickname can only be ^([가-힣a-zA-Z0-9]*)$",
      });
    }

    return HttpResponse.json({
      status: "SUCCESS",
      data: null,
    });
  }),

  // 비밀번호 변경
  http.put(USER_URL_PREFIX + "/password", async ({ request }) => {
    const body = await request.json();

    const { password, rePassword } = body as {
      password: string;
      rePassword: string;
    };

    if (password !== rePassword) {
      return HttpResponse.json({
        status: "FAIL",
        code: "INVALID_PARAMETER",
        message: "Invalid Parameter. password and rePassword mismatch.",
      });
    }

    if (password === "Aa!123456") {
      return HttpResponse.json({
        status: "SUCCESS",
        data: null,
      });
    }
  }),
];