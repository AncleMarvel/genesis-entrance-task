# genesis-entrance-task
TikTok analog project for the selection of frontend developers for the Genesis' frontend-school.

### ТЗ:

 Зараз існує велика кількість мобільних додатків, які рухаються у бік WEBy. Додаток, про який
ви ще не чули, але вам потрібно з ним розібратись і створити сайт-аналог ***TikTuk*** :)

Для цього вже підготовлено АРІ, яке ти можеш без проблем використати для реалізацїї —
https://rapidapi.com/premium-apis-premium-apis-default/api/tiktok33/.
Звичайно, це має гарно виглядати, але для інженера код важливіший. Тому ти можеш
використати готові UI-бібліотеки.
<br><br>
Додаток містить дві сторінки:
<ul>
  <li>стрічка новин (колекція Get Trending Feed);</li> 
  <li>профіль користувача.</li>
</ul>

Детально про сторінки: 
<ul>
    <li>
        В Стрічці новин потрібно відобразити останні 30 постів. Пост містить в собі:
        <ul>
            <li>контент: відео та тест;</li>
            <li>аватарку та імʼя юзера. Клік по аватарці чи імені повинен вести на сторінку юзера;</li>
            <li>хештеги;</li>
            <li>додаткова інформація: кількість коментарів та лайків.</li>
        </ul>
    </li>
    <li>
          Сторінка юзера містить:
          <ul>
              <li>інформацію про юзера (колекція Get User Info);</li>
              <li>список постів (колекція Get User Feed);</li>
              <ul>
                  <li>над відео показувати к-ть переглядів.</li>
              </ul>
          </ul>
      </li>
</ul>

Додаткові завдання:
<ul>
    <li>пости мають пагінацію на клієнті;</li>
    <li>пропрацювати помилки від API (помилка мережі, ...);</li>
    <li>адаптив під мобільну версію;</li>
    <li>анімація завантаження відео;</li>
    <li>автоматичне програвання відео;</li>
    <li>відео можна поставити на паузу;</li>
    <li>покриття тестами.</li>
</ul>
