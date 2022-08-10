package com.exam.controller;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping({"/add"})
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        Quiz quiz1 = this.quizService.addQuiz(quiz);
        return ResponseEntity.ok(quiz1);
    }

    @PutMapping({"/update"})
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    @GetMapping("/quizzes")
    public ResponseEntity<?> getAllQuizzes(){
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    @GetMapping({"/{qId}"})
    public Quiz getQuiz(@PathVariable("qId") Long qId){
        return this.quizService.getQuiz(qId);
    }

    @DeleteMapping({"/delete/{qId}"})
    public void deleteQuiz(@PathVariable("qId") Long qId){
        this.quizService.deleteQuiz(qId);
    }

    @GetMapping("/category/{cId}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cId") Long cId){
        Category category = new Category();
        category.setcId(cId);
        return this.quizService.getQuizzesOfCategory(category);
    }

    //get Active quizzes
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }

    @GetMapping("/category/active/{cId}")
    public List<Quiz> getActiveQuizzes(@PathVariable("cId") Long cId){
        Category category = new Category();
        category.setcId(cId);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }
}
