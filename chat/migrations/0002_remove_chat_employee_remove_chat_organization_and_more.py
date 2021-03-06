# Generated by Django 4.0.2 on 2022-02-11 16:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='employee',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='organization',
        ),
        migrations.AddField(
            model_name='chat',
            name='org',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='chat.employee'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chat',
            name='reciver',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='reciver', to='chat.employee'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chat',
            name='sender',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='chat.employee'),
            preserve_default=False,
        ),
    ]
