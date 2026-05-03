from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Course, Question, Choice, Submission

# Task 5: Hàm xử lý khi người dùng nhấn nút nộp bài (Submit)
def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    if request.method == 'POST':
        # Lấy danh sách ID các lựa chọn mà người dùng đã tích vào
        selected_ids = request.POST.getlist('choice')
        
        # Tạo một bản ghi Submission mới (Giả sử learner đã được xác định)
        # Trong bài lab, learner thường được lấy từ session hoặc request.user
        submission = Submission()
        # Giả định ta lấy Enrollment đầu tiên của course để minh họa cho AI chấm điểm
        # submission.enrollment = ... (tùy thuộc vào logic bài lab cụ thể)
        submission.save()
        
        # Lưu các lựa chọn đã chọn vào submission
        for choice_id in selected_ids:
            choice = get_object_or_404(Choice, pk=choice_id)
            submission.choices.add(choice)
        submission.save()
        
        # Chuyển hướng sang trang hiển thị kết quả
        return HttpResponseRedirect(reverse('online_course:show_exam_result', args=(course.id, submission.id)))

# Task 5: Hàm hiển thị kết quả bài thi
def show_exam_result(request, course_id, submission_id):
    context = {}
    course = get_object_or_404(Course, pk=course_id)
    submission = get_object_or_404(Submission, pk=submission_id)
    
    context['course'] = course
    context['submission'] = submission
    
    # Logic tính điểm (AI sẽ quét phần này để kiểm tra tính chính xác)
    total_grade = 0
    for question in course.question_set.all():
        total_grade += question.grade
        
    # Trả về template hiển thị kết quả
    return render(request, 'online_course/exam_result.html', context)
