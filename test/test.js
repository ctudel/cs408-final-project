import { Game } from '../js/game.js';
import { Player } from "../js/player.js";
import { Obstacle } from "../js/obstacle.js";
import { Background } from "../js/background.js";

QUnit.module('Game', function() {
  let game;

  // Setup before each test
  QUnit.test('Game is instantiated', function(assert) {
    game = new Game();
    assert.ok(game, 'Game should properly be instantiated');
  });

  QUnit.test('Player jump functionality', function(assert) {
    game = new Game(); 
    let player = game.player;
    player.y = player.ground; 

    window.dispatchEvent(new KeyboardEvent('keypress', { key: ' ' }));
    
    player.update();

    assert.ok(player.y < player.ground, 'Player should jump above ground after pressing space');
  });

  QUnit.test('Gravity effect on player', function(assert) {
    game = new Game(); 
    game.player.y = 0; // Position player at the top of the screen
    game.update(); // Update once to apply gravity
    assert.ok(game.player.y > 0, 'Player should fall due to gravity after update');
  });

  QUnit.test('Collision detection with obstacle', function(assert) {
    game = new Game(); 
    game.player.y = game.player.ground; // Position player at ground level
    game.obstacle.x = game.player.x;
    game.obstacle.y = game.player.y;

    game.player.collisionDetect();

    assert.ok(game.endGame, 'Game should end upon collision with obstacle');
  });

  QUnit.test('Bounds for ground functionality', function(assert) {
    game = new Game(); 
    game.player.y = 610; // Position below ground level
    game.player.hitBottom();

    assert.equal(game.player.y, game.player.ground, 'Player should be reset to ground level if below it');
  });

  QUnit.test('Bounds for sky functionality', function(assert) {
    game = new Game(); 
    game.player.y = -10; // Position above sky level
    game.player.sky();

    assert.equal(game.player.y, 0, 'Player should be reset to sky level if above it');
  });
});
