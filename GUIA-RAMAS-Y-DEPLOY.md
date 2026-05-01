# Guía Completa: Ramas de Git + Deploy en Vercel
## Para principiantes — Proyecto Francis Dadus

---

## ¿Qué es una "rama" (branch) y para qué sirve?

Imagina que tu proyecto es un documento de Word. Una **rama** es como hacer una copia de ese documento para editar sin tocar el original. Si te gusta el resultado, reemplazas el original. Si no, simplemente borras la copia y el original sigue intacto.

En programación:
- **`main`** = el sitio oficial que ve el público en vivo
- **`navy-theme`** = tu copia para probar los cambios de color navy

Vercel entiende esto y despliega **ambas versiones en URLs separadas** automáticamente.

---

## ¿Se crea una carpeta nueva en tu computadora?

**No.** Es la misma carpeta `francis-dadus` en tu Mac. Git simplemente guarda internamente los cambios de cada rama. Cuando cambias de rama, los archivos en tu carpeta se actualizan solos para mostrar la versión correcta. No hay carpetas extra en ningún lado.

---

## PASO A PASO COMPLETO

---

### PASO 1 — Abrir VS Code en la carpeta correcta

Abre VS Code. En el menú superior haz clic en:
**File → Open Folder** → navega hasta `Documents/Web Development Projects/francis-dadus` → clic en **Open**.

Verifica que estás en la carpeta correcta: en la esquina inferior izquierda de VS Code debes ver algo como `⎇ main`.

---

### PASO 2 — Abrir la terminal de VS Code

En VS Code presiona:
```
Cmd + ` (tecla del acento grave, está debajo de Escape)
```

Se abre la terminal en la parte inferior. Aquí es donde escribirás todos los comandos.

---

### PASO 3 — Verificar en qué rama estás

Escribe este comando y presiona Enter:

```bash
git branch
```

Verás algo como:
```
* main
```

El asterisco `*` indica en qué rama estás. Debes estar en `main` antes de crear la nueva rama.

---

### PASO 4 — Crear y entrar a la nueva rama navy-theme

Escribe este comando y presiona Enter:

```bash
git checkout -b navy-theme
```

**¿Qué significa esto?**
- `git checkout` = cambiar de rama
- `-b` = crear una rama nueva (b = branch)
- `navy-theme` = el nombre que le damos a la rama nueva

Verás el mensaje:
```
Switched to a new branch 'navy-theme'
```

En la esquina inferior izquierda de VS Code ahora verás `⎇ navy-theme`. 

---

### PASO 5 — Instalar dependencias actualizadas

Como actualizamos el `package.json` con los nuevos colores, necesitas reinstalar:

```bash
npm install
```

Espera a que termine (verás `added X packages`).

---

### PASO 6 — Ver los cambios en tu computadora (opcional pero recomendado)

Antes de subir a internet, prueba el sitio localmente para confirmar que los colores navy se ven bien:

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

Deberías ver el hero section en azul navy en vez de negro. Si se ve bien, regresa a la terminal y presiona `Ctrl + C` para detener el servidor local.

---

### PASO 7 — Guardar los cambios en Git (commit)

Estos tres comandos guardan tus cambios. Escríbelos uno por uno:

```bash
git add .
```
> Esto le dice a Git: "prepara TODOS los archivos modificados para guardar"

```bash
git commit -m "feat: navy blue color palette"
```
> Esto guarda los cambios con un mensaje descriptivo (como ponerle nombre a un documento)

Verás algo como:
```
[navy-theme abc1234] feat: navy blue color palette
 6 files changed, 45 insertions(+), 20 deletions(-)
