# Francis Dadus — Sitio Web Personal + Ecommerce

> **Stack:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Azul (RD) · Stripe

---

## Estructura del Proyecto

```
francis-dadus/
├── src/
│   ├── app/
│   │   ├── page.tsx                    ← Single-page principal (Home)
│   │   ├── layout.tsx                  ← Layout global + SEO metadata
│   │   ├── globals.css                 ← Design tokens (dorado/carbón)
│   │   ├── tienda/page.tsx             ← Tienda de productos
│   │   ├── checkout/page.tsx           ← Checkout (Azul + Stripe)
│   │   ├── checkout/confirmacion/      ← Página de confirmación
│   │   └── api/
│   │       ├── payment/azul/route.ts   ← Gateway Azul (RD)
│   │       ├── payment/stripe/route.ts ← Gateway Stripe (internacional)
│   │       ├── products/route.ts       ← CRUD productos
│   │       ├── contact/route.ts        ← Formulario de contacto + email
│   │       └── auth/[...nextauth]/     ← Autenticación
│   ├── components/
│   │   ├── layout/Navbar.tsx
│   │   ├── layout/Footer.tsx
│   │   ├── sections/Hero.tsx
│   │   ├── sections/Stats.tsx
│   │   ├── sections/About.tsx
│   │   ├── sections/Services.tsx
│   │   ├── sections/FeaturedProducts.tsx
│   │   ├── sections/Testimonials.tsx
│   │   ├── sections/Contact.tsx
│   │   └── store/CartProvider.tsx
│   ├── lib/
│   │   ├── prisma.ts   ← Cliente de base de datos
│   │   ├── azul.ts     ← Integración Azul (pagos RD)
│   │   ├── stripe.ts   ← Integración Stripe (internacional)
│   │   └── auth.ts     ← Configuración NextAuth
│   └── types/index.ts
└── prisma/
    └── schema.prisma   ← Modelos DB: User, Product, Order, Enrollment
```

---

## Requisitos del Sistema (MacBook Pro Intel)

- **Node.js** v18+ → https://nodejs.org
- **PostgreSQL** v14+ → https://www.postgresql.org/download/macosx/
- **Git** → ya incluido en macOS
- **VS Code** → https://code.visualstudio.com

### Extensiones VS Code recomendadas
- Prisma
- Tailwind CSS IntelliSense
- ESLint
- TypeScript Hero
- Thunder Client (para probar las APIs)

---

## Instalación Paso a Paso

### 1. Instalar Node.js

```bash
# Instalar nvm (manejador de versiones de Node)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

# Instalar Node 18
nvm install 18
nvm use 18
```

### 2. Instalar PostgreSQL (con Homebrew)

```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar PostgreSQL
brew install postgresql@16
brew services start postgresql@16

# Crear base de datos
psql postgres -c "CREATE DATABASE francisdadus_db;"
```

### 3. Configurar el proyecto

```bash
# Entrar a la carpeta del proyecto
cd francis-dadus

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

### 4. Editar el archivo `.env`

Abre `.env` en VS Code y configura:

```env
DATABASE_URL="postgresql://postgres@localhost:5432/francisdadus_db"
NEXTAUTH_SECRET="genera-uno-con: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Azul (obtener en https://developers.azul.com.do)
AZUL_MERCHANT_ID="tu-merchant-id"
AZUL_AUTH1="tu-auth1"
AZUL_AUTH2="tu-auth2"
AZUL_ENVIRONMENT="dev"

# Stripe (obtener en https://dashboard.stripe.com)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Gmail con contraseña de aplicación)
EMAIL_USER="tu@gmail.com"
EMAIL_PASS="xxxx xxxx xxxx xxxx"
EMAIL_FROM="Francis Dadus <tu@gmail.com>"
```

### 5. Inicializar la base de datos

```bash
# Generar el cliente de Prisma
npm run db:generate

# Crear las tablas en PostgreSQL
npm run db:push

# (Opcional) Ver la BD con interfaz gráfica
npm run db:studio
```

### 6. Correr en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

---

## Páginas del Sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Single-page: Hero, Sobre Mí, Servicios, Productos, Testimonios, Contacto |
| `/tienda` | Catálogo de productos con filtros por tipo |
| `/checkout` | Pago con tarjeta local (Azul) o internacional (Stripe) |
| `/checkout/confirmacion` | Página de pago exitoso |

---

## Integración de Pagos

### Azul (República Dominicana)
- Soporta tarjetas VISA, Mastercard y AMEX emitidas en RD
- Ambiente de pruebas: `AZUL_ENVIRONMENT=dev`
- Ambiente de producción: `AZUL_ENVIRONMENT=prod`
- Para obtener credenciales reales: https://www.azul.com.do/soluciones-para-empresas/ecommerce/

### Stripe (Internacional)
- Soporta todas las tarjetas internacionales
- Modo prueba con claves `sk_test_` y `pk_test_`
- Para activar producción: verificar cuenta en https://dashboard.stripe.com

---

## Despliegue en Producción (Vercel)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel --prod
```

En el dashboard de Vercel → Settings → Environment Variables, agrega todas las variables de `.env`.

Para la base de datos en producción, usa:
- **Supabase** (gratuito) → https://supabase.com
- **Railway** → https://railway.app
- **Neon** → https://neon.tech

---

## Paleta de Colores (Marca Francis Dadus)

| Color | Hex | Uso |
|-------|-----|-----|
| Dorado principal | `#C9A84C` | Botones, acentos, headings |
| Dorado claro | `#f2de94` | Fondos sutiles, hover |
| Carbón oscuro | `#1A1A1A` | Fondo hero, navbar, footer |
| Gris texto | `#6B7280` | Textos secundarios |
| Blanco | `#FFFFFF` | Fondos de sección |

---

## Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo (localhost:3000)
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run db:push      # Sincronizar schema con la BD
npm run db:studio    # Abrir Prisma Studio (UI visual de la BD)
npm run lint         # Revisar errores de código
```

---

## Soporte y Próximos Pasos

1. **Registrarse en Azul** → Contactar a Azul.com.do para credenciales de ecommerce
2. **Crear cuenta Stripe** → stripe.com y completar verificación
3. **Configurar dominio** → `francisdadus.com` apuntando a Vercel
4. **Agregar productos reales** → Usar `/api/products` o Prisma Studio
5. **Configurar Gmail** → Activar "Contraseña de aplicación" en la cuenta de Google
6. **Google Analytics** → Agregar el ID en el Layout para tracking

---

*Desarrollado con ♡ para Francis Dadus — Santo Domingo, República Dominicana*
