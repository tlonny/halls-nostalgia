# halls-nostalgia

A bunch of interconnected levels for [halls] of retro/classic video-games.

## How to Use

### Use in halls
Enter a manifest URL (view repository URL for a list)

### Build from source
Alternatively, you can build the level assets from source:

1. Clone this repo.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Install Blender and set a `BLENDER_PATH` environment variable.
4. Build assets:
   ```bash
   bun run build/index.ts
   ```

### Serve content locally
```bash
python -m http.server -d dist
```

And then access the manifests via localhost.

## Methodology

- Each level lives in `asset/<level>/` and includes a `scene.blend`, textures, and any optional static assets (for example `bgm.ogg`).
- Each level has a matching build module in `build/<level>/` that defines tasks and emits build artifacts into `dist/<level>/`.
- The build runs Blender in headless mode and exports all mesh objects named with the `model.` prefix into a level `model.glb` (the visible geometry used in halls).
- The collider export starts from the same `model.` meshes, runs `dissolve_degenerate` and `dissolve_limited` cleanup in Blender, then exports a separate `collider.glb` for collision use.
- Textures are copied into `dist/<level>/` via ImageMagick resize tasks and normalized to square dimensions (required by halls).
- Static level data (for example audio/tracks) is copied directly into `dist/<level>/`.
- Spawn data is exported from the `spawn` object in Blender into `spawn.json`.
- Portal colliders are exported from explicitly named portal objects (for example `portal.arch`) as dedicated GLBs.
- Level manifests are generated per level (`dist/<level>.json`) and wire together model, collider, spawn, materials, and portal links to other levels.
- The top-level build (`build/index.ts`) runs all level task sets and emits `dist/index.html` with links to each manifest.

## Contributing

Any help tidying up or improving existing levels is appreciated and welcome.

If you want to contribute novel levels, create a new repository for that level set and then contribute here by updating portal links/manifests to connect to that repository's published manifests.

## Credits

- Doom Hangar mesh by [dad34853](https://models.spriters-resource.com/ms_dos/doomdoomii/asset/323264/)
- Doom background music, "At Doom's Gate" from [khinsider](https://downloads.khinsider.com/game-soundtracks/album/doom-pc/02.%2520At%2520Doom%2527s%2520Gate.mp3)
- CS 1.6 de_nuke mesh by [ViGmaezBoy](https://models.spriters-resource.com/pc_computer/counterstrike16/asset/310951/)
- CS 1.6 de_dust2 mesh by [ViGmaezBoy](https://models.spriters-resource.com/pc_computer/counterstrike16/asset/310949/)
- Zelda OOT Deku Tree mesh by [alecpike](https://models.spriters-resource.com/nintendo_64/thelegendofzeldaocarinaoftime/asset/283783/)
- Zelda Majora's Mask moon mesh by [Jay6T4](https://models.spriters-resource.com/nintendo_64/thelegendofzeldamajorasmask/asset/311650/)
- Zelda OOT Deku Tree music track, "Kokiri Forest" from [khinsider](https://downloads.khinsider.com/game-soundtracks/album/the-legend-of-zelda-ocarina-of-time-3d-original-soundtrack/05.%2520Kokiri%2520Forest.mp3)
- Mario Kart 64 Battle Block Fort mesh by [Jay6T4](https://models.spriters-resource.com/nintendo_64/mariokart64/asset/311924/)
