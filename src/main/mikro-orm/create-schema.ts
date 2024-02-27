import { MikroORM } from '@mikro-orm/core'
import { UserEntity } from '../../modules/user/infra/repository/user-entity'
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

(async () => {
  const orm = await MikroORM.init({
    entities: [UserEntity],
    dbName: 'nest',
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    driver: PostgreSqlDriver
  })
  const generator = orm.schema

  const dropDump = await generator.getDropSchemaSQL()

  console.log(dropDump)

  const createDump = await generator.getCreateSchemaSQL()

  console.log(createDump)

  const updateDump = await generator.getUpdateSchemaSQL()

  console.log(updateDump)

  // there is also `generate()` method that returns drop + create queries
  // const dropAndCreateDump = await generator.generate()

  // console.log(dropAndCreateDump)

  // or you can run those queries directly, but be sure to check them first!
  await generator.dropSchema()
  await generator.createSchema()
  await generator.updateSchema()

  // in tests it can be handy to use those:
  await generator.refreshDatabase() // ensure db exists and is fresh
  await generator.clearDatabase() // removes all data

  await orm.close(true)
})().catch(console.error)
