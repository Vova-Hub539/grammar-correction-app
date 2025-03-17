import Image from "next/image";
import TextEditor from "../components/TextEditor";
import "../styles/TextEditor.css"; 

export default function Home() {
    return (
        <div className="text-editor-container">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
            <h1 className="welcome-text">Grammar Correction App</h1>
            <p className="welcome-text">Welcome! Start typing your text below:</p>
            <TextEditor />
        </div>
    );
}
