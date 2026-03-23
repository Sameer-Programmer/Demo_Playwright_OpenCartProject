/* 

Here we are going write Two functions 
1-one function to read Data from json file 
2-one Function to read Data from CSV


| Part     | Meaning                        |
| -------- | ------------------------------ |
| `import` | bring something into your file |
| `fs`     | file system module             |
| `'fs'`   | Node.js built-in module        |

fs helps your code talk to files on your computer

fs.readFileSync gives you the text of the file.

what is the need of JSON.parse?
JSON.parse turns your file's plain text into a real Javascript Object so your code can read its values.

what is the need of utf-8? 
'utf-8' translates raw computer bytes into readable text so JSON.parse can understand it.
*/

import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {

  static getTestDatafromJson(filePath: string) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return data
  }

  static getTestDatafromCSV(filePath: string) {
    let data = parse(fs.readFileSync(filePath),
    {
      columns:true,
      skip_empty_lines:true
      
    })
    return data
  }



}