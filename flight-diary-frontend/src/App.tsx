import { useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import Header from "./components/Header";
import Notification from "./components/Notification";

const App = () => {
  const [notif, setNotif] = useState<string | null>(null);

  return (
    <div>
      <Header text={"Ilari's Flight Diaries"} />
      <Notification text={notif} />
      <DiaryEntries setNotif={setNotif}/>
    </div>
  );
};

export default App;
