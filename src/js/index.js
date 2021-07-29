import '../scss/main.scss'
import {Question} from './Question'
import {authWithEmailAndPassword, getAuthForm} from './auth'
import {createModal, isValid} from './utills'

const $form = document.querySelector('#form')
const $input = $form.querySelector('#question-input')
const $submitBtn = $form.querySelector('#submit')
const $modalBtn = document.querySelector('#btn-modal')

window.addEventListener('load', Question.renderList)
$form.addEventListener('submit', submitFormHandler)
$modalBtn.addEventListener('click', openModal)
$input.addEventListener('input', () => {
  $submitBtn.disabled = !isValid($input.value)
})

function submitFormHandler(event) {
  event.preventDefault()

  if (isValid($input.value)) {
    // create a question
    const question = {
      text: $input.value.trim(),
      date: new Date().toJSON()
    }
    $submitBtn.disabled = true

    // async request to server to save question
    Question.create(question).then(() => {
      $input.value = ''
      $input.className = ''
      $submitBtn.disabled = false
    })
    // console.log('Question:', question)
  }
}

function openModal() {
  createModal('Authorization', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
  event.preventDefault()
  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value
  btn.disabled = true
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
  // console.log('content:', content)
  if (typeof content === 'string') {
    createModal('Error', content)
  } else {
    createModal('The list of questions', Question.listToHtml(content))
  }
}