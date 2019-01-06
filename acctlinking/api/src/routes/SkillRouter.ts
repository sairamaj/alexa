import { Router, Request, Response, NextFunction } from 'express';
import * as https from 'https'
import * as querystring from 'querystring'
import * as fs from 'fs'
import * as path from 'path'
const jwtDecode = require('jwt-decode');


var config = require('../Config')
const debug = require('debug')('skillrouter');

export class SkillRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }


    init() {

        this.router.get('/refreshtoken', async (req, res) => {
            this.refreshToken(req, res)
        })
        this.router.get('/', (req, res) => {
            this.processAuthorizationCode(req, res)
        })
    }

    private async refreshToken(req: Request, res: Response) {
        debug('enterRefreshToken')
        var token = JSON.parse(fs.readFileSync('token.json', 'utf-8'))
        var data = querystring.stringify({
            'client_id': config.clientId,
            'client_secret': config.clientSecret,
            'redirect_uri': config.redirectUri,
            'grant_type': 'refresh_token',
            'refresh_token': token.refresh_token,
        });

        var tokenResponse = await this.post(config.host, config.accesstokenpath, data)
        let jwt = jwtDecode(tokenResponse)
        this.saveToken(jwt.sub, tokenResponse)
        res.send(tokenResponse)
    }

    private async processAuthorizationCode(req: Request, res: Response) {
        debug('in processAuthorizationCode')
        var code = req.query.code
        var state = req.query.state
        debug('code:' + code)

        var data = querystring.stringify({
            'client_id': config.clientId,
            'client_secret': config.clientSecret,
            'redirect_uri': config.redirectUri,
            'grant_type': 'authorization_code',
            'code': code,
            'state': state
        });

        debug(data)
        var tokenResponse = await this.post(config.host, config.accesstokenpath, data)
        let jwt = jwtDecode(tokenResponse)
        debug(jwt)
        this.saveToken(jwt.sub, tokenResponse)
        fs.writeFileSync('token.json', tokenResponse, 'utf-8')  // Save token
        res.send({
            "token": tokenResponse,
            "jwt": jwt
        }
        )
    }

    private post(host: string, path: string, data: string): Promise<string> {
        var options = {
            host: host,
            port: '443',
            path: path,

            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        return new Promise<string>((resolve, reject) => {
            var req = https.request(options, function (res) {
                try {
                    debug('waiting for response.')
                    res.setEncoding('utf8');
                    var responseString = "";

                    res.on("data", function (data) {
                        responseString += data;
                        // save all the data from response
                    });
                    res.on("end", function () {
                        debug(responseString);
                        resolve(responseString)
                    });
                } catch (error) {
                    reject(error)
                }
            });

            debug(`posting ${options.host}${options.path}`)
            try
            {
                req.write(data)
                req.end()
            }
            catch(err){
                console.log("error")
                console.log(err)
            }

        })
    }

    private saveToken(user: string, token: string) {
        var file = "tokens" + path.sep + user + '.json'
        fs.writeFileSync(file, token, 'utf-8')
    }

}

const tokenRoutes = new SkillRouter();
tokenRoutes.init();

export default tokenRoutes.router;