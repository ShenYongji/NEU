export const Error = ({ErrorMessage})=>{

    const errMsgs = { // translate error codes to human-friendly messages
        'network-error': 'There was a problem connecting to the network, try again',
        'login-required':'Please Log in first',
        'login-invalid-dog': 'Please do not include `dog` in your username',
        'white-space':'Please enter sentence, not just white-space',
        'login-invalid':'Login is invalid, please retry. You can try any names, but do not use whitespace',
        "email-invalid":"Please make sure the format of your email address",
        "phone-invalid":"Phone is not valid format: 1234567890, (123)456-7890,or 123-345-3456"
    };

    return (
        <div className='error'>
            {errMsgs[ErrorMessage]}
        </div>
    )
}