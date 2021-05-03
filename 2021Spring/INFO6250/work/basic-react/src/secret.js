//const secret_word = 'REACT'


function compareword(guess){

    const secret_word = 'REACT'
    let matches = [false,0]
    const letterCount ={}


    if(guess.trim().toUpperCase() === secret_word.trim().toUpperCase()){
        console.log("The word is same")
        matches[0]=true
    }

    for (let letter of secret_word.trim().toUpperCase()){
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for (let letter of guess.toUpperCase()){
        if(letterCount[letter]){
            letterCount[letter] -=1;
            matches[1] +=1;
        }
    }
    return matches;
}

export default compareword;

// compareword('REACT',"react")
// compareword('REACT',"reacc")
// compareword('tee',"bee")