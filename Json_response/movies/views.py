from django.shortcuts import redirect, render
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .form import MovieForm, CommentForm
from .models import Movie, Comment

# Create your views here.
def index(request):
    movies = Movie.objects.all()

    context = {
        'movies': movies,
    }
    return render(request, 'movies/index.html', context)

@login_required
def create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            movie = form.save(commit=False)
            movie.user = request.user
            movie.save()
            return redirect('movies:index')
    else:
        form = MovieForm()
    
    context = {
        'form': form,
    }
    return render(request, 'movies/create.html', context)

def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    comments = movie.commentall.all()
    form = CommentForm()

    context = {
        'movie': movie,
        'form': form,
        'comments': comments,
    }
    return render(request, 'movies/detail.html', context)

@login_required
def update(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            form.save()
            return redirect('movies:detail', movie.pk)
    else:
        form = MovieForm(instance=movie)
    context = {
        'form': form,
        'movie': movie,
    }
    return render(request, 'movies/update.html', context)

@login_required
def delete(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        if request.user == movie.user:
            movie.delete()
            return redirect('movies:index')
    return redirect('movies:detail', movie.pk)

@login_required
def comment(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.movie = movie
            comment.save()
            return redirect('movies:detail', movie.pk)

    return redirect('movies:detail', movie.pk)
            
@login_required
def comment_delete(request, movie_pk, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    if request.method == 'POST':
        if request.user == comment.user:
            comment.delete()
    return redirect('movies:detail', movie_pk)


def data_response(request):
    movies = {
        '일': '위대한쇼맨', 
        '이': '어벤져스',
        '삼': '페이커',
        }

    context = {
        'name': '한',
        'movies': movies
    }

    return JsonResponse(context)