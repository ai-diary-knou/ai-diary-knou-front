import KeywordItem from "./KeywordItem";

interface KeywordListProps {
  keywordList: string[];
}

const KeywordList = ({ keywordList }: KeywordListProps) => {
  return (
    <ul className="w-full flex flex-wrap gap-3">
      {keywordList.map((keyword, index) => (
        <KeywordItem key={index} keyword={keyword} />
      ))}
    </ul>
  );
};

export default KeywordList;
