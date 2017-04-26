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


class TournamentAPITests(APITestCase):

    def setUp(self):
        self.tournament = TournamentFactory()
        self.tournament2 = TournamentFactory()
        self.client = APIClient()

    def test_can_get_all_tournaments(self):
        response = self.client.get(reverse_lazy('tournament:tournament-list-api'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.tournament.name)
        self.assertContains(response, self.tournament2.name)

    def test_can_get_specific_tournament(self):
        response = self.client.get(reverse_lazy('tournament:tournament-detail-api',
                                                kwargs={'pk': self.tournament.pk}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.tournament.name)
        self.assertNotContains(response, self.tournament2.name)

    def test_can_edit_tournament(self):
        data = {
            'name': 'Ahyperawesometournament',
            'active': self.tournament.active,
            'start_time': self.tournament.start_time,
            'end_time': self.tournament.end_time,
            'max_players': 100,
        }

        response = self.client.put(reverse_lazy('tournament:tournament-detail-api',
                                                kwargs={'pk': self.tournament.pk}), data=data)
        self.assertEqual(response.status_code, 200)
        self.tournament.refresh_from_db()
        self.assertEqual(self.tournament.name, 'Ahyperawesometournament')
        self.assertEqual(self.tournament.max_players, 100)

    def test_can_post_new_tournament(self):
        self.assertEqual(Tournament.objects.count(), 2)
        data = {
            'name': 'Ahyperawesometournament',
            'active': True,
            'start_time': faker.date(),
            'end_time': faker.date(),
            'max_players': 100,
        }

        response = self.client.post(reverse_lazy('tournament:tournament-list-api'), data=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Tournament.objects.count(), 3)

    def test_can_delete_tournament(self):
        self.assertEqual(Tournament.objects.count(), 2)

        response = self.client.delete(reverse_lazy('tournament:tournament-detail-api',
                                                   kwargs={'pk': self.tournament.pk}))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Tournament.objects.count(), 1)


class DeckAPITests(APITestCase):

    def setUp(self):
        self.deck = DeckFactory()
        self.deck2 = DeckFactory()
        self.client = APIClient()

    def test_can_get_all_decks(self):
        response = self.client.get(reverse_lazy('tournament:deck-list-api'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.deck.name)
        self.assertContains(response, self.deck2.name)

    def test_can_get_specific_deck(self):
        response = self.client.get(reverse_lazy('tournament:deck-detail-api',
                                                kwargs={'pk': self.deck.pk}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.deck.name)
        self.assertNotContains(response, self.deck2.name)

    def test_can_edit_deck(self):
        data = {
            'name': 'Ahyperawesomedeck',
        }

        response = self.client.put(reverse_lazy('tournament:deck-detail-api',
                                                kwargs={'pk': self.deck.pk}), data=data)
        self.assertEqual(response.status_code, 200)
        self.deck.refresh_from_db()
        self.assertEqual(self.deck.name, 'Ahyperawesomedeck')

    def test_can_post_new_deck(self):
        self.assertEqual(Deck.objects.count(), 2)
        data = {
            'name': 'Ahyperawesomedeck',
        }

        response = self.client.post(reverse_lazy('tournament:deck-list-api'), data=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Deck.objects.count(), 3)

    def test_can_delete_deck(self):
        self.assertEqual(Deck.objects.count(), 2)

        response = self.client.delete(reverse_lazy('tournament:deck-detail-api',
                                                   kwargs={'pk': self.deck.pk}))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Deck.objects.count(), 1)
