ПРОЕКТ «ВАШ — ИТОГОВОЕ ТЕСТИРОВАНИЕ»

ЧТО ЗАГРУЖАТЬ В GITHUB
Загрузите всю папку vas-test в корень репозитория anaphylaxis-training.

Итоговая структура:
anaphylaxis-training/
  vas-test/
    index.html
    style.css
    script.js
    questions.js
    admin.html
    admin.js
    google-apps-script.gs
    README.txt
    assets/
      logo.svg

ССЫЛКИ ПОСЛЕ ПУБЛИКАЦИИ
Тест:
https://polka134.github.io/anaphylaxis-training/vas-test/

Администратор:
https://polka134.github.io/anaphylaxis-training/vas-test/admin.html

ПОДКЛЮЧЕНИЕ GOOGLE ТАБЛИЦЫ
1. Создайте Google Таблицу.
2. Откройте: Расширения → Apps Script.
3. Удалите исходный код и вставьте содержимое файла google-apps-script.gs.
4. Нажмите «Развернуть» → «Новое развертывание».
5. Тип: Веб-приложение.
6. Выполнять от имени: вы.
7. Доступ: все, у кого есть ссылка.
8. Скопируйте URL веб-приложения.
9. Откройте script.js.
10. Замените строку:
   PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE
   на полученный URL.
11. Сохраните файл и загрузите обновлённый script.js в GitHub.

АДМИН-ПАНЕЛЬ
В Google Таблице выберите:
Файл → Скачать → CSV.
Откройте admin.html и загрузите CSV.
Панель покажет:
- количество участников;
- средний результат;
- среднее время;
- самые сложные вопросы;
- последние результаты.

ВАЖНО
Файл logo.svg является нейтральным текстовым знаком «ГП 134», а не официальным логотипом ДЗМ.
