# Paradoks Odası: yayına alma

Sunucu sadece Node.js ister (18 veya üstü), ek paket yok.

## Bilgisayarda deneme
1. `node server.js`
2. Tarayıcıda `http://localhost:3000/?k=paradoks` aç (sunucu ekranı, projektöre bu gelir).
3. Telefon aynı Wi-Fi'deyse `http://BILGISAYAR-IP:3000` adresini aç (oyuncu ekranı).

## İnternette yayınlama (Render, ücretsiz)
1. Bu klasörü bir GitHub deposuna yükle.
2. render.com → New → Web Service → depoyu seç.
3. Build Command boş, Start Command: `node server.js`
4. Environment: `HOSTKEY` = kendi gizli anahtarın (örn. `melek-2026`).
5. Yayın adresi `https://ADIN.onrender.com` olur.

## Ders günü
- Projektörde sunucu adresini aç: `https://ADIN.onrender.com/?k=ANAHTARIN` (anahtarı kimseyle paylaşma).
- Başlangıç ekranındaki QR kodu oyuncular okutur ve takımını seçer.
- Ücretsiz Render uykuya geçer: dersten 5 dakika önce adresi bir kez aç.
- Takım kararı, takım üyelerinin oylarının çoğunluğudur. Sunucu ekranındaki butonlarla elle de düzeltebilirsin.
- Tur 2 puanlarını (Uzak / Yakın / Tam isabet) sen verirsin.
