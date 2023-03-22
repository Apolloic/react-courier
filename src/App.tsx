import {useEffect} from "react";
import {useGETAllPost} from "./api/post";
import {useAxiosQueryClient} from "./lib/axiosQuery/hooks/useAxiosQueryClient";

function App() {
  const {isError, data, isLoading, error} = useGETAllPost({
    queryParams: {
      age: 22,
    },
    urlParams: {
      postId: 233,
    },
  });

  useEffect(() => {
    if (!isError) return;
    console.log(isError);
  }, [isError, error, data, isLoading]);

  const QueryClient = useAxiosQueryClient();

  const onRequestHandler = () => {
    QueryClient.refetchQueries(
      useGETAllPost.getQueryKey({
        queryParams: {
          age: 22,
        },
        urlParams: {
          postId: 233,
        },
      })
    );
  };

  return (
    <div className="App">
      <button onClick={onRequestHandler}>Request</button>
    </div>
  );
}

export default App;
