<img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Tictactoe1.gif" alt="Logo of the project" align="right" style="margin-left:1rem">

# Tic-tac-toe &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

## Introduction

Le jeu de Tic-tac-toe est un jeu de réflexion se pratiquant à deux joueurs au tour par tour dont le but est de créer le premier alignement.

## Règle du jeu

Deux joueurs s'affrontent. Ils doivent remplir chacun à leur tour une case de la grille avec le symbole
qui leur est attribué :

- `X` pour le premier joueur
- `O` pour le second

Il est coutume de laisser le joueur jouant `X` effectuer le premier coup de la partie.

Le gagnant est celui qui arrive à aligner trois symboles identiques, `horizontalement`, `verticalement`, `diagonale`.

## Prés requis

- [Nodejs](https://nodejs.org/en/download/) `17.2.0`.
- [Npm](https://www.npmjs.com/package/npm/v/8.3.0) `8.3.0` .

## Technologie utilisée

### TypeScript

Pour les scripts j’ai choisi TypeScript qui nous permettra de typer nos scripts pour avoir de l’aide supplémentaire de la part de notre éditeur préférer.

### Vite

Vite nous permettra de compiler nos assets de jeu avec TypeScript.

#### Vitest

Vitest nous permettra d’effectuer des tests unitaires sur l’ensemble des scripts que nous allons créer.

## Installation

```bash
$ git clone https://github.com/themonsterdev/tic-tac-toe
$ cd tic-tac-toe
$ npm run install
```

## Testes unitaires

```bash
$ npm run test
$ npm run coverage
```

## Développement

```bash
$ npm run dev
```

## Production

```bash
$ npm run build
```

## Références

- [Tic-tac-toe](https://fr.wikipedia.org/wiki/Tic-tac-toe)
- [Arbre de jeu](https://fr.wikipedia.org/wiki/Arbre_de_jeu)
- [Algorithme minimax](https://fr.wikipedia.org/wiki/Algorithme_minimax)
- [Élagage alpha-bêta](https://fr.wikipedia.org/wiki/%C3%89lagage_alpha-b%C3%AAta)

## Licence

Le code est open source sous licence [MIT](./LICENSE).
