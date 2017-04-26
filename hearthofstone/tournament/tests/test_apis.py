from rest_framework.test import APIClient
from rest_framework.test import APITestCase

from tournament.factories import (PlayerFactory, MatchFactory, DeckFactory,
                                  TournamentFactory, BracketFactory, UserFactory)
from tournament.models import Player, Match, Deck, Tournament, Bracket

from django.urls import reverse_lazy

from faker import Factory

faker = Factory.create()


class PlayerAPITests(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.player = PlayerFactory(battle_tag='1' + faker.word())
        self.tournament = TournamentFactory()
        self.match = MatchFactory()
        self.deck = DeckFactory()
        self.player_m2m= PlayerFactory(tournaments=(self.tournament,), matches=(self.match,),
                                       decks=(self.deck,), battle_tag='2' + faker.word())

    def test_can_get_all_players(self):
        response = self.client.get(reverse_lazy('tournament:player-list-api'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.player.battle_tag)
        self.assertContains(response, self.player_m2m.battle_tag)

    def test_can_get_single_player(self):
        response = self.client.get(reverse_lazy('tournament:player-detail-api',
                                                kwargs={'pk': self.player.pk}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.player.battle_tag)
        self.assertNotContains(response, self.player_m2m.battle_tag)

    def test_can_create_player(self):
        self.assertEqual(Player.objects.count(), 2)

        data = {
            'player': {
                'rank': 25,
                'battle_tag': faker.word(),
                'tournaments': [],
                'decks': [],
                'matches': []
            },
            'username': faker.word(),
            'password': 'somepass',
            'email': faker.email(),
        }

        response = self.client.post(reverse_lazy('tournament:player-list-api'), data=data, format='json')
        # import ipdb; ipdb.set_trace()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Player.objects.count(), 3)

    def test_can_edit_player(self):
        data = {
            'username': 'Newname',
            'password': self.player.user.password,
            'player': {
                'rank': self.player.rank,
                'battle_tag': self.player.battle_tag,
                'tournaments': [],
                'decks': [],
                'matches': [],
            }
        }

        response = self.client.put(reverse_lazy('tournament:player-detail-api',
                                                kwargs={'pk': self.player.pk}),
                                   data=data, format='json')
        # import ipdb; ipdb.set_trace()
        self.player.user.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.player.user.username, 'Newname')

    def test_can_delete_player(self):
        self.assertEqual(Player.objects.count(), 2)

        response = self.client.delete(reverse_lazy('tournament:player-detail-api',
                                                   kwargs={'pk': self.player.pk}))

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Player.objects.count(), 1)
