const express = require('express');

const checklistDependentRoute = express.Router();

const Checklist = require('../../models/checklist');
const tasks = require('../../models/tasks');
const Task = require('../../models/tasks');

checklistDependentRoute.get('/:id/tasks/new', async (req,res)=>{
    try{
        let task = Task();
        res.status(200).render('task/new', {checklistId:req.params.id, task: task});
    } catch(error){
        res.status(422).render('pages/error', {errors: 'Erro ao carregar o formulário'})
    }
})

checklistDependentRoute.post('/:id/tasks', async (req,res)=>{
    let {name} = req.body.task;
    let task = new Task({name, checklist:req.params.id});
    
    try{
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        checklist.task.push(task);
        await checklist.save();
        res.redirect(`/checklists/${req.params.id}`);
    } catch(error){
        res.status(422).render('tasks/new', {task:{...task, errors}, checklistId:req.params.id})
    }
})

module.exports = {checklistDependent : checklistDependentRoute};