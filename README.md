# docker-django-react


## Dockerコンテナの立ち上げ

### コンテナビルド・立ち上げ

```sh

$> docker compose up --build

```

### コンテナ削除

```sh

$> docker compose down

```

### コンテナと対応するポート

| Container  | Service | Host Port | Docker Port |
| ---------- | ------- | --------- | ----------- |
| dev-django | django  | 8001      | 8000        |
| dev-react  | react   | 3000      | 3000        |
| dev-db     | db      | 5432      | 5432        |
| dev-nginx  | nginx   | 8080      | 80          |


## DBの作成・更新

### migration
```sh

$> docker-compose exec django python manage.py makemigrations

```

### migrate
```sh

$> docker-compose exec django python manage.py migrate

```

## DBの確認

### Django admin用アカウントの作成
```sh

$> docker-compose exec django python manage.py createsuperuser

```

ターミナルでUsername等を設定

例：  
Username: test  
Email address: test@gmail.com  
Password: test_password  

### adminとしてログイン
http://localhost:8001/admin

例：  
Username: test  
Password: test_password  

### 各テーブルが確認できればOK

<img width="779" alt="スクリーンショット 2024-06-17 15 54 57" src="https://github.com/RyougaSeko/docker-django-react/assets/26045410/821c42f8-6499-42fe-ba73-60cb404b902c">

## スタック


### Django

- Django v5
- Django Rest Framework
- Django Rest Framework Simple JWT
- PyTest

### React

- Create React App
- Node dev server via Docker LTS alpine image
- Hot reload

### Postgress

- Docker v16.1 alpine image

### Ngnix

- Docker stable alpine
- Serves Django's static and media files as well.  See conf for details.

## API

### API定義を確認
http://localhost:8001/api/
