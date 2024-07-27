import { http, HttpResponse } from "msw";
import { API_URL } from "../../constant/api";

export const DIARY_URL_PREFIX = `${API_URL}/api/v1/diaries`;

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

  http.get(DIARY_URL_PREFIX + "/:diaryId", ({ params }) => {
    const { diaryId } = params;

    console.log(diaryId);

    return HttpResponse.json({
      status: "SUCCESS",
      data: {
        entryDate: "2024-07-05 Fri",
        emotions: {
          content: "평온함, 만족감",
          words: [
            {
              text: "평온함",
              scale: 9,
            },
            {
              text: "만족감",
              scale: 8,
            },
          ],
        },
        selfThoughts: {
          content:
            "친구와의 소중한 대화를 통해 정서적 안정감을 느꼈고, 창조적인 시간을 가진 것이 자기 성취감으로 이어졌다.",
          words: [
            {
              text: "정서적 안정감",
              scale: 8,
            },
            {
              text: "자기 성취감",
              scale: 7,
            },
            {
              text: "소중한",
              scale: 8,
            },
            {
              text: "창조적인",
              scale: 7,
            },
          ],
        },
        coreValues: {
          content: "소중한 사람들과의 소중한 시간, 창조적인 시간을 가짐",
          words: [
            {
              text: "소중한",
              scale: 8,
            },
            {
              text: "창조적인",
              scale: 7,
            },
            {
              text: "시간",
              scale: 7,
            },
          ],
        },
        recommendedActions: [
          "친구와 자주 소통하며 소중한 대화를 나누기",
          "새로운 취미나 관심사를 찾아 창조적인 활동에 몰두해보기",
          "가족과 함께 시간을 보내며 감사하고 소중한 순간을 공유하기",
        ],
        additionals: [
          "하루를 마무리하면서 내일을 준비하는 과정은 마음을 정돈하고 새로운 에너지를 얻게 해줄 수 있다.",
        ],
        literarySummary:
          "소중한 사람들과의 만남과 창조적인 시간이 얼마나 소중하고 큰 의미를 지니는지를 느낄 수 있는 '소년이 온다'처럼, 오늘의 특별한 경험은 내일을 기대하는 희망으로 이어졌다.",
        diaryContent:
          "오늘은 특별히 여유로운 하루였다. 아침에는 일찍 일어나서 창밖으로 내다보이는 일출을 구경했다. 하늘은 맑고 바람은 부드럽게 불어와 마음이 맑아졌다. 아침 식사 후에는 오랜만에 친구들과 온라인으로 만나서 이야기를 나눴다. 서로 최근에 있었던 일들과 계획 등을 나누며 시간 가는 줄 몰랐다. 그래서 그들과 만나는 시간이 너무나도 소중했다. 오후에는 새로운 취미를 찾아보기로 했다. 오랜만에 그림을 그려보기로 마음 먹고, 동네 예술용품 가게를 방문해서 필요한 도구들을 샀다. 집에 돌아와서는 창밖의 풍경을 그려보았는데, 그 과정에서의 새로운 발견과 창조적인 즐거움이 정말 기분 좋았다. 저녁에는 가족과 함께 저녁 식사를 하면서 하루를 마무리했다. 가족들과 함께 시간을 보내는 것이 얼마나 소중하고 감사한 일인지 다시 한번 느낄 수 있었다. 하루가 저물어가면서, 내일의 일정과 할 일들을 생각하며 마음을 다잡았다. 오늘 하루의 평온함과 만족감을 잊지 않고, 내일 또 다른 새로운 하루를 기대하며 잠에 들었다.",
      },
    });
  }),
];
