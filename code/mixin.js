export default {
    methods: {
        _storageGet: function(key, type='local') {
            var value = type === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key)
            return value && JSON.parse(value)
        },
        _storageSet: function(key, value, type='local') {
            if (type === 'local')
                window.localStorage.setItem(key, JSON.stringify(value))
            else
                window.sessionStorage.setItem(key, JSON.stringify(value))
        },
        _formatDigit: function(dig, ddec) {
            let str = "";
            if( ddec == 2 )
                if( (dig - 10) < 0 )
                    str = '0'+ dig;
                else    
                    str = dig;
            if( ddec == 3 )
                if( (dig - 10) < 0 )
                    str = '00'+ dig;
                else if( (dig - 100) >= 0 )
                    str = dig;
                else
                    str = '0'+ dig;
            return str;
        }
    }
}