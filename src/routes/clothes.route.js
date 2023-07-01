'use strict';

const express = require('express');
const clothesRouter = express.Router();
const { Clothes } = require('../models/index');


clothesRouter.get("/clothes", getclothes);
clothesRouter.get("/clothes/:id", getoneclothe);
clothesRouter.post("/clothes", createclothe);
clothesRouter.put("/clothes/:id", updateclothe);
clothesRouter.delete("/clothes/:id", deleteclothe);


async function getclothes(req, res) {
    try{

        let clothesResult = await Clothes.findAll();
        res.status(200).json(clothesResult);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getoneclothe(req, res) {
    try{

        const clotheId = parseInt(req.params.id);
        let oneclothe = await Clothes.findOne({
            where: {
                id: clotheId
            }
        })
        res.status(200).json(oneclothe);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createclothe(req,res){
    try{

        let newclothe=req.body;
        let clotheRe=await Clothes.create(newclothe);
        res.status(201).json(clotheRe);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateclothe(req,res){
    try{

        let clotheId = parseInt(req.params.id);
        let upclothe=req.body;
        let foundclothe=await Clothes.findOne({where: { id:clotheId }});
        let updatedclothe=await foundclothe.update(upclothe);
        res.status(201).json(updatedclothe);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteclothe(req,res){
    try{

        let clotheId = parseInt(req.params.id);
        let deleteclothe= await Clothes.destroy({where:{ id:clotheId } });
        res.status(204).json(deleteclothe);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=clothesRouter;