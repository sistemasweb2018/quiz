exports.question=function(req,res){
res .render('quizes/question',{pregunta: 'Capital de Euskadi'});
};
exports.answer=function(req,res){
if (req.query.respuesta==='Vitoria'){
	res .render('quizes/answer',{respuesta: 'Correcta'})}
else
{res.render('quizes/answer',{respuesta: 'Incorrecta'})}
};
exports.author=function(req,res){
 res.render('author');
};