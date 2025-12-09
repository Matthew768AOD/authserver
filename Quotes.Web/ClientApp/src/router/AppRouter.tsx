import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Quotes from "../pages/Quotes";
import Authors from "../pages/Authors";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/authors" element={<Authors />} />
            </Routes>
        </BrowserRouter>
    );
}