# Simple Animations - Black Neon

A clean, modular collection of web animations with smooth black neon aesthetics.

## Project Structure

```
parallax-scroll/
├── index.html                        # Main homepage
├── assets/                           # Shared assets
│   ├── css/
│   │   └── animations.css           # Animation styles
│   └── images/                      # All images
│       ├── background.png
│       ├── foreground.png
│       ├── sport-1.jpg
│       ├── sport-2.jpg
│       └── sport-3.jpg
└── features/                        # Feature modules
    ├── parallex/                    # Original parallax folder
    │   └── Parallax-Website/        # Parallax scrolling effect
    │       ├── index.html
    │       ├── style.css
    │       └── [images & assets]
    └── shape-loader/                # Shape morphing loader
        └── index.html
```

## Features

### 🌊 Parallax Scroll
- Smooth multi-layer scrolling effect
- Floating elements with depth perception
- Adventure-themed content with sport images
- **Original implementation preserved in `features/parallex/Parallax-Website/`**

### 🔄 Shape Morpher
- Geometric loading animation
- Transforms through multiple shapes (square → circle → triangle → explosion)
- Neon glow effects with particle system

## Getting Started

1. Open `index.html` in your browser
2. Navigate to any feature using the demo cards:
   - **Parallax Scroll** → `features/parallex/Parallax-Website/index.html`
   - **Shape Morpher** → `features/shape-loader/index.html`
3. Each feature has a "Back" button to return to the homepage

## Features

- **Modular Architecture**: Each animation is self-contained in its own directory
- **Original Structure Preserved**: The original parallex folder is maintained as-is
- **Centralized Assets**: Shared images and styles are organized in the assets folder
- **Consistent Theme**: Black neon aesthetic maintained across all features
- **Responsive Design**: Works on both desktop and mobile devices

## Browser Support

- Modern browsers with CSS3 animation support
- Chrome, Firefox, Safari, Edge 