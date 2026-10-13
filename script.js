// seleciona os elementos do formulário 
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

// seleciona os elementos da lista
const expenseList = document.querySelector('ul')
const expensesTotal = document.querySelector('aside header h2')
const expensesQuantity = document.querySelector('aside header p span')

// captura o evento de input para formatar o valor
amount.oninput = () => {
    // obtém o valor atual do input e remove caracteres não numéricos 
    let value = amount.value.replace(/\D/g, '')

    // transforma o valor em centavos (ex: 150/100 = 1.5 equivale a R$ 1,50)
    value = Number(value) / 100

    // atualiza valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // formata o valor no padrão BRL (real brasileiro).
    value = value.toLocaleString("pt-BR", {
        style: 'currency',
        currency: 'BRL',
    })

    // retorna o valor formatado
    return value
}

// captura o evento de submit do form para obter valores
form.onsubmit = (event) => {
    // previne o comportamento padrão de recarregar a página
    event.preventDefault()

    // cria um obj com os detalhes na nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }
    // chama a função que irá adicionar o item na lista.
    expenseAdd(newExpense)
}

// adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        //cria os elementos de li para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        // cria o ícone da categoria
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        // cria o info da despesa
        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')

        // cria o nome da despesa
        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense

        // cria a categoria da despesa
        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        // adiciona nome e categoria na div de informação da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // cria o valor da despesa
        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$<small>${newExpense.amount.toUpperCase().replace('R$', '')}`

        // cria o ícone de remover
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-icon')
        removeIcon.setAttribute('src', 'img/remove.svg')
        removeIcon.setAttribute('alt', 'remover')

        // adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // adiciona o item na lista
        expenseList.append(expenseItem)

        // limpa o formulário
        formClear()

        // adiciona os totais
        updateTotals()

    } catch (error) {
        alert('Não foi possível atualizar a lista de despesas.')
        console.log(error);
    }
}

// atualizar os totais.
function updateTotals() {
    try {
        // recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        // att a quantidade de itens na lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`

        // variável para incrementar o total 
        let total = 0

        // percorre cada item (li) na lista (UL)
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount');

            // remove caracteres não numéricos  e substitui a vírgula pelo ponto.
            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.')

            // converte o valor para float.
            value = parseFloat(value)
        
            // verifica se é um número válido
            if (isNaN(value)) {
                return alert('Não foi possível calcular o total. O valor informado não é um número.')
            }

            // incrementar valor total
            total += Number(value)
        }
        // criar span para adicionar o R$ formatado
        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        total = formatCurrencyBRL(total).toUpperCase().replace('R$', '')

        // Limpa o conteúdo do elemento.
        expensesTotal.innerHTML = ''

        // add o simbolo da moeda e o valor total formatado.
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
      console.log(error);
      alert('Não foi possível atualizar os totais.')  
    }
}

// evento que captura o clique nos itens da lista.
expenseList.addEventListener('click', function (event) {
    // verifica se o elemento clicado é o ícone de remover.
    if (event.target.classList.contains('remove-icon')) {
        // obtém a li pai do elemento clicado.
        const item = event.target.closest('.expense')
        // remove item
        item.remove()
    }

    // atualiza os totais
    updateTotals()
})

// Função para limpar os inputs
function formClear() {
    expense.value = ''
    category.value = ''
    amount.value = ''

    // coloca o cursor novamente no campo "nome da despesa" (amount).
    expense.focus()
}
