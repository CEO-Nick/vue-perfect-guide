# Multi-stage build for Vue.js app
FROM node:16-alpine AS builder

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# Production stage - Nginx로 정적 파일 서빙
FROM nginx:alpine

# 빌드된 파일을 nginx html 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 커스텀 nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]