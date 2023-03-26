const Comment = require('../models/comment');
const mongoose = require('mongoose');
const Question = require('../models/question');
const User = require('../models/user');

// Render add Question page
const addQuestion = (req, res) => {
    res.render('questionInsertion')
}

// Post question from Add page
const postQuestion = (req, res) => {
    const userId = res.locals.user._id
    const question = new Question({
        Title: req.body.question,
        Description: req.body.description,
        User: userId
    })
    question.save()
        .then(() => {
            User.findByIdAndUpdate({_id:userId})
                .then(result => {
                    result.Questions.push(question._id)
                    result.save()
                        .then((result)=> {
                            console.log(result)
                            res.redirect('/')
                        })
                        .catch(err => console.log(err))
                })  
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

// View One question and add Comments
const viewQuestion = (req, res) => {

    if (req.method == "GET"){
        Question.findById({_id:req.params.id})
            .populate({path:'Comment', options: {sort: '-updatedAt'}})
            .populate('User') 
            .then(result => {
                res.render('questionDetails', {question: result, user: res.locals.user})
            })
            .catch( err => console.log(err))
    }

    // Add Comments
    if (req.method == "POST"){
        const newComment = new Comment ({
            Description: req.body.comment,
            // Get user Id from cookie
            // user_id: user.id,
            Question: req.params.id
        })
        newComment.save()
            .then(() => {
                // Add Comment ID to the question
                Question.findByIdAndUpdate({_id:req.params.id})
                    .then(result =>{
                        result.Comment.push(newComment._id)
                        result.save()
                            .then(()=>{
                                // Add User ID to comment
                                User.findByIdAndUpdate({_id:res.locals.user._id})
                                    .then(result => {
                                        result.Comments.push(newComment._id)
                                        result.save()
                                            .then(()=> {
                                                message = "Your comment has been posted"
                                                res.redirect(`/question/${req.params.id}`)
                                            })
                                            .catch(err => console.log(err))
                                    })  
                                    .catch(err => console.log(err))
                            })
                            .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err))
            })
            .catch(err => console.log(err))
    }
}


// Edit a Question
const editQuestion = (req, res) => {
    if (req.method == "GET"){
        Question.findById({_id: req.params.id})
            .then(result => {
                res.render('questionModifiation', {question: result})
            })
    }
    if (req.method == "POST"){
        Question.findByIdAndUpdate({_id: req.params.id})
            .then(result => {
                const {question, description} = req.body
                result.Title = question
                result.Description= description
                result.save()
            })
                .then(()=> res.redirect(`/question/${req.params.id}`))
                .catch(err => console.log(err))
            .catch(err => console.log(err))
    }
}

// tribute to DELETE
const deleteComment = (req, res) => {
    Comment.findByIdAndDelete({_id: req.params.id})
        .then(()=> res.redirect('back'))
        .catch(()=> res.redirect('/', {message: 'something went wrong'}))
}

const deleteQuestion = (req, res) => {
    Question.findByIdAndDelete({_id: req.params.id})
        .then(()=> res.redirect('/'))
        .catch(()=> res.redirect('/', {message: 'something went wrong'}))
}

module.exports = {
    postQuestion,
    viewQuestion,
    editQuestion,
    deleteComment,
    deleteQuestion,
    addQuestion
}