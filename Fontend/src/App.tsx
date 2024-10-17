import "./App.css";
import useRounteElement from "./routers/useRoute";

function App() {
  const routeElement = useRounteElement();
  return <div className='h-full w-full dark:bg-gray-800'>{routeElement}</div>;
}

export default App;
