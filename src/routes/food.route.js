'use strict';

const express = require('express');
const foodRouter = express.Router();
const { Food } = require('../models/index');


foodRouter.get("/food", getfoods);
foodRouter.get("/food/:id", getonefood);
foodRouter.post("/food", createfood);
foodRouter.put("/food/:id", updatefood);
foodRouter.delete("/food/:id", deletefood);


async function getfoods(req, res) {
    try{

        let foodResult = await Food.findAll();
        res.status(200).json(foodResult);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getonefood(req, res) {
    try{

        const foodId = parseInt(req.params.id);
        let onefood = await Food.findOne({
            where: {
                id: foodId
            }
        })
        res.status(200).json(onefood);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createfood(req,res){
    try{

        let newfood=req.body;
        let foodRe=await Food.create(newfood);
        res.status(201).json(foodRe);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updatefood(req,res){
    try{

        let foodId = parseInt(req.params.id);
        let upfood=req.body;
        let foundfood=await Food.findOne({where: { id:foodId }});
        let updatedfood=await foundfood.update(upfood);
        res.status(201).json(updatedfood);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deletefood(req,res){
    try{

        let foodId = parseInt(req.params.id);
        let deletefood= await Food.destroy({where:{ id:foodId } });
        res.status(204).json(deletefood);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=foodRouter;