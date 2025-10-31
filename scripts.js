// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  // obtem o valor atual do input e remove os caracteres nao numericos.
  let value = amount.value.replace(/\D/g, "")

  // Transforma o valor em centavos (exemplo: 150/100 = 1.5 que equivalente a R$ 1,50)
  value = Number(value) / 100

  // Atualiza o valor do input.
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  // Formata o valor no padrao BRL (Real Brasileiro).
  value = value.toLocaleString("pt-br", {
    style: "currency",
    currency:"BRL",
  })

  // Retorna o valor formatado.
  return value
}

// Captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
  // Previne o comportamento padrao de recarregar a pagina
  event.preventDefault()

  // Cria um objeto com os detalhes na nova despesa.
  const newExpense = {
    id: new Date() .getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // Chama a function que ira adicionar o item na lista.
  expenseAdd(newExpense)
}

// Adiciona um novo item na lista.
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o icone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src",  `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt",  newExpense.category_name)

    // Cria a info da despesa.
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona nome e categoria na div das informacoes da despesa.
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa.
    const exepenseAmount = document.createElement("span")
    exepenseAmount.classList.add("expense-amount")
    exepenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`

    // Cria o icone de remover.
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alte", "remover")

    // Adiciona as informacoes no item.
    expenseItem.append(expenseIcon, expenseInfo, exepenseAmount, removeIcon)

    // Adiciona o item na lista.
    expenseList.append(expenseItem)

    //Atualiza os totais.
    updateTotals()
  } catch (error) {
    alert("Nao foi Possivel atualizar a lista de despesas.")
    console.log(error)
  }
}

// Atualiza os totais.
function updateTotals() {
  try { 
    // Recupera todos os itens (li) da lista (ul).
    const items = expenseList.children
    
    // Atualiza a quantidade de itens da lista.
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`

    // Variavel para incrementar o total.
    let total = 0

    // Percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      // Remove caracteres nao numericos e substitui a virgula pelo ponto.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace("," , ".")

      // Converte o valor para float.
      value = parseFloat(value)

      // Verifica se e numero valido.
      if(isNaN(value)) {
        return alert (
          "Nao foi possivel calcular o total. O valor nao parece ser um numero."
        )
      }

      // Incrementa o valor total.
      total += Number(value)
    }

    // Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"


    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento.
    expensesTotal.innerHTML = ""

    // Adiciona o simbolo da moeda e o valor total formatado.
    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    console.log(error)
    alert("Nao foi possivel atualizar os totais.")
  }
}


