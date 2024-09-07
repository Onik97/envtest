import Loading from "./components/loading";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { useHelloWorld } from "./helloWorldHooks";
import ErrorDisplay from "./components/errorDisplay";
const { VITE_NAME } = import.meta.env;

export default function App() {
  const [trigger, setTrigger] = useState(false);
  const { data, error, isLoading } = useHelloWorld(trigger);

  const handleClick = () => {
    setTrigger(true);
  };

  return (
    <>
      <div>
        Hello World <p>My Vite Variable is: {VITE_NAME ?? "undefined"}</p>
        <Button onClick={handleClick}>Click me</Button>
        <hr />
        {isLoading && <Loading />}
        {error && <ErrorDisplay error={error} />}
        {data && <>{data.message}</>}
      </div>
    </>
  );
}
