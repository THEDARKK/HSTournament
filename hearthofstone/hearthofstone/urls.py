from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'', include('tournament.urls', namespace='tournament')),
    url(r'^admin/', admin.site.urls),
]
