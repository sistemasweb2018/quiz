var models=require('../models/models.js');
exports.question=function(req,res){
    models.Quiz.find(req.params.quizld).then(function(quiz){
	res.render('quizes/question',{pregunta: quiz.pregunta});
	})
};
exports.index = function(req, res) {  
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }
  )
};
// GET /quizes/:id
exports.show = function(req, res) {
 models.Quiz.findById(req.params.quizId).then(function(quiz){
  res.render('quizes/show', { quiz: quiz});
});
};           // req.quiz: instancia de quiz cargada con autoload

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz){
  if (req.query.respuesta === quiz.respuesta) {
    res.render('quizes/answer',{quiz:quiz, respuesta:'CORRECTO'});
  } else{
  res.render('quizes/answer', {quiz:quiz, respuesta:'INCORRECTO'});
  }
  });
};
exports.author=function(req,res){
	res.render('author');
};