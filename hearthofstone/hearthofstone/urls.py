from django.conf.urls import url, include
from django.contrib import admin

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^api-token-auth/', obtain_jwt_token, name='obtain-token'),
    url(r'', include('tournament.urls', namespace='tournament')),
    url(r'^admin/', admin.site.urls),
]
