const Hello = (props) => {
  return (
    <>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </>
  )
}

const App = () => {
  console.log('Hello from component')
  const now = new Date()
  const a = 10
  const b = 20

  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Hello name="George" />
      <Hello name="Daisy" />
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

export default App