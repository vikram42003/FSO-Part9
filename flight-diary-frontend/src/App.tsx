import DiaryEntries from "./components/DiaryEntries";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header text={"Ilari's Flight Diaries"} />
      <DiaryEntries />
    </div>
  );
};

export default App;
