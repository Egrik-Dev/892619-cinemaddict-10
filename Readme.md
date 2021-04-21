# Добро пожаловать в Cinemaddict 🎉

Ссылка на проект - https://egrik-dev.github.io/Cinemaddict/

![screenshot](./public/images/screenshot.png)

Приложение для киноманов. С его помощью пользователь сможет прочитать информацию о интересующих его фильмах, оценивать кино, писать и удалять отзывы, составлять различные списки фильмов а также видеть подробную статистику своих кино-предпочтений.

## Функционал магазина 💡

### Главный экран:

- При нажатии кнопки "Show more" показываются очередные 5 фильмов или оставшиеся фильмы, если их количество меньше 5.
- После показа всех карточек с фильмами, кнопка «Show more» пропадает.
- Если фильмы не были получены с сервера, то вместо списка отображается текст: «There are no movies in our database».
- В секции «Top rated movies» и «Most commented» отображаются по 2 карточки с фильмами. В «Top rated movies» — фильмы с самым высоким рейтингом. А в «Most commented» — фильмы с наибольшим количеством комментариев

### Работа с API

- Полный список фильмов приложение получает с удалённого сервера
- При отправке / удалении комментариев приложение взаимодействует с сервером
- Добавление / удаление фильмов из списков "К просмотру", "Избранное" а также "Просмотренные" тоже напрямую взаимодействует с сервером

### Фильтр

- В приложении предусмотрено несколько фильтров:
  - «All movies» — все фильмы;
  - «Watchlist» — фильмы, добавленные в список к просмотру;
  - «History» — просмотренные фильмы;
  - «Favorites» — фильмы, добавленные в избранное.
- Количество фильмов, соответствующих фильтру отображается справа в элементе с фильтром

### Сортировка

- Пользователю доступна возможность сортировки фильмов по дате выхода (клик по ссылке «Sort by date») и рейтингу (клик по ссылке «Sort by rating»). Сортировка работает в одном направлении — от максимального к минимальному: при сортировке по дате выхода в начале списка будут самые новые фильмы, при сортировке по рейтингу — с самым высоким рейтингом.
- Для отмены сортировки и возвращению к исходному порядку пользователь кликает по ссылке «Sort by default».

### Статистика

- Для работы со статистикой используется пакет [chart.js](https://www.chartjs.org)
- Статистика в приложении представлена в виде диаграммы, показывающей количество просмотренных фильмов в разрезе жанров за определённый период.
- Помимо диаграммы, в разделе «Статистика» отображаются:
  - Звание пользователя, если таковое имеется;
  - Общее количество просмотренных пользователем фильмов;
  - Затраченное время на просмотр всех фильмов;
  - Любимый жанр.
- Пользователь может сформировать статистику за несколько предопределенных периодов:
  - All time;
  - Today;
  - Week;
  - Month;
  - Year.

### Карточка о фильме

- Попап содержит расширенную информацию о фильме
- Под кнопками управления отображается блок для оценки фильма пользователем (виден, если пользователь пометил фильм как просмотренный).
- В заголовке «Comments» отображается количество комментариев к фильму. Например: «Comments 8» и сами комментарии.

### Комментарии

- Пользователь может оставить комментарий заполнив текст комментария и выбрав эмоцию
- Введенный пользователем коммент сразу отображается на странице

### Рейтинги

- Пользователь может выставить фильму любую оценку от 1 до 9. Оценка может быть выставлена только для просмотренных фильмов.
- Пользователь может отменить оценку
- Блок «How you feel it» скрывается после успешного выполнения запроса к серверу на снятие пометки «Already watched»

### Offline

- Приложение полностью работоспособно без интернета и сохраняет пользовательский функционал. При появлении интернета все изменения отправляются на сервер.
