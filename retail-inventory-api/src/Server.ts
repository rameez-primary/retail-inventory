import { CreateApp } from "./App";

const App = CreateApp();

App.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});

export default CreateApp;