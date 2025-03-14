import TextEditor from "../components/TextEditor";
import "../styles/TextEditor.css"; // Подключаем стили

export default function Home() {
    return (
        <div className="text-editor-container">
            <h1 className="welcome-text">Grammar Correction App</h1>
            <p className="welcome-text">Welcome! Start typing your text below:</p>
            <TextEditor />
        </div>
    );
}
