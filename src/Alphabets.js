const Alphabet = () => {
    // Définir l'alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Fonction pour gérer le clic sur une lettre
    const handleClick = (letter) => {
        alert(`Vous avez cliqué sur la lettre: ${letter}`);
    };

    return (
        <div>
            {alphabet.map((letter) => (
                <button key={letter} onClick={() => handleClick(letter)}>
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default Alphabet;