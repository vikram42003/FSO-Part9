import Content from "./assets/components/Content";
import Header from "./assets/components/Header";
import Total from "./assets/components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <Total text={"Number of exercises"} total={totalExercises} />
    </div>
  );
};

export default App;
