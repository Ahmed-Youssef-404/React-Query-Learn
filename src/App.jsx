import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import "./App.css"

function App() {

  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json()
        ),
  })


  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }).then((res) => res.json()),
      onSuccess: ()=>{
        queryClient.setQueryData(['posts'])
      }
  })


  if (error || isError) {
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
      {isPending &&<p>Data is beaing added</p>}
      <button
        onClick={() => mutate(
          {
            "userId": 5000,
            "id": 4000,
            "title": "A new title",
            "body": "A new body"
          }
        )}
      >
        Add Post
      </button>
      {data.map((todo) => (
        <div className="element" key={todo.id}>
          <h4>ID: {todo.id}</h4>
          <h4>Title: {todo.title}</h4>
          <p>Body: {todo.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App
