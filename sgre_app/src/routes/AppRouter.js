import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroRiesgo from "../components/Registro de riesgos/RegistroRiesgo";

export const AppRouter = () => {
    return (
        <Router>
            <div className="row m-3">
                <Routes>
                    <Route exact path="/" element={<RegistroRiesgo/>} />
                </Routes>
            </div>
        </Router>
    );
}