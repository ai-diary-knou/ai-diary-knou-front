import Typography from "../../shared/Typography";

interface RecommendListProps {
  recommendList: string[];
}

const RecommendList = ({ recommendList }: RecommendListProps) => {
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
