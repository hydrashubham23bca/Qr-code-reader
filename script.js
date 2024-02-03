const videoElement = document.getElementById('camera-preview');
const resultContainer = document.getElementById('result-container');

function startScanner() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
            const codeReader = new ZXing.BrowserQRCodeReader();
            codeReader
                .decodeOnceFromStream(stream, 'video')
                .then((result) => {
                    resultContainer.textContent = `QR Code Result: ${result.text}`;
                })
                .catch((err) => {
                    console.error(err);
                    resultContainer.textContent = 'Error scanning QR Code';
                });
        })
        .catch((err) => {
            console.error(err);
            resultContainer.textContent = 'Error accessing camera';
        });
}

document.onload = startScanner();
