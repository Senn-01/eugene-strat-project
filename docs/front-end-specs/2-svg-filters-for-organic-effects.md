# 2. SVG Filters for Organic Effects

## Complete Filter Definitions
```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <defs>
    <!-- Pencil sketch effect for grid lines -->
    <filter id="pencil-effect">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.02" 
        numOctaves="2" 
        seed="5" />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="0.8" />
      <feGaussianBlur 
        stdDeviation="0.2" />
    </filter>
    
    <!-- Paper texture background -->
    <filter id="paper-texture">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.04" 
        numOctaves="4" 
        seed="42" />
      <feColorMatrix 
        type="saturate" 
        values="0"/>
      <feComponentTransfer>
        <feFuncA 
          type="discrete" 
          tableValues="0 0.02 0.04 0.02 0"/>
      </feComponentTransfer>
      <feComposite 
        operator="over" 
        in2="SourceGraphic"/>
    </filter>
    
    <!-- Hand-drawn border wobble -->
    <filter id="hand-drawn-border">
      <feTurbulence 
        type="turbulence" 
        baseFrequency="0.01" 
        numOctaves="1" 
        seed="10" />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="1.2" />
    </filter>

    <!-- Subtle grid line variation -->
    <filter id="grid-variation">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.015" 
        numOctaves="1" 
        seed="100" />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="0.5" />
    </filter>
  </defs>
</svg>
```
