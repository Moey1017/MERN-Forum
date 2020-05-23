let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

mongoose.set('useFindAndModify', false);

let postSchema = require(`../models/posts`);


// read all records
router.route('/').get((req, res) => 
{
    postSchema.find((error, data) => 
    {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data);
        }
    });
});


// Read one record
router.route('/get_post/:id').get((req, res) => 
{
    postSchema.findById(req.params.id, (error, data) => 
    {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data);
        }
    });
});

// Add new record
router.route('/add_post').post((req, res, next) => 
{
    if(req.body.title.length === 0 || req.body.content.length === 0 || req.body.author.length === 0 || req.body.authorId.length === 0)
    {
        res.json({errorMessage:`Empty value found!`}); 
    }
    else
    {
        postSchema.create(req.body, (error, data) => 
        {
        if (error) 
        {
            return next(error);
        } 
        else
        {
            res.json(data);
        }
        });
    }
    
});


//Update one post
router.route('/update_post/:id').put((req, res, next) => 
{
    if(req.body.title.length === 0 || req.body.content.length === 0 || req.body.author.length === 0)
    {
        res.json({errorMessage:`Empty value found!`}); 
    }
    else
    {
        postSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
        {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data);
        }
        });
    }
    
});

// Delete one record
router.route('/delete_post/:id').delete((req, res, next) => 
{
    postSchema.findByIdAndRemove(req.params.id, (error, data) => 
    {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.status(200).json({msg: data});
        }
    });
});

//Comments
// add comment
router.route('/add_comment/:id').put((req, res, next) => 
{
    if(req.body.author.length === 0 || req.body.author.authorId === 0 || req.body.author.content === 0)
    {
        res.json({errorMessage:`Empty value found!`}); 
    }
    else
    {
       postSchema.findByIdAndUpdate(req.params.id, {$push: {comments:req.body}}, (error, data) => 
        {
        console.log(req.params.id);
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data);
        }
        }); 
    }
});

//remove comment
router.route('/delete_comment/:id').delete((req, res, next) => 
{
    postSchema.findOneAndUpdate({"comments._id":req.params.id}, {$pull: {comments:{_id:req.params.id}}}, (error, data) => 
    {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data);
        }
    });
});

//edit comment
router.route('/update_comment/:id').put((req, res, next) => 
{
    if(req.body.author.length === 0 || req.body.author.authorId === 0 || req.body.author.content === 0)
    {
        res.json({errorMessage:`Empty value found!`}); 
    }
    else
    {
        postSchema.findOneAndUpdate({"comments._id":req.params.id}, {$set: {"comments.$.author":req.body.author, "comments.$.content":req.body.content, "comments.$.date":req.body.date}}, (error, data) => 
        {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data);
        }
        });
    }
});

//Get one comment
router.route('/get_comment/:id').get((req, res) => 
{
    postSchema.findOne({"comments._id":req.params.id}, "comments.$._id", (error, data) => 
    {
        if (error) 
        {
            return next(error);
        } 
        else 
        {
            res.json(data.comments[0]);
        }
    });
});
module.exports = router;