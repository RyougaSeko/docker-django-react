# docker-django-react

## スタック


Django

- Django v5
- Django Rest Framework
- Django Rest Framework Simple JWT
- PyTest

React

- Create React App
- Node dev server via Docker LTS alpine image
- Hot reload

Postgress

- Docker v16.1 alpine image

Ngnix

- Docker stable alpine
- Serves Django's static and media files as well.  See conf for details.


### Dockerコンテナの立ち上げ

ビルド

```sh

$> docker compose build

```

コンテナ立ち上げ

```sh

$> docker compose up

```

削除

```sh

$> docker compose down

```

### Containers, Services and Ports

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
