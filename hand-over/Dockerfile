# syntax=docker/dockerfile:1
#
# Build context must be the project root (one folder up from this Dockerfile),
# because the Docusaurus config in hand-over/ references ../engagement. Build
# from the repo root with:
#
#     docker build -f hand-over/Dockerfile .
#
# The resulting image places the Docusaurus project at /opt/docusaurus and the
# engagement content at /opt/engagement, so `path: "../engagement"` resolves
# inside the container.

# Stage 1: Base image.
FROM node:lts AS base
ENV FORCE_COLOR=0
RUN corepack enable
WORKDIR /opt/docusaurus

# Stage 2: Production build.
FROM base AS prod
WORKDIR /opt/docusaurus
## Docusaurus project.
COPY hand-over/ /opt/docusaurus/
## Engagement content (Docusaurus reads it via ../engagement).
COPY engagement/ /opt/engagement/
## Install dependencies and build.
RUN npm ci
RUN npm run build

# Stage 3: Serve with nginx.
FROM nginx:stable-alpine3.23 AS serve
COPY --from=prod /opt/docusaurus/build /usr/share/nginx/html
COPY --from=prod /opt/docusaurus/default.conf /etc/nginx/conf.d/default.conf
COPY --from=prod /opt/docusaurus/.htpasswd /etc/nginx/.htpasswd
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # Alternative Stage 3: serve via `docusaurus serve`.
# FROM prod AS serve
# EXPOSE 3000
# CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--no-open"]
