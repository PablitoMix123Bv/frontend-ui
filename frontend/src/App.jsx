import { Routes, Route } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InvestigationPage from './pages/InvestigationPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import FlammabilityPage from './pages/FlammabilityPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Habitat3DPage from './pages/Habitat3DPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="investigations/:id" element={<InvestigationPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="flammability" element={<FlammabilityPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="habitat" element={<Habitat3DPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
