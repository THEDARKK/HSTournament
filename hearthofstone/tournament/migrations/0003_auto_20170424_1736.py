# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-24 17:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tournament', '0002_auto_20170424_1736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='decks',
            field=models.ManyToManyField(blank=True, related_name='deck_players', to='tournament.Deck'),
        ),
        migrations.AlterField(
            model_name='player',
            name='match',
            field=models.ManyToManyField(blank=True, related_name='match_players', to='tournament.Match'),
        ),
    ]