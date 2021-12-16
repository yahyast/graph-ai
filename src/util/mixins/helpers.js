import moment from 'moment';
import ls from 'local-storage';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS({isCompression: false});

export default {
    methods: {
        arrayToString(data, key = null) {
            if (key != null) {
                // objectToArray
                data = data.map(function(item) {
                    return item[key];
                });
            }
            try {
                // return data.join(', ');
                return data.join(', ').replace(/, ([^,]*)$/, ' dan $1');
            } catch (error) {
                return '-';
            }
        },
        splitStr(str, splitter=',') {
            return str.split(splitter);
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        trimmedStr(str, maxLength =450, isHtml=false) {
            if (isHtml) {
                str = this.removeTags(str);
            }
            if (str.length < maxLength) {
                return str;
            } else {
                // trim the str to the maximum length
                let trimmedString = str.substr(0, maxLength);

                // re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf('.'))) + '.';

                return trimmedString;
            }
        },
        removeTags(str) {
            if ((str===null) || (str==='')) {
                return str;
            } else {
                str = str.toString();
            }
            // Regular expression to identify HTML tags in
            // the input string. Replacing the identified
            // HTML tag with a null string.
            return str.replace( /(<([^>]+)>)/ig, '');
        },
        showString(str) {
            return str?str:'-';
        },
        numberWithDot(number) {
            if ((number===null) || (number==='')) {
                return number;
            }
            const parts = number.toString().split('.');
            parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return parts.join(',');
        },
        nFormatter(num, digits = 1) {
            const lookup = [
                {value: 1, symbol: ''},
                {value: 1e3, symbol: 'k'},
                {value: 1e6, symbol: 'M'},
                {value: 1e9, symbol: 'G'},
                {value: 1e12, symbol: 'T'},
                {value: 1e15, symbol: 'P'},
                {value: 1e18, symbol: 'E'},
            ];
            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            const item = lookup.slice().reverse().find(function(item) {
                return num >= item.value;
            });
            return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
        },
        getUsernameSosmed(string) {
            const isURL = this.isValidHttpUrl(string);
            let str = string;
            if (isURL) {
                str = str.replace(/(^\w+:|^)\/\//, '');
                str = str.split('/')[1];
            }
            return str;
        },
        isValidHttpUrl(string) {
            let url;

            try {
                url = new URL(string);
            } catch (_) {
                return false;
            }

            return url.protocol === 'http:' || url.protocol === 'https:';
        },
        dateFormatPicker(classes, date) {
            if (!classes.disabled) {
                classes.disabled = moment(date.getTime()).subtract({hours: 12})._d > new Date();
            }
            return classes;
        },
        datetimeFormat(datetime, formatFrom='YYYY-MM-DD', formatTo='DD MMMM YYYY') {
            let dtFormat = datetime;
            try {
                // dtFormat = moment(datetime, formatFrom).format(formatTo);
                dtFormat = moment(datetime, formatFrom).locale('id').format(formatTo);
            } catch (error) {
                console.log('error dateformat');
                console.log(error);
            }
            return dtFormat;
        },
        encodeDetailData(data) {
            return encodeURI(btoa(JSON.stringify(data)));
        },
        decodeDetailData(data) {
            return JSON.parse(atob(decodeURI(data)));
        },
        decodeBase64(data) {
            return (atob(data));
        },
        getDefaultImage(type='default') {
            let img = this.$store.getters['config/getDefaultImage'];

            if (type === 'profile') {
                img = this.$store.getters['config/getDefaultImageProfile'];
            }
            return img;
        },
        getErrorImage(e, type='default') {
            let img = this.$store.getters['config/getDefaultImage'];

            if (type === 'profile') {
                img = this.$store.getters['config/getDefaultImageProfile'];
            }

            e.target.src = img;
        },

        // get & listen local storage changes
        ls_getData() {
            // return ls.get('vuex');
            return JSON.parse(secureLs.get('vuex'));
        },
        ls_attachListener(callback) {
            ls.on('vuex', callback);
        },

        getOsmDarkModeAccessToken() {
            let access_token = 'pcfhg8us5vcMhZJQEfY6YDU8ipIQ2DqNoqYBP858Tfkhpm4ARsisRcxyW4kqMU5R';

            if (process.env.VUE_APP_OSM_DARK_MODE_ACCESS_TOKEN) {
                access_token = process.env.VUE_APP_OSM_DARK_MODE_ACCESS_TOKEN;
            }

            return access_token;
        },
    },
    filters: {
        date: function(date, locale='id', format='DD MMM YYYY') {
            return moment(date).locale(locale).format(format);
        },
    },
};
