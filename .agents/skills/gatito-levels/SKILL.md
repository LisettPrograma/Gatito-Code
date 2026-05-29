---
name: gatito-levels
description: Guía la creación de nuevos niveles para Gatito-Code. Use when the user asks to create a map, level, design a puzzle, or add a new stage to the game. Includes pedagogical design rules, asset catalog, weather system, and semantic level compiler.
---

# Skill: Diseñador de Niveles Gatito-Code

## Propósito
Esta skill guía a cualquier LLM en la creación de nuevos mapas/niveles para el juego **Gatito-Code**, un juego de puzles 2D por turnos basado en Phaser 3 que enseña conceptos de programación y lógica algorítmica.

---

## Regla de Interacción Inicial (OBLIGATORIA)

Cuando el usuario te pida crear un mapa o un nivel, **NO** generes código ni archivos inmediatamente. Tu primera acción DEBE ser hacerle estas **7 preguntas obligatorias** y esperar sus respuestas:

1. **Dificultad:** *"¿Qué dificultad deseas para este nivel: fácil, normal, difícil o pesadilla?"*
2. **Concepto Pedagógico:** *"¿Qué concepto de lógica o algoritmos quieres que el jugador practique aquí? (Ej: secuencias simples, esquivar obstáculos, encontrar la ruta más corta, evitar callejones sin salida, planificar con límite de movimientos)."*
3. **Temática y Assets:** *"¿Qué escenario visual te imaginas? Te muestro las opciones disponibles..."* (Ver catálogo más abajo).
4. **Estado Anímico / Narrativa Visual:** *"¿Qué emoción o sensación debe transmitir el nivel? (Ej: alegre, triste, melancólico, misterioso, nostálgico, aterrador, tranquilo, caótico, esperanzador)."*
5. **Clima / Atmósfera Física:** *"Describe el clima ambiental. Puedes combinar efectos: lluvia intensa de noche, nieve ligera al amanecer, hojas cayendo en día despejado, polen flotante, o simplemente despejado."*
6. **Narrativa de Juego:** *"¿Quieres incluir un mensaje de bienvenida (diálogo al iniciar el nivel) o un texto de misión específico en la pantalla?"*
7. **Nombre del Mapa:** *"¿Cómo quieres llamar a este nivel? (Ej: bosque_encantado, granja_abandonada, pueblo_lobos). Este nombre se usará para el archivo, el menú y el código fuente."*

---

## Catálogo de Assets Disponibles

> **Nota:** Este es un catálogo resumido con los assets más útiles para diseñar niveles. El registro completo de todos los tilesets, objetos, animales e items disponibles está en `public/src/engine/level/TileRegistry.js` (más de 80 spritesheets). Si el usuario pide un asset específico que no aparezca aquí, verifica su existencia en ese archivo antes de decir que no está disponible.

### Terrenos Transitables (Autotile)
Se pintan en la capa `floor`.
- `grass` — Pasto verde básico (GID 1-99)
- `dirt` — Tierra arada/marrón (GID 200-299)
- `water` — Agua animada (GID 400-499)

### Obstáculos / Muros (Autotile)
Se pintan en la capa `walls`. Todo GID != 0 bloquea el paso.
- `hills` — Colinas y elevaciones verdes (GID 300-399)
- `fences` — Cercas de madera (GID 100-199)
- `fences_v2` — Cercas extendidas (GID 3700+)

