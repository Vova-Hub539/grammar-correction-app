"use client";

import { useState } from "react";
import "../styles/TextEditor.css";

export default function TextEditor() {
    const [text, setText] = useState("");
    const [correctedText, setCorrectedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheckGrammar = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/grammar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (response.ok) {
                highlightErrors(text, data.correctedText);
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err) {
            setError("Failed to connect to the server");
        }

        setLoading(false);
    };

    // Улучшенный алгоритм подсветки ошибок
    const highlightErrors = (original, corrected) => {
        const originalWords = original.split(/\s+/);
        const correctedWords = corrected.split(/\s+/);
        let highlightedText = [];

        for (let i = 0; i < correctedWords.length; i++) {
            if (originalWords[i] && originalWords[i] !== correctedWords[i]) {
                highlightedText.push(`<span>${correctedWords[i]}</span>`);
            } else {
                highlightedText.push(correctedWords[i]);
            }
        }

        setCorrectedText(highlightedText.join(" "));
    };

    return (
        <div className="text-editor-container">
            <h2>Grammar Checker</h2>
            <textarea
                className="text-editor-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                rows={5}
            />
            <button
                className="text-editor-button"
                onClick={handleCheckGrammar}
                disabled={loading || text.trim() === ""}
            >
                {loading ? "Checking..." : "Check Grammar"}
            </button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            {correctedText && (
                <div className="corrected-text-container">
                    <p><strong>Corrected Text:</strong></p>
                    <p dangerouslySetInnerHTML={{ __html: correctedText }} />
                </div>
            )}
        </div>
    );
}
