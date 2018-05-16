"""vuedj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib import admin
from app.views import index, risks_home, risk_view, TableList, TableDetail, table_list, table_detail, SessionOrQuizList, SessionOrQuizDetail, SectionList, SectionDetail, CourseList, CourseDetail

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^tables_backend/$', table_list),
    url(r'^tables_backend/(?P<pk>\d+)/$', table_detail),
    url(r'^tables/$', TableList.as_view()),
    url(r'^tables/(?P<pk>\d+)/$', TableDetail.as_view()),
    url(r'^risks_backend/$', risks_home),
    url(r'^risks_backend/(?P<id_risk>\d+)/$', risk_view),
    url(r'^session_or_quizs/$', SessionOrQuizList.as_view()),
    url(r'^session_or_quizs/(?P<pk>\d+)/$', SessionOrQuizDetail.as_view()),
    url(r'^sections/$', SectionList.as_view()),
    url(r'^sections/(?P<pk>\d+)/$', SectionDetail.as_view()),
    url(r'^courses/$', CourseList.as_view()),
    url(r'^courses/(?P<pk>\d+)/$', CourseDetail.as_view()),
    url(r'^$', index, name='home'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
