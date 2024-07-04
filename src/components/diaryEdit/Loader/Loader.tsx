import Progress from "../../shared/Progress";
import Typography from "../../shared/Typography";

const Loader = () => {
  return (
    <div className="mx-8 my-[60px]">
      <div className="mb-[60px]">
        <Typography variant="h5" textAlign="center">
          AI 요약 생성 중
        </Typography>
      </div>
      <div className="mb-[60px]">
        <Typography variant="body1" textAlign="center">
          작성해주신 일기를 AI가 열심히 분석하고
          <br />
          요약하고 있습니다. 잠시만 기다려주세요.
          <br />
          요약이 완료되면 일기 상세 페이지로 이동됩니다.
        </Typography>
      </div>
      <div className="flex justify-center">
        <Progress />
      </div>
    </div>
  );
};

export default Loader;
