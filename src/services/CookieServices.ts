
import Cookies, { type CookieGetOptions, type CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies()

class CookieServices  { 

    get(name: string, options?: CookieGetOptions) { return cookies.get(name, options) }


    set(name: string, value: string, option?: CookieSetOptions) { 
        return cookies.set( name , value ,option)
    }


    remove(name: string, options?: CookieSetOptions) {
        return cookies.remove(name, options)
     }
}

export default new CookieServices(); 