interface TotalProps {
  text: string;
  total: number;
}

const Total = ({ text, total }: TotalProps) => {
  return (
    <div>
      <p>
        {text} {total}
      </p>
    </div>
  );
};

export default Total;
