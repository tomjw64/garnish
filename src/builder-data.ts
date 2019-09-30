import { Some, None, Option } from 'safe-types'
import { BuilderData } from './builder-data.interface'

type OptionValidationFunction<T> = (_: Option<T>) => boolean

export class OptBuilderData<T> implements BuilderData<T> {
  workingValue: Option<T>
  validate: OptionValidationFunction<T>

  constructor(validateOptional?: OptionValidationFunction<T>) {
    this.workingValue = None()
    this.validate = (validateOptional === undefined)
      ? _ => true
      : validateOptional
  }

  setValue(some: T): this {
    this.workingValue = Some(some)
    return this
  }

  value(): Option<T> {
    return this.workingValue
  }

  isValid(): boolean {
    return this.validate(this.value())
  }
}

export class ReqBuilderData<T> extends OptBuilderData<T> {
  constructor(validate?: OptionValidationFunction<T>) {
    const validateSome: OptionValidationFunction<T> = (option) => option.is_some()
    const validateRequired: OptionValidationFunction<T> = (validate === undefined)
      ? validateSome
      : (option) => validateSome(option) && validate(option)
    super(validateRequired)
  }
}
