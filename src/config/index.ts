import { ConfigLoader } from './loader'
import { ConfigSource } from './source'

import { ConfigContext } from './types'



export class Configurator {

    constructor() {
        this.loader = new ConfigLoader();
        this.source = new ConfigSource();
    }

    defaultConfigName = 'renderMachine.config'

    private loader: ConfigLoader;
    private source: ConfigSource;


    GetConfig() {
        this.source.GetConfig()
    }

    LoadConfig(rootDir: string = '.', configFile: string = this.defaultConfigName, configContext: ConfigContext = {}) {

        this.loader.Load({rootDir: rootDir, configFile: configFile, configContext: configContext})

    }
}