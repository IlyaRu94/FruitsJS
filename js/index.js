// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minweight = document.querySelector('.minweight__input');
const maxweight = document.querySelector('.maxweight__input');
 
// список фруктов в JSON формате
fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

const сolorFruits = ['синий','голубой','зеленый','желтый','оранжевый','светло-коричневый','красный','розово-красный','фиолетовый'];//массив цветов
const сolorEng = ['blue','lightblue','green','yellow','orange','lightbrown','red','carmazin','violet'];//массив иностранных цветов с точным порядком, как в массиве сolorFruits
// объединяем информацию и формируем 1 общий массив объектов
const сolorFruitsMap = сolorFruits.map((color, index) => ({
  color,
  сolorEng: сolorEng[index]
}));

//создадим выпадающий список с цветами, для этого с помощью forEach переберем объединенный массив цветов
сolorFruitsMap.forEach((name) => {
colorInput.innerHTML += `<option class="fruit_${name.сolorEng}" value="${name.color}">${name.color}</option>`;
});

function fruitsParseJson(){//функция сброса значений на дефолтные
// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

for(i=0; fruits.length > i; i++ ) {
fruits[i] = { ...fruits[i], 'index': i};//Сохраним индексы элементов в массив, так будет проще смотреть сортировку
}
return fruits;
}
fruits = fruitsParseJson();// вызов функции с дефолтными значениями при инициализации страницы
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML ='';// очистили от всего список

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    let newElementLi= document.createElement("li");//метод не очень удобен, каждому тегу нужно отдельно прописывать его.
    findColorEng=сolorFruitsMap.find(item => item.color == fruits[i].color).сolorEng;//с помощью find ищем иностранное написание цвета фрукта
    newElementLi.className = `fruit__item fruit_${findColorEng}`;// добавим 2 класса к li
    newElementDiv= document.createElement("div");//добавляем div
    newElementDiv.className = "fruit__info";// div-у добавляем класс
    for (var key in fruits[i]) {//пробежимся по элементам массива и каждое ключ/значение впишем в отдельный div
      newElementDiv.innerHTML += `<div>${key}: ${fruits[i][key]}</div>`;
    }
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    newElementLi.appendChild(newElementDiv);//Вложим div в li
    fruitsList.appendChild(newElementLi);//запишем получившееся на страницу в ul
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let keyFruits
  oldFruits = Array.from(fruits);//клонировали массив, чтобы его в будущем сравнить с новым

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {

    keyFruits = getRandomInt(0,fruits.length - 1);// генерируем случайный ключ. Мин число 0, макс число = кол-во элементов -1 (т.к отсчет элементов идет с 0)
    result.push(fruits[keyFruits]);//добавляем случайный элемент из fruits в конец result
    fruits.splice(keyFruits, 1,);//вырезаем из fruits элемент ранее добавленный в result
  }

  fruits = result;//присваиваем полученный массив fruits

  function isEqual(a, b)//функция сравнения 2х массивов
{
    if (a instanceof Array && b instanceof Array)
    {
        for (var i = 0; i < a.length; i++)
        {
            if (!isEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    return a === b;
}
 
var isEqual = isEqual(fruits, oldFruits);
isEqual ? alert('Фрукты не перемешались, попробуйте еще раз') : '';

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
 return fruits.filter((item) => {//возвращаем отфильтрованное
    // TODO: допишите функцию

if((minweight.value || 0) <= item.weight && item.weight <= (maxweight.value || 999999) ){//берем значение c поля, в случае пустоты ставим дефолтные значения 0 и 999999
  return item;
}

  });
};

filterButton.addEventListener('click', () => {
  fruits = fruitsParseJson();//вернем в переменную элементы по умолчанию из fruitsJSON
fruits = filterFruits();// отфильтруем значения
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {//сортировка по цвету 
  // TODO: допишите функцию сравнения двух элементов по цвету
  const colorFruitsA = сolorFruits.indexOf(a.color);
  const colorFruitsB = сolorFruits.indexOf(b.color);
  return colorFruitsA > colorFruitsB;

};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком


    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparation(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    }                    


  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки

// функция обмена элементов
function swap(arr, firstIndex, secondIndex){
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

  // функция разделитель
  function partition(arr,  left, right) {
    let pivot = arr[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (comparation (pivot, arr[i])) {
            i++;
        }
        while (comparation (arr[j], pivot)) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
  }

// алгоритм быстрой сортировки
function quickSortColor(arr, comparation, left, right) {
  var index;
  if (arr.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? arr.length - 1 : right;
      index = partition(arr,  left, right);
      if (left < index - 1) {
        quickSortColor(arr, comparation, left, index - 1);
      }
      if (index < right) {
        quickSortColor(arr, comparation, index, right);
      }
  }
 return arr; 
}
return  quickSortColor(arr, comparation)
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = (sortKind==='bubbleSort')? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput


  if((colorInput.value == "") || (kindInput.value == "") || (weightInput.value == "")){//выдаем ошибку, если кто-то кликнул по кнопке с пустыми полями
    alert("Фрукт не добавлен, введены не все значения");
  }else {
  let newFruits = {"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value};//сформируем объект для добавления
    newFruitsJson=JSON.parse(fruitsJSON);// спарсим значение JSON
    newFruitsJson.push(newFruits);// добавим в массив от JSON новый фрукт
    fruitsJSON = JSON.stringify(newFruitsJson);// преобразуем вновь в json байл
  fruits = fruitsParseJson();// перезапустим функцию парсинга но уже с новыми значениями json и пройдем всен круги ада вновь
  display();// выведем на экран
  colorInput.value = kindInput.value = weightInput.value = "";// очистим поля ввода...
  };  

});
