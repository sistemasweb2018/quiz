var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
router.param('quizId', quizController.load);						
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId',        quizController.show);
router.get('/quizes/:quizId/answer', quizController.answer);
router.get('/author', quizController.author);
module.exports = router;
