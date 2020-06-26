import { ConfigContext } from './types'
import consola from 'consola'

import esm from 'esm';

import path from 'path'

interface Params {
    rootDir: string, 
    configFile: string, 
    configContext: ConfigContext
}

export class ConfigLoader {

    protected rootDir: string;
    protected configFile: string;
    protected options: {}

    Load(params: Params) {
        this.rootDir = path.resolve(params.rootDir)
        this.configFile = this.GetFile();

        const file = this.configFile;
        let options = {};

        if(file) {
            options = esm(module)(file) || {};
        }

    }

    private GetFile(): string {
        try {
            return require.resolve(path.resolve(this.rootDir, this.configFile));
        }
        catch(e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                consola.fatal('Config file not found: ' + this.configFile);
                throw (e)
            }
        }
    }
}