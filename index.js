document.addEventListener('DOMContentLoaded', function () {
    const inputTextarea = document.getElementById('inputTextarea');
    const copyButton = document.getElementById('copyButton');
    const checkmark = document.getElementById('checkmark');

    inputTextarea.addEventListener('input', async function () {
        copyButton.style.display = 'inline-block';
        checkmark.style.display = 'none';

        const inputTextarea = document.getElementById('inputTextarea');
        const resultTextarea = document.getElementById('resultTextarea');
        resultTextarea.textContent = await sha256(await sha256(inputTextarea.value));

        async function sha256(text) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
    });

    copyButton.addEventListener('click', function () {
        const resultTextarea = document.getElementById('resultTextarea');
        navigator.clipboard.writeText(resultTextarea.value).then(() => {
            copyButton.style.display = 'none';
            checkmark.style.display = 'inline-block';
        });
    });
});