import Typography from "../../shared/Typography";

interface KeywordItemProps {
  keyword: string;
}

const KeywordItem = ({ keyword }: KeywordItemProps) => {
  return (
    <li className="px-7 h-8 flex justify-center items-center rounded-2xl border-black border-2 shadow-sm">
      <Typography variant="body1">{keyword}</Typography>
    </li>
  );
};

export default KeywordItem;
