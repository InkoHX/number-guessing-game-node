const interface = require('readline').createInterface(process.stdin, process.stdout)
const emitter = new (require('events').EventEmitter)()

const goalInteger = Math.round(Math.random() * 100)
const events = {
  CHECK: 'check',
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  QUESTION: 'question'
}

const parseInteger = integer => {
  const parsedInteger = Number.parseInt(integer)

  if (Number.isInteger(parsedInteger)) return parsedInteger
  else throw new Error('整数を入力してください。')
}

emitter.on(events.QUESTION, () => interface.question('数値を入力してください > ', answer => {
  try {
    emitter.emit(events.CHECK, parseInteger(answer))
  } catch (error) {
    console.warn(error.message)

    emitter.emit(events.QUESTION)
  }
}))

emitter.on(events.CHECK, answer => {
  if (answer === goalInteger) emitter.emit(events.CORRECT, answer)
  else emitter.emit(events.INCORRECT, answer)
})

emitter.on(events.INCORRECT, answer => {
  if (answer > goalInteger) {
    console.log('数値が大きいよ！')

    emitter.emit(events.QUESTION)
  } else {
    console.log('数値が小さいよ！')

    emitter.emit(events.QUESTION)
  }
})

emitter.once(events.CORRECT, answer => {
  console.log(`正解！答えは${answer}でした。`)

  process.exit()
})

emitter.emit(events.QUESTION)
