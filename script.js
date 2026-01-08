const letterText = `Dile kolay 3 yıl, ne çabuk geçmiş öyle değil mi?

2023 yılında Furina gelmeden önceki yorumla başlamış bir arkadaşlığın 3. yılı olacak. Umarım hazırladığım bu hediyeyi beğenmişsindir. Hediye belki gözünde basit veya uğraşılmamış gözüküyorsa bile (2 dakika falan sürdü dersen döverim he jjsdakjfhasdlkj) harcadığım her bir günden zevk aldım. :)

Doğum günün; tüm kalpten dileklerinin, isteklerinin gerçekleştiği, başarılar ve nice yeni arkadaşlıklarla dolu bir yaşın başlangıcı olsun, kutlu olsun!!! Hayatın tüm o zorluklarına karşın yine de isteklerine, umutlarına kavuşmak için çabalamaya devam etmen dileğiyle. Seni başarılarınla, başarısızlıklarınla, hedeflerinle, kararlarınla, seni sen yapan her şeyinle, olduğu gibi seviyoruz. Arkadaşın olmaktan zevk alıyoruz. Belki herkes için böyle değilse bile benim için böyle.

Ağlamak istediğinde, gülmek istediğinde, kızmak istediğinde; gizlemeden, saklamadan, belki anlatarak, belki göstererek yaşamak istediklerini yaşamanı istiyorum. Daha bu satırlara sığdırmak istediğim tonlarca söz var ama hepsini bu mektubuma sığdıramam. Belki rüzgarın uğultusuna kulak verirsen dediklerimi duyabilirsin, kim bilir?

Küslükler, tartışmalar, kırgınlıklar girerse bile bana hissettirdiğin arkadaşlığı asla unutmayacağım. Son 3 senede yaşadığın onca şeyin arasında hâlâ daha arkadaşlığını hissettirdiğin için sana edemeyeceğim kadar teşekkür borcum var. Teşekkürler! En kalpten hislerimle teşekkürler!

YKS döneminin stresli aylarından dolayı erteliyorum fakat YKS sonuçları açıklanıp rahata erdiğimizde aklımdaki planı yapacağım, sözüm olsun! Ancak o zamana kadar senden beklemeni isteyeceğim. Umarım hediyeni beğenmişsindir! Fiziksel olarak veremesem de, kalpten bir hediye... Doğum günün tekrardan kutlu mutlu olsun!!!

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
    const normalSpeed = 50;  // Normal yazma hızı
    const pauseSpeed = 500;  // Cümle sonu bekleme süresi (ms)

    function type() {
        if (i < letterText.length) {
            const char = letterText.charAt(i);
            element.innerHTML += char;
            
            let currentDelay = normalSpeed;

            // Bekleme mantığı:
            // Eğer karakter . ! veya ? ise;
            if (char === '.' || char === '!' || char === '?') {
                // Bir önceki karakterin sayı olup olmadığını kontrol et (3. 18. gibi durumlar için)
                // i > 0 kontrolü hata almamak için, /\d/ ise rakam kontrolü yapar
                const isOrdinal = i > 0 && /\d/.test(letterText.charAt(i - 1));
                
                if (!isOrdinal) {
                    currentDelay = pauseSpeed; // Cümle sonu ise uzun bekle
                }
            }

            i++;
            
            // Otomatik kaydırma
            scrollArea.scrollTop = scrollArea.scrollHeight;
            
            // Belirlenen delay ile bir sonraki harfe geç
            setTimeout(type, currentDelay);
        }
    }
    type();
}

document.getElementById("passwordInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkPassword();
});