import queryString from 'query-string';
import https from 'https';
import qs from "qs";
import axios from 'axios';
import { AUTH_CONFIG } from '../Config';

export default class Auth {
    accessToken;
    idToken;
    expiresAt;

    constructor() {
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.logout = this.logout.bind(this);
    }

    loginOriginal() {
        var url = AUTH_CONFIG.authUrl + "?response_type=id_token token&client_id=" + AUTH_CONFIG.clientId + "&scope=openid&nonce=13e2312637dg136e1&";
        var redirectUrl = "redirect_uri=" + AUTH_CONFIG.callbackUrl;
        url = url + redirectUrl;
        window.location.href = url;
    }

    login = async (email, password) =>{
        console.log('INICIO lOGIN');
        let tokenJson = await axios({
            method: 'POST',
            url: `https://192.168.21.120:9443/oauth2/token?grant_type=password&username=qliksense@close-upinternational.com&password=qliksense`,
            data: qs.stringify({
                grant_type: 'password',
                username: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: 'json',
            auth: {
                username: 'n6wQfTf7FyU9vOcWJfrHnCZOve0a',
                password: '0fzwyEY7xlHzd1YCQdlmzUckVtka'
            },
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            })
        });
    
        let responseSaml = await axios({
            method: 'GET',
            url: 'https://192.168.21.120:9443/samlsso',
            params: {
                spEntityID: 'saml'
            },
            headers: {
                'Authorization': `${tokenJson.data.token_type} ${tokenJson.data.access_token}`
            }
        });
        var iframe = document.createElement('iframe');
       
        document.body.appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(responseSaml.data);
        iframe.contentWindow.document.close();
       
        localStorage.setItem('isLoggedIn', 'true');
        window.history.pushState('', '', '/callback');
    }

    handleAuthentication() {
        console.log("Inicia handleAuthentication 2 ", this.props);
        // Set isLoggedIn flag in localStorage
        const authResult = window.location;
        console.log('authResult=', authResult);
        localStorage.setItem('isLoggedIn', 'true');

    }

    handleAuthenticationOriginal() {
        console.log("handling the response received from APIM");
        const authResult = queryString.parse(window.location.hash);
        console.log(authResult);
        if (authResult && authResult.access_token && authResult.id_token) {
            // Set isLoggedIn flag in localStorage
            localStorage.setItem('isLoggedIn', 'true');

            // Set the time that the access token will expire at
            let expiresAt = (authResult.expires_in * 1000) + new Date().getTime();
            this.accessToken = authResult.access_token;
            this.idToken = authResult.id_token;
            this.expiresAt = expiresAt;

            localStorage.setItem('accessToken', this.accessToken);
        } else {
            console.log("An error occurred while authentication.");
            alert(`Error: Check the console for further details.`);
        }
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag and other token flags from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        //   let expiresAt = this.expiresAt;
        // return new Date().getTime() < expiresAt;
        return localStorage.getItem("isLoggedIn");
    }

    getAccessToken() {
        return localStorage.getItem("accessToken");
    }

}
