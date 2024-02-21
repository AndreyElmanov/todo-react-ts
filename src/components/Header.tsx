import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
    const nav = useNavigate();
    const navTo = () => nav('/');

    return (
        <div className={'d-flex mb-3 w-100 border justify-content-between align-items-center border-top-0 border_radius p-3'}>
            <h1 className={'cursor_pointer'} onClick={navTo}>toDo List</h1>
            <Navbar sticky="top" className="pt-0" expand={'sm'}>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
                <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-false"
                        aria-labelledby="offcanvasNavbarLabel-expand-false"
                        placement="start" >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                            toDo List
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="mx-3">
                            <NavLink to={'/'} className={'btn'}>toDo's</NavLink>
                            <NavLink to={'/apiTodos'} className={'btn'}>apiToDo's</NavLink>
                            <NavLink to={'/user'} className={'btn'}>
                                <i className="bi bi-person-circle"></i>
                                <span className={'mx-1'}>UserInfo</span>
                            </NavLink>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar>
        </div>
    )
}