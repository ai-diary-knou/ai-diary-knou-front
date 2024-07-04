import Typography from "../../shared/Typography";

const recommendList = [
  "사이드 프로젝트 팀원 모집",
  "2학기 추천 과목 찾기",
  "인사이드 아웃2 예매 하기",
];

const RecommendList = () => {
  return (
    <div className="flex flex-col gap-1">
      {recommendList.map((recommend) => (
        <Typography variant="body1" textAlign="left" key={recommend}>
          {recommend}
        </Typography>
      ))}
    </div>
  );
};

export default RecommendList;
