import "reflect-metadata"
import { Runtime, AggregateLogger, ConsoleLogger, LogLevel, PGStore, TableRepository } from "strontium"
import { PoolConfig } from "pg"

require('dotenv').config()

//hack to print errors in order
let delay = (time: number) => new Promise((res) => setTimeout(res, time))

class LoggingPGStore extends PGStore {
	constructor(connectionOptions: PoolConfig) {
		super(connectionOptions)
	}

	query<R>(queryString: string, parameters: Array<any>): Promise<Array<R>> {
		console.log(queryString)
		return super.query(queryString, parameters)
	}
}

let store = new LoggingPGStore({
  host: process.env.PG_HOST,
  port: 5433,
  user: "postgres",
  password: "password",
  database: "postgres",
  min: 5,
  max: 30
})

class TestRepository extends TableRepository<{ someText: string }, 'someText'> {
  constructor() {
    super(
      store,
			'testTable',
			[ 'someText' ],
			'someText'
		)
	}
}

let runtime = new Runtime([
    new AggregateLogger([
      new ConsoleLogger(LogLevel.DEBUG),
    ]),
    store
])

runtime.startup().then(async () => {
  let testRepository = new TestRepository
  
  console.log("\n\n\n\nWorks, identifier is properly wrapped in double quotes:")
  testRepository.read({}).then(console.log)
  await delay(500)

  console.log("\n\n\n\nFails, query is missing double quotes and PG lowercases the identifier:")
  testRepository.read({
    someText: "abc"
  })
  await delay(500)

  console.log("\n\n\n\nFails, query is missing double quotes and PG lowercases the identifier:")
  testRepository.create({
    someText: "abc"
  })
  await delay(500)

  console.log("\n\n\n\nFails, query is missing double quotes and PG lowercases the identifier:")
  testRepository.update({
    someText: "test"
  }, {
    someText: "abc"
  })
  await delay(500)
})
