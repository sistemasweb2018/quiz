var models=require('../models/models.js');
// exports.load = function(req, res, next, quizId) {
  // models.Quiz.findById(quizId).then(
	// function(quiz) {
      // if (quiz) {
        // req.quiz = quiz;
        // next();
      // } else{next(new Error('No existe quizId=' + quizId))}
    // }
  // ).catch(function(error){next(error);});
// };
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            },
        }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};
exports.index = function(req, res) {
var search = "%";
if(req.query.search != undefined)
{
search = "%" + req.query.search + "%";
search = search.trim().replace(/\s/g,"%");	
}
  models.Quiz.findAll({where: ["pregunta like ?", search], order: 'pregunta ASC'}).then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }
  ).catch(function(error){next(error);});
};
// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};  
           // req.quiz: instancia de quiz cargada con autoload

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  if (req.query.respuesta === req.quiz.respuesta) {
    res.render('quizes/answer',{quiz:req.quiz, respuesta:'CORRECTO'});
  } else{
  res.render('quizes/answer', {quiz:req.quiz, respuesta:'INCORRECTO'});
  }
  };

exports.author=function(req,res){
	res.render('author');
};