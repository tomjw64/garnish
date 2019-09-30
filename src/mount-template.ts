import { Result as SassResult, types as SassTypes, renderSync } from 'node-sass'
import { Ok, Err, Result } from 'safe-types'
import lodash from 'lodash'
import { TemplateDataCollector } from './template-data-collector.interface'

lodash.templateSettings.interpolate = /"{{([\s\S]+?)}}"/g

const { Null: SassNull } = SassTypes

const sassNullSingleton = (): SassTypes.Null => {
  return SassNull.NULL
}

export function mount(mountOn: string, templateString: string, collector: TemplateDataCollector): Result<string, string> {
  const compiledTemplate = lodash.template(templateString)({
    mount: mountOn,
    data: collector.collect(),
    omit: () => { return 'omit()' }
  })

  try {
    const scssResult: SassResult = renderSync({
      data: compiledTemplate,
      functions: {
        'omit()': sassNullSingleton
      },
      outputStyle: 'nested'
    })
    return Ok(scssResult.css.toString())
  } catch (error) {
    return Err(error.message)
  }
}
