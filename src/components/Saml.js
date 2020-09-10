import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'https://192.168.21.120:9443/samlsso?spEntityID=saml';

class Saml extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    componentDidMount() {
        console.log('inicio didmount');
        /*const { getAccessToken } = this.props.auth;

        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.get(`${API_URL}`, { headers })
            .then(response => { console.log('response=', response) })
            .catch(error => { console.log(error) });*/

        window.location.href = 'https://192.168.1.136/saml/hub/stream/c4dba0e2-3ef1-4f23-94b5-e498b019746e'
    }

    render() {
        return (
            <div className="container">
                <div className="card-columns">
                    TESTE SAML
                </div>
            </div>
        );
    }
}

export default Saml;