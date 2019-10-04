import { IconCondensedBuilder } from './icon-condensed'
import { mount } from '../src/mount-template'
import fs from 'fs'

const linkToLearning = new IconCondensedBuilder()
  .url('a.png')
  .borderColor('green')
  .titleFont('arial')

const mounted = mount('.link-to-learning', fs.readFileSync('example/icon-condensed/icon-condensed.template.scss', 'utf-8'), linkToLearning)

console.log(mounted.unwrap())