## 0. 사전작업

```python
- 가장먼저 가상환경 만들기
- django-admin startproject 프로젝트이름
- python manage.py startapp 앱이름
- 앱은 만들고 꼭 setting에 등록을 해주자!!
```



## 1 . 우선 accounts Model 만들기

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass
    
# accounts model은 기존의 만들어져있는 user모델인 AbstractUser를 상속받은
# 클래스를 만들어야한다! 나중에 내가 수정하기 용이하기 때문에
```



## 2. 그다음 url등 등록

```python
from django.contrib import admin
from django.urls import path, include
from movies import views



urlpatterns = [
    path('', views.index),
    path('admin/', admin.site.urls),
    path('movies/', include('movies.urls')),
    path('accounts/', include('accounts.urls')),

# 여기는 맨처음 프로젝트 url연결해주는 세팅하는곳!
# app이 2개니까 우선 movies와 accounts에 대한 연결해주고
# 그냥 아이피주소로만 접근했을때 바로 movies의 views.index페이지를 띄워주도록 세팅했음!!

------------------------------------------------------------------------


from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('delete/', views.delete, name='delete'),
    path('update/', views.update, name='update'),
    path('password/', views.change_password, name='password'),

]
# accounts의 url도 article이나 movie app들 만들때처럼 똑같이 세팅해주자

```



## 3. 만들어가다가 form에서는 재설정 해줄게있다

```python
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = UserCreationForm.Meta.fields

class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm.Meta):
        model = get_user_model()
        fields = ('username',)
        

# accounts에서는 모델폼으로 만들지않고 이미 만들어져있는 creation폼과 회원정보수정 폼을
# 상속받아서 거기에 기본으로 세팅되어있는 model을 내가 처음에 만들어준 User모델로 대체해주는
# 작업을 해주어야 한다!! Meta 클래스도 똑같이 Meta값을 상속받아야하고 
# 중요!! model을 장고에서는 get_user_model이란 함수를 통해 쓰는걸 추천한다!
```

## 4. 본격적으로 view함수를 만들어보자

```python
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect('movies:index')
    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)

def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return redirect('movies:index')


# 로그인과 로그아웃 함수이다.
# import받는걸 잘 보자 로그인과 로그아웃은 장고에서 제공해주는 쿠키데이터를 생성해주는 기능을 사용한다. 근데 클래스명과 이름이 중복이니까 as로 이름을 바꾸어주는거 잊지말자
# AuthenticationForm << 장고에서 만들어둔 인증폼을 사용해 로그인 인증을 한다
# auth_login 안에 들어가는 인자들중 유저정보를 가져오는 form.get_user()는 특이하니까 꼭 알아두자
```

## 5.회원가입 및 삭제

```python
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('movies:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)

# 회원가입은 내가 만들어둔 커스텀회원가입폼을 사용하는데 회원가입과 동시에 로그인을 하기위해
# 로그인때 사용했던 auth_login을 또 사용하는데 이때 user정보는 form.save()를 통해 객체를 뽑아낼수 있고 이 객체를 인자로 넣어준다!


def delete(request):
    request.user.delete()
    auth_logout(request)
    return redirect('movies:index')

# 회원탈퇴는 요청받은 유저데이터를 지워버리면된다 너무 간단하다
# 추가로 로그아웃으로 쿠키데이터도 삭제하기위해서 로그아웃도 해줬다.
# 그런데 로그아웃 먼저하면 삭제시킬 데이터가 없어지니까 먼저삭제하고 로그아웃하자
```



## 6. 회원정보수정

```python
def update(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            form = CustomUserChangeForm(request.POST, instance=request.user)
            if form.is_valid():
                form.save()
                return redirect('movies:index')
        else:
            form = CustomUserChangeForm(instance=request.user)
        context = {
            'form': form,
        }
        return render(request, 'accounts/update.html', context)
    return redirect('movies:index')

# 위에서 만들어둔 Custom유저정보변경 form을 가져오는데 이 form에선 또 주의해야하는게 정보를 받아와야해서 유저정보 데이터를 인자로 받아와야하는데 instance=유저정보를 설정해주어야 한다!

```

## 7. 비번변경

```python
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect('movies:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)

# 비번변경은 장고에서 따로 PasswordChangeForm을 제공한다.
# 이것도 첫번재 인자로 request.user 로 유저정보를 넣어야하고 POST요청땐 두번째 인자에 내가 바꾼데이터가 들어간 request.POST인자로 잊지말자
# 그리고 그냥 저장해도되지만 기존세션과의 회원인증 정보가 일치하지 않아서 로그아웃이 되는데  update_session_auth_hash(request, user)를 통해서 로그인상태를 유지하도록 해준다
```

## 8. N:1 Foreignkey 사용해 모델간 연결

```python
from django.db import models
from django.conf import settings

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
class Comment(models.Model):
    content = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='commentall')
    
# Movie와 Comment 모델들을 User모델과 참조관계로 연결시킬때 원래는 ForeignKey의 첫번쨰 인자로 참조할 모델명을 적으면 되는데 User모델은 또 직접쓰면안되어서 settings.AUTH_USER_MODEL 로 받아와야한다! 이건 ForeignKey 모델참조용으로만 쓰이니 그냥 외우고 다른때는 get_user_model 쓰면된다

# on_delete=models.CASCADE는 참조하고있던 객체가 사라지면 연동되고있던 데이터도 삭제해주니까 필요하면 적으면된다!

# related_name값은 역참조할때의 이름을 바꿔준다. 저렇게 commentall 해두면 역참조로 불러올때
# comments = movie.commentall.all() << 이런식으로 movie에 딸린 모든 comment들을 가져올 수있따 원래라면 movie.comment_set.all()을 쓰면 역참조가 된다. 그냥 어떻게 바뀌나 시험용으로 해보았다

```

## 9. views 함수 작성

```python
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

# 원래 하던거와 비슷한데 저기 form에서 commit=False 를 통해서 잠깐 form 저장을 멈추어야 한다
# 왜냐면 내가 모델에서 데이터 스키마 구성할때 ForeignKey값을 데이터에 받아야하는데 이걸 form에서는 사용자가 입력하면 이상하니까 못하도록 제외시켜 두었기 때문이다.
# 그래서 잠깐 commit을 멈추고 movie객체를 뽑아내서 movie.user = request.user로 참조하는 값을 넣어주고 비로소 movie.save()를 통해서 데이터에 저장해준다

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
# 아까 설정해둔 역참조를 통해서 특정 detail에 딸려있는 모든 comment를 가져와서 쓸 수 있다

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

# 코멘드 만드는 함수이다. 크게 특이할건 없고 comment는 참조하는 값이 user와 movie 두개니까
# 각각 내가 대입해준다음에 save를 통해 코멘트를 생성한다

def comment_delete(request, movie_pk, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    if request.method == 'POST':
        if request.user == comment.user:
            comment.delete()
    return redirect('movies:detail', movie_pk)

# comment 삭제할때는 그냥 pk값 뽑아내서 가볍게 지워주면된다.
# 물론 작성한놈만 지울수 있게 하는거 잊지말자
```

