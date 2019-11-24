from django.db import models

class UserInfo(models.Model):
    age = models.CharField(max_length=20)
    gender = models.CharField(max_length=20)
    education = models.CharField(max_length=20)
    ip_address = models.CharField(max_length=20, default="0.0.0.0")
    mturk_id = models.CharField(max_length=50, default="None")
    date_submitted = models.DateTimeField(auto_now_add=True)
    def __str__(self):
            return self.ip_address
