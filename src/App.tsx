import {useEffect} from "react";
import {useGetAllPost} from "./api/post";

function App() {
  const {data, isLoading} = useGetAllPost({
    urlParams: {
      postId: 2,
    },
    queryParams: {
      age: 4124,
    },
  });

  return <div className="App"></div>;
}

export default App;
