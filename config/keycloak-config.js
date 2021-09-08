const dotenv = require('dotenv');
dotenv.config();

var session = require('express-session');
var Keycloak = require('keycloak-connect');

const clientId = process.env.CLIENT_ID;
const serverURL = process.env.SERVER_URL;
const clientSecret = process.env.CLIENT_SECRET;
const clientRealm = process.env.CLIENT_REALM;
const clientRealmPublicKey = process.env.CLIENT_REALM_PUBLIC_KEY;

let _keycloak;

var keycloakConfig = {
    clientId: clientId,
    bearerOnly: true,
    serverUrl: serverURL,
    realm: clientRealm,
    // realmPublicKey: clientRealmPublicKey,
    // credentials: {
        secret: clientSecret,
    // },
    resave: false,
    saveUninitialized: true,
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getSessionConfig(){
    return keycloakConfig;
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak,
    getSessionConfig,
};