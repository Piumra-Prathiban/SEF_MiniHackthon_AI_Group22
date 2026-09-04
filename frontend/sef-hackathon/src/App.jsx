import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ItemDetails from './pages/ItemDetails'
import Items from './pages/Items'
import ReportPage from './pages/ReportPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="items" element={<Items />} />
          <Route path="items/:id" element={<ItemDetails />} />
          <Route path="items/:id/edit" element={<ReportPage mode="edit" />} />
          <Route path="report" element={<ReportPage mode="create" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
