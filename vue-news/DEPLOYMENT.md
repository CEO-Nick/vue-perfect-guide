# Vue News 배포 가이드

## 홈서버 디렉토리 구조

```
/home/
├── actions-runner/              # GitHub Self-hosted Runner
│   ├── _work/
│   │   └── vue-news/
│   └── ...
│
└── docker/                      # Docker 프로젝트들
    ├── vue-news/                # 이 프로젝트
    │   ├── Dockerfile
    │   ├── docker-compose.yml
    │   ├── nginx.conf
    │   └── src/
    │
    ├── interview-fe/            # 기존 프로젝트들
    ├── interview-api/
    └── myapp/
```

## 메인 Nginx 설정 (호스트 서버)

메인 Nginx 설정 파일 위치: `/etc/nginx/sites-available/default` 또는 `/etc/nginx/conf.d/default.conf`

```nginx
# vue-news를 위한 서버 블록 추가
server {
    listen 80;
    server_name vue-news.aruu.dev;  # 원하는 도메인으로 변경

    location / {
        proxy_pass http://localhost:3001;  # docker-compose.yml의 포트와 일치
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 기존 서버 블록들
server {
    listen 80;
    server_name interview.aruu.dev;
    location / {
        proxy_pass http://localhost:3000;
        # ... 기존 설정 ...
    }
}

server {
    listen 80;
    server_name interview-api.aruu.dev;
    location / {
        proxy_pass http://localhost:8080;
        # ... 기존 설정 ...
    }
}

server {
    listen 80;
    server_name myapp.aruu.dev;
    location / {
        proxy_pass http://localhost:9000;
        # ... 기존 설정 ...
    }
}
```

Nginx 설정 후:
```bash
sudo nginx -t              # 설정 테스트
sudo systemctl reload nginx  # Nginx 재시작
```

## Cloudflare Tunnel 설정

Cloudflare Zero Trust 대시보드에서 다음 도메인 추가:
- `vue-news.aruu.dev` → `http://localhost:80`

## 배포 프로세스

### 1. 홈서버에 디렉토리 생성
```bash
mkdir -p /home/docker/vue-news
```

### 2. GitHub Self-hosted Runner 설정
이미 설정되어 있다면 스킵

```bash
cd ~/actions-runner
./config.sh --url https://github.com/YOUR_USERNAME/vue-news --token YOUR_TOKEN
sudo ./svc.sh install
sudo ./svc.sh start
```

### 3. 첫 배포
- GitHub에 코드 push
- GitHub Actions가 자동으로 실행됨
- 또는 Actions 탭에서 수동 실행 (workflow_dispatch)

### 4. 배포 확인
```bash
# 컨테이너 상태 확인
docker ps -f name=vue-news

# 로그 확인
docker logs vue-news

# 컨테이너 접속
docker exec -it vue-news sh

# 브라우저에서 확인
# http://vue-news.aruu.dev
```

## 포트 구성 요약

```
외부 → Cloudflare Tunnel → Nginx:80 → 분기:
  ├─ vue-news.aruu.dev → localhost:3001 (Docker 컨테이너)
  ├─ interview.aruu.dev → localhost:3000
  ├─ interview-api.aruu.dev → localhost:8080
  └─ myapp.aruu.dev → localhost:9000
```

## 롤백 방법

```bash
cd /home/docker/vue-news

# 이전 이미지로 롤백
docker images | grep vue-news  # 이미지 ID 확인
docker tag <OLD_IMAGE_ID> vue-news:latest
docker-compose up -d
```

## 트러블슈팅

### 컨테이너가 시작되지 않을 때
```bash
docker logs vue-news
docker-compose down
docker-compose up -d --build
```

### 포트 충돌
```bash
# 포트 사용 확인
sudo netstat -tulpn | grep :3001

# docker-compose.yml에서 다른 포트로 변경
ports:
  - "3002:80"  # 3001 대신 3002 사용
```

### 디스크 공간 부족
```bash
# 사용하지 않는 Docker 리소스 정리
docker system prune -a
```

## 여러 프로젝트 관리

새 프로젝트 추가 시:
1. `/home/docker/new-project/` 디렉토리 생성
2. 동일한 구조로 Dockerfile, docker-compose.yml 생성
3. 다른 포트 사용 (예: 3002, 3003...)
4. 메인 Nginx에 server 블록 추가
5. Cloudflare Tunnel에 도메인 추가