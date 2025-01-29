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
    const chars = '# Türkçe Harfler
A: \u0041
B: \u0042
C: \u0043
Ç: \u00C7
D: \u0044
E: \u0045
F: \u0046
G: \u0047
Ğ: \u011E
H: \u0048
I: \u0049
İ: \u0130
J: \u004A
K: \u004B
L: \u004C
M: \u004D
N: \u004E
O: \u004F
Ö: \u00D6
P: \u0050
R: \u0052
S: \u0053
Ş: \u015E
T: \u0054
U: \u0055
Ü: \u00DC
V: \u0056
Y: \u0059
Z: \u005A

# Sayılar
0: \u0030
1: \u0031
2: \u0032
3: \u0033
4: \u0034
5: \u0035
6: \u0036
7: \u0037
8: \u0038
9: \u0039

# Özel Karakterler
Boşluk: \u0020
!: \u0021
": \u0022
#: \u0023
$: \u0024
%: \u0025
&: \u0026
': \u0027
(: \u0028
): \u0029
*: \u002A
+: \u002B
,: \u002C
-: \u002D
.: \u002E
/: \u002F
:: \u003A
;: \u003B
<: \u003C
=: \u003D
>: \u003E
?: \u003F
@: \u0040
[: \u005B
\: \u005C
]: \u005D
^: \u005E
_: \u005F
`: \u0060
{: \u007B
|: \u007C
}: \u007D
~: \u007E
 '; // ASCII karakter seti
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
