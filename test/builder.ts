import test from 'ava'
import { BuilderData } from '../src/builder-data.interface'
import { OptBuilderData, ReqBuilderData } from '../src/builder-data'
import { Builder } from '../src/builder'

test('OptBuilderData defaults to no data', ava => {
  const optionalData = new OptBuilderData<any>()
  ava.assert(optionalData.value().is_none())
})

test('OptBuilderData having no data is valid', ava => {
  const optionalData = new OptBuilderData<any>()
  ava.assert(optionalData.isValid())
})

test('OptBuilderData having data is valid', ava => {
  const optionalData = new OptBuilderData<string>().setValue('test')
  ava.assert(optionalData.isValid())
  ava.assert(optionalData.value().unwrap() === 'test')
})

test('OptBuilderData can validate data arbitrarily', ava => {
  const optionalData = new OptBuilderData<number>(value => {
    return value.unwrap() > 3
  }).setValue(4)
  ava.is(optionalData.value().unwrap(), 4)
  ava.assert(optionalData.isValid())
})

test('ReqBuilderData defaults to no data', ava => {
  const requiredData = new ReqBuilderData<any>()
  ava.assert(requiredData.value().is_none())
})

test('ReqBuilderData having no data is invalid', ava => {
  const requiredData = new ReqBuilderData<any>()
  ava.assert(!requiredData.isValid())
})

test('ReqBuilderData having data is valid', ava => {
  const requiredData = new ReqBuilderData<string>().setValue('test')
  ava.assert(requiredData.isValid())
  ava.assert(requiredData.value().unwrap() === 'test')
})

test('ReqBuilderData can validate data arbitrarily', ava => {
  const requiredData = new ReqBuilderData<number>(value => {
    return value.unwrap() > 6
  }).setValue(4)
  ava.is(requiredData.value().unwrap(), 4)
  ava.assert(!requiredData.isValid())
})

class TestBuilder extends Builder {
  data = {
    test: new ReqBuilderData<string>()
  }

  getData(): { [_: string]: BuilderData<any> } {
    return this.data
  }

  setTest(value: string): this {
    this.data.test.setValue(value)
    return this
  }
}

test('Builders can collect their data', ava => {
  ava.deepEqual(new TestBuilder()
    .setTest('testing')
    .collect(),
  { test: 'testing' }
  )
})

test('Builders throw an error when their data does not validate', ava => {
  ava.throws(() => new TestBuilder().collect())
})
