from django.urls import path
from . import views

# Đặt tên namespace cho app để dùng hàm reverse() ở Task 5
app_name = 'online_course'

urlpatterns = [
    # Các đường dẫn mặc định khác (ví dụ trang chủ, chi tiết khóa học)
    path('', views.CourseListView.as_view(), name='index'),
    path('<int:pk>/', views.CourseDetailView.as_view(), name='course_details'),

    # Task 6: Đường dẫn cho hàm submit (cần course_id)
    path('<int:course_id>/submit/', views.submit, name='submit'),

    # Task 6: Đường dẫn cho hàm show_exam_result (cần course_id và submission_id)
    path('<int:course_id>/submission/<int:submission_id>/result/', views.show_exam_result, name='show_exam_result'),
]
