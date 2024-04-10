import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {Avatar} from "primereact/avatar";
import {Menubar} from "primereact/menubar";
import {useRef, useState} from "react";
import {Menu} from "primereact/menu";
import {UserFormModal} from "./user/UserFormModal.jsx";

export const UserLayout = () => {
    const [userFormvisible, setUserFormVisible] = useState(false);
    const navigate = useNavigate();
    const userMenu = useRef(null);
    const {token, authenticatedUser, logout} = useAuthContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const handleDialog = () => setUserFormVisible(!userFormvisible);

    const menuItems = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
    ];

    const userOptions = [
        {
            label: '',
            items: [
                {
                    label: 'Edit profile',
                    icon: 'pi pi-user-edit',
                    command: handleDialog,
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: logout,
                }
            ]
        }
    ];

    const start = (
        <div className='font-bold text-4xl cursor-pointer'
            onClick={() => navigate('/')}
        >
            <span className='hidden lg:block'>GameStore</span>
            <span className='block lg:hidden'>GS</span>
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-3">
            {/*<i className="pi pi-shopping-cart text-2xl py-4 cursor-pointer"*/}
            {/*    onClick={() => navigate('/cart')}*/}
            {/*/>*/}
            <div
                className='cursor-pointer flex align-items-center gap-1 py-4'
                onClick={(event) => userMenu.current.toggle(event)} aria-controls="popup_user_menu" aria-haspopup
            >
                <Avatar
                    image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                    shape="circle"
                />
                <span className="font-bold text-gray-200">{authenticatedUser?.name}</span>
            </div>

            <Menu
                model={userOptions}
                popup ref={userMenu} id="popup_user_menu" />
        </div>
    );

    return (
        <div className=''>
            <div className="card bg-cyan-800 sticky top-0 z-5">
                <Menubar
                    className='text-white bg-transparent border-none py-0 container'
                    style={{borderRadius: 0}}
                    model={[]}
                    start={start}
                    end={end}
                />
                <UserFormModal
                    visible={userFormvisible}
                    handleDialog={handleDialog}
                    userData={authenticatedUser}
                />
            </div>
            <div className='container pt-5'>
                <Outlet />
            </div>
        </div>
    )
}