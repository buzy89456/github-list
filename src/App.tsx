import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { HomePage, LoginPage } from './pages';
import { ProtectedRoute } from './route';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
