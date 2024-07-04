import { Link } from "react-router-dom";
import Typography from "../components/shared/Typography";
import DairyItem from "../components/dairyDetail/DairyItem";

const DairyDetailPage = () => {
  return (
    <div className="mx-8 mt-[60px] mb-[80px]">
      <div className="flex justify-between items-end mb-[60px]">
        <Typography variant="h5" textAlign="left">
          2024년
          <br />
          7월 1일 월요일
        </Typography>
        <Link to="/edit">
          <Typography variant="caption">수정</Typography>
        </Link>
      </div>
      <DairyItem title="감정상태" content="" />
      <DairyItem
        title="자기생각"
        content="이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요."
      />
      <DairyItem title="핵심가치" content="할일을 미루지 말자" />
      <DairyItem title="해야 할 일" content="인사이드 아웃2 예매" />
      <DairyItem title="한줄 요약" content="방학은 즐거워" />
      <DairyItem
        title="내가 쓴 일기"
        content="이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요.이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요.이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요.이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요.이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요.이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요.이번 달은 방학이 있어서 한달 내내 즐거웠어요. 방학 덕분에 시간이 많이 생겨서 구매하고 미뤄뒀던 강의도 시작하고, 오랜만에 친구들도 만났어요."
      />
    </div>
  );
};

export default DairyDetailPage;
