import {Navigate, Route, Routes} from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { GamesIndex } from "../pages/games/GamesIndex";
import {useAuthContext} from "../context/AuthContext.jsx";
import {UserLayout} from "../components/UserLayout.jsx";
import {CartIndex} from "../pages/cart/CartIndex.jsx";

export const Router = () => {
    const {token} = useAuthContext()

    return (
        <Routes>
            <Route path="login" element={token ? <Navigate to='/' /> : <Login />} />
            <Route path="register" element={token ? <Navigate to='/' /> : <Register />} />

            <Route path="/" element={<UserLayout />}>
                <Route index element={<GamesIndex />} />
                <Route path='cart' element={<CartIndex />} />
            </Route>
        </Routes>
    )
}
