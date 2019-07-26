const Coin = require('../model/coins');
const mongoose =require('mongoose');

exports.coins_get_all = (req,res,next)=>{
    Coin.find()
    .exec()
    .then(docs => {
        //console.log(docs);
        const response ={
            count: docs.length,
            coins: docs.map(doc =>{
                return {
                    _id: doc.id,
                    title: doc.title,
                    year: doc.year,
                    nominal: doc.nominal,
                    mint: doc.mint,
                    description: doc.description,
                    imageA: doc.imageA,
                    imageB: doc.imageB,
                    url: process.env.HOSTING +'/coins/'+ doc.id
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

exports.coins_get1 = (req, res, next)=>{
    const id = req.params.coinId;
    Coin.findById(id)
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

exports.coins_post1 =(req,res,next)=>{
    const Coin = new Coin({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        year: req.body.year,
        nominal: req.body.nominal,
        mint: req.body.mint,
        description: req.body.description,
        imageA: req.body.imageA,
        imageB: req.body.imageB
    }); 
    Coin.save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
                 message:'Handel POST',
                 createdCoin: Coin
        });
    }).catch(err=>{
            console.log(err);
            res.status(500).json({
            error: err
        });
    });
};

exports.coins_patch = (req, res, next)=>{
    const id = req.params.CoinId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Coin.update({_id: id},{ $set: updateOps })
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

exports.coint_delete = (req, res, next)=>{
    const id = req.params.coinId;
    Coin.remove({_id: id})
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

