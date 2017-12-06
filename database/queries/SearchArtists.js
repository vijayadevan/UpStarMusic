const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
    const buildQuery = criterias => {
        const totalQuery = {};
        if (criterias.name !== '') {
            totalQuery.name = {
                $regex: new RegExp(criterias.name, 'i')
            };
        }

        if (criterias.age) {
            totalQuery.age = {
                $gte: criterias.age.min,
                $lte: criterias.age.max
            };
        }

        if (criterias.yearsActive) {
            totalQuery.yearsActive = {
                $gte: criterias.yearsActive.min,
                $lte: criterias.yearsActive.max
            };
        }
        return totalQuery;
    };

    const allDetails = Artist.find(buildQuery(criteria))
        .sort({
            [sortProperty]: 1
        })
        .skip(offset)
        .limit(limit);

    return Promise.all([allDetails, Artist.count(buildQuery(criteria))])
        .then(res => {
            return {
                all: res[0],
                count: res[1],
                offset,
                limit
            };
        });
};