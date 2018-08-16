# Bowling scoreboard

Link to the assignment: https://github.com/ApsisInternational/Assignment

## System requirements

- Node.js 10x runtime
- yarn

## Building
### API
```sh
cd api
yarn
yarn build
```

### Client
```sh
cd client
yarn
yarn build --prod
```

## Testing
### API
```sh
cd api
yarn
yarn test
```

### Client
```sh
cd client
yarn
yarn test
```

### End to end
Start the backend
```sh
cd api
yarn
yarn build
yarn start
```
Run the tests
```sh
cd client
yarn
yarn e2e
```

## Docker
```sh
docker-compose up
```
