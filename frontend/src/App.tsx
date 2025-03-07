import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import { Navigation } from "./components/Navigation";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import ProtectedTestData from "./components/ProtectedTestData";
import CountriesList from "./components/CountriesList";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import CountryDetail from "./components/CountryDetail";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<div>Home is here</div>} />
              <Route
                path="/login"
                element={
                  <>
                    <AuthRedirect />
                    <Login />
                  </>
                }
              />
              <Route path="/test" element={<TestData />} />
              <Route path="/countries" element={<CountriesList />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              <Route path="/country/:name" element={<CountryDetail />} />
              {/* Other routes... */}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
