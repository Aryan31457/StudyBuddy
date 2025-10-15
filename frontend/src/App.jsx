
import './App.css';
import Sidebar from './Components/SideBar/Sidebar';
import Topbar from './Components/Topbar';
import ChatPage from './Pages/Chat/ChatPage';
import DashboardPage from './Pages/DashBoard/DashboardPage';
import TasksPage from './Pages/Calendar/TasksPage';
import DayPage from './Pages/Calendar/DayPage';
import WeekPage from './Pages/Calendar/WeekPage';
import MonthPage from './Pages/Calendar/MonthPage';
import MaterialsPage from './Pages/Materials/MaterialsPage';
import TestsPage from './Pages/Tests/TestsPage';
import FlashcardsPage from './Pages/Flashcards/FlashcardsPage';
import CreateTestPage from './Pages/Tests/CreateTestPage';
import LiveLecturePage from './Pages/LiveLecture/LiveLecturePage';
import LoginPage from './Pages/Auth/LoginPage';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';


function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // Determine activeKey for sidebar
  let activeKey = 'home';
  if (location.pathname.startsWith('/chat')) activeKey = 'chat';
  else if (location.pathname.startsWith('/materials')) activeKey = 'notes-materials';
  else if (location.pathname.startsWith('/calendar')) activeKey = 'calendar';
  else if (location.pathname.startsWith('/tests')) activeKey = 'quizfetch';
  // Topbar title based on route
  let topbarTitle = 'IIITU';
  if (activeKey === 'chat') topbarTitle = 'New Chat Session';
  else if (activeKey === 'notes-materials') topbarTitle = 'Materials';
  else if (activeKey === 'calendar') topbarTitle = 'Calendar';
  else if (activeKey === 'quizfetch') topbarTitle = 'Practice';
  return (
    <div className="main-layout">
      <Sidebar activeKey={activeKey} onMenuClick={key => {
        if (key === 'chat') navigate('/chat');
        else if (key === 'home') navigate('/');
        else if (key === 'flashcards') navigate('/flashcards');
        else if (key === 'live-lecture') navigate('/live-lecture');
        else if (key === 'notes-materials') navigate('/materials');
        else if (key === 'calendar') navigate('/calendar/tasks');
        else if (key === 'quizfetch') navigate('/tests');
      }} />
      <div className="content-area">
        <Topbar title={topbarTitle} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/live-lecture" element={<ProtectedRoute><LiveLecturePage /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
          <Route path="/calendar/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
          <Route path="/calendar/day" element={<ProtectedRoute><DayPage /></ProtectedRoute>} />
          <Route path="/calendar/week" element={<ProtectedRoute><WeekPage /></ProtectedRoute>} />
          <Route path="/materials" element={<ProtectedRoute><MaterialsPage /></ProtectedRoute>} />
          <Route path="/calendar/month" element={<ProtectedRoute><MonthPage /></ProtectedRoute>} />
          <Route path="/tests" element={<ProtectedRoute><TestsPage /></ProtectedRoute>} />
          <Route path="/tests/create" element={<ProtectedRoute><CreateTestPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
