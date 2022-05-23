const path = require('path')
const fs = require('fs')
const readline = require('readline')
const FILE_NAME = 'text.txt'
const FILE_PATH = path.join(__dirname, FILE_NAME)
const { stdin: input, stdout: output } = require('process')

const file = fs.createWriteStream(path.join(__dirname, 'text.txt'))
const rl = readline.createInterface({ input, output })

process.on('exit', () => {
  console.log(`\n> File saved: ${FILE_PATH}`)
})

const rrl = () => {
  rl.question(
    '> Hello, please enter text (press CTRL+C or type exit to complete)\n',
    (answer) => {
      if (answer === 'exit') {
        return rl.close()
      }

      file.write(`${answer}\n`)
      rrl()
    },
  )
}
rrl()
