const request = require('request')
const cheerio = require('cheerio')
const { writeFileSync } = require('fs')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const DATA = []
const days = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30
]

const parseName = name => {
  const hasComma = name.includes(',')
  const hasParens = name.includes('(')
  if (hasComma) {
    return name.slice(0, name.indexOf(','))
  }
  if (hasParens) {
    return name.slice(0, name.indexOf('(') - 1)
  }
  return name.trim()
}

const getDays = async num => {
  return new Promise((resolve, reject) => {
    request(`https://www.famousbirthdays.com/october${num}.html`, (err, res, html) => {
      const $ = cheerio.load(html)
      $('.face').each((_, elem) => {
        console.log($(elem).children('.info').children('.name').text().trim())
        DATA.push({
          date: `10-${num < 10 ? `0${num}` : num}`,
          image: $(elem)
            .css('background')
            .replace('url(', '')
            .slice(
              0,
              $(elem)
                .css('background')
                .replace('url(', '')
                .indexOf(')')
            ),
          name: parseName(
            $(elem)
              .children('.info')
              .children('.name')
              .text()
              .trim()
          )
        })
        writeFileSync('craped-auto.json', JSON.stringify(DATA), 'utf8')
      })
    })

    resolve()
  })

}

const start = async () => {
  await asyncForEach(days, getDays)
  writeFileSync('craped-auto.json', JSON.stringify(DATA), 'utf8')
}

start()
