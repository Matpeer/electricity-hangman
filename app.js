const electricityWords = [
    { word: 'מטען', hint: 'תכונה בסיסית של חלקיקים המשפיעה על כוחות חשמליים', definition: 'כמות החשמל שיש לגוף או לחלקיק' },
    { word: 'זרם', hint: 'תנועה מסודרת של מטענים חשמליים', definition: 'תנועה של מטענים חשמליים דרך מוליך' },
    { word: 'מתח', hint: 'ההפרש בפוטנציאל החשמלי בין שתי נקודות', definition: 'מידת הכוח שדוחף את האלקטרונים במעגל חשמלי' },
    { word: 'התנגדות', hint: 'מידת ההתנגדות של חומר לזרימת חשמל', definition: 'היכולת של חומר להתנגד לזרימת זרם חשמלי' },
    { word: 'קבל', hint: 'רכיב חשמלי המאחסן מטען חשמלי', definition: 'מכשיר המאחסן אנרגיה חשמלית בשדה חשמלי' }
]; 

function HangmanGame() {
    const [wordObj, setWordObj] = React.useState({});
    const [guessedLetters, setGuessedLetters] = React.useState([]);
    const [remainingGuesses, setRemainingGuesses] = React.useState(6);
    const [input, setInput] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [showHint, setShowHint] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [showDefinition, setShowDefinition] = React.useState(false); 

    React.useEffect(() => {
        resetGame();
    }, []); 

    const resetGame = () => {
        setWordObj(electricityWords[Math.floor(Math.random() * electricityWords.length)]);
        setGuessedLetters([]);
        setRemainingGuesses(6);
        setMessage('');
        setShowHint(false);
        setShowDefinition(false);
        setInput('');
    }; 

    const guessLetter = () => {
        if (input.length !== 1) {
            setMessage('נא להזין אות אחת בלבד');
            return;
        } 

        const letter = input.toLowerCase();
        if (guessedLetters.includes(letter)) {
            setMessage('כבר ניחשת את האות הזו');
            return;
        } 

        setGuessedLetters([...guessedLetters, letter]);
        setInput(''); 

        if (!wordObj.word.includes(letter)) {
            setRemainingGuesses(remainingGuesses - 1);
            if (remainingGuesses - 1 === 0) {
                setMessage(`הפסדת! המילה הייתה: ${wordObj.word}`);
                setShowDefinition(true);
            }
        } else if (wordObj.word.split('').every(char => guessedLetters.includes(char) || char === letter)) {
            const newScore = score + (remainingGuesses * 10) + (showHint ? 0 : 20);
            setScore(newScore);
            setMessage(`ניצחת! כל הכבוד! הניקוד שלך: ${newScore}`);
            setShowDefinition(true);
        }
    }; 

    const displayWord = wordObj.word ? wordObj.word.split('').map(char => 
        guessedLetters.includes(char) ? char : '_'
    ).join(' ') : ''; 

    return (
        <div className="game-container">
            <h1>איש תלוי: מושגי חשמל</h1>
            <div className="word">{displayWord}</div>
            <div>ניחושים נותרו: {remainingGuesses}</div>
            <div>ניקוד: {score}</div>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1}
            />
            <button onClick={guessLetter}>נחש</button>
            {!showHint && <button onClick={() => setShowHint(true)}>הצג רמז</button>}
            {showHint && <div className="hint">{wordObj.hint}</div>}
            <div className="message">{message}</div>
            {showDefinition && (
                <div className="definition">
                    <h3>הסבר על המושג</h3>
                    <p>{wordObj.definition}</p>
                </div>
            )}
            {(showDefinition || remainingGuesses === 0) && (
                <button onClick={resetGame}>משחק חדש</button>
            )}
        </div>
    );
} 

ReactDOM.render(<HangmanGame />, document.getElementById('root'));
```