```

---

### PASO 8 — Subir la rama a GitHub

```bash
git push origin navy-theme
```

**¿Qué significa esto?**
- `git push` = subir cambios
- `origin` = tu repositorio en GitHub
- `navy-theme` = la rama que estás subiendo

Verás algo como:
```
* [new branch]      navy-theme -> navy-theme
Branch 'navy-theme' set up to track remote branch 'navy-theme' from 'origin'.
```

---

### PASO 9 — Vercel despliega automáticamente ✨

**No necesitas hacer nada en Vercel.** En cuanto subes la rama a GitHub, Vercel la detecta automáticamente y empieza a desplegarla.

Espera 2-3 minutos y luego:

1. Ve a [vercel.com](https://vercel.com) → entra a tu proyecto `francis-dadus`
2. Haz clic en la pestaña **Deployments**
3. Verás dos deployments:
   - Uno con etiqueta **`main`** (el sitio original en negro)
   - Uno con etiqueta **`navy-theme`** (el sitio nuevo en navy)

4. Haz clic en el deployment de `navy-theme` → clic en **Visit** para ver la URL de preview

La URL de preview se verá así:
```
https://francis-dadus-git-navy-theme-adeoleo41.vercel.app
```

Esa URL puedes compartirla con Francis para que ella apruebe el diseño navy.

---

## ESCENARIO A — Te gusta el diseño navy y quieres hacerlo oficial

Si el diseño navy está aprobado y quieres que sea el sitio principal:

### Paso A1 — Volver a la rama main

```bash
git checkout main
```

Verás: `Switched to branch 'main'`

### Paso A2 — Fusionar navy-theme con main

```bash
git merge navy-theme
```

Esto trae todos los cambios de navy-theme a main.

### Paso A3 — Subir a GitHub (y Vercel lo despliega automático)

```bash
git push origin main
```

En 2-3 minutos el sitio oficial en `https://francis-dadus-l8kk.vercel.app` tendrá los colores navy. ✅

---

## ESCENARIO B — No te gusta el diseño y quieres volver al original

### Opción 1 — Rollback en Vercel (más rápido, sin tocar código)

1. Ve a Vercel → tu proyecto → pestaña **Deployments**
2. Busca el deployment más reciente con etiqueta **`main`** (el del diseño negro original)
3. Haz clic en los **tres puntos `...`** a la derecha
4. Selecciona **"Promote to Production"**
5. Confirma

En menos de 30 segundos el sitio vuelve al diseño original. Sin tocar ningún archivo.

### Opción 2 — Volver al código original (si quieres limpiar todo)

```bash
# Asegúrate de estar en main
git checkout main

# El código de main nunca fue tocado, sigue siendo el negro original
# Si quieres eliminar la rama navy-theme completamente:
git branch -d navy-theme                    # borra rama local
git push origin --delete navy-theme         # borra rama en GitHub
```

---

## RESUMEN VISUAL DEL FLUJO

```
Tu Mac (VS Code)          GitHub               Vercel
─────────────────         ──────────           ──────────────────────────
  rama: main    ────────► main        ────────► francis-dadus-l8kk.vercel.app
                                                 (sitio oficial/público)

  rama: navy-theme ──────► navy-theme ────────► francis-dadus-git-navy-theme-...vercel.app
                                                 (preview / para revisar)
```

---

## REFERENCIA RÁPIDA DE COMANDOS

| Qué quieres hacer | Comando |
|---|---|
| Ver en qué rama estás | `git branch` |
| Crear y entrar a rama nueva | `git checkout -b nombre-rama` |
| Cambiar a una rama existente | `git checkout nombre-rama` |
| Guardar todos los cambios | `git add .` |
| Hacer commit (guardar con nombre) | `git commit -m "descripción"` |
| Subir rama a GitHub | `git push origin nombre-rama` |
| Fusionar rama con main | `git merge nombre-rama` |
| Ver historial de commits | `git log --oneline` |
| Cancelar cambios sin guardar | `git checkout -- .` |

---

## PREGUNTAS FRECUENTES

**¿Se borran mis archivos cuando cambio de rama?**
No. Git los guarda internamente. Cuando cambias de rama, los archivos se actualizan automáticamente para mostrar la versión correcta de esa rama.

**¿Neon (base de datos) se duplica también?**
No. Solo hay una base de datos en Neon. Tanto `main` como `navy-theme` usan la misma base de datos. Los cambios de rama solo afectan el código (colores, texto, diseño), no los datos.

**¿Tengo que configurar variables de entorno para la rama preview en Vercel?**
No. Vercel usa automáticamente las mismas variables de entorno que ya configuraste para todos los ambientes (Production and Preview).

**¿Puedo tener más de dos ramas?**
Sí, tantas como quieras. Por ejemplo: `rama-nueva-seccion`, `rama-precios`, `rama-blog`. Cada una genera su propia URL de preview en Vercel.

---

*Guía creada para el proyecto Francis Dadus — Santo Domingo, República Dominicana*
