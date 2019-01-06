import { Router, Request, Response, NextFunction } from 'express';
import * as querystring from 'querystring'
import { Token } from '../models/Token';
import * as glob from 'glob'
import * as fs from 'fs'
import * as path from 'path'
const jwtDecode = require('jwt-decode');
var config = require('../Config')
const debug = require('debug')('adminrouter')

export class AdminRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/tokens/:id', async (req, res) => {
            var id = req.params.id
            res.send(await this.getToken(id))
        })

        this.router.get('/tokens', async (req, res) => {
            res.send(await this.getTokens())
        })

        this.router.get('/accountlinking', async (req, res) => {
            res.send(
                {
                    url: this.formAccountLinkingUrl()
                }
            )
        })
    }

    private async getToken(id): Promise<any> {
        debug('getToke:' + id)
        return new Promise<any>((resolve, reject) => {
            try {
                var tokenFile = process.cwd() + path.sep + 'tokens' + path.sep + id + ".json"
                var tokenResponse = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'))
                let jwt = jwtDecode(tokenResponse.access_token)
                resolve(jwt)
            } catch (error) {
                debug('getToken:' + error)
                reject(error)
            }
        })
    }

    private async getTokens(): Promise<Token[]> {
        return new Promise<Token[]>((resolve, reject) => {
            var tokenPath = process.cwd() + path.sep + 'tokens'
            debug('enumerating: path:' + tokenPath)
            fs.readdir(tokenPath, (err, files) => {
                var tokens = []
                files.forEach(f => {
                    try {
                        var file = f.split(path.sep).slice(-1)[0]
                        var token = file.split('.')[0]
                        tokens.push(new Token(token))
                    } catch (error) {
                        debug(`error while loading ${f} ${error}`)
                    }
                })
                resolve(tokens)
            })
        })
    }

    private formAccountLinkingUrl() {
        var state = 'A2SAAEAEGKVCCI_F6ZOzfD5Fdq3VpkB0Hj5ZVIbtUPDX_kvo5bAPhfAwTXai_HrV4qxDBKjUF1-78ZQzReF8SA9L3hBgxTMorzpRad2N7vgNwz9eNi92QGgdrK7816ExHZk7qBy5Xx_9aQhEnd5o0Gt294Jd2UjL-beC8t0bkFgwNCCBauaw39yzBmAQa1_TeHnGLROUtA4Fwq0Gm8PMDldpi35Foexg7Li7nnAMzV1exK-DCx_z-pp8jEQcndux7Ind4f-bJPJW-YFfHM9vpjoWliKKTe-BkG80jgfytVnnG6uQxmnPn0moghxhZwuj3lSJh03qIKZxGbW7DiRYxk9ruS520Suox3RNBChWXsLTD-Iz_jZY7W05zANffQEJIxUjDA2zQFZ_0JaTyakjZvF8PkNicYnoRJzhCqPwa1Wnzfb916Vpfd5Zbq-IrgwCkkV_FIF8mFdA0Sp_xUrGqERTFhwMRP2Ex9apEEGQBEk2bYiLcQmRvN9vtulEia8N7WqtHHjMqTPRwkmGC-ip9ZBBO4JWDxY0TlenQXQl8oYhMfulwt7QaecFD_CdWI3B1iy4NkwrqnN9y_kVpf6vuGM6Znof4HcWuRbQRaEGOyWtQEzSRGZhxYC-p-K6iv8UY2W-aI0L6ba'
        var query = querystring.stringify({
            'client_id': config.clientId,
            'response_type': 'code',
            'state': state,
            'scope': "identity offline_access",
            'redirect_uri': config.redirectUri
        });

        return 'https://' + config.host + config.authorizepath + '?' + query
    }
}

const adminRoutes = new AdminRouter();
adminRoutes.init();

export default adminRoutes.router;