### Objetos Decorativos y Estructuras
Se colocan en el array `objects` del JSON con `type: "deco"`.
- `grass_props` — Arbustos, troncos, hongos, flores (cols: 9, rows: 5)
- `plants` — Cultivos pequeños (cols: 6, rows: 2)
- `trees` — Árboles, tocones y arbustos grandes (cols: 12, rows: 7)
- `mushrooms` — Hongos, flores y piedras (cols: 12, rows: 5)
- `farming` — Cultivos en crecimiento (cols: 5, rows: 15)
- `furniture` — Mobiliario básico (cols: 9, rows: 6)
- `signs` — Letreros de madera frontales (cols: 6, rows: 4)
- `signs_sides` — Letreros laterales (cols: 8, rows: 2)
- `well` — Pozo de agua (cols: 2, rows: 2)
- `wood_bridge` — Puente de madera v1 (cols: 5, rows: 3)
- `wooden_bridge_v2` — Puente de madera v2 (cols: 4, rows: 3)
- `workstation` — Mesa de trabajo (cols: 2, rows: 2)
- `paths` — Caminos decorativos (cols: 4, rows: 4)
- `boats` — Botes pequeños (cols: 9, rows: 6)
- `water_objs` — Objetos acuáticos (cols: 12, rows: 2)
- `barn_structures` — Estructuras de granja (cols: 3, rows: 4)
- `chicken_houses` — Gallineros (cols: 24, rows: 11)
- `door_animation` — Puertas animadas (cols: 18, rows: 2)
- `fence_gates_anim` — Puertas de cerca animadas (cols: 10, rows: 3)
- `mailbox_anim` — Buzón animado (cols: 11, rows: 21)
- `campfire` — Fogata (cols: 7, rows: 3)

### Items (Pickups Coleccionables)
Se colocan en `objects` con `type: "pickup"`. El jugador debe recogerlos para completar la misión.
- `egg_items` — Huevo (cols: 5, rows: 1)
- `tools_items` — Herramientas y materiales (cols: 4, rows: 3)
- `piknik_basket` — Cesta de picnic (cols: 1, rows: 1)
- `piknik_blanket` — Manta de picnic (cols: 3, rows: 3)
- `fruit_berries_items` — Frutas y bayas (cols: 4, rows: 2)
- `milk_items` — Productos lácteos (cols: 4, rows: 11)
- `grass_ground_items` — Items de suelo (cols: 6, rows: 2)
- `farming_plants_items` — Items de cultivo (cols: 2, rows: 15)

### Cofres (Estructuras con animación)
- `birch_chest`, `cherry_chest`, `golden_chest`, `oak_chest`, `pine_chest`, `silver_chest` — Cofres de diferentes materiales (cols: 10, rows: 4 cada uno)

### Animales (Decorativos / Ambientales)
- `free_chicken` — Gallina libre (cols: 4, rows: 2)
- `chicken` / `chicken_blue` / `chicken_brown` / `chicken_green` / `chicken_red` — Gallinas de colores (cols: 8, rows: 27)
- `chicken_baby` / `chicken_baby_blue` / `chicken_baby_brown` / `chicken_baby_green` / `chicken_baby_red` — Pollitos (cols: 8, rows: 19)
- `cow` / `cow_brown` / `cow_green` / `cow_pink` / `cow_purple` — Vacas (cols: 16, rows: 16)
- `cow_baby_brown` / `cow_baby_green` / `cow_baby_light` / `cow_baby_pink` / `cow_baby_purple` — Terneros (cols: 16, rows: 18)
- `bat_animations` — Murciélagos (cols: 6, rows: 2)
- `small_green_slime` — Slime verde (cols: 12, rows: 8)
- `fish_sprites` — Peces (cols: 10, rows: 5)

### Personajes (Solo referencia, no para objetos del mapa)
- `character_base` — El protagonista controlado por el jugador

### Nota sobre los `key` de objetos
En el esquema semántico, el campo `key` debe coincidir **exactamente** con el `key` registrado en `TileRegistry.js`. Por ejemplo:
- Correcto: `{ "key": "well", "frame": 0 }`
- Incorrecto: `{ "key": "Water well", "frame": 0 }`

---

## Reglas de Diseño Pedagógico y Físico

### Regla de Oro: Máximo 7 Movimientos
El jugador solo puede encolar **7 movimientos** por ejecución del programa. Por lo tanto:

- La **distancia transitable real** (pathfinding esquivando muros) desde el `spawn` hasta cada objetivo `pickup` debe ser **≤ 7 pasos**.
- Alternativamente, la distancia entre el `spawn` y un pickup, o entre cualquier par de pickups, debe permitir una secuencia de recolección donde cada salto sea ≤ 7 pasos.
- **NUNCA** diseñes un pickup que requiera 8 o más pasos seguidos sin un punto de descanso intermedio.

