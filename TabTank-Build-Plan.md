# TabTank — Updated Build Plan (v4)

**Turn your new tab into an aquarium. Draw your own fish and watch them swim.**

Complete Build Plan — Chrome Extension

---

## Table of Contents

- [What You Already Have](#what-you-already-have)
- [What Needs to Change](#what-needs-to-change)
- [Phase 1 — Skeleton (Get Something On Screen)](#phase-1--skeleton-get-something-on-screen)
- [Phase 2 — Drawing Tool (painter.js)](#phase-2--drawing-tool-painterjs)
- [Phase 3 — Fish Spawning & Swimming (fish.js)](#phase-3--fish-spawning--swimming-fishjs)
- [Phase 4 — Ocean Backgrounds & Mode System](#phase-4--ocean-backgrounds--mode-system)
- [Phase 5 — Bait Feature](#phase-5--bait-feature)
- [Phase 6 — Persistence (storage.js)](#phase-6--persistence-storagejs)
- [Phase 7 — Bubbles (bubbles.js) — Optional Polish](#phase-7--bubbles-bubblesjs--optional-polish)
- [Phase 8 — Custom UI & Button Art](#phase-8--custom-ui--button-art)
- [Layer Stack & Z-Index Order](#layer-stack--z-index-order)
- [Milestone Checklist](#milestone-checklist)

---

## What You Already Have

### manifest.json (Complete)

Manifest V3 Chrome extension that overrides the new tab page with `newtab.html`. Permissions for `storage` and `unlimitedStorage` are already declared. Icons referenced at 16, 48, and 128px sizes.

```json
{
  "manifest_version": 3,
  "name": "TabTank",
  "version": "1.0.0",
  "description": "Turn your new tab into an aquarium. Draw your own fish and watch them swim!",
  "chrome_url_overrides": {
    "newtab": "newtab.html"
  },
  "permissions": ["storage", "unlimitedStorage"],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

### Git Repository Initialized

### newtab.html (Complete)

Fullscreen overlay design with floating draw button, toolbar, and large draw canvas.

### css/style.css (Complete)

Layout rules for body, ocean, fish canvas, draw button, draw overlay, toolbar, draw canvas, and bait bucket.

### js/painter.js (In Progress)

Overlay toggle, freehand drawing, color picker, brush size, eraser, and clear button implemented.

### What's Still Missing

Fish spawning and swimming (fish.js), persistence (storage.js), bubbles (bubbles.js), background art, mode system, custom button art.

---

## What Needs to Change

The drawing experience was redesigned from v1. Instead of a small draw panel always visible in the bottom-right corner, the new design uses:

1. **A floating "Draw" button** — a single `+` button visible on the aquarium screen
2. **A fullscreen drawing overlay** — clicking the button opens/closes a fullscreen view where the entire page becomes the drawing canvas with a toolbar

This is a better UX because:
- More drawing space — you're not cramped into a 300×200 box
- Cleaner aquarium view — no panel cluttering the screen
- Room for new features — fish naming, larger brush preview, etc.

---

## Phase 1 — Skeleton (Get Something On Screen)

> **Status: COMPLETE**

### Step 1.1: File Structure

```
TabTank/
├── manifest.json               ✅ exists
├── newtab.html                 ✅ exists
├── css/
│   └── style.css               ✅ exists
├── js/
│   ├── painter.js              ⚠️ in progress
│   ├── fish.js                 ⚠️ in progress
│   ├── bubbles.js
│   └── storage.js
├── assets/
│   ├── backgrounds/
│   │   ├── ocean/              (standard ocean art)
│   │   └── pixel/              (pixel art backgrounds, 320×180)
│   └── ui/                     (custom button art)
└── icons/
    ├── icon16.png              ✅ exists
    ├── icon48.png              ✅ exists
    └── icon128.png             ✅ exists
```

### Step 1.2: newtab.html

**Aquarium view (always visible):**
- `<div id="ocean">` — background container for your art
- `<canvas id="fishCanvas">` — fullscreen transparent fish swimming surface
- `<button id="drawBtn">+</button>` — floating button that toggles the drawing overlay
- `<div id="baitBucket">` — bait feature element

**Drawing overlay (hidden by default, toggled by drawBtn):**
- `<div id="drawOverlay">` — fullscreen container, hidden with `display: none`
  - `<div id="toolbar">` — horizontal bar at the top with all controls:
    - `<input type="text" id="fishName" placeholder="Name your fish">`
    - `<input type="color" id="colorPicker" value="#000000">`
    - `<input type="range" id="brushSlider" min="1" max="20" value="4">`
    - `<button id="eraserBtn">Eraser</button>`
    - `<button id="clearBtn">Clear</button>`
    - `<button id="spawnBtn">Spawn</button>`
  - `<canvas id="drawCanvas" width="800" height="500">`

**Script tags (at the bottom, before `</body>`):**
- `storage.js`, `fish.js`, `painter.js`, `bubbles.js` — in that order

### Step 1.3: style.css

**Aquarium view elements:**

| SELECTOR | KEY PROPERTIES |
|----------|---------------|
| `body` | `margin: 0; overflow: hidden; width: 100vw; height: 100vh; background: #0a1628;` |
| `#ocean` | `position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;` |
| `#fishCanvas` | `position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;` |
| `#baitBucket` | `position: fixed; z-index: 5; cursor: pointer;` |

**Floating draw button:**

| SELECTOR | KEY PROPERTIES |
|----------|---------------|
| `#drawBtn` | `position: fixed; bottom: 30px; right: 30px; z-index: 21; width: 60px; height: 60px; border-radius: 50%; border: none; background: rgba(0,0,0,0.6); color: white; font-size: 28px; cursor: pointer;` |

**Drawing overlay:**

| SELECTOR | KEY PROPERTIES |
|----------|---------------|
| `#drawOverlay` | `position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 20; display: none; flex-direction: column; align-items: center; background: rgba(0,0,0,0.85);` |
| `#toolbar` | `display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(0,0,0,0.7); width: 100%; justify-content: center;` |
| `#drawCanvas` | `background: white; border-radius: 8px; cursor: crosshair; margin-top: 20px;` |
| `#fishName` | `padding: 6px 10px; border-radius: 6px; border: none; font-size: 14px;` |

### Step 1.4: Test It

1. Go to `chrome://extensions` in your browser
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked** → select your TabTank folder (or refresh if already loaded)
4. Open a new tab

You should see: a dark blue screen with a round `+` button in the bottom-right corner. Clicking it toggles the drawing overlay. Clicking again closes it.

> **Testing Workflow (use this for every change going forward):**
> After every code change: go to `chrome://extensions`, click the refresh icon on your extension card, then open a new tab to see the changes.

---

## Phase 2 — Drawing Tool (painter.js)

> **Status: MOSTLY COMPLETE**

### Step 2.1: Get the Canvas Context

- Grab `#drawCanvas` with `document.getElementById`
- Call `canvas.getContext('2d')` — store the result as `ctx`
- Set initial drawing values:
  - `ctx.lineCap = 'round'`
  - `ctx.lineJoin = 'round'`
  - `ctx.lineWidth = 4`
  - `ctx.strokeStyle = '#000000'`

### Step 2.2: Wire Up the Overlay Toggle

The draw button toggles the overlay open and closed. One click handler checks if the overlay is visible — if yes, close it and clear the canvas. If no, open it.

### Step 2.3: Implement Freehand Drawing

Four event listeners on the drawing canvas:

| EVENT | WHAT IT DOES |
|-------|-------------|
| `mousedown` | Set `isDrawing = true`. Call `ctx.beginPath()`, then `ctx.moveTo(e.offsetX, e.offsetY)`. |
| `mousemove` | If `isDrawing` is false, return early. Otherwise: `ctx.lineTo(e.offsetX, e.offsetY)`, then `ctx.stroke()`. |
| `mouseup` | Set `isDrawing = false`. |
| `mouseleave` | Set `isDrawing = false`. |

> **Note:** The mouse event listeners need the `e` parameter for `e.offsetX` and `e.offsetY`. Other listeners (brush slider, color picker) can use the element variable directly instead.

### Step 2.4: Color Picker

Listener on `colorPicker` that sets `ctx.strokeStyle` to the picker's current value. Also resets `globalCompositeOperation` to `'source-over'` (switches back from eraser mode).

### Step 2.5: Brush Size

Listener on `brushSlider` that sets `ctx.lineWidth` to the slider's current value.

### Step 2.6: Eraser

Click listener on `eraserBtn` that sets `ctx.globalCompositeOperation = 'destination-out'`. This erases to transparent. The color picker listener resets it back to `'source-over'` when a color is picked.

### Step 2.7: Clear Button

Click listener on `clearBtn` that calls `ctx.clearRect(0, 0, canvas.width, canvas.height)` then fills with white:

```javascript
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

> **Test checkpoint:**
> Open the overlay, draw with different colors and sizes, erase, clear. Everything should feel responsive on the large canvas.

---

## Phase 3 — Fish Spawning & Swimming (fish.js)

### Step 3.1: Set Up the Fish Canvas

- Grab `#fishCanvas` with `getElementById`
- Get its 2D context: `const fishCtx = fishCanvas.getContext('2d')`
- Set the canvas `width` and `height` **attributes** to `window.innerWidth` and `window.innerHeight`
- Add a `resize` event listener on `window` that updates these dimensions when the browser resizes

> **Important: Canvas Resolution vs CSS Size**
> CSS `width: 100%` stretches the canvas visually, but the canvas internal resolution is set by its `width` and `height` attributes. If you only set CSS size, your fish will be blurry. You must set both.

### Step 3.2: Create the Arrays

Two arrays:

```javascript
const fishArray = [];
const spawnAnimations = [];
```

`fishArray` holds active swimming fish. `spawnAnimations` holds bubble pop animations in progress.

Each **fish object** has:

| PROPERTY | TYPE | PURPOSE |
|----------|------|---------|
| `image` | Image | The drawn fish as an Image object |
| `name` | String | The name the user gave the fish |
| `x` | Number | Current horizontal position |
| `y` | Number | Current vertical position |
| `speedX` | Number | Horizontal velocity (positive = right, negative = left) |
| `wobbleOffset` | Number | Random offset so fish don't bob in sync |
| `width` | Number | Rendered width on screen |
| `height` | Number | Rendered height on screen |
| `targetX` | Number or null | Bait target X (null = normal swimming) |
| `targetY` | Number or null | Bait target Y (null = normal swimming) |
| `opacity` | Number | Starts at 0, fades to 1 after spawn animation |

Each **spawn animation object** has:

| PROPERTY | TYPE | PURPOSE |
|----------|------|---------|
| `bubbles` | Array | 8–12 bubble objects, each with x, y, radius, opacity, angle |
| `centerX` | Number | Where the bubbles converge (fish spawn point X) |
| `centerY` | Number | Where the bubbles converge (fish spawn point Y) |
| `phase` | Number | 1 = gathering, 2 = pop, 3 = done |
| `timer` | Number | Frame counter for timing the phases |
| `fishData` | Object | The fish object waiting to be spawned after animation |

### Step 3.3: Wire Up the Spawn Button

Add a click listener on `#spawnBtn` that does the following, in order:

1. **Get the fish name:** `const name = fishName.value || 'Unnamed Fish'`
2. **Export the drawing:** `const dataURL = drawCanvas.toDataURL('image/png')`
3. **Create an Image object:** `const img = new Image()` then `img.src = dataURL`
4. **Wait for the image to load:** Everything below goes inside `img.onload = () => { ... }`
5. **Pick a random starting position:**
   - `x`: either `-100` (start offscreen left) or `canvas.width + 100` (start offscreen right)
   - `y`: random between `50` and `canvas.height - 150`
6. **Pick random movement values:**
   - `speedX`: random between `0.5` and `2.5`. If starting from the right side, make it negative.
   - `wobbleOffset`: random between `0` and `Math.PI * 2`
7. **Set dimensions:** Scale the drawing down to about 80–120px wide. Maintain aspect ratio.
8. **Create the fish object** with all properties. Set `targetX` and `targetY` to `null`. Set `opacity` to `0` (fish starts invisible — the bubble animation reveals it).
9. **Create a spawn animation** instead of pushing the fish directly into `fishArray`:
   - Generate 8–12 bubble objects around the spawn point (see Step 3.3b)
   - Create a spawn animation object with `phase: 1`, `timer: 0`, and the fish data
   - Push it into `spawnAnimations`
10. **Close the overlay** and clear the draw canvas and name input.

### Step 3.3b: Generating Spawn Bubbles

For each of the 8–12 bubbles, create an object:

```javascript
{
    x: centerX + (Math.random() - 0.5) * 120,   // scattered around spawn point
    y: centerY + (Math.random() - 0.5) * 120,
    radius: 4 + Math.random() * 8,               // random size 4–12px
    opacity: 0.6 + Math.random() * 0.4,          // 0.6–1.0 opacity
    angle: Math.random() * Math.PI * 2            // random direction for initial spread
}
```

The bubbles start scattered in a ~120px radius around the spawn point.

### Step 3.4: Build the Animation Loop

Create a function called `animate` that runs ~60 times per second. Every frame:

1. **Clear the entire fish canvas:** `fishCtx.clearRect(0, 0, fishCanvas.width, fishCanvas.height)`

2. **Update and draw spawn animations** (before drawing fish):

   Loop through `spawnAnimations`. For each animation:

   **Phase 1 — Bubbles gather (60 frames / ~1 second):**
   - Move each bubble toward `centerX`/`centerY`:
     ```javascript
     bubble.x += (anim.centerX - bubble.x) * 0.04;
     bubble.y += (anim.centerY - bubble.y) * 0.04;
     ```
   - Add a slight wobble so they don't move in a straight line:
     ```javascript
     bubble.x += Math.sin(anim.timer * 0.1 + bubble.angle) * 0.5;
     bubble.y += Math.cos(anim.timer * 0.1 + bubble.angle) * 0.5;
     ```
   - Shrink bubbles slightly as they converge: `bubble.radius *= 0.995`
   - Draw each bubble as a translucent white circle:
     ```javascript
     fishCtx.beginPath();
     fishCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
     fishCtx.fillStyle = 'rgba(255, 255, 255,' + bubble.opacity + ')';
     fishCtx.fill();
     ```
   - Increment `anim.timer`. When `timer > 60`, switch to phase 2.

   **Phase 2 — Pop burst (15 frames / ~0.25 seconds):**
   - Rapidly expand each bubble outward from center:
     ```javascript
     const angle = Math.atan2(bubble.y - anim.centerY, bubble.x - anim.centerX);
     bubble.x += Math.cos(angle) * 4;
     bubble.y += Math.sin(angle) * 4;
     ```
   - Fade out quickly: `bubble.opacity -= 0.07`
   - Draw a white flash circle at center that expands and fades:
     ```javascript
     const flashRadius = (anim.timer - 60) * 4;
     const flashOpacity = 1 - (anim.timer - 60) / 15;
     fishCtx.beginPath();
     fishCtx.arc(anim.centerX, anim.centerY, flashRadius, 0, Math.PI * 2);
     fishCtx.fillStyle = 'rgba(255, 255, 255,' + flashOpacity + ')';
     fishCtx.fill();
     ```
   - When `timer > 75`, switch to phase 3.

   **Phase 3 — Fish revealed:**
   - Push `anim.fishData` into `fishArray`
   - Remove this animation from `spawnAnimations`

3. **Loop through `fishArray`** and for each fish, update its position and draw it:

   **Fade in after spawn:** If `fish.opacity < 1`, increment it: `fish.opacity += 0.05`. Apply opacity when drawing:
   ```javascript
   fishCtx.globalAlpha = fish.opacity;
   // draw the fish...
   fishCtx.globalAlpha = 1;  // reset for next fish
   ```

   **Position update (normal swimming):**
   ```javascript
   fish.x += fish.speedX
   fish.y += Math.sin(Date.now() * 0.002 + fish.wobbleOffset) * 0.5
   ```

   **Edge detection:**
   ```javascript
   if (fish.x > fishCanvas.width + fish.width) fish.speedX *= -1;
   if (fish.x < -fish.width) fish.speedX *= -1;
   ```

   **Draw the fish:** (see Step 3.5 for the flip logic)

4. **Request the next frame:** `requestAnimationFrame(animate)`

Kick off the loop by calling `animate()` once when the page loads.

> **What is `requestAnimationFrame`?**
> The browser's built-in "call this function on the next screen refresh" method. Runs at ~60fps, automatically pauses when the tab isn't visible.

### Step 3.5: The Flip Logic in Detail

When a fish swims left, the image needs to be mirrored horizontally.

**When going left (`fish.speedX < 0`):**
```javascript
fishCtx.save();
fishCtx.translate(fish.x + fish.width, fish.y);
fishCtx.scale(-1, 1);
fishCtx.drawImage(fish.image, 0, 0, fish.width, fish.height);
fishCtx.restore();
```

**When going right (`fish.speedX > 0`):**
```javascript
fishCtx.drawImage(fish.image, fish.x, fish.y, fish.width, fish.height);
```

`ctx.save()` and `ctx.restore()` ensure the transform only affects this one fish.

### Step 3.6: Display Fish Names (Optional)

After drawing each fish, render its name below:

```javascript
fishCtx.fillStyle = 'white';
fishCtx.font = '12px Arial';
fishCtx.textAlign = 'center';
fishCtx.fillText(fish.name, fish.x + fish.width / 2, fish.y + fish.height + 15);
```

> **Major test checkpoint:**
> Draw a fish, name it, click Spawn. The overlay should close. You should see bubbles converge, pop with a flash, and the fish appears fading in — then starts swimming with its name, bobbing up and down, flipping at the edges. Spawn multiple fish — each should get its own bubble pop animation. **If this works, the hard part is done.**

---

## Phase 4 — Ocean Backgrounds & Mode System

### Step 4.1: Create Your Art

Open Procreate, Figma, or whatever design tool you prefer.

**You need art for at least two modes:**

#### Standard Ocean Mode

Resolution: 1920×1080 or larger, exported as PNG or JPEG.

For animated depth, split into 2–3 layers:

| LAYER FILE | CONTENT | ANIMATION |
|-----------|---------|-----------|
| `bg-deep.png` | Far background — deep water, gradient, distant elements | None (stays still) |
| `bg-foreground.png` | Close-up elements — coral, sand floor, seaweed, rocks | Slow horizontal sway |
| `bg-light.png` | Light rays / caustics (transparency as PNG) | Opacity pulse |

Save into `assets/backgrounds/ocean/`.

#### Pixel Art Mode

Resolution: **320×180** — draw at this tiny resolution intentionally. The browser scales it up with hard pixel edges.

| LAYER FILE | CONTENT | ANIMATION |
|-----------|---------|-----------|
| `pixel-bg.png` | Full pixel art ocean scene at 320×180 | None or subtle sway |

Save into `assets/backgrounds/pixel/`.

### Step 4.2: Add a Mode Toggle

Add a mode toggle button to your HTML:

```html
<button id="modeToggle">Switch Mode</button>
```

### Step 4.3: Add Image Layers to HTML

Inside `<div id="ocean">`, add `<img>` tags for each layer with classes like `ocean-layer-deep`, `ocean-layer-fg`, `ocean-layer-light`.

### Step 4.4: Style the Layers

```css
.ocean-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### Step 4.5: Pixel Mode CSS

```css
body.pixel-mode #ocean img {
    image-rendering: pixelated;
}

body.pixel-mode #fishCanvas {
    image-rendering: pixelated;
}

body.pixel-mode #drawCanvas {
    image-rendering: pixelated;
}
```

### Step 4.6: Mode Switching Logic (JavaScript)

The mode toggle button click does:
1. Toggle a class on `<body>` (e.g. `"pixel-mode"`)
2. Show/hide the correct background images
3. Optionally adjust the draw canvas resolution
4. Save the current mode to Chrome storage so it persists

### Step 4.7: Animate with CSS Keyframes

**Sway animation (foreground):**
```css
@keyframes sway {
    0%   { transform: translateX(-5px); }
    100% { transform: translateX(5px); }
}

.ocean-layer-fg {
    animation: sway 6s ease-in-out infinite alternate;
}
```

**Light pulse (light rays):**
```css
@keyframes lightPulse {
    0%   { opacity: 0.25; }
    100% { opacity: 0.5; }
}

.ocean-layer-light {
    animation: lightPulse 4s ease-in-out infinite alternate;
}
```

> **Test checkpoint:**
> Your art fills the screen with subtle animation. Fish swim on top. Toggle between modes — backgrounds swap and pixel mode renders with hard pixel edges.

---

## Phase 5 — Bait Feature

### Step 5.1: Bait Mode Toggle

Variable: `let baitMode = false`

Click listener on `#baitBucket`:
1. Set `baitMode = true`
2. Change cursor on `#fishCanvas` to `crosshair`
3. Set `fishCanvas.style.pointerEvents = 'auto'`

### Step 5.2: Ocean Canvas Click Handler

Click listener on `#fishCanvas`:
1. Guard: if `baitMode` is false, return
2. Get click coordinates from event
3. Find closest fish (loop through `fishArray`, calculate distances)
4. Set `closestFish.targetX` and `targetY` to click position
5. Reset bait mode, cursor, and pointer-events

### Step 5.3: Update the Animation Loop

For each fish, before normal swimming, check if `fish.targetX !== null`:

**If chasing bait:**
1. Calculate angle: `Math.atan2(fish.targetY - fish.y, fish.targetX - fish.x)`
2. Rush speed: `6`
3. Move toward target using `Math.cos`/`Math.sin`
4. Flip based on target direction
5. If distance < 15px: clear target, resume normal speed

**Else:** Normal swimming (wobble + drift).

> **Test checkpoint:**
> Spawn fish, click bait bucket, click ocean. Nearest fish darts to that spot then resumes swimming.

**Optional polish:**
- Right-click anywhere drops bait (skip the bucket)
- All nearby fish react within a radius
- Shrinking circle visual at click point
- Fish scales up ~10% briefly when reaching bait

---

## Phase 6 — Persistence (storage.js)

### Step 6.1: Save Function

`saveFish()` maps `fishArray` to serializable objects:

```javascript
{
    dataURL:      fish.image.src,
    name:         fish.name,
    x:            fish.x,
    y:            fish.y,
    speedX:       fish.speedX,
    wobbleOffset: fish.wobbleOffset,
    width:        fish.width,
    height:       fish.height
}
```

Save with `chrome.storage.local.set({ fish: serializedArray })`.

Call after every spawn.

### Step 6.2: Load Function

`loadFish()`:
1. `chrome.storage.local.get('fish', callback)`
2. Loop through saved fish, create `Image` objects, push into `fishArray` inside `img.onload`

Call on page load, before starting the animation loop.

### Step 6.3: Save Mode Preference

```javascript
chrome.storage.local.set({ mode: currentMode })
```

Load on startup and apply the correct body class.

### Step 6.4: Delete a Fish

| METHOD | IMPLEMENTATION | COMPLEXITY |
|--------|---------------|------------|
| **"Clear all fish" button** | Empty `fishArray`, call `chrome.storage.local.remove('fish')` | Easy — do this for v1 |
| **Right-click a fish** | Find nearest fish, remove from array, save | Medium |
| **Drag to trash icon** | Skip for v1 | Hard |

> **Test checkpoint:**
> Spawn fish, close tab, open new tab. Fish reappear with names. Mode persists.

---

## Phase 7 — Bubbles (bubbles.js) — Optional Polish

### Step 7.1: Bubble Array

Each bubble: `x`, `y`, `radius` (2–6px), `speedY` (0.3–1.0), `drift`. Spawn 20–30 on page load.

### Step 7.2: Animate Bubbles

| APPROACH | HOW | PROS/CONS |
|----------|-----|-----------|
| **Add to fish canvas loop** | Draw translucent white circles with `fishCtx.arc()` | Simple, no extra elements. |
| **Separate canvas** | Third canvas between ocean and fish | Clean separation. |
| **CSS-animated divs** | Small round `<div>`s animated with `@keyframes` | Easiest. Recommended. |

---

## Phase 8 — Custom UI & Button Art

### Step 8.1: Draw Your Buttons in Procreate

Design custom art for: draw button, toolbar buttons (eraser, clear, spawn), bait bucket, mode toggle. Export as PNG with transparency into `assets/ui/`. Draw pixel variants for pixel mode.

### Step 8.2: Apply Custom Button Art with CSS

```css
#drawBtn {
    border: none;
    background: url('../assets/ui/draw-btn.png') center/contain no-repeat;
}

body.pixel-mode #drawBtn {
    background-image: url('../assets/ui/pixel/draw-btn.png');
    image-rendering: pixelated;
}
```

### Step 8.3: Hover & Active States

```css
#drawBtn:hover { transform: scale(1.1); }
#drawBtn:active { transform: scale(0.95); }
```

> **Test checkpoint:**
> All buttons display custom art. Hover/click feel responsive. Pixel mode swaps to pixel art buttons.

---

## Layer Stack & Z-Index Order

```
┌────────────────────────────────────────────────┐
│ z-index: 0   Ocean background images (your art)│
│ z-index: 1   Fish canvas (transparent,fullscreen)│
│ z-index: 2   Bubbles (if using divs/extra canvas)│
│ z-index: 5   Bait bucket                        │
│ z-index: 20  Drawing overlay (when open)         │
│ z-index: 21  Floating draw button (always on top)│
└────────────────────────────────────────────────┘
```

**Aquarium view (normal):**
```
┌────────────────────────────────────────────────┐
│  bg-deep.png  (static)                         │
│    ↕ bg-foreground.png (slow sway ~5px)        │
│      ✨ bg-light.png (opacity pulse)           │
│                                                │
│     🫧 ← bubbles converge                      │
│     💥 ← pop! flash of light                   │
│        🐟 "Nemo" fades in, starts swimming     │
│        🐟 "Bubbles" swimming on canvas         │
│        🫧 ambient bubbles floating up          │
│                                                │
│  🪣 bait bucket                          [+]   │
│                               (draw button) ↗  │
└────────────────────────────────────────────────┘
```

**Drawing overlay (when open):**
```
┌────────────────────────────────────────────────┐
│ [Name: ___] [🎨] [━━━] [Eraser] [Clear] [Spawn]│
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │                                          │  │
│  │                                          │  │
│  │         (large white drawing canvas)     │  │
│  │         draw your fish here              │  │
│  │                                          │  │
│  │                                          │  │
│  └──────────────────────────────────────────┘  │
│                                          [+]   │
│                          (click to close) ↗    │
└────────────────────────────────────────────────┘
```

---

## Milestone Checklist

| # | MILESTONE | HOW TO VERIFY |
|---|-----------|--------------|
| 1 | Extension loads, dark screen + floating draw button | New tab shows dark blue background with round `+` button |
| 2 | Draw button toggles fullscreen overlay open/closed | Click `+` → overlay appears. Click again → disappears. |
| 3 | Can draw on large canvas with colors/sizes/eraser/clear | Freehand drawing works in the overlay with all controls |
| 4 | Spawn triggers bubble pop animation then fish appears | Draw, name, spawn → overlay closes, bubbles converge, pop, fish fades in |
| 5 | Fish swim with name, wobble, and flip at edges | Multiple fish move independently with different speeds |
| 6 | Ocean art shows as background with CSS animation | Hand-drawn art fills screen with subtle sway and light pulse |
| 7 | Mode toggle switches between standard and pixel art | Backgrounds swap, pixel mode renders with hard pixel edges |
| 8 | Bait click makes nearest fish dart to cursor position | Fish rushes to click point then resumes normal swimming |
| 9 | Fish, names, and mode persist across new tabs | Close tab, open new one — everything preserved |
| 10 | Ambient bubbles float upward | Translucent circles rise from bottom of screen |
| 11 | Custom button art replaces browser defaults | Procreate art on all buttons with pixel variants |

---

## Quick Reference — Key APIs You'll Use

### Canvas 2D Context

| METHOD / PROPERTY | WHAT IT DOES |
|-------------------|-------------|
| `getContext('2d')` | Gets the 2D drawing context from a canvas element |
| `beginPath()` | Starts a new drawing path |
| `moveTo(x, y)` | Moves the pen without drawing |
| `lineTo(x, y)` | Draws a line to (x, y) |
| `stroke()` | Renders the current path as a visible line |
| `clearRect(x, y, w, h)` | Erases a rectangular area |
| `drawImage(img, x, y, w, h)` | Draws an image onto the canvas |
| `arc(x, y, radius, start, end)` | Draws a circle/arc (used for bubbles) |
| `fill()` | Fills the current path with color |
| `save()` / `restore()` | Saves/restores the current transform state |
| `translate(x, y)` | Moves the canvas origin point |
| `scale(x, y)` | Scales drawing. `scale(-1, 1)` flips horizontally |
| `toDataURL('image/png')` | Exports canvas content as a base64 PNG string |
| `strokeStyle` | Sets the line/stroke color |
| `fillStyle` | Sets the fill color (for shapes and text) |
| `lineWidth` | Sets line thickness in pixels |
| `lineCap` | Sets line end shape (`'round'`) |
| `fillText(text, x, y)` | Draws text on the canvas |
| `globalCompositeOperation` | Controls blending (`'destination-out'` for eraser) |
| `globalAlpha` | Sets opacity for all drawing (0 = invisible, 1 = fully visible) |

### DOM & Events

| METHOD | WHAT IT DOES |
|--------|-------------|
| `document.getElementById('id')` | Finds an HTML element by its ID |
| `element.addEventListener('event', function)` | Runs code when event happens |
| `element.style.display = 'flex'` | Shows a hidden element |
| `element.style.display = 'none'` | Hides an element |
| `element.classList.toggle('class')` | Adds/removes a CSS class |

### Math Functions for Animation

| FUNCTION | WHAT IT DOES |
|----------|-------------|
| `Math.sin(value)` | Returns -1 to 1 in a wave. Swimming wobble + bubble wobble. |
| `Math.cos(value)` | X-component of movement in a direction |
| `Math.atan2(dy, dx)` | Angle from one point to another. Bait chasing + bubble pop direction. |
| `Math.sqrt(x**2 + y**2)` | Distance between two points |
| `Math.random()` | Random 0–1. Used for spawn positions, bubble sizes, speeds. |

### Chrome Extension APIs

| API | WHAT IT DOES |
|-----|-------------|
| `chrome.storage.local.set({ key: value })` | Saves data persistently |
| `chrome.storage.local.get('key', callback)` | Retrieves saved data |
| `chrome.storage.local.remove('key')` | Deletes saved data |

### Browser Animation

| API | WHAT IT DOES |
|-----|-------------|
| `requestAnimationFrame(callback)` | Runs function on next screen refresh (~60fps) |
| `Date.now()` | Current timestamp in ms. Input for `Math.sin()` time-based animation. |

### CSS Pixel Art Mode

| PROPERTY | WHAT IT DOES |
|----------|-------------|
| `image-rendering: pixelated` | Scales images with hard pixel edges |
