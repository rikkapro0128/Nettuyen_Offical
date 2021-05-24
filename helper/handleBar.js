export default (hbs) => {
    hbs.registerHelper('option', function(d1, d2) {
        return d1 === d2 ? 'selected' : '';
    })
    hbs.registerHelper('getDate', function(date) {
        if(date) {
            let [month, day, year] = date.toLocaleDateString("en-US").split('/');
            if(month <= 10) {
                month = `0${month}`;
            }
            return [year, month, day].join('-');
        }
        return '';
    })
};
