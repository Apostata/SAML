import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.21.120:8281/pizzashack/1.0.0';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    componentDidMount() {
        const { getAccessToken } = this.props.auth;
        window.location.href = 'http://localhost:8080/saml2-web-app-pickup-manager.com/samlsso';
    }

    render() {
        return (
            <div className="container">
                <div className="card-columns">
                    {this.state.menuItems === null && <p>Loading menu...</p>}
                    {
                        this.state.menuItems && this.state.menuItems.map(item => (
                            <div key={item.name} className="card">
                                <div className="card-header">{item.name}</div>
                                <div className="card-body">
                                    <p className="card-text">{item.description}</p>
                                    <a href="#" className="btn btn-primary">More...</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Menu;