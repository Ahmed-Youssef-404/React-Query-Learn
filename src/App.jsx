import { useQuery } from "@tanstack/react-query"


function App() {

  const { data, error, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json()
        ),
  })

  if (error) {
    return (
      <div>
        Something went wrong
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        Loading.....
      </div>
    )
  }

  return (
    <div className="App">
      {data.map((todo) => (
        <div key={todo.id}>
          <h1>ID: {todo.id}</h1>
          <h2>Title: {todo.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default App
