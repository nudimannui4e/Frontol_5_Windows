function init()
{
 frontol.addEventListener("openDocument", "afterOpenDocument", false);
 frontol.addEventListener("closeDocument", "beforeCloseDocument", true);
}
//Проверка на открытый чек
function afterOpenDocument()
{
         if (frontol.currentDocument.type.code == 1)
         {
          frontol.addEventListener("addPosition", "beforeAddPosition", true);
         }
}


function beforeAddPosition(position)
{
flag = false;
         //Тип номенклатуры 1 - алкоголь
         if (position.ware.type == 1)
            {
            flag = true;
            }

         if (flag)
            {
            //Ввод и проверка возраста, отлов ошибок ввода                                             
            do
              {
                 inputError = false;
                 inputText = frontol.actions.inputString("Введите дату рождения", "ДД.ММ.ГГГГ", 10);
                 defaultText = inputText;
                 if (inputText == "")
                    {
                        inputError = true;
                        defaultText = "";
                        frontol.actions.showMessage("Вы не ввели значение!", Icon.Exclamation);
                    }

                 if (inputText == null)
                 {
                  frontol.actions.cancel ();
                 }

                 else
                 {
                     inputText = inputText.replace(/\,/, ".");
                     if ((isNaN(inputText.substring (0, 2)) || (Number (inputText.substring (0, 2)) > 31)) || (isNaN(inputText.substring (3, 5)) || (Number (inputText.substring (3, 5)) > 12)) || isNaN(inputText.substring (6)) || inputText.length != 10)
                     {
                        inputError = true;
                        frontol.actions.showMessage("Введены некорректные данные!", Icon.Error);
                     }
                 }
              }
  while (inputError);
  // Обработка возраста (срезы)            
  year = Number (inputText.substring (6)) + 18;
  month = Number (inputText.substring (3, 5)) - 1;
  day = inputText.substring (0, 2);

  birthDay = new Date (year, month, day)

  if (birthDay > new Date ())
   frontol.actions.showError ("Покупателю меньше 18 лет!!!");
               } // Конец If
} // Конец функции - beforeAddPosition

function beforeCloseDocument()
{
   if (frontol.currentDocument.sum >= 500.00) {
      frontol.actions.showError ("Предложите подарок!");
   }
closeDocument()
}
