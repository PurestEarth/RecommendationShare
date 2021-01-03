/**
 * @swagger
 *  components:
 *    schemas:
 *      Recommendation:
 *        type: object
 *        properties:
 *          links:
 *            type: [string]
 *          createdAt:
 *            type: Date
 *            default: Date.now
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recommendation = new Schema({

    links: {
        type: [String]
    },
    createdAt: {
       type: Date, required: true, default: Date.now
    }
},{
    collection: 'recommendation'
    }
);

module.exports = mongoose.model('recommendation', Recommendation);
