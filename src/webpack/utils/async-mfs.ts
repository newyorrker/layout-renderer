import MFS from 'memory-fs'
export default class AsyncMFS extends MFS {}

const syncRegex = /Sync$/

const propsToPromisify = Object.getOwnPropertyNames(MFS.prototype).filter(n => syncRegex.test(n))

for (const prop of propsToPromisify) {
    const asyncProp = prop.replace(syncRegex, '')
    // @ts-ignore
    const origAsync = AsyncMFS.prototype[asyncProp]
    // @ts-ignore
    AsyncMFS.prototype[asyncProp] = function (...args) {
        // Callback support for webpack
        if (origAsync && args.length && typeof args[args.length - 1] === 'function') {
        return origAsync.call(this, ...args)
        }

        try {
            // @ts-ignore
            return Promise.resolve(MFS.prototype[prop].call(this, ...args))
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
