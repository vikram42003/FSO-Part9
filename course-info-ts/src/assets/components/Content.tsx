interface CoursePartInfo {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePartInfo[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