### Diseño por Dificultad

| Dificultad | Propósito Educativo | Diseño Espacial |
|------------|---------------------|-----------------|
| **Fácil** | Secuencias básicas, confianza | Caminos casi rectos. 1-2 obstáculos decorativos. Distancia spawn→pickup de 2-4 pasos. Sin trampas. |
| **Normal** | Caminos en L, zig-zag, planificación simple | Muros que obligan a rodear. 3-4 pickups. Distancias de 4-6 pasos. Primera introducción de callejones sin salida visibles. |
| **Difícil** | Optimización de rutas, reconocimiento de patrones | Pasillos estrechos, callejones sin salida que parecen caminos válidos. Distancias de 6-7 pasos. Caminos engañosos visibles. |
| **Pesadilla** | Eficiencia algorítmica extrema, cero error | Exactamente 7 pasos entre zonas seguras. Caminos alternativos tentadores pero ineficientes (requieren 8+ pasos o son dead-ends). Castiga severamente no planificar. |

### Técnica de "Caminos Engañosos" (Decoy Paths)
Para niveles Normal, Difícil y Pesadilla, **SIEMPRE** incluye al menos una ruta alternativa que:
- Sea visualmente tentadora (más corta en línea recta).
- Sea un **callejón sin salida** o requiera más de 7 pasos para salir.
- Force al jugador a contar mentalmente antes de presionar "Run".

### Narrativa Visual por Emoción (Camino Simple - Sin tintes dinámicos)
El motor NO soporta cambiar colores de los tiles dinámicamente. La emoción se transmite **exclusivamente mediante la combinación de assets** y el clima.

| Emoción | Clima Sugerido | Assets Dominantes |
|---------|---------------|-------------------|
| **Alegre / Feliz** | Despejado, polen ligero (`pollen: 0.3`) | `grass`, flores (`grass_props`), animales, puentes, picnic |
| **Triste / Melancólico** | Lluvia ligera (`rain: 0.4`), noche tenue (`night: 0.3`) | `dirt` predominante, tocones cortados, mobiliario abandonado, pozo seco, cercas rotas (`fences`) |
| **Misterioso** | Noche (`night: 0.7`), niebla implícita por oscuridad | Casa de madera (`wooden_house`), `fences`, carteles (`signs`), cofres (`oak_chest`), puentes (`wood_bridge`) |
| **Aterrador** | Noche intensa (`night: 0.9`), lluvia torrencial (`rain: 0.9`) | Todo lo anterior + ausencia total de animales, muchos `hills` (montañas) cerrando el espacio |
| **Tranquilo / Nostálgico** | Despejado de noche (`night: 0.5`), nieve ligera (`snow: 0.3`) | `grass` con árboles (`Trees`), animales pasivos, pozo, caminos de `dirt` |
| **Caótico** | Tormenta de hojas (`leaves: 0.8`) + lluvia (`rain: 0.6`) | Objetos dispersos sin orden, múltiples tipos de terreno mezclados, puentes rotos, obstáculos inesperados |

### Efectos Climáticos (Nativos del Motor)
El motor soporta múltiples efectos simultáneos. En el JSON del nivel se incluye:

```json
"weather": {
  "rain": 0.0,
  "snow": 0.0,
  "pollen": 0.0,
  "leaves": 0.0,
  "night": 0.0
}
```

- **Valores:** `0.0` (desactivado) a `1.0` (máxima intensidad).
- **Combinaciones:** Ilimitadas. Ejemplo: `"noche lluviosa"` = `{ "night": 0.6, "rain": 0.8 }`.
- **Tipos:** `rain` (lluvia), `snow` (nieve), `pollen` (polen flotante), `leaves` (hojas cayendo), `night` (overlay oscuro).

---

## Flujo de Integración al Código Fuente

Cuando generes un nuevo nivel, la IA debe realizar estos pasos exactos en el orden indicado. Omitir cualquiera de ellos dejará el nivel parcialmente inaccesible.

### Paso 1: Generar el archivo JSON del nivel
Guardar en: `public/levels/[nombre].json`

