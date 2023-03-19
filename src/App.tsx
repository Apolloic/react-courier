import {usePOSTAllPost} from "./api/post";

function App() {
  const {mutate} = usePOSTAllPost();

  const onRequestHandler = () => {
    mutate({name: "erfan"}, {});
  };

  return (
    <div className="App">
      <button onClick={onRequestHandler}>Request</button>
    </div>
  );
}

export default App;
