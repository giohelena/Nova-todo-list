const express = require('express');

const checklistDependentRoute = express.Router();
const simpleRouter = express.Router();

const Checklist = require('../../models/checklist');
const Task = require('../../models/tasks');

checklistDependentRoute.get('/:id/tasks/new', async (req,res)=>{
    try{
        let task = Task();
        res.status(200).render('../views/tasks/new.ejs', {checklistId: req.params.id, task: task});
    } catch(error){
        res.status(422).render('pages/error', {errors: 'Erro ao carregar o formulário'})
    }
})

simpleRouter.delete('/:id', async (req,res) =>{
    try{
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task.id);
        checklist.tasks.slice(taskToRemove, 1);
        checklist.save();
        res.redirect(`/checklists/${checklist._id}`)
    } catch (error){
        res.status(422).render('pages/error', {errors: 'Erro ao remover tarefa.'});
    }
})

checklistDependentRoute.post(`/:id/tasks`, async (req, res) => {
    let { name } = req.body.Task;
    let task = new Task({ name:name, checklist: req.params.id })
    
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        //Adiciona task no array de Tasks da checklist correspondente
        checklist.tasks.push(task);
        await checklist.save();
        res.status(201).redirect(`/checklists/${req.params.id}`);
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('/tasks/new', { task: { ...task, error: error }, checklistId: req.params.id })
    }
})

simpleRouter.put('/:id', async (req,res) =>{
    let task = Task.findById(req.params.id);
    try{
        task.set(req.body.task);
        await task.save();
        res.status(200).json({task});
    } catch (error) {
        let errors = error.errors;
        res.status(422).json({task :{...errors}});
    }
})

module.exports = {
    checklistDependent : checklistDependentRoute,
    simple : simpleRouter
};