### Paso 2: Registrar el nivel en el cargador de recursos
Editar `public/src/engine/level/TileRegistry.js`:
- Añadir `"[nombre]"` al array `LEVELS` (Ej: `export const LEVELS = ['gym', 'main', 'bosque_encantado'];`)

### Paso 3: Agregar botón de juego al menú principal
Editar `public/src/engine/scenes/MenuScene.js` en la sección `screen === 'levels'`:
- Añadir: `this.makeButton(bx, y, 'Nombre Visible', () => this.scene.start('Custom', { levelKey: '[nombre]' }));`
- **Si se creó una escena personalizada** (Paso 5), usar en su lugar: `this.scene.start('[NombreCamelCase]')`

### Paso 4: Agregar entrada al editor de niveles (OBLIGATORIO)
Editar `public/src/engine/scenes/MenuScene.js` en la sección `screen === 'editor'`, dentro del bucle `for (const lv of [...])`:
- Añadir el nivel al array hardcodeado: `{ key: '[nombre]', name: 'Nombre Visible' }`
- Ejemplo: `for (const lv of [{ key: 'gym', name: 'Gym' }, { key: 'main', name: 'Main' }, { key: '[nombre]', name: 'Nombre Visible' }, ...getCustomLevels()])`

> **Nota:** El editor itera una lista estática de niveles base. Si no se añade aquí, el nivel no aparecerá en "Level Editor → editar existente".

### Paso 5 (Opcional - Recomendado): Crear una clase de Escena personalizada
Si el usuario pidió `missionText` o `welcomeMessage` personalizados, crear `public/src/engine/levels/[NombreCamelCase]Scene.js`:

```javascript
import { TileLevelScene } from '../scenes/TileLevelScene.js';

export class [NombreCamelCase]Scene extends TileLevelScene {
  constructor() {
    super('[NombreCamelCase]');
    this.levelKey = '[nombre]';
    this.missionText = '[Texto de mision personalizado]';
  }

  init(data) {
    super.init(data);
    this.welcomeMessage = '[Mensaje de bienvenida personalizado]';
    if (!data?.returnScreen) this.returnScreen = 'levels';
  }
}
```

### Paso 6 (Si se creó Escena personalizada): Registrar en el motor del juego
Editar `public/src/main.js`:
- Importar la nueva escena: `import { [NombreCamelCase]Scene } from './engine/levels/[NombreCamelCase]Scene.js';`
- Agregarla al array de escenas: `scene: [ ..., [NombreCamelCase]Scene ]`
- **Y modificar el botón del menú** (Paso 3) para que llame a `this.scene.start('[NombreCamelCase]')` en lugar de `'Custom'`.

---

## Formato Semántico de Entrada (Para el Compilador)

La IA NO debe escribir a mano arrays de 192 GIDs. En su lugar, debe generar un archivo semántico (JSON o YAML) y ejecutar el script `build-level.js`.

### Estructura del esquema semántico:

```json
{
  "name": "bosque_encantado",
  "cols": 16,
  "rows": 12,
  "weather": { "rain": 0, "snow": 0, "pollen": 0, "leaves": 0, "night": 0.6 },
  "spawn": { "tx": 8, "ty": 6 },
  "terrain": [
    { "type": "grass", "rect": [0, 0, 16, 12] },
    { "type": "dirt", "rect": [4, 4, 8, 4] }
  ],
  "walls": [
    { "type": "fences", "rect": [2, 2, 12, 8], "border": true }
  ],
  "objects": [
    { "tx": 10, "ty": 5, "key": "grass_props", "frame": 20, "type": "pickup" },
    { "tx": 5, "ty": 3, "key": "trees", "frame": 0, "type": "deco" }
  ]
}
```

### Notas sobre el formato semántico:
- `terrain`: Lista de rectángulos `[x, y, width, height]`. El compilador calculará automáticamente los bordes (autotile).
- `walls`: Lista de rectángulos. Si tiene `"border": true`, solo dibuja el contorno. Si no, rellena todo.
- `objects`: Cada objeto tiene `tx`, `ty` (coordenadas de tile), `key` (nombre del asset), `frame` (índice del sprite), y `type` (`"pickup"` o `"deco"`).

