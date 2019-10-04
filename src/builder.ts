import lodash from 'lodash'
import { TemplateDataCollector } from './template-data-collector.interface'
import { BuilderData } from './builder-data.interface'

export abstract class Builder implements TemplateDataCollector {
  abstract data: { [_: string]: BuilderData<any> }

  clone(): this {
    const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    clone.data = lodash.cloneDeep(this.data)
    return clone
  }

  collect(options?: {validate?: boolean}): {[_: string]: any} {
    const resolvedOptions = lodash.defaults(options, {
      validate: true
    })

    const result = {}
    Object.entries(this.data).map(([key, builderData]) => {
      if (resolvedOptions.validate && !builderData.isValid()) {
        throw new Error(`Data is not valid: ${JSON.stringify(this.data, null, 2)}`)
      }
      if (builderData.value().is_some()) {
        result[key] = builderData.value().unwrap()
      }
    })
    return result
  }
}
