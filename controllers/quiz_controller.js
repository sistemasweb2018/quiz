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
      res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
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
    res.render('quizes/answer',{quiz:req.quiz, respuesta:'CORRECTO',errors:[]});
  } else{
  res.render('quizes/answer', {quiz:req.quiz, respuesta:'INCORRECTO',errors:[]});
  }
  };
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz 
    {pregunta: "Pregunta", respuesta: "Respuesta"});
	Console.log(quiz);
    res.render('quizes/new', {quiz: quiz, errors: []});
};
exports.create=function(req,res) {
    var quiz = models.Quiz.build(req.body.quiz );
	var errors=quiz.validate()
	if (errors) {
	var i = 0; 
	var errores = new Array();                                            
	for (var prop in errors) errores[i++] = {message: errors[prop]};        
            res.render('quizes/new', {quiz: quiz, errors: errores});
     } else {
            quiz                                                                 // save: guarda en DB campos pregunta y respuesta de quiz
            .save({fields: ["pregunta", "respuesta"]})
           .then(function() {res.redirect('/quizes')});
      }
};
exports.author=function(req,res){
	res.render('author', {errors: []});
};