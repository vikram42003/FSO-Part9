import { CoursePart } from "../../App";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  let description, groupProject, background, special;

  switch (part.kind) {
    case "basic":
      description = <div>{part.description}</div>;
      break;
    case "group":
      groupProject = <div>Group project count: {part.groupProjectCount}</div>;
      break;
    case "background":
      background = <div>Background material: {part.backgroundMaterial}</div>;
      break;
    case "special":
      special = <div>Required skills: {part.requirements.join(", ")}</div>;
      break;
    default: {
      const never: never = part;
      return never;
    }
  }

  return (
    <div>
      <h3>
        {part.name} {part.exerciseCount}
      </h3>
      {description}
      {groupProject}
      {background}
      {special}
    </div>
  );
};

export default Part;
