let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
//let Validator = require('validator');
//let isEmpty = require('lodash/isEmpty');

mongoose.set('useFindAndModify', false);

let userchema = require(`../models/users`);

//function validateInput(data)
//{
//    let errors = {};
//    if (Validator.isNull(data.email))
//    {
//        errors.email = 'Email is required.';
//    }
//    if (Validator.isEmail(data.email))
//    {
//        errors.email = 'This is not an valid email';
//    }
//    if (Validator.isNull(data.password))
//    {
//        errors.password = 'Password is required.';
//    }
//}


// read all records
router.route('/').get((req, res) =>
        {
            userchema.find((error, data) =>
            {
                if (error)
                {
                    return next(error);
                } else
                {
                    res.json(data);
                }
            });
        });


// Read one record
router.route('/get_user_login/').put((req, res) =>
        {
//    const {errors,isValid} = validateInput(req.body);
            let lastLoggedIn = new Date();
            userchema.findOneAndUpdate({email: req.body.email}, {$set: {lastLoggedIn: lastLoggedIn}}, (error, data) =>
            {
                if (error)
                {
                    return next(error);
                } else
                {
//            if (isValid)
                    if (data.length !== 0)
                    {
                        if (data.password === req.body.password)
                        {
                            res.json({valid: 'true', accessLevel: data.accessLevel, name: data.name, email: data.email, lastLoggedIn: data.lastLoggedIn, createdDate: data.createdDate, authorId: data._id});
                        } else
                        {
                            res.json({valid: 'false'});
                        }
                    } else //else if(!isValid)
                    {
                        res.json({valid: 'false'});
                    }

                    console.log(data);
                }
            });
        });


// Add new record
router.route('/add_user').post((req, res, next) =>
        {
//    const {errors,isValid} = validateInput(req.body);
//    if(!isValid)
//    {
//        res.json({errors});
//    }
            console.log(req.body);
            userchema.create(req.body, (error, data) =>
            {
                if (error)
                {
                    return next(error);
                }
                res.json(data);
            });

        });


// Update one record
router.route('/update_user/:id').put((req, res, next) =>
        {
            userchema.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
            {
                if (error)
                {
                    return next(error);
                } else
                {
                    res.json(data);
                }
            });

        });

//update LastLoggedIn time 
router.route('/update_user_lastLoggedIn/:id').put((req, res, next) =>
        {
            userchema.findByIdAndUpdate(req.params.id, {$set: {lastLoggedIn: req.body}}, (error, data) =>
            {
                if (error)
                {
                    return next(error);
                } else
                {
                    res.json(data);
                }
            });
        });


// Delete one record
router.route('/delete_user/:id').delete((req, res, next) =>
        {
            userchema.findByIdAndRemove(req.params.id, (error, data) =>
            {
                if (error)
                {
                    return next(error);
                } else
                {
                    res.status(200).json({msg: data});
                }
            });
        });

module.exports = router;