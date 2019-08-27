# Reproduces a bug in Strontium
`npm install`

`docker-compose up -d`

`npm run migrate`

`tsc`

`node .`

Should print out the following `error: column "sometext" does not exist`