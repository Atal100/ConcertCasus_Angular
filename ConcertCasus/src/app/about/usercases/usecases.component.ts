import { Component, OnInit } from '@angular/core';
import { UseCase } from '../usecase.model';

@Component({
  selector: 'app-usecases',
  templateUrl: './usecases.component.html',
  styleUrls: ['./usecases.component.css']
})
export class UsecasesComponent implements OnInit {
  useCases: UseCase[] = [
    {
      id: 'UC-01',
      name: 'Inloggen',
      description: 'Hiermee logt een Administrator in.',
      scenario: [
        'Gebruiker vult email en password in en klikt op Login knop.',
        'De applicatie valideert de ingevoerde gegevens.',
        'Indien gegevens correct zijn dan redirect de applicatie naar het startscherm.'
      ],
      actor: 'Reguliere gebruiker',
      precondition: 'Geen',
      postcondition: 'De actor is ingelogd'
    },
    {
      id: 'UC-02',
      name: 'Concert info bekijken',
      description: 'Hiermee kan de gebruiker meer informatie over de Concert vinden',
      scenario: ['gebruiker gaat naar Concerts', 'gebruiker klikt een Concert aan', 'gebruiker leest de extra info'],
      actor: 'Gebruiker',
      precondition: 'Geen',
      postcondition: 'Het doel is bereikt.'
    },
    {
      id: 'UC-03',
      name: "Concert toevoegen ",
      description: "De Administrator wilt een Concert toevoegen",
      scenario: ['Administrator gaat naar Concert', 'Administrator klikt op New Concert', 'Administrator vult alle informatie in over de Concert', 'Administrator klikt op Save Concert'],
      actor: 'Administrator',
      precondition: 'De actor moet ingelogd zijn',
      postcondition: 'Er is een nieuwe Concert toegevoegd.'


    },
    {
      id: 'UC-04',
      name: "Concert verwijderen ",
      description: "De Administrator wilt een Concert verwijderen",
      scenario: ['Administrator gaat naar Concert', 'Administrator klikt op delete Concert van specifieke Concert', 'Administrator klikt op ja '],
      actor: 'Administrator',
      precondition: 'De actor moet ingelogd zijn',
      postcondition: 'Er is een Concert verwijderd.'


    },
    {
      id: 'UC-05',
      name: "Gebuiker Artist zien",
      description: "De Gebruiker wilt een Artist zien",
      scenario: ['Gebruiker gaat naar Artist', 'Gebruiker klikt de specifieke Moviescreening die hij wilt zien'],
      actor: 'Gebruiker',
      precondition: 'Geen',
      postcondition: 'Hij weet extra details over de Artist.'


    },
    {
      id: 'UC-06',
      name: "Artist toevoegen ",
      description: "De Administrator wilt een Artist toevoegen",
      scenario: ['Administrator gaat naar Artists', 'Administrator klikt op New Artist', 'Administrator vult gegevens in'],
      actor: 'Administrator',
      precondition: 'De actor moet ingelogd zijn',
      postcondition: 'Er is een nieuwe Artist toegevoegd.'


    },
    {
      id: 'UC-07',
      name: "Artist verwijderen ",
      description: "De Administrator wilt een Artist verwijderen",
      scenario: ['Administrator gaat naar Artist', 'Administrator klikt op Delete Artist', 'Administrator klikt op ja'],
      actor: 'Administrator',
      precondition: 'De actor moet ingelogd zijn',
      postcondition: 'Er is een Artist verwijdered.'


    },
    {
      id: 'UC-08',
      name: "Music toevoegen ",
      description: "De Administrator wilt Music toevoegen",
      scenario: ['Administrator gaat naar Music', 'Administrator klikt op New Music', 'Administrator vult de gegevens in', 'Administrator klikt op save'],
      actor: 'Administrator',
      precondition: 'De actor moet ingelogd zijn',
      postcondition: 'Er is een nieuwe Music toegevoegd.'


    },
    {
      id: 'UC-09',
      name: "Music verwijderen ",
      description: "De Administrator wilt een Music verwijderen",
      scenario: ['Administrator gaat naar Music', 'Administrator klikt op Delete Music', 'Administrator klikt op ja',],
      actor: 'Administrator',
      precondition: 'De actor moet ingelogd zijn',
      postcondition: 'Er is een Music verwijderd.'


    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
