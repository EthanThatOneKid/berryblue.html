# Grainy Background Implementation Guide

This guide documents how to implement grainy backgrounds using SVG filters with
displacement mapping. This technique prevents gradient banding while preserving
the original gradient colors.

**Source:** Based on
[Ana Tudor's CodePen](https://codepen.io/thebabydino/pen/azONXNb) and the
[Frontend Masters article on Grainy Gradients](https://frontendmasters.com/blog/grainy-gradients/).

## Base Implementation

### SVG Filter Definition

The core technique uses an SVG filter with `feTurbulence` to generate noise and
`feDisplacementMap` to displace gradient pixels, creating a grainy effect
without altering colors.

```html
<svg width="0" height="0" aria-hidden="true">
  <filter
    id="grain"
    color-interpolation-filters="sRGB"
    primitiveUnits="objectBoundingBox"
  >
    <!-- Generate fine noise -->
    <feTurbulence type="fractalNoise" baseFrequency=".713" numOctaves="4" />
    <!-- Use noise as displacement map -->
    <feDisplacementMap in="SourceGraphic" scale=".1" xChannelSelector="R" />
    <!-- Place filter input underneath to cover transparent edge pixels -->
    <feBlend in2="SourceGraphic" />
  </filter>
</svg>
```

### CSS Setup

```css
/* Take SVG filter out of document flow */
svg[height="0"][aria-hidden="true"] {
  position: fixed;
}

/* Apply filter to gradient elements */
.grainy-gradient {
  filter: url(#grain);
}
```

### Key Parameters Explained

- **`color-interpolation-filters="sRGB"`**: Required for cross-browser
  compatibility when working with RGB channels
- **`primitiveUnits="objectBoundingBox"`**: Uses relative units (0-1) instead of
  absolute pixels
- **`baseFrequency=".713"`**: Controls noise grain size (higher = finer grain)
- **`numOctaves="4"`**: Adds detail layers to the noise (1-4 recommended for
  performance)
- **`scale=".1"`**: Displacement amount (relative: 0.1 = 10% of element size)
- **`xChannelSelector="R"`**: Uses red channel for X-axis displacement (alpha
  used for Y-axis by default)

---

## Variation 1: Basic Linear Gradient

**Description:** Simple horizontal linear gradient with grainy effect.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(to right, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

- `baseFrequency=".713"`
- `numOctaves="4"`
- `scale=".1"`

---

## Variation 2: Diagonal Gradient

**Description:** Diagonal gradient with increased grain intensity.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(135deg, #1a0ce5, #e50c5a, #0ce5a1); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".15" xChannelSelector="R" />
```

**Changes:**

- `baseFrequency=".8"` (finer grain)
- `scale=".15"` (more displacement)

---

## Variation 3: Radial Gradient

**Description:** Radial gradient with subtle grain.

```html
<div
  class="grainy-gradient"
  style="background: radial-gradient(circle, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" />
<feDisplacementMap in="SourceGraphic" scale=".08" xChannelSelector="R" />
```

**Changes:**

- `baseFrequency=".6"` (coarser grain)
- `numOctaves="3"` (less detail)
- `scale=".08"` (less displacement)

---

## Variation 4: Multi-Color Gradient

**Description:** Gradient with multiple color stops and enhanced grain.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(to right, #1a0ce5, #e50c5a, #0ce5a1, #e5a10c); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".12" xChannelSelector="R" />
```

**Changes:**

- `baseFrequency=".9"` (very fine grain)
- `scale=".12"` (moderate displacement)

---

## Variation 5: Vertical Gradient with Strong Grain

**Description:** Vertical gradient with pronounced grainy texture.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(to bottom, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".713" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".2" xChannelSelector="R" />
```

**Changes:**

- `scale=".2"` (strong displacement for visible grain)

---

## Variation 6: Conic Gradient

**Description:** Conic (rotating) gradient with fine grain.

```html
<div
  class="grainy-gradient"
  style="background: conic-gradient(from 0deg, #1a0ce5, #e50c5a, #0ce5a1, #1a0ce5); width: 300px; height: 300px; border-radius: 50%"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".1" xChannelSelector="R" />
```

**Changes:**

- `baseFrequency=".85"` (fine grain suitable for circular shapes)

---

## Variation 7: Subtle Grain (Low Displacement)

**Description:** Gradient with minimal grain for subtle texture.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(45deg, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".713" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".05" xChannelSelector="R" />
```

**Changes:**

- `scale=".05"` (minimal displacement for subtle effect)

---

## Variation 8: Coarse Grain

**Description:** Gradient with large, visible grain particles.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(to right, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".4" numOctaves="3" />
<feDisplacementMap in="SourceGraphic" scale=".15" xChannelSelector="R" />
```

**Changes:**

- `baseFrequency=".4"` (coarse grain)
- `numOctaves="3"` (less detail)

---

## Variation 9: High-Contrast Grain

**Description:** Gradient with high-contrast grain effect.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(135deg, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency=".713" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".25" xChannelSelector="R" />
```

**Changes:**

- `scale=".25"` (high displacement for strong grain visibility)

---

## Variation 10: Ultra-Fine Grain

**Description:** Gradient with extremely fine, almost imperceptible grain.

```html
<div
  class="grainy-gradient"
  style="background: linear-gradient(to right, #1a0ce5, #e50c5a); width: 300px; height: 300px"
>
</div>
```

**Filter Settings:**

```html
<feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="4" />
<feDisplacementMap in="SourceGraphic" scale=".06" xChannelSelector="R" />
```

**Changes:**

- `baseFrequency="1.2"` (ultra-fine grain)
- `scale=".06"` (minimal displacement)

---

## Complete Example with All Variations

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grainy Gradient Variations</title>
    <style>
      * {
        margin: 0;
        box-sizing: border-box;
      }

      body {
        background: #dedede;
        padding: 2rem;
        font-family: system-ui, sans-serif;
      }

      .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .card {
        width: 100%;
        height: 300px;
        border-radius: 8px;
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
      }

      /* Take SVG filter out of document flow */
      svg[height="0"][aria-hidden="true"] {
        position: fixed;
      }

      /* Apply filter to gradient elements */
      .grainy-gradient {
        filter: url(#grain);
      }
    </style>
  </head>
  <body>
    <!-- SVG Filter Definition -->
    <svg width="0" height="0" aria-hidden="true">
      <filter
        id="grain"
        color-interpolation-filters="sRGB"
        primitiveUnits="objectBoundingBox"
      >
        <feTurbulence type="fractalNoise" baseFrequency=".713" numOctaves="4" />
        <feDisplacementMap in="SourceGraphic" scale=".1" xChannelSelector="R" />
        <feBlend in2="SourceGraphic" />
      </filter>
    </svg>

    <div class="container">
      <!-- Variation 1: Basic Linear -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(to right, #1a0ce5, #e50c5a)"
      >
      </div>

      <!-- Variation 2: Diagonal -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(135deg, #1a0ce5, #e50c5a, #0ce5a1)"
      >
      </div>

      <!-- Variation 3: Radial -->
      <div
        class="card grainy-gradient"
        style="background: radial-gradient(circle, #1a0ce5, #e50c5a)"
      >
      </div>

      <!-- Variation 4: Multi-Color -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(to right, #1a0ce5, #e50c5a, #0ce5a1, #e5a10c)"
      >
      </div>

      <!-- Variation 5: Vertical -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(to bottom, #1a0ce5, #e50c5a)"
      >
      </div>

      <!-- Variation 6: Conic -->
      <div
        class="card grainy-gradient"
        style="background: conic-gradient(from 0deg, #1a0ce5, #e50c5a, #0ce5a1, #1a0ce5); border-radius: 50%"
      >
      </div>

      <!-- Variation 7: Subtle -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(45deg, #1a0ce5, #e50c5a)"
      >
      </div>

      <!-- Variation 8: Coarse -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(to right, #1a0ce5, #e50c5a)"
      >
      </div>

      <!-- Variation 9: High-Contrast -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(135deg, #1a0ce5, #e50c5a)"
      >
      </div>

      <!-- Variation 10: Ultra-Fine -->
      <div
        class="card grainy-gradient"
        style="background: linear-gradient(to right, #1a0ce5, #e50c5a)"
      >
      </div>
    </div>
  </body>
</html>
```

---

## Parameter Reference

### baseFrequency

- **Range:** 0.1 - 2.0
- **Lower values (0.1-0.5):** Coarse, large grain particles
- **Medium values (0.6-0.9):** Balanced grain
- **Higher values (1.0-2.0):** Fine, subtle grain

### numOctaves

- **Range:** 1 - 4 (recommended)
- **1:** Basic noise, best performance
- **2-3:** Good balance of detail and performance
- **4:** Maximum detail, may impact performance on large elements

### scale (Displacement)

- **Range:** 0.01 - 0.5 (relative units)
- **0.01-0.05:** Subtle, almost imperceptible
- **0.06-0.15:** Visible but balanced
- **0.16-0.3:** Strong, pronounced grain
- **0.3+:** Very strong, may distort gradient

---

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ⚠️ Requires `color-interpolation-filters="sRGB"` for consistent results across
  browsers

---

## Performance Tips

1. **Limit numOctaves:** Keep at 3-4 maximum for best performance
2. **Use relative units:** `primitiveUnits="objectBoundingBox"` is more
   efficient
3. **Apply selectively:** Only apply filter to elements that need it
4. **Consider GPU acceleration:** Filters are GPU-accelerated in modern browsers

---

## Troubleshooting

**Grain not visible:**

- Increase `scale` value
- Increase `baseFrequency` for finer grain
- Check that filter is properly referenced in CSS

**Grain too strong:**

- Decrease `scale` value
- Decrease `numOctaves`
- Use lower `baseFrequency` for coarser but less visible grain

**Colors look different:**

- Ensure `color-interpolation-filters="sRGB"` is set
- Check that you're using displacement mapping (not blending) to preserve colors

---

## References

- [Original CodePen](https://codepen.io/thebabydino/pen/azONXNb)
- [Frontend Masters: Grainy Gradients](https://frontendmasters.com/blog/grainy-gradients/)
- [MDN: SVG Filters](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter)
