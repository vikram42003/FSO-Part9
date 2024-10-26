import { CoursePart } from "../../App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((c) => (
        <Part key={c.name} part={c} />
      ))}
    </div>
  );
};

export default Content;
