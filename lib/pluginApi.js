"use strict";

let debug = require('debug')('pluginApi');
let http = require('http');

function inRangeOk(statusCode) {
    return statusCode >= 200 && statusCode < 300;
}

class SimplifierApi {

    /**
     * Create API object
     * @param {PluginSettings} settings plugin settings
     * @param {PluginDescription} description plugin description
     * @param {object} manifest plugin manifest
     */
    constructor(settings, description, manifest) {
        this.settings = settings;
        this.description = description;
        this.manifest = manifest;
        this.baseUrl = `http://${settings.registrationHost}:${settings.registrationPort}`;
    }

    register() {
        debug(`Registering plugin to Simplifier (located at ${this.baseUrl})`);
        return this._post('/api/registration', this.manifest).then(
            () => {
                debug('Register successful');
            },
            (error) => {
                debug(`Register error ${error.statusCode}: ${error.message}`);
                throw 'Error Registering';
            }
        );
    }

    unregister() {
        debug('Unregistering from Simplifier ...');
        return this._delete(`/api/registration/${this.description.name}`).then(
            () => {
                debug('Unregistering successful');
            },
            (error) => {
                debug(`Unregister error ${error.statusCode}: ${error.message}`);
                throw 'Error unregistering';
            }
        );
    }

    /**
     * Build headers for plugin API request.
     * @param {number?} userId options user id
     * @param {object} extendedHeaders addition headers
     * @returns {object} headers object
     * @private
     */
    _apiHeaders(userId, extendedHeaders) {
        let headers = {
            'Plugin-Secret': this.settings.registrationSecret,
            'Plugin-Request-Source': `Plugin ${this.description.name}`
        };
        if (userId) {
            headers['Simplifier-User'] = userId;
        }

        return Object.assign({}, headers, extendedHeaders || {});
    }

    _delete(url, userId) {
        return this._req(url, 'DELETE', userId);
    }

    _post(url, body, userId) {
        return this._reqWithBody(url, 'POST', body, userId);
    }

    /**
     * Run request against Simplifier API with JSON body.
     * @param {string} url url on Simplifier API
     * @param {string} method method to execute
     * @param {string|object} body json body to send
     * @param {number?} userId option userId
     * @returns {Promise} promise of response
     * @private
     */
    _reqWithBody(url, method, body, userId) {
        return new Promise((resolve, reject) => {
            let bodyStr = body;
            if (typeof body !== 'string')  {
                bodyStr = JSON.stringify(body);
            }
            let jsonHeaders = {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': Buffer.byteLength(bodyStr)
            };
            let req = http.request({
                hostname: this.settings.registrationHost,
                port: this.settings.registrationPort,
                path: url,
                method: method,
                headers: this._apiHeaders(userId, jsonHeaders)
            }, (res) => {
                SimplifierApi._handleJsonResponse(res, resolve, reject);
            });
            req.write(bodyStr);
            req.end();
        });
    }

    /**
     * Run request against Simplifier API without body.
     * @param {string} url url on Simplifier API
     * @param {string} method method to execute
     * @param {number?} userId option userId
     * @returns {Promise} promise of response
     * @private
     */
    _req(url, method, userId) {
        return new Promise((resolve, reject) => {
            let req = http.request({
                hostname: this.settings.registrationHost,
                port: this.settings.registrationPort,
                path: url,
                method: method,
                headers: this._apiHeaders(userId)
            }, (res) => {
                SimplifierApi._handleJsonResponse(res, resolve, reject);
            });
            req.end();
        });
    }

    static _handleJsonResponse(res, resolve, reject) {
        let streamedData = '';
        res.on('data', (data) => streamedData += data);
        res.on('end', () => {
            if (inRangeOk(res.statusCode)) {
                let responseJson = streamedData;
                try {
                    responseJson = JSON.parse(streamedData);
                } catch(e) {
                }
                resolve(responseJson);
            } else {
                let message = streamedData;
                try {
                    message = JSON.parse(streamedData)['message']
                } catch (e) {}
                reject({'message': message, 'statusCode': res.statusCode});
            }
        });
    }

}

module.exports = new SimplifierApi(
    require('./settings'),
    require('./pluginDescription'),
    require('./pluginManifest')
);