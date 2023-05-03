import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import KanbanHome from "./components/home/HomeRouter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <KanbanHome />
    </Provider>
  );
};

export default App;
