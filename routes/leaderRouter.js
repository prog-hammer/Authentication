const express = require('express');
const bodyParser = require('body-parser');
var mongoose=require('mongoose');

var Leaders=require('../models/leaders');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.get((req,res,next) => {
  Leaders.find({})
  .then((leaders)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(leaders);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leader)=>{
      console.log('Leader created',leader);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req, res, next) => {
  res.statusCode=403;
  res.end('PUT operation not allowed');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
/*
leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.write('Will send details of the leader: ' + req.params.leaderId +' to you!');
    res.end()
})
.post((req, res, next) => {
    res.end('POST operation not supported on /leader/'+ req.params.leaderId);
})
.put((req, res, next) => {
  res.write('Updating the leader: ' + req.params.leaderId + '\n');
  res.end('Will update the leader: ' + req.body.name +
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.write('Will send all the leaders to you!');
    res.end()
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /leader');
})
.delete((req, res, next) => {
    res.end(res.end('Deleting all leaders'));
});
*/

module.exports = leaderRouter;
