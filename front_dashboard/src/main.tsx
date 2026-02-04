import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './components/Layout.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MaindashBoard from './pages/MaindashBoard.tsx'
import DetailPage from './pages/DetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<MaindashBoard />} />
            <Route path="/detail" element={<DetailPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
</StrictMode>
)
