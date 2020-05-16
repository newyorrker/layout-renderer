import connect from 'connect';
import { VueRenderer } from '../vue-renderer'
import { ServerContext } from './context'
import { RenderMachine } from '../core'
import { Listener } from './listener'

class Server {
    app: any;
    serverContext: ServerContext;
    renderer: VueRenderer;

    private readyCalled: boolean;

    public listeners: Listener[];
    public renderMachine: RenderMachine

    constructor(renderMachine: RenderMachine) {

      this.renderMachine = renderMachine;
      this.listeners = [];

      // Create new connect instance
      this.app = connect();

      this.renderMachine.hook('close', () => this.close())
        
    }

    public async ready () {
      if (this.readyCalled) {
        return this
      }
      this.readyCalled = true

      // Initialize vue-renderer

      this.serverContext = new ServerContext(this);
      this.renderer = new VueRenderer(this.serverContext);

      await this.renderer.ready()

      // Setup nuxt middleware
      // await this.setupMiddleware()

      return this
    }

    public async listen() {
      this.renderMachine.ready();

      // Create a new listener
      const listener = new Listener({
        port: 3005,//isNaN(parseInt(port)) ? this.options.server.port : port,
        host: 'localhost',//host || this.options.server.host,
        socket: '',//socket || this.options.server.socket,
        https: 'http', //this.options.server.https,
        app: this.app,
        dev: false, //this.options.dev,
        baseURL: '/'//this.options.router.base
      })

      await listener.listen();

      this.listeners.push(listener);

      // await this.renderer.listen()

      // this.renderMachine.hook

      await this.renderMachine.callHook('listen', listener.server, listener);
    }

    close() {
      console.log('closed');
    }
}
export {
    Server
}