import { useEffect } from "react";
import { useGetAllPost } from "./api/post";

function App() {
  const { data, isLoading } = useGetAllPost({
    urlParams: {
      postId: 2,
    },
    queryParams: {
      age: 4124,
    },
  });
  useEffect(() => {
    if (isLoading) return;
    console.log(444, data)
  }, [isLoading])
  return <div className="App"></div>;
}

export default App;
