// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDescPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpeciallPart extends CourseWithDescPart {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpeciallPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
)

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch(coursePart.type) {
    case "normal":
      return <p><h2>{coursePart.name} {coursePart.exerciseCount}</h2><em>{coursePart.description}</em></p>
      break;
    case "groupProject":
      return <p><h2>{coursePart.name} {coursePart.exerciseCount}</h2>project exercises {coursePart.groupProjectCount}</p>
      break;
    case "submission":
      return <p><h2>{coursePart.name} {coursePart.exerciseCount}</h2><em>{coursePart.description}</em><div>submit to {coursePart.exerciseSubmissionLink}</div></p>
      break;
    case "special":
      return <p><h2>{coursePart.name} {coursePart.exerciseCount}</h2><em>{coursePart.description}</em><div>required skills: {coursePart.requirements.join(", ")}</div></p>
      break;
    default:
      return assertNever(coursePart);    
  }
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (<>
  {courseParts.map(cp => <Part key={cp.name} coursePart={cp} />)}
</>)

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <p>
  Number of exercises{" "}
  {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;