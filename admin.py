from django.contrib import admin
# Task 2: Import đủ 7 classes từ models.py
from .models import Course, Lesson, Instructor, Learner, Question, Choice, Submission

# 1. Triển khai ChoiceInline để quản lý Choice ngay trong Question
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4

# 2. Triển khai QuestionInline để quản lý Question ngay trong Course
class QuestionInline(admin.StackedInline):
    model = Question
    extra = 5

# 3. Triển khai LessonAdmin
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title']

# 4. Triển khai QuestionAdmin sử dụng ChoiceInline
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ('question_text', 'grade')

# 5. Triển khai CourseAdmin sử dụng QuestionInline (và LessonInline nếu cần)
class CourseAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ('name', 'pub_date')
    list_filter = ['pub_date']
    search_fields = ['name', 'description']

# Đăng ký các model với Admin site
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Instructor)
admin.site.register(Learner)
admin.site.register(Choice)
admin.site.register(Submission)
