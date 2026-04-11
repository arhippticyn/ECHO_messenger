import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Bars } from 'react-loader-spinner'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const AuthPage = lazy(() => import('./pages/Auth'))
const HomePage = lazy(() => import('./pages/Home'))
const ChatPage = lazy(() => import('./pages/Chat'))

function App() {
  return (
    <Suspense
      fallback={
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      }
    >
      <>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    </Suspense>
  )
}

export default App
