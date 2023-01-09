import Vue from 'vue'
import moment from 'moment'
//numberFormat
Vue.filter("numberFormat", function (number) {
    return process.env.VUE_APP_CURRENCY + ' ' + parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});
Vue.filter("numberFormatClean", function (number) {
    return parseFloat(number).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});

//dateFormat
Vue.filter("dateFormat", function (date) {
    return date != null ? moment(String(date)).format(process.env.VUE_APP_DATE_FORMAT) : ''
});
//dateTimeFormat
Vue.filter("dateTimeFormat", function (date_time) {
    return moment(String(date_time)).format(process.env.VUE_APP_DATE_TIME_FORMAT)
});
//timeFormat
Vue.filter("timeFormat", function (time) {
    return time != null ? moment(time, "HH:mm:ss").format(process.env.VUE_APP_TIME_FORMAT) : ''
});
//statusFormat
Vue.filter("statusFormat", function (str) {
    return str != null ? str.replace(/_/g, ' ') : '';
});
