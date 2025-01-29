document.getElementById('convert').addEventListener('click', function() {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Lütfen bir resim yükleyin.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const ascii = convertToASCII(imageData);
            document.getElementById('asciiOutput').textContent = ascii;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function convertToASCII(imageData) {
    const chars = '!'^'^+%&/())=?_QXTIIOKT '; // ASCII karakter seti
    const width = imageData.width;
    const height = imageData.height;
    let ascii = '';

    for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
            const index = (y * width + x) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            const avg = (r + g + b) / 3;
            const charIndex = Math.floor((avg / 255) * (chars.length - 1));
            ascii += chars[charIndex];
        }
        ascii += '\n';
    }
    return ascii;
}
