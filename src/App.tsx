import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "@/pages/HomePage"
import { CarDetailsPage } from "@/pages/CarDetailsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
