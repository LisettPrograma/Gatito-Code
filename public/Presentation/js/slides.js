import { playSound } from './sound.js';
import { startDemo, stopDemo } from './demo-game.js';
import { schedule, scheduleSession } from './timers.js';

export const SLIDES = [
  // Slide 1: Portada y Presentacion del Proyecto
  {
    id: 'slide-1',
    html: `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;">
        <div style="position: absolute; top: -50px; left: -50px; right: -50px; bottom: -50px; background: url('../../assets/SproutLands-Sprites/Tilesets/Grass.png'); background-size: 176px 112px; opacity: 0.1; z-index: 0; image-rendering: pixelated;"></div>
        
        <div style="z-index: 1; text-align: center;">
          <div id="cover-sprite" style="width: 144px; height: 144px; margin: 0 auto; background: url('../../assets/SproutLands-Sprites/Characters/Basic Charakter Spritesheet.png'); background-size: 576px 576px; background-position: 0 0; image-rendering: pixelated; animation: walkDown 0.5s steps(4) infinite;"></div>
          <h1>GATITO CODE</h1>
          <p style="font-size: clamp(16px, 2vw, 24px);">Un juego para aprender programacion</p>
        </div>
        
        <div class="dialog-box" style="z-index: 1; margin-top: 40px; width: 80%; max-width: 900px;">
          <p style="color: var(--accent-warm); margin-bottom: 8px;">Sobre el proyecto:</p>
          <div id="typewriter-text" style="font-size: clamp(12px, 1.5vw, 18px); line-height: 1.8; color: var(--text-primary); min-height: 50px;"></div>
        </div>
      </div>
      <style>
        @keyframes walkDown { from { background-position: 0 0; } to { background-position: -576px 0; } }
      </style>
    `,
    onEnter: (sessionId) => {
      const text = "Gatito-Code es un videojuego educativo de pensamiento computacional con estetica pixel-art, destinado a ninos y ninas de 8 a 10 anos sin conocimientos previos de programacion. El jugador guia a un gatito en un mapa de tiles, construyendo programas mediante bloques de instrucciones arrastrables (arriba, abajo, izquierda, derecha) para recolectar objetos y completar niveles.";
      const el = document.getElementById('typewriter-text');
      if (!el) return;
      el.innerHTML = '';
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          el.innerHTML += text.charAt(i);
          i++;
          if (i % 20 === 0) playSound('bip');
          scheduleSession(typeWriter, 6, sessionId);
        }
      }
      scheduleSession(typeWriter, 300, sessionId);
    }
  },

  // Slide 2: Equipo de Desarrollo
  {
    id: 'slide-2',
    html: `
      <h2>Equipo de Desarrollo</h2>
      <p class="text-center">Conoce a los integrantes que hicieron posible Gatito Code.</p>
      
      <div class="team-list" id="team-list">
      </div>
    `,
    onEnter: (sessionId) => {
      const members = [
        { name: "Brian Herrera", role: "Desarrollador — Programacion de la logica del juego, movimiento del jugador, colisiones y sistema de ejecucion de comandos." },
        { name: "Inti Taretto", role: "Desarrollador — Implementacion de mecanicas de niveles, integracion de assets y optimizacion de rendimiento." },
        { name: "Iara Baya", role: "Desarrolladora — Desarrollo del motor de tilemaps, sistema de clima y editor visual de niveles." },
        { name: "Luis Herrera", role: "Disenador UI/UX — Creacion de interfaces, paletas de colores, tipografia pixel-art y experiencia de usuario." },
        { name: "Lisett Castillo", role: "Scrum Master — Facilitacion de ceremonias agiles, gestion del backlog y aseguramiento del flujo de trabajo." },
        { name: "Lucas Gimenez", role: "QA & Documentacion — Diseno de casos de prueba, control de calidad y redaccion de documentacion tecnica." }
      ];
      
      const list = document.getElementById('team-list');
      if (!list) return;
      list.innerHTML = '';
      
      members.forEach((m, idx) => {
        const row = document.createElement('div');
        row.className = 'team-row';
        row.innerHTML = `
          <div class="team-name">${m.name}</div>
          <div class="team-role">${m.role}</div>
        `;
        list.appendChild(row);
        
        scheduleSession(() => {
          row.classList.add('show');
          playSound('blup');
        }, 200 + idx * 200, sessionId);
      });
    }
  },

  // Slide 3: Metodología Ágil — SCRUM
  {
    id: 'slide-3',
    html: `
      <h2>Metodologia agil — SCRUM</h2>
      <p class="text-center">Organizacion del trabajo en iteraciones cortas y enfocadas en la entrega de valor.</p>
      
      <div class="scrum-container">
        <div class="scrum-panel">
          <h3>Flujo de Trabajo</h3>
          <ul class="scrum-list">
            <li>
              <span class="label">Sprint Planning</span>
              Al inicio de cada ciclo se seleccionan las historias de usuario del Product Backlog y se definen las tareas del Sprint Backlog.
            </li>
            <li>
              <span class="label">Daily Standups</span>
              Reuniones breves de 15 minutos, dos veces por semana, para sincronizar avances y remover impedimentos.
            </li>
            <li>
              <span class="label">Sprint Review</span>
              Demostracion del incremento funcional al final del sprint para recibir feedback y ajustar prioridades.
            </li>
            <li>
              <span class="label">Retrospective</span>
              Espacio de mejora continua donde el equipo identifica que funciono, que no y que acciones tomaran en el siguiente ciclo.
            </li>
          </ul>
        </div>
        
        <div class="scrum-panel">
          <h3>Artefactos y Control</h3>
          <ul class="scrum-list">
            <li>
              <span class="label">Historias de Usuario</span>
              Cada funcionalidad se describe desde la perspectiva del jugador, incluyendo criterios de aceptacion claros y medibles.
            </li>
            <li>
              <span class="label">Criterios de Aceptacion</span>
              Condiciones minimas para considerar una historia completa: comportamiento esperado, casos limite y validacion visual.
            </li>
            <li>
              <span class="label">Casos de Prueba</span>
              Escenarios documentados antes de la implementacion para garantizar que la funcionalidad cumpla los requisitos.
            </li>
            <li>
              <span class="label">Registro en Notion</span>
              Tablero centralizado con el estado de cada tarea (Pendiente, En progreso, Testing, Done) vinculado a su historia y tests.
            </li>
          </ul>
        </div>
      </div>
    `
  },

  // Slide 4: Historias de Usuario
  {
    id: 'slide-4',
    html: `
      <h2>Historias de Usuario y Testing</h2>
      <p class="text-center">Documentamos requerimientos mediante historias de usuario y definimos casos de prueba para validar cada funcionalidad antes de su implementacion.</p>
      
      <div class="placeholder-container">
        <div>
          <p class="text-center" style="font-size: clamp(12px, 1.5vw, 16px); margin-bottom: 8px;">Tablero de Notion</p>
          <div class="placeholder-img" style="background-image: url('assets/slides/notion-board.png')">
          </div>
        </div>
        <div>
          <p class="text-center" style="font-size: clamp(12px, 1.5vw, 16px); margin-bottom: 8px;">Historia de usuarios</p>
          <div class="placeholder-img" style="background-image: url('assets/slides/notion-tasks.png'); background-position: top left;">
          </div>
        </div>
      </div>
    `
  },

  // Slide 5: Tests Implementados
  {
    id: 'slide-5',
    html: `
      <h2>Tests Implementados</h2>
      <p>Validamos la logica de dominio con tests unitarios ejecutables con un solo comando.</p>
      
      <div class="terminal" id="test-terminal"></div>
    `,
    onEnter: (sessionId) => {
      const output = `> npm test

<span class="green">✓</span> domain/Player.js — Navegacion y colisiones del jugador
  <span class="green">✓</span> El jugador puede moverse libremente por casillas vacias en las 4 direcciones cardinales
  <span class="green">✓</span> El jugador NO puede atravesar casillas solidas (paredes)
  <span class="green">✓</span> El jugador NO puede salirse de los limites del mapa
  <span class="green">✓</span> El jugador puede saltar 2 casillas, atravesando 1 casilla solida intermedia
  <span class="green">✓</span> El jugador NO puede saltar si la casilla de aterrizaje esta fuera del mapa
  <span class="green">✓</span> El jugador vuelve exactamente a su posicion de spawn al reiniciar

<span class="green">✓</span> domain/Level.js — Geometria de la grilla del mapa
  <span class="green">✓</span> Se crea un nivel con dimensiones 16x12, spawn en (8,6) y objetos correctamente registrados
  <span class="green">✓</span> isSolid() detecta correctamente las casillas marcadas como paredes
  <span class="green">✓</span> isSolid() devuelve true para coordenadas fuera de los limites del mapa
  <span class="green">✓</span> isSolid() devuelve false para casillas de piso sin paredes
  <span class="green">✓</span> El nivel registra correctamente los objetos de recoleccion con su posicion y tipo

Archivos modificados/creados
Archivo\t                Accion
tests/domain.test.js\tCreado — 11 tests unitarios
package.json\t        Editado — script test ahora ejecuta vitest run
node_modules/\t        Instalado — Vitest v4.1.7 + dependencias
`;
      
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
          scheduleSession(typeLine, Math.random() * 50 + 20, sessionId);
        }
      }
      scheduleSession(typeLine, 300, sessionId);
    }
  },

  // Slide 6: Evolucion de la Arquitectura
  {
    id: 'slide-6',
    html: `
      <h2>Evolucion de la Arquitectura</h2>
      <p class="text-center">
        El proyecto comenzo como un monolito donde toda la logica residia en un unico archivo embebido,
        sin separacion de capas ni responsabilidades. Mediante refactorizacion progresiva, evoluciono
        hacia una arquitectura estratificada que distingue dominio puro, motor de renderizado,
        servicios de persistencia y UI del DOM.
      </p>

      <div class="architecture-container">
        <div class="tree-panel tree-initial" style="flex: 1; font-size: 12px;">
          <h3>Arquitectura Inicial</h3>
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

        <div class="tree-panel tree-current" style="flex: 1; font-size: 12px; padding: 16px;">
          <h3>Arquitectura Actual</h3>
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
      <p class="text-center">Mapa Principal · Tutorial Automatico</p>
      
      <div id="demo-container">
      </div>
      
      <p class="text-center" style="font-size: clamp(12px, 1.5vw, 16px); color: var(--text-dim); margin-top: -8px;">El gatito ejecutara automaticamente una secuencia de comandos.</p>
    `,
    onEnter: () => {
      startDemo('demo-container');
    },
    onLeave: () => {
      stopDemo();
    }
  }
];
