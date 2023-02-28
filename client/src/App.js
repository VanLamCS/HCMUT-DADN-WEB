import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Layout from "./layout/DefaultLayout";
import Test from "./Test";


function App() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <BrowserRouter>
      <Routes>
        {user != null ? (
          <>
            <Route
              index
              element={
                <Layout>
                  {/* <OverviewPage /> */}
                </Layout>
              }
            ></Route>
            
            <Route path="/login" element={<Navigate to="/" />}></Route>
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Navigate to="/login" />}></Route>
            <Route path="/profile" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            
            {/* Test component <Test/> */}
            <Route path="/" element={ <Layout><Test/></Layout>}></Route>
           
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
