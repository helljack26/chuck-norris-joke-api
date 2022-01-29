const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
        event.preventDefault();
    }
}

export default handleKeyPress;