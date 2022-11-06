from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('<int:movie_pk>/', views.detail, name='detail'),
    path('<int:movie_pk>/update/', views.update, name='update'),
    path('<int:movie_pk>/delete/', views.delete, name='delete'),
    path('<int:movie_pk>/comment/', views.comment, name='comment'),
    path('<int:movie_pk>/comment/<int:comment_pk>/delete', views.comment_delete, name='comment_delete'),
    path('data/', views.data_response, name='data_response'),
]
