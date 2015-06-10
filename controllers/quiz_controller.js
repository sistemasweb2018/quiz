var models=require('../models/models.js');
exports.question=function(req,res){
    models.Quiz.find(req.params.quizld).then(function(quiz){
	res.render('quizes/question',{pregunta: quiz.pregunta});
	})
};
exports.answer=function(req,res){
	models.Quiz.find(req.params.quizld).then(function(quiz){
		if (req.query.respuesta===quiz.respuesta){
	    res.render('quizes/answer',{respuesta: 'Correcta'})}
		else
		{res.render('quizes/answer',{respuesta: 'Incorrecta'})}
		})
};
exports.author=function(req,res){
	res.render('author');
};