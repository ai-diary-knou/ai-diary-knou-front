import KeywordItem from "./KeywordItem";

const keywordList = [
  "야근",
  "주말",
  "방학",
  "휴가",
  "떡볶이",
  "정보처리기사",
  "포트폴리오",
  "이직",
  "개발공부",
  "프로젝트",
];
const KeywordList = () => {
  return (
    <ul className="w-full flex flex-wrap gap-3">
      {keywordList.map((keyword, index) => (
        <KeywordItem key={index} keyword={keyword} />
      ))}
    </ul>
  );
};

export default KeywordList;
