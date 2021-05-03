import compareword from './secret'

function rendermessage(guess){
    let message
    let type
    if(guess){
      const loc_guess = guess.trim()
      if(loc_guess.length !== 5){
        message =  `"${loc_guess}" was not a valid word`
        type = 'warning'
        if(loc_guess.length === 0){
            message =  `Please use non-whitespace English word`
        }
      }
      else{
        let match = compareword(loc_guess)
        if(match[0]){
          message = `"${loc_guess}" is the secret word!`
          type = 'success'
        }
        else{
          message = `"${loc_guess}" had ${match[1]} letters in common`
          type = 'info'
        }
      }
    }

    return {type,message}
}

export default rendermessage;