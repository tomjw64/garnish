import test from 'ava'
import fs from 'fs'
import { mount } from '../src/mount-template'
import { TemplateDataCollector } from '../src/template-data-collector.interface'

class TestCollector implements TemplateDataCollector {
  collect(): { [_: string]: any } {
    return {
      display: 'none'
    }
  }
}

test('template can be mounted', ava => {
  const result = mount('p', fs.readFileSync('test/fixtures/test-mount.template.scss', 'utf-8'), new TestCollector())
  ava.is(result.unwrap(), 'p > span {\n  display: none; }\n')
})

test('mounting template returns error result when invalid', ava => {
  const result = mount('p', fs.readFileSync('test/fixtures/test-mount-invalid.template.scss', 'utf-8'), new TestCollector())
  ava.is(result.unwrap_err(), 'style declaration must contain a value')
})
