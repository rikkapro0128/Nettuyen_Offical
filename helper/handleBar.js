export default (hbs) => {
    hbs.registerHelper('option', function(d1, d2) {
        return d1 === d2 ? 'selected' : '';
    })
    hbs.registerHelper('getDate', function(date) {
        if(date) {
            let [month, day, year] = date.toLocaleDateString("en-US").split('/');
            return [year, month, day].join('-');
        }
        return '';
    })
    hbs.registerHelper('getAvatarDefault', function(gender) {
        // if(nameImage) return nameImage;
        if(gender === 'Nam') return process.env.AVATAR_MALE;
        if(gender === 'Nữ') return process.env.AVATAR_FEMALE;
    })
    hbs.registerHelper('getIntroStory', function(link, isAvatar) {
        return link ? link : (isAvatar ? process.env.AVATAR_STORY : process.env.COVER_STORY);
    })
};
