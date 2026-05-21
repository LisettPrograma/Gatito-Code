import { playSound } from './sound.js';
import { startDemo, stopDemo } from './demo-game.js';
import { schedule } from './timers.js';

export const SLIDES = [
  // Slide 1: Portada
  {
    id: 'slide-1',
    html: `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;">
        <div style="position: absolute; top: -50px; left: -50px; right: -50px; bottom: -50px; background: url('../../assets/SproutLands-Sprites/Tilesets/Grass.png'); background-size: 176px 112px; opacity: 0.1; z-index: 0; image-rendering: pixelated;"></div>
        
        <div style="z-index: 1; text-align: center;">
          <div id="cover-sprite" style="width: 144px; height: 144px; margin: 0 auto; background: url('../../assets/SproutLands-Sprites/Characters/Basic Charakter Spritesheet.png'); background-size: 576px 576px; background-position: 0 0; image-rendering: pixelated; animation: walkDown 0.5s steps(4) infinite;"></div>
          <h1>GATITO CODE</h1>
          <p style="font-size: clamp(16px, 2vw, 24px);">Un juego para aprender programación</p>
        </div>
        
        <div class="dialog-box" style="z-index: 1; margin-top: 40px; width: 80%; max-width: 900px;">
          <p style="color: var(--accent-warm); margin-bottom: 8px;">Equipo de Desarrollo:</p>
          <div id="typewriter-text" style="font-size: clamp(12px, 1.5vw, 18px); line-height: 1.8; color: var(--text-primary); min-height: 50px;"></div>
        </div>
      </div>
      <style>
        @keyframes walkDown { from { background-position: 0 0; } to { background-position: -576px 0; } }
      </style>
    `,
    onEnter: () => {
      const text = "Brian Herrera, Federico Estevez, Luis Herrera, Iara Baya, Lisett Castillo, Inti Taretto, Lucas Gimenez";
      const el = document.getElementById('typewriter-text');
      if (!el) return;
      el.innerHTML = '';
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          el.innerHTML += text.charAt(i);
          i++;
          if (i % 3 === 0) playSound('bip');
          schedule(typeWriter, 40);
        }
      }
      schedule(typeWriter, 300);
    }
  },

  // Slide 2: Metodología SCRUM
  {
    id: 'slide-2',
    html: `
      <h2>Metodología de Trabajo</h2>
      <p class="text-center">Utilizamos SCRUM con sprints de 2 semanas de duración.<br>Cada integrante del equipo cumplía un rol específico dentro del framework.</p>
      
      <div class="inventory-grid" id="scrum-grid">
      </div>
    `,
    onEnter: () => {
      const members = ["Brian Herrera", "Federico Estevez", "Luis Herrera", "Iara Baya", "Lisett Castillo", "Inti Taretto", "Lucas Gimenez"];
      const grid = document.getElementById('scrum-grid');
      if (!grid) return;
      grid.innerHTML = '';
      
      members.forEach((m, idx) => {
        const card = document.createElement('div');
        card.className = 'inventory-card';
        card.innerHTML = `<div class="name">${m}</div><div class="role">Desarrollador</div>`;
        grid.appendChild(card);
        
        schedule(() => {
          card.classList.add('show');
          playSound('blup');
        }, 300 + idx * 150);
      });
    }
  },

  // Slide 3: Historias de Usuario
  {
    id: 'slide-3',
    html: `
      <h2>Historias de Usuario y Testing</h2>
      <p class="text-center">Documentamos requerimientos mediante historias de usuario y definimos casos de prueba para validar cada funcionalidad antes de su implementación.</p>
      
      <div class="placeholder-container">
        <div>
          <p class="text-center" style="font-size: clamp(12px, 1.5vw, 16px); margin-bottom: 8px;">Tablero de Notion</p>
          <div class="placeholder-img" style="background-image: url('assets/slides/notion-board.png')">
            Reemplazar con<br>assets/slides/notion-board.png
          </div>
        </div>
        <div>
          <p class="text-center" style="font-size: clamp(12px, 1.5vw, 16px); margin-bottom: 8px;">Asignación de tareas</p>
          <div class="placeholder-img" style="background-image: url('assets/slides/notion-tasks.png')">
            Reemplazar con<br>assets/slides/notion-tasks.png
          </div>
        </div>
      </div>
    `
  },

  // Slide 4: Tests Implementados
  {
    id: 'slide-4',
    html: `
      <h2>Tests Implementados</h2>
      <p>Validamos la lógica de dominio con tests unitarios ejecutables con un solo comando.</p>
      
      <div class="terminal" id="test-terminal"></div>
    `,
    onEnter: () => {
      const output = `> npm test

<span class="green">✓</span> domain/Player.js — Navegación y colisiones del jugador
  <span class="green">✓</span> El jugador puede moverse libremente por casillas vacías en las 4 direcciones cardinales
  <span class="green">✓</span> El jugador NO puede atravesar casillas sólidas (paredes)
  <span class="green">✓</span> El jugador NO puede salirse de los límites del mapa
  <span class="green">✓</span> El jugador puede saltar 2 casillas, atravesando 1 casilla sólida intermedia
  <span class="green">✓</span> El jugador NO puede saltar si la casilla de aterrizaje está fuera del mapa
  <span class="green">✓</span> El jugador vuelve exactamente a su posición de spawn al reiniciar

<span class="green">✓</span> domain/Level.js — Geometría de la grilla del mapa
  <span class="green">✓</span> Se crea un nivel con dimensiones 16x12, spawn en (8,6) y objetos correctamente registrados
  <span class="green">✓</span> isSolid() detecta correctamente las casillas marcadas como paredes
  <span class="green">✓</span> isSolid() devuelve true para coordenadas fuera de los límites del mapa
  <span class="green">✓</span> isSolid() devuelve false para casillas de piso sin paredes
  <span class="green">✓</span> El nivel registra correctamente los objetos de recolección con su posición y tipo

Archivos modificados/creados
Archivo\t                Acción
tests/domain.test.js\tCreado — 11 tests unitarios
package.json\t        Editado — script test ahora ejecuta vitest run
node_modules/\t        Instalado — Vitest v4.1.7 + dependencias

Cómo usarlo en tu presentación:
Simplemente abre una terminal en la carpeta del proyecto y ejecuta:
<span class="cmd">npm test</span>`;
      
      const term = document.getElementById('test-terminal');
      if (!term) return;
      term.innerHTML = '';
      
      const lines = output.split('\n');
      let i = 0;
      function typeLine() {
        if (i < lines.length) {
          term.innerHTML += lines[i] + '\n';
          term.scrollTop = term.scrollHeight;
          i++;
          playSound('bip');
          schedule(typeLine, Math.random() * 50 + 20);
        }
      }
      schedule(typeLine, 300);
    }
  },

  // Slide 5: Arquitectura Inicial
  {
    id: 'slide-5',
    html: `
      <h2>Arquitectura Inicial</h2>
      <p>El proyecto comenzó como un monolito: un solo archivo HTML con todo el código embebido, sin separación de capas.</p>
      
      <div class="architecture-container">
        <div class="tree-panel tree-initial">
<span class="dir">public/</span>
├── <span class="file">index.html</span>              <span class="comment"># DOM shell: UI panels, palette, dialogs</span>
├── <span class="dir">src/</span>
│   ├── <span class="file">main.js</span>             <span class="comment"># Phaser.Game bootstrap, exports TILE/COLS/ROWS constants</span>
│   ├── <span class="dir">level/</span>
│   │   └── <span class="file">TileLevel.js</span>    <span class="comment"># Domain logic: tileset registry, GID mapping, level loader</span>
│   └── <span class="dir">scenes/</span>
│       ├── <span class="file">BootScene.js</span>        <span class="comment"># Asset preload + animation setup</span>
│       ├── <span class="file">MenuScene.js</span>        <span class="comment"># Menu navigation</span>
│       ├── <span class="file">TileLevelScene.js</span>   <span class="comment"># Base gameplay class: movement, collision, pickups</span>
│       ├── <span class="file">GymScene.js</span>         <span class="comment"># Tutorial level (extends TileLevelScene, key='gym')</span>
│       ├── <span class="file">MainScene.js</span>        <span class="comment"># Main level (extends TileLevelScene, key='main')</span>
│       └── <span class="file">EditorScene.js</span>      <span class="comment"># Visual tile editor</span>
├── <span class="dir">levels/</span>
│   ├── <span class="file">gym.json</span>            <span class="comment"># Gym level data (16×12 tiles)</span>
│   └── <span class="file">main.json</span>           <span class="comment"># Main level data</span>
└── <span class="dir">assets/</span>
    ├── <span class="dir">SproutLands-Sprites/</span>    <span class="comment"># Character, tilesets (Grass, Fences, Dirt, Hills, Water)</span>
    ├── <span class="dir">SproutLands-UI/</span>         <span class="comment"># UI sprites, fonts, dialog boxes</span>
    └── <span class="file">ui.json</span>                 <span class="comment"># Asset manifest (textures + animations)</span>
        </div>
      </div>
    `
  },

  // Slide 6: Arquitectura Actual
  {
    id: 'slide-6',
    html: `
      <h2>Arquitectura Actual</h2>
      <p style="font-size: clamp(12px, 1.5vw, 16px);">Modularizamos y separamos capas: dominio puro, motor de renderizado, servicios y UI del DOM.</p>
      
      <div class="architecture-container">
        <div class="tree-panel tree-initial" style="flex: 0.7; font-size: clamp(8px, 1vw, 11px);">
<span class="dir">public/</span>
├── <span class="file">index.html</span>
├── <span class="dir">src/</span>
│   ├── <span class="file">main.js</span>
│   ├── <span class="dir">level/</span>...
│   └── <span class="dir">scenes/</span>...
├── <span class="dir">levels/</span>...
└── <span class="dir">assets/</span>...
        </div>
        
        <div class="tree-panel tree-current" style="font-size: clamp(9px, 1.1vw, 13px); padding: 16px;">
<span class="dir">public/</span>
├── <span class="file">index.html</span>              <span class="comment"># DOM shell: UI panels, palette, dialogs</span>
├── <span class="dir">css/</span>                    <span class="comment"># Stylesheets for DOM UI</span>
├── <span class="dir">levels/</span>                 <span class="comment"># Static JSON level files (gym.json, main.json)</span>
├── <span class="dir">assets/</span>                 <span class="comment"># Sprites, tilesets, fonts, UI textures</span>
└── <span class="dir">src/</span>
    ├── <span class="file">main.js</span>             <span class="comment"># Phaser.Game bootstrap, re-exports TILE/COLS/ROWS</span>
    ├── <span class="dir">config/</span>
    │   └── <span class="file">game.js</span>         <span class="comment"># Core constants: TILE, COLS, ROWS, STEP_MS, DIRS</span>
    ├── <span class="dir">domain/</span>             <span class="comment"># Pure JavaScript. Zero Phaser imports. Testable with Node.</span>
    │   ├── <span class="file">Player.js</span>       <span class="comment"># Movement state, collision, facing</span>
    │   ├── <span class="file">Level.js</span>        <span class="comment"># Grid geometry, solids, spawn, objects, weather</span>
    │   └── <span class="file">Program.js</span>      <span class="comment"># Immutable command sequence</span>
    ├── <span class="dir">engine/</span>             <span class="comment"># Everything that touches Phaser</span>
    │   ├── <span class="dir">scenes/</span>         <span class="comment"># BootScene, MenuScene, EditorScene, TileLevelScene</span>
    │   ├── <span class="dir">levels/</span>         <span class="comment"># GymScene, MainScene, CustomScene</span>
    │   ├── <span class="dir">entities/</span>       <span class="comment"># PlayerView, PickupView</span>
    │   ├── <span class="dir">level/</span>          <span class="comment"># TileRegistry, TileLevelLoader, WeatherSystem</span>
    │   └── <span class="dir">program/</span>        <span class="comment"># ProgramExecutor</span>
    ├── <span class="dir">services/</span>
    │   └── <span class="file">Storage.js</span>      <span class="comment"># localStorage: level overrides, custom levels registry</span>
    └── <span class="dir">ui/</span>                 <span class="comment"># DOM modules (queue, dialog, mission, etc)</span>
        </div>
      </div>
    `
  },

  // Slide 7: Demo en vivo
  {
    id: 'slide-7',
    html: `
      <h2>Demo Interactiva</h2>
      <p class="text-center">Mapa Principal · Tutorial Automático</p>
      
      <div id="demo-container">
      </div>
      
      <p class="text-center" style="font-size: clamp(12px, 1.5vw, 16px); color: var(--text-dim); margin-top: -8px;">El gatito ejecutará automáticamente una secuencia de comandos.</p>
    `,
    onEnter: () => {
      startDemo('demo-container');
    },
    onLeave: () => {
      stopDemo();
    }
  }
];
