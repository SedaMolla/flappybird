# My Website

## Getting Started
- Setup the recommended extensions
- Install [volta](https://volta.sh/) to manage Node.js versions.
- Run `npm install` to install dependencies.

## Credits
A special thanks to https://github.com/ImKennyYip/flappy-bird for the reference implementation.


#Plan
-I will keep track of the bird’s position (x, y).
-Gravity will pull the bird down each frame.
-When the player clicks or presses a key, the bird will flap up.
-Each frame, the bird’s position will be updated.
-If the bird hits the ground, it will stop or reset.


#Functions and one-line descriptions
init() — Set up start: reset variables → place bird at start → attach input listeners.

draw(ctx) — Clear frame → draw background → draw bird at (x, y) → show simple UI if needed.

update(dt) — Apply gravity → update velocity → update position → check bounds/collisions.

onInput(event) — When click/key happens, give bird an upward impulse (flap) → optionally adjust horizontal speed.

reset() — Restart game: center the bird → zero velocities → clear counters/state.

clampToBounds() — If bird leaves screen, clamp position → damp/stop velocity on floor/ceiling hit.

loadAssets() (optional) — Load images/sounds → mark as ready when finished.

spawnObstacles() (optional) — Create obstacles over time → set positions/speeds → remove when off-screen.