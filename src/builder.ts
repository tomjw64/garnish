import { TemplateDataCollector } from './template-data-collector.interface'
import { BuilderData } from './builder-data.interface'

export abstract class Builder implements TemplateDataCollector {
  abstract getData(): { [_: string]: BuilderData<any> }

  collect(): {[_: string]: any} {
    const result = {}
    Object.entries(this.getData()).map(([key, data]) => {
      if (!data.isValid()) {
        throw new Error('Data is not valid')
      }
      if (data.value().is_some()) {
        result[key] = data.value().unwrap()
      }
    })
    return result
  }
}
