install:
	npm install

test:
	npm run test

lint:
	npm run lint

run:
	npm start

all: install lint test run