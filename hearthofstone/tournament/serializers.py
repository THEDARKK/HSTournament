from rest_framework import serializers
from tournament.models import Deck, Tournament, Match, Player, Bracket
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ('name', )


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('name', 'active', 'max_players')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('tournament', 'active')


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('rank', 'tournaments', 'decks', 'matches')


class UserSerializer(serializers.ModelSerializer):
    player = PlayerSerializer()

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'player')

    def create(self, validated_data):
        player_data = validated_data.pop('player')
        user = User.objects.create_user(**validated_data)
        player = Player.objects.create(user=user, rank=player_data['rank'])
        for tournament in player_data['tournaments']:
            player.tournaments.add(tournament)
        for deck in player_data['decks']:
            player.decks.add(deck)
        for match in player_data['matches']:
            player.matches.add(match)
        return user

    def update(self, instance, validated_data):
        player_data = validated_data.pop('player')
        instance = super(UserSerializer, self).update(instance, validated_data)
        player = get_object_or_404(Player, user=instance)
        player.rank = player_data.get('rank', None)
        for tournament in player_data.get('tournaments', None):
            if tournament not in player.tournaments.all():
                player.tournaments.add(tournament)
        for deck in player_data.get('decks', None):
            if deck not in player.decks.all():
                player.decks.add(deck)
        for match in player_data.get('matches', None):
            if match not in player.matches.all():
                player.decks.add(match)
        player.save()
        return instance


class BracketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bracket
        fields = ('name', 'bracket_type', 'tournament')
