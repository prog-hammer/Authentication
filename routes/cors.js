const express=require('express');
const cors=require('cors');
var app=express();

const whitelist=['http://localhost:3000','https://localhost:3443'];
var corsOptionsDelegate=(req,callback)=>{
    var corOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin'))!== -1){
        corOptions={origin:true};
    }
    else{
        corOptions={origin:false};
    }
    callback(null,corOptions);
}
exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);