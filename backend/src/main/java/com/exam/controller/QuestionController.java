package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping({"/add"})
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping({"/update"})
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //Get question of any quiz.
    @GetMapping({"/quiz/{qId}"})
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qId") Long qId){
        /*Quiz quiz = new Quiz();
        quiz.setqId(qId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);*/

        Quiz quiz = this.quizService.getQuiz(qId);
        Set<Question> questions = quiz.getQuestion();
        List<Question> list = new ArrayList<>(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    //Get question of any quiz.
    @GetMapping({"/quiz/all/{qId}"})
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qId") Long qId){
        Quiz quiz = new Quiz();
        quiz.setqId(qId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    //Get single question
    @GetMapping({"/{questId}"})
    public Question getQuestion(@PathVariable("questId") Long questId){
        return this.questionService.getQuestion(questId);
    }

    //delete single question
    @DeleteMapping({"delete/{questId}"})
    public void deleteQuestion(@PathVariable("questId") Long questId){
        this.questionService.deleteQuestion(questId);
    }

    /*@PostMapping({"/eval-quiz"})
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);

        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;

        for (Question q : questions){
            Question question = this.questionService.get(q.getQuestId()); //On cherche en back la question correspondante
            if(question.getAnswer().trim().equals(q.getGivenAnswers().trim())){
                correctAnswers++;
                double marksSingle =  Double.parseDouble(questions.get(0).getQuiz().getMaxMarks());
                marksGot += marksSingle;
            }

            if (q.getGivenAnswers() != null){
                attempted++;
            }

        };

        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);
        return ResponseEntity.ok(map);
    }*/

}
