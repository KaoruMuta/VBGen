IMAGE=Flask
CONTAINER=vbgen

build:
	docker build -t $(IMAGE) .

ps:
	docker ps -a

image:
	docker images

rm:
	docker rm -f $(CONTAINER)

rmi:
	docker rmi -f $(IMAGE)

up:
	docker compose up

upd:
	docker compose up -d

down:
	docker compose down

stop:
	docker compose stop

start:
	docker compose start

restart:
	docker compose restart