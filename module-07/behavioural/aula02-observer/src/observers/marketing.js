export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o [update] é responsável por gerenciar seus próprios erros/exceptions
    // logicamente, no [notify] não se deve ter `await`, porque sua responsabilidade é só emitir eventos ("broadcast")
    console.log(`[${id}]: [marketing] will send a thanking note to [${userName}]`)
  }
}
