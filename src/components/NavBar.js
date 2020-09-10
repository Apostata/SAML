import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = (props) => {

    function login() {
       props.auth.login();
    }

    function logout() {
        props.auth.logout();
        props.history.replace('/');
    }

    const { isAuthenticated } = props.auth;

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="#">Teste SAML</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {
                        isAuthenticated() &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/menu">Menu</Link>
                        </li>
                    }
                    {
                        isAuthenticated() &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/saml">SAML</Link>
                        </li>
                    }
                </ul>
                {
                    !isAuthenticated() ?
                        (<button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={login.bind(this)}>Sign In</button>)
                        : (<button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={logout.bind(this)}>Sign Out</button>)
                }
            </div>
        </nav>
    );
}

export default withRouter(NavBar);