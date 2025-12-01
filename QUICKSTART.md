# Быстрый старт

## Шаг 1: Добавьте контент

### Обязательные файлы для добавления:

1. **Видео производства**
   - Файл: `videos/production.mp4`
   - Формат: MP4, до 20MB

2. **Основные изображения**
   - `images/poster.jpg` - постер для видео (1920x1080)
   - `images/about.jpg` - фото для раздела "О нас" (1200x800)

3. **Фотографии продуктов** (в папке `images/products/`)
   - milk-classic.jpg
   - milk-premium.jpg
   - kefir.jpg
   - yogurt.jpg
   - sour-cream.jpg
   - sour-cream-premium.jpg
   - cottage-cheese.jpg
   - cottage-cheese-soft.jpg

4. **Фотографии для галереи** (в папке `images/gallery/`)
   - production-1.jpg до production-5.jpg
   - products-1.jpg до products-4.jpg
   - retail-1.jpg до retail-3.jpg

**См. инструкции в каждой папке (_README.txt)**

## Шаг 2: Измените контакты

В файлах `index.html`, `assortment.html`, `gallery.html` найдите секцию footer и замените:

```html
<p>Телефон: <a href="tel:+70000000000">+7 (000) 000-00-00</a></p>
<p>Email: <a href="mailto:info@kb-alexandrov.ru">info@kb-alexandrov.ru</a></p>
```

На ваши реальные контакты.

## Шаг 3: Добавьте ссылки на соцсети

В футере найдите `.social-links` и замените `#` на ссылки:

```html
<a href="https://instagram.com/ваш_аккаунт" aria-label="Instagram">
<a href="https://vk.com/ваша_группа" aria-label="VK">
```

## Шаг 4: Запустите сайт

### Вариант A: Через браузер
Откройте `index.html` двойным кликом.

### Вариант B: Локальный сервер (рекомендуется)

**С Node.js:**
```bash
npm install
npm start
```

**С Python:**
```bash
python -m http.server 8000
```

Откройте: http://localhost:8000

## Шаг 5: Проверьте на мобильном

1. Откройте DevTools (F12)
2. Включите режим устройства (Ctrl+Shift+M)
3. Проверьте отображение на разных размерах экрана

## Готово!

Ваш сайт готов к использованию. Для публикации см. раздел "Публикация сайта" в README.md

---

**Нужна помощь?** См. полную документацию в README.md
