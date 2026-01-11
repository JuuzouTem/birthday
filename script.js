const letterText = `Takvime baktığımda 3 yıl geçmiş diyor ama sanki daha dün Furina hakkında sana o ilk mesajı atarken heyecanımdan olan titreyen parmaklarımı hissediyorum. Zamanın nasıl geçtiğini anlayamadığım, saatlerin eriyip gittiği gecelerde kaybolmuşum.

2023 yılında Furina gelmeden önceki yorumla başlamış bir arkadaşlığın 3. yılı olacak, çılgınca öyle değil mi? Yarınlar yokmuşcasına hazırladığım için kendime bir motivasyon kaynağı bulmuş oldum. Bu motivasyonla tebessüm ettiğini düşünerek hazırlamak istedim. Belki mükemmel değil ama her bir parçasına seninle geçirdiğimiz o güzel günlerin neşesini sakladım. Just for you, ruhuna dokunabilsin diye. 

Belki biraz repostlarından kopya çekmiş olabilirim ama hepsini sana bakarak seçtim. İçinde kalmasın diye bir ağaç ev, dışarının soğuğuna karşın içini ısıtsın diye bir sıcak çay, belki cama bakıp müzik eşliğinde düşünürsün diye bir radyo, yalnızlığını gidermen için bir baybaykuş, okudukça düşün diye 9 adet, kitabın arasına saklı notlar, gökyüzüne bakıp görmek istersin diye bir takımyıldızı. Mutlu olman bile mutlu olmam için bir sebep benim için.

Doğum günün; tüm kalpten dileklerinin, isteklerinin gerçekleştiği, başarılar ve nice yeni arkadaşlıklarla dolu bir yaşın başlangıcı olsun, kutlu olsun!!! Hayatın tüm o zorluklarına karşın yine de isteklerine, umutlarına kavuşmak için çabalamaya devam etmen dileğiyle. Seni başarılarınla, başarısızlıklarınla, hedeflerinle, kararlarınla, seni sen yapan her şeyinle, olduğu gibi seviyoruz. Arkadaşın olmaktan zevk alıyoruz. Belki herkes için böyle değilse bile benim için böyle.

Ağlamak istediğinde, gülmek istediğinde, kızmak istediğinde; gizlemeden, saklamadan, belki anlatarak, belki göstererek yaşamak istediklerini yaşamanı istiyorum. Daha bu satırlara sığdırmak istediğim tonlarca söz var ama hepsini bu mektubuma sığdıramam. Belki rüzgarın uğultusuna kulak verirsen dediklerimi duyabilirsin, kim bilir?

Küslükler, tartışmalar, kırgınlıklar girerse bile bana hissettirdiğin arkadaşlığı asla unutmayacağım. Son 3 senede yaşadığın onca şeyin arasında hâlâ daha arkadaşlığını hissettirdiğin için sana edemeyeceğim kadar teşekkür borcum var. Teşekkürler! En kalpten hislerimle teşekkürler!

YKS döneminin stresli aylarından dolayı erteliyorum fakat tüm bu koşuşturmaca bittiğinde aklımdaki planı yapacağım, sözüm olsun! Ancak o zamana kadar senden beklemeni isteyeceğim. Umarım hediyeni beğenmişsindir! Fiziksel olarak veremesem de, kalpten bir hediye... Doğum günün tekrardan kutlu mutlu olsun!!!

Belki Nana'nın Hachi'ye yazdığı kadar büyüleyici bir mektup yazamam ama en azından kalbimin sesini dinlemeyi denediğimi bilmeni isterim :)

Sevgilerle...`;

function checkPassword() {
    const input = document.getElementById('passwordInput').value.trim().toLowerCase();
    const error = document.getElementById('errorMessage');
    const music = document.getElementById('bgMusic');

    if (input === 'masquerade') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('letter-screen').classList.remove('hidden');
        music.loop = true;
        music.volume = 0.4;
        music.play();
        startTypewriter();
    } else {
        error.innerText = "Hmmm, sanki siteye tam bakmamışsın? Tekrar dene :)";
    }
}

function startTypewriter() {
    const element = document.getElementById('typewriter-text');
    const scrollArea = document.getElementById('scroll-area');
    let i = 0;
    const normalSpeed = 50; 
    const pauseSpeed = 500; 

    function type() {
        if (i < letterText.length) {
            const char = letterText.charAt(i);
            element.innerHTML += char;
            
            let currentDelay = normalSpeed;

            if (char === '.' || char === '!' || char === '?') {
                const isOrdinal = i > 0 && /\d/.test(letterText.charAt(i - 1));
                if (!isOrdinal) {
                    currentDelay = pauseSpeed;
                }
            }

            i++;
            scrollArea.scrollTop = scrollArea.scrollHeight;
            setTimeout(type, currentDelay);
        } else {
            // YAZI BİTTİĞİNDE:
            const btn = document.getElementById('downloadBtn');
            btn.style.opacity = "1"; // Butonu görünür yap
        }
    }
    type();
}

// Fotoğraf olarak kaydetme fonksiyonu
function saveAsImage() {
    const letter = document.getElementById('letter-screen');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Fotoğraf çekilirken butonun görünmemesi için geçici olarak gizle
    downloadBtn.style.visibility = 'hidden';

    html2canvas(document.querySelector("#typewriter-text"), {
        backgroundColor: "#ffffff",
        scale: 2, // Yüksek çözünürlük için (2x)
        logging: false,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        onclone: (clonedDoc) => {
            // Klon üzerinde maske efektini kaldır ki fotoğraf düzgün çıksın
            clonedDoc.querySelector("#typewriter-text").style.paddingBottom = "50px";
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'dogum-gunu-mektubu.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // Butonu geri getir
        downloadBtn.style.visibility = 'visible';
    });
}

document.getElementById("passwordInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkPassword();
});