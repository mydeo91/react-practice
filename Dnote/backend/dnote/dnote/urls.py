from django.contrib import admin
from django.urls import path

from notes import urls
from django.conf.urls import include, url

urlpatterns = [
    path("admin/", admin.site.urls), 
    url(r"^api/", include(urls))
]