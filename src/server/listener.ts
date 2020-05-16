import http from 'http'
import https from 'https'
import ip from 'ip'


interface ListenerOptions {
    port: number;
    host: string;
    socket: any;
    https: string;
    app: any;
    dev: boolean;
    baseURL: string;
}

interface ListenArgs {
    host?: string;
    port?: number;
    path?: string;
    exclusive?: boolean;
}

class Listener {
    port: number;
    host: string;
    socket: string;
    https: string;
    app: any;
    dev: boolean;
    baseURL: string;

    listening: boolean;
    _server: http.Server; 
    server: any;
    address: string;
    url: string;
    
    constructor({ port, host, socket, https, app, dev, baseURL }: ListenerOptions) {

        this.port = port;
        this.host = host;
        this.socket = "";
        this.https = https;
        this.app = app;
        this.dev = dev;
        this.baseURL = baseURL;

        this.listening = false
        this._server = null
        this.server = null
        this.address = null
        this.url = null
        
    }

    public async listen() {
        // Prevent multi calls
        if (this.listening) {
            return;
        }

        const protocol = this.https ? https : http;
        const protocolOpts = this.https ? [this.https] : [];
        this._server = protocol.createServer.apply(protocol, protocolOpts.concat(this.app));

        const listenArgs: ListenArgs = this.socket ? { path: this.socket } : { host: this.host, port: this.port }
        listenArgs.exclusive = false;

        try {
            this.server = await new Promise((resolve, reject) => {
                this._server.on('error', error => reject(error));
                const s: any = this._server.listen(listenArgs, (error) => {
                    error ? reject(error) : resolve(s)
                }); 
            })
        } catch(error) {
            return this.serverErrorHandler(error)
        }

        this.listening = true;
    }

    serverErrorHandler(error: Error) {
        console.log("error", error)
    }

computeURL () {
    const address = this.server.address()
    if (!this.socket) {
        switch (address.address) {
            case '127.0.0.1': this.host = 'localhost'; break
            case '0.0.0.0': this.host = ip.address(); break
        }

        this.port = address.port
        this.url = `http${this.https ? 's' : ''}://${this.host}:${this.port}${this.baseURL}`
        return
    }
        this.url = `unix+http://${address}`
    }
}

export {
    Listener
}