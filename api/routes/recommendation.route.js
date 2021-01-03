const express = require('express'),
      recRoutes = express.Router();
let Recommendation = require('../models/Recommendation');

/**
 * @swagger
 * path:
 *  /rec/:id:
 *    security:
 *      - bearerAuth: []
 *    delete:
 *      summary: Get recommendation with given id
 *      tags: [Recommendation]
 *      parameters:
 *        - in: query
 *          name: id
 *          required: true
 *          description: Id of recommendation
 *      responses:
 *        "200":
 *          description: True if everything went fine
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Recommendation'
*/

recRoutes.route('/:id').get( function(req,res){
    Recommendation.findOne({_id: req.params.id}).lean().exec(function(err, recommendation){
        if(err){
            res.status(500).send('Cannot find recommendation with given id')
        }
        else{
            res.json(recommendation);
        }
    })
})


/**
 * @swagger
 * path:
 *  /rec/:
 *    post:
 *      summary: Post Recommendation
 *      tags: [Recommendation]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Recommendation'
 *      responses:
 *        "200":
 *          description: Id of saved Recommendation
 *          content:
 *            application/json:
 *              schema:
 *                type: number
*/


recRoutes.route('/').post(function(req,res){
    if (req.body.recommendation) {
        let reqRec = req.body.recommendation;
        let recommendation = new Recommendation()
        recommendation.links = reqRec.links;
        recommendation.save().then( (saved_rec,err) => {
            if (err) {
                res.sendStatus(400);
            }
            else{
                res.status(200).json(saved_rec._id);
            }
        })
    }
})

module.exports = recRoutes;