### Ejecución del compilador:
```bash
node .agents/skills/gatito-levels/build-level.js input.json public/levels/
```

---

## Validación del Nivel

Después de generar el JSON, la IA DEBE ejecutar el validador:

```bash
node .agents/skills/gatito-levels/validate-level.js public/levels/[nombre].json
```

El validador verificará:
- ✅ Estructura del JSON correcta.
- ✅ GIDs dentro de rangos válidos.
- ✅ Spawn dentro de límites y sobre suelo transitable.
- ✅ **Pathfinding BFS:** Todos los pickups están conectados al spawn mediante saltos de máximo 7 pasos cada uno.
- ✅ Intensidades del clima entre 0.0 y 1.0.

**Si el validador falla, la IA debe corregir el diseño y volver a ejecutar el compilador y el validador antes de presentar el resultado al usuario.**

---

## Ejemplo Completo (Few-Shot)

### Input del usuario:
- Dificultad: Normal
- Concepto: Esquivar obstáculos y planificar rutas
- Temática: Granja antigua
- Emoción: Melancólica
- Clima: Lluvia ligera de noche
- Narrativa: "Misión: Encuentra las herramientas perdidas de tu abuelo."
- Nombre: granja_abandonada

### Esquema Semántico generado por la IA:

```json
{
  "name": "granja_abandonada",
  "cols": 16,
  "rows": 12,
  "weather": { "rain": 0.4, "snow": 0, "pollen": 0, "leaves": 0.2, "night": 0.5 },
  "spawn": { "tx": 2, "ty": 2 },
  "terrain": [
    { "type": "dirt", "rect": [0, 0, 16, 12] },
    { "type": "grass", "rect": [1, 1, 14, 10] }
  ],
  "walls": [
    { "type": "fences", "rect": [1, 1, 14, 10], "border": true },
    { "type": "fences", "rect": [6, 4, 4, 4] }
  ],
  "objects": [
    { "tx": 13, "ty": 9, "key": "tools", "frame": 0, "type": "pickup" },
    { "tx": 4, "ty": 8, "key": "tools", "frame": 2, "type": "pickup" },
    { "tx": 10, "ty": 3, "key": "furniture", "frame": 6, "type": "deco" },
    { "tx": 5, "ty": 5, "key": "oak_chest", "frame": 0, "type": "deco" }
  ]
}
```

### Ejecución:
```bash
node .agents/skills/gatito-levels/build-level.js granja_abandonada.json public/levels/
node .agents/skills/gatito-levels/validate-level.js public/levels/granja_abandonada.json
```

### Integración al código:
1. Añadir `"granja_abandonada"` a `LEVELS` en `public/src/engine/level/TileRegistry.js`.
2. Añadir botón de juego en `public/src/engine/scenes/MenuScene.js` (sección `levels`).
3. Añadir entrada al editor en `public/src/engine/scenes/MenuScene.js` (sección `editor`).
4. Crear `public/src/engine/levels/GranjaAbandonadaScene.js` con `missionText` y `welcomeMessage` personalizados.
5. Importar y registrar `GranjaAbandonadaScene` en `public/src/main.js`.
6. Actualizar el botón del menú para usar `this.scene.start('GranjaAbandonada')`.

---

## Notas Importantes para el LLM

- **NUNCA** inventes GIDs que no existan en los rangos definidos (grass: 1-99, fences: 100-199, dirt: 200-299, hills: 300-399, water: 400-499).
- **NUNCA** pongas pickups dentro de muros (coordenadas donde la capa `walls` tenga un GID != 0).
- **NUNCA** pongas el spawn sobre un muro.
- **SIEMPRE** ejecuta `validate-level.js` antes de dar por terminado un nivel.
- Si un asset que quiere usar el usuario no está en el catálogo, explica que no está registrado en el motor y sugiere una alternativa del catálogo.
- Todos los comentarios de código y nombres de archivos deben seguir el estilo del proyecto (principalmente español para la experiencia del usuario).
