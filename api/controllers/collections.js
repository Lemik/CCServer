const mongoose =require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Collection = require('../model/collections');

exports.get_all = (req,res,next)=>{
    Collection.find()
    .select('name numberOfItems')
    .exec()
    .then(docs => {
        const response={
            count: docs.length,
            collection: docs.map(doc=>{
                return {
                    _id: doc.id,
                    name: doc.name,
                    count: doc.numberOfItems,
                    url: 'http://localhost:3000/collections/' + doc.id
                }
            })
        }
            res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });    
};

exports.get_1 = (req, res, next)=>{
    const id = req.params.collectionId;
    Collection.findById(id)
    .exec()
    .then(doc=>{
        console.log('From mongoDb',  doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No vilid entry found for provided ID'
            });
        }       
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.postCollection =checkAuth,(req,res,next)=>{
    const collection = new Collection({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        numberOfItems: req.body.numberOfItems
    }); 
    collection
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
                 message:'handel POST',
                 createdCollection: collection
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.patch_collection =(req, res, next)=>{
    const id = req.params.collectionId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Collection.update({_id: id},{ $set: updateOps })
    .exec()
    .then(doc=>{
        console.log('Patch in mongoDb',  doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No vilid entry found for provided ID'
            });
        }
       
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.delete_collection = (req, res, next)=>{
    const id = req.params.collectionId;
    Collection.remove({_id: id})
    .exec()
    .then(doc=>{
        console.log('Delete in mongoDb',  doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No vilid entry found for provided ID'
            });
        } 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
};