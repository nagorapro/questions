/*
  POST - htis is the creation of a new object
*/

// url + question.json
const url = 'https://questions-pro-app-default-rtdb.firebaseio.com/' + 'question.json'

export class Question {
  static create(question) {
    // url + question.json
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-type': 'aplication/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static fetch(token) {
    if (!token) {
      const error = 'You don\'t have a token'
      return Promise.resolve(`<p class="error">${error}</p>`)
    }
    return fetch(url + `?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`
        }
        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage()
    const ansver = 'You didn\'t ask anything'
    const $html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline mt-20">${ansver}</div>`
    const $list = document.querySelector('#list')
    $list.innerHTML = $html
  }

  static listToHtml(questions) {
    return questions.length
      ? `
        <ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>
        `
      : `<p>No questions yet</p>`
  }
}

/*
  LocalStorage
*/

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
    <!-- card -->
    <div class="mui--text-black-54 mt-20">
      ${new Date(question.date).toLocaleDateString()}
      ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
  `
}