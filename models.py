from django.db import models
from django.utils.timezone import now

# Model đại diện cho một Câu hỏi
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    grade = models.IntegerField(default=50) # Điểm số cho câu hỏi này

    def __str__(self):
        return self.question_text

    # Phương thức kiểm tra xem lựa chọn nào là đúng cho câu hỏi này
    def is_get_score(self, selected_ids):
        all_answers = self.choice_set.filter(is_correct=True).count()
        selected_correct = self.choice_set.filter(is_correct=True, id__in=selected_ids).count()
        if all_answers == selected_correct:
            return True
        return False

# Model đại diện cho các Lựa chọn (đáp án) của một câu hỏi
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text

# Model đại diện cho việc nộp bài (Submission)
class Submission(models.Model):
    enrollment = models.ForeignKey('Enrollment', on_delete=models.CASCADE)
    choices = models.ManyToManyField(Choice)
    date_submitted = models.DateTimeField(default=now)

    def __str__(self):
        return f"Submission {self.id} for {self.enrollment}"
