# Video Crop Preview / Teslim kadrajları

## Türkçe

[Canlı aracı aç](https://omerbek.github.io/video-crop-preview/).

Aynı kompozisyonun yatay, kare ve dikey kesimlerini karşılaştır.

## Çalıştırma

`index.html` dosyasını bir tarayıcıda aç. Oynat düğmesini ve zaman çizelgesini kullanarak sekiz saniyelik sahneyi incele. HTML ve Canvas 2D ile çevrimdışı çalışır.


## MP4 kırpma ve dışa aktarma

Python 3 ve libx264 destekli FFmpeg gerekir. Video merkezden kırpılır, varsa ilk ses kanalı AAC olarak kodlanır. Seçilebilir oranlar 16:9, 1:1 ve 9:16. Hedef dosya zaten varsa üzerine yazılmaz.

```sh
python crop.py input.mp4 vertical.mp4 --ratio 9:16
```

Sekiz saniyelik zaman çizelgesinden bir kare seçip **PNG indir** ile 720 × 405 piksel dışa aktarabilirsin.

## English

Preview three aspect ratios and crop a local video to MP4.

Open [the live tool](https://omerbek.github.io/video-crop-preview/) or open `index.html` in a browser. Switch between Turkish and English in the page header. Use the timeline to select a frame and **Download PNG** to save it at 720 × 405 pixels.

### Command line

Requires Python 3 and FFmpeg with libx264. The tool exports a centered H.264 MP4 in 16:9, 1:1 or 9:16.

```sh
python crop.py input.mp4 vertical.mp4 --ratio 9:16
```
