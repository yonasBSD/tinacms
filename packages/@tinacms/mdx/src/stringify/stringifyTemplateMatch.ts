/**

Copyright 2021 Forestry.io Holdings, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import { Template } from '../../../schema-tools/src'
import { replaceAll } from '../parse'

export function stringifyTemplateMatch(
  preprocessedString: string,
  template: Template<false> & { inline?: boolean }
) {
  const match = template.match!
  const regex = !!template.fields.find((t) => t.name == 'text')
    ? `<[\\s]*${template.name}[\\s]*(?:text=(.*?))?[\\s]*>((?:.|\n)*?)<\/[\\s]*${template.name}[\\s]*>`
    : `<[\\s]*${template.name}[\\s]*(.+?)?[\\s]*>[\\s]*((?:.|\n)*?)[\\s]*<\/[\\s]*${template.name}[\\s]*>`

  const replace = template.fields.find((t) => t.name == 'children')
    ? `${match.start} ${match.name || template.name} $1 ${match.end}\n$2\n${
        match.start
      } /${match.name || template.name} ${match.end}`
    : `${match.start} ${match.name || template.name} $1 ${match.end}`
  return replaceAll(preprocessedString, regex, replace)
}
