package com.exam.repo;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface QuestionRepository extends CrudRepository<Question, Long> {
    Set<Question> findByQuiz(Quiz quiz);
}
