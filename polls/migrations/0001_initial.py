# Generated by Django 2.2.6 on 2019-11-24 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.CharField(max_length=20)),
                ('gender', models.CharField(max_length=20)),
                ('education', models.CharField(max_length=20)),
                ('ip_address', models.CharField(default='0.0.0.0', max_length=20)),
                ('mturk_id', models.CharField(default='None', max_length=20)),
                ('date_submitted', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
