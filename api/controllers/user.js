const User = require('../model/users');
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.post_signIn =(req, res, next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length>=1){
                return res.status(409).json({
                    message: 'email already exist'
                });
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({error: err});
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                    user.save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({error: err});
                    });
                    }
            });
            }
        })            
        .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
    
};

exports.post_login = (req,res,next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json({
                message: 'Auth faild'
            });
        }
        bcrypt.compare(req.body.password,user[0].password, (err,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth faild'});
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    id: user[0]._id
                },
                    process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
                );
                return res.status(200).json({
                    message: 'Auth successful!',
                    token: token 
                });
                    
            }
            return res.status(401).json({
                message: 'Auth faild'});
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err
        });
    
});
};

exports.delete = (req, res, next)=>{
    const id = req.params.userid;
    User.remove({_id: id})
    .exec()
    .then(doc=>{
        console.log('Delete in mongoDb',  doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No vilid entry found for provided ID'});
        } 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
};