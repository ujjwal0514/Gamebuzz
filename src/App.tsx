import "./App.css";
import "./index.css";
import Home from "./components/Home";
import ErrorBoundary from "./functions/ErrorBoundry";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </>
  );
}

export default App;
