document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFileButton = document.getElementById('selectFileButton');

    // Dosya seç butonuna tıklama olayı
    selectFileButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Dosya girişi değiştiğinde
    fileInput.addEventListener('change', handleFile);

    // Sürükle ve bırak olayları
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault();
        dropZone.style.backgroundColor = '#e0e0e0';
    });

    dropZone.addEventListener('dragleave', function() {
        dropZone.style.backgroundColor = '';
    });

    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        dropZone.style.backgroundColor = '';
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    function handleFile(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const asciiArt = imageToAscii(imageData, canvas.width, canvas.height);
                document.getElementById('asciiOutput').textContent = asciiArt;
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function imageToAscii(imageData, width, height) {
        const asciiChars = '@%#*+=-:. ';
        const scale = asciiChars.length / 256;
        let asciiArt = '';

        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = imageData.data[index];
                const g = imageData.data[index + 1];
                const b = imageData.data[index + 2];
                const gray = 0.21 * r + 0.72 * g + 0.07 * b;
                const asciiChar = asciiChars[Math.floor(gray * scale)];
                asciiArt += asciiChar;
            }
            asciiArt += '\n';
        }

        return asciiArt;
    }
});
