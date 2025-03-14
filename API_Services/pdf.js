const PDF_URL = "http://127.0.0.1:5005/generate-pdf-from-html";

export const downloadScriptPDF = async (script) => {
    console.log("Talking to PDF microservice: Requesting PDF generation for a single script.");
    const htmlContent = `
        <h1>My Script</h1>
        <h3>Phrase: ${script.phrase}</h3>
        <p><strong>Mode:</strong> ${script.mode}</p>
        <p><strong>Communication Intent:</strong> ${script.intent}</p>
        <p><strong>Notes:</strong> ${script.notes}</p>`;

    try {
        const response = await fetch(PDF_URL, {
            method: "POST",
            headers: { "Content-Type": "text/html" },
            body: htmlContent,
        });

        if (!response.ok) throw new Error("Failed to generate PDF");

        // CITATION: 
        // Adapted from URL: https://medium.com/@sureshraamakrishnan/handling-different-types-of-data-from-backend-in-javascript-for-file-downloads-53fecedcec3e
        // Author: Suresh Ramakrishnan
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${script.phrase.replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF");
    }
};


export const downloadAllScriptsPDF = async (scripts) => {
    console.log("Talking to PDF microservice: Requesting PDF generation for multiple scripts.");

    const htmlContent = scripts.map(script =>
        `<br>
        <h3>Phrase: ${script.phrase}</h3>
        <p><strong>Mode:</strong> ${script.mode}</p>
        <p><strong>Communication Intent:</strong> ${script.intent}</p>
        <br>`).join("");

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    try {
        const response = await fetch(PDF_URL, {
            method: "POST",
            headers: { "Content-Type": "text/html" },
            body: htmlContent
        });

        if (!response.ok) throw new Error("Failed to generate PDF");

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${timestamp}_All_Scripts.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF");
    }
};
