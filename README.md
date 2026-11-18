# Teslim kadrajları

Aynı kompozisyonun yatay, kare ve dikey kesimlerini karşılaştır.

## Çalıştırma

`index.html` dosyasını bir tarayıcıda aç. Oynat düğmesini ve zaman çizelgesini kullanarak sekiz saniyelik sahneyi incele. HTML ve Canvas 2D ile çevrimdışı çalışır.

## İlham kaynağı

Bu bağımsız sahne sentetik su istasyonu örnekleri kullanır. [Kaynak proje](https://github.com/FFmpeg/FFmpeg).

## MP4 kırpma ve dışa aktarma

Python 3 ve libx264 destekli FFmpeg gerekir. Video merkezden kırpılır, varsa ilk ses kanalı AAC olarak kodlanır. Seçilebilir oranlar 16:9, 1:1 ve 9:16. Hedef dosya zaten varsa üzerine yazılmaz.

```sh
python crop.py input.mp4 vertical.mp4 --ratio 9:16
```

Sekiz saniyelik zaman çizelgesinden bir kare seçip **PNG indir** ile 720 × 405 piksel dışa aktarabilirsin.
