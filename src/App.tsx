import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Loader from './components/Loader/Loader'

const AuthPage = lazy(() => import('./pages/Auth'))
const HomePage = lazy(() => import('./pages/Home'))
const ChatPage = lazy(() => import('./pages/Chat'))
const MainLayout = lazy(() => import('./components/Layout/MainLayout'))

function App() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
