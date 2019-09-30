import { Option } from 'safe-types'

export interface BuilderData<T> {
  value(): Option<T>
  isValid(): boolean
  setValue(_: T): void
}
