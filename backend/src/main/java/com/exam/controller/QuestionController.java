package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

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

}
