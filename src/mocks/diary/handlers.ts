import { http, HttpResponse } from "msw";

export const DIARY_URL_PREFIX = "http://server.com/api/v1/diaries";

export const diaryHandlers = [
  http.get(DIARY_URL_PREFIX + "/main-reports", () => {
    return HttpResponse.json({
      status: "SUCCESS",
      data: {
        recentLiterarySummaries: [
          "가족의 소중함과 친구와의 소중한 대화, 창조적인 활동으로 채워진 하루는 마치 '소년이 온다'의 따뜻한 감성을 떠올리게 한다.",
          "맑은 하늘 아래, 새로운 취미를 통해 자아실현의 즐거움을 맛본다.",
          "가족이 함께하는 이 순간은 마치 헤르만 헤세의 '데미안' 속에서처럼 영원할 것 같다.",
          "하늘에는 구름이 떠다니며, 마음은 자아실현의 길을 향해 걸어가고 있다.",
          "오늘의 하루는 마치 '백설공주'의 악마의 마법 거울과 같았다. 자신의 가치를 발견하고 성장하기 위한 여정이 시작되었다.",
        ],
        recentAverageEmotionScales: [7.12, 5.5, 6.78, 6, 4.2],
        recentRepetitiveKeywords: [
          "가족",
          "친구",
          "창조",
          "평온함",
          "만족감",
          "피곤함",
          "커피",
          "생일",
          "케이크",
          "취미",
        ],
        recentRecommendedActions: [
          "친구들과 자주 만나 소중한 대화를 나누기",
          "새로운 취미를 발견하고 창조적인 활동에 시간을 투자하기",
          "가족과 함께 시간 보내며 소중함을 깨달음",
        ],
      },
    });
  }),

  http.get(DIARY_URL_PREFIX + "/monthly-reports", () => {
    return HttpResponse.json({
      status: "SUCCESS",
      data: {
        selectedDate: "2024-07-05",
        monthlyDiaryReports: [
          {
            diaryId: 1,
            entryDate: "2024-07-01",
            literarySummary:
              "맑은 하늘 아래, 새로운 취미를 통해 자아실현의 즐거움을 맛본다.",
          },
          {
            diaryId: 2,
            entryDate: "2024-07-02",
            literarySummary:
              "가족이 함께하는 이 순간은 마치 헤르만 헤세의 '데미안' 속에서처럼 영원할 것 같다.",
          },
          {
            diaryId: 3,
            entryDate: "2024-07-03",
            literarySummary:
              "하늘에는 구름이 떠다니며, 마음은 자아실현의 길을 향해 걸어가고 있다.",
          },
          {
            diaryId: 4,
            entryDate: "2024-07-04",
            literarySummary:
              "오늘의 하루는 마치 '백설공주'의 악마의 마법 거울과 같았다. 자신의 가치를 발견하고 성장하기 위한 여정이 시작되었다.",
          },
        ],
      },
    });
  }),
];
