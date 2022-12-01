import { NavLink } from 'react-router-dom';

function Navbar({ auth, onLogout }) {
  function onClickLogout(evt) {
    evt.preventDefault();
    onLogout();
  }
  return (
    <header className="navbar navbar-expand navbar-dark bg-dark">
      <nav className="container-fluid">
        {auth && <span className="navbar-text">{auth.email}</span>}
        <ul className="navbar-nav">
          {!auth && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          )}
          {auth && (
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                onClick={(evt) => onClickLogout(evt)}
              >
                Logout
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink to="/pet/list" className="nav-link">
              Pet List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
