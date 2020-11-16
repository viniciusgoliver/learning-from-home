## Subindo Ambiente no Docker

```
## POSTGRES ##
docker run -it --rm -d --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 -p 5432:5432 postgres

## MONGODB ##
docker run -it --rm -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 -p 27017:27017 mongo

```