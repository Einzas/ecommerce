const loader = () => {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        loader.className += ' loader__hidden';
    });
}

export default loader;