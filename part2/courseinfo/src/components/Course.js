const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Course = ({ course }) => {
  const sum = (parts) => {
    return parts.reduce(
      (prev, curr) => { return { exercises: prev.exercises + curr.exercises } },
      { exercises: 0 }
    ).exercises
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum(course.parts)} />
    </div>
  )
}

export default Course