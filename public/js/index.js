var balanceView = (function(){

    var Income = function(id,description,amount){
        this.id = id 
        this.description = description
        this.amount = amount
    }

    var Expenses = function(id,description,amount){
        this.id = id 
        this.description = description
        this.amount = amount
    }

    var storedData = {
        allEntry:{
            income: [],
            expenses: []
        },
        allAvailable: {
            income: 0,
            expenses:0
        }
    }

    return {
        addData: function(tType,descr,val) {
             var newData 
             var ID 
             if(storedData.allEntry[tType].length > 0){
                 ID = storedData.allEntry[tType][storedData.allEntry[tType].length - 1].id + 1
             }else{
                 ID = 0
             }
             if(tType === "expenses"){
                newData = new Expenses(ID, descr, val)
             }else if(tType === "income"){
                 newData = new Income(ID, descr , val)
             }

             storedData.allEntry[tType].push(newData)
             return newData
        },
        test:function(){
            console.log(storedData)
        }
    }
})()


var designView = (function(){
    var classlinks = {
        transaction:".transaction-type",
        description:".add-description",
        amount:".add-amount",
        button:".add-button",
        incomeRoom:".income-div",
        expenseRoom:".expense-div"
    }

    return{
        userInput: function(){
            return {
                transaction_type:document.querySelector(classlinks.transaction).value,
                description:document.querySelector(classlinks.description).value,
                amount:document.querySelector(classlinks.amount).value
            }
        },

        addData: function(obj, transaction_type){
            var ourHTML,ourNewHTML,element,htmlObject
            if(transaction_type === "income"){
                element = classlinks.incomeRoom
                ourHTML = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-success">Income</h4><div class="income-table" id="%id%"><div class="detail-container"><span class="my-description">%description%</span> <span class="my-amount">%amount%</span></div></div></div><div class="col-6"><h4 class="text-danger">Expenses</h4><div class="expenses-table"><div class="detail-container"><span class="my-description"></span> <span class="my-amount"></span></div></div></div></div></div></section>'
            } else if (transaction_type === "expenses"){
                element = classlinks.expenseRoom
                ourHTML = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-success">Income</h4><div class="income-table" ><div class="detail-container"><span class="my-description"></span> <span class="my-amount"></span></div></div></div><div class="col-6"><h4 class="text-danger">Expenses</h4><div class="expenses-table" id="%id%"><div class="detail-container"><span class="my-description">%description%</span> <span class="my-amount">%amount%</span></div></div></div></div></div></section>'
            }

            ourNewHTML = ourHTML.replace("%id%",obj.id)
            ourNewHTML = ourNewHTML.replace("%description%",obj.description)
            ourNewHTML = ourNewHTML.replace("%amount%",obj.amount)

            htmlObject = document.createElement("div")
            htmlObject.innerHTML = ourNewHTML
            document.querySelector(element).insertAdjacentElement("beforeend",htmlObject)

        },

        clinks: function(){
            return classlinks
        }
    }

})()

var globalView = (function(b,d){

    const addBalance = ()=>{
        var output = d.userInput()
        var newest = b.addData(output.transaction_type,output.description,output.amount)   
        d.addData(newest,output.transaction_type)
    }

    const eventListeners = ()=>{
        var domLinks = designView.clinks()
        var btn = document.querySelector(domLinks.button).addEventListener("click",(e)=>{
            e.preventDefault()
            addBalance()
        })
        var keyEvent = document.addEventListener("keypress",(e)=>{
            if(e.keyCode === 13 || e.which === 13){
                addBalance()
            }   
        })
    }

    return {
        init:()=>{
            eventListeners()
        }
    }

})(balanceView,designView)

globalView.init()

