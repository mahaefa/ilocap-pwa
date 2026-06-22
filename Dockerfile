# ─── Stage 1 : dépendances ───────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Copier uniquement les fichiers de lock pour profiter du cache Docker
COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

# ─── Stage 2 : build ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement nécessaires au build (surchargeables via --build-arg)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Next.js collecte des données de télémétrie anonymes — on désactive
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── Stage 3 : runner (image finale, légère) ─────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Port exposé par le conteneur
ENV PORT=3000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copier les artefacts du build (standalone output de Next.js)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
