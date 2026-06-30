import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Home/Layout";
import Dashboard from "./pages/dashboard";
import Accounts from "./pages/accounts";
import Scheduler from "./pages/scheduler";
import AIClient from "./pages/AIComposer";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element = {<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/schedule" element={<Scheduler />} />
                    <Route path="/aicomposer" element=
                    {<AIClient />} />
                </Route>
            </Routes>
        </>
    );
}
