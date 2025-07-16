
export default function Button(props) {
    const { children, text } = props;
    const styleButton = {
        width: '100%',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '7px',
        border: 'none',
        padding: '5px',
    }
    return (
        <>
            <button style={styleButton}>{children}</button>
        </>
    )
}
