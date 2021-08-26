import styles from "./App.module.css";
import Header from "./components/Layout/Header";
import PartsTable from "./components/PartsTable";
import Content from "./components/Layout/Content";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PartsPage from "./pages/PartsPage";

function App() {
  return (
    <div className={styles.App} style={{ fontFamily: "Poppins, sans-serif" }}>
      <Header />

      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Content>
              <PartsTable />
            </Content>
          </Route>

          <Route exact path="/details/:name">
            <Content>
              <PartsPage />
            </Content>
          </Route>

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
