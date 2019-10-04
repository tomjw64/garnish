import { Builder } from '../../src/builder'
import { ReqBuilderData } from '../../src/builder-data'
import { BuilderData } from '../../src/builder-data.interface'

export class IconCondensedBuilder extends Builder {
  data = {
    iconUrl: new ReqBuilderData<string>(),
    borderColor: new ReqBuilderData<string>(),
    titleFont: new ReqBuilderData<string>()
  }

  getData(): { [_: string]: BuilderData<any> } {
    return this.data
  }

  url(value: string): this {
    this.data.iconUrl.setValue(value)
    return this
  }

  borderColor(value: string): this {
    this.data.borderColor.setValue(value)
    return this
  }

  titleFont(value: string): this {
    this.data.titleFont.setValue(value)
    return this
  }
}
