export const Error = ({error})=>{

    const errMsgs = { // translate error codes to human-friendly messages
        'network-error': 'There was a problem connecting to the network, try again',
        'empty-data':'no facts in our database'
        };

    return (
        <div className="error_message">{errMsgs[error]}</div>
    )
}