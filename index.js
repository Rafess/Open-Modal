const buttonOpen = document.querySelector('button[name="open-modal"]');
const OPEN = "--is-open"
buttonOpen.onclick = function () {
    operateModal.open({
    cancel: () => {
      console.log('Cliente cancelou!')
    },
    ok: clientInformation => {
      console.log(`informações do cliente recebidas:', ${clientInformation.name} ${clientInformation.lastName}: ${clientInformation.email}`)
    }
  })
}
 const operateModal = (function(){
    let _cancelFn;
    let _okFn;
    let _modal = document.querySelector('.modal');
    let _form = document.querySelector('.modal form');
    let _inputEmail = document.querySelector('.modal input[type="email"]');
    let _inputName = document.querySelector('.modal input[id="name"]');
    let _inputLastName = document.querySelector('.modal input[id="lastName"]');

    function formReset() {
        _form.reset();
    }
    function cancel() {
        console.log(_inputEmail.value)
        _cancelFn()
        close()
    }
    function close() {
        _modal.classList.remove(OPEN);
    }
    function open(settings){ // o settings é um objeto passado no momento de chamar a função, nesse caso ele possiu o indice ok e cancel.
        _modal.classList.add(OPEN);
        if (settings.cancel) { // qunado for cancel, fara a função _cancelFn virar a função do indice cancel do objeto settings;
            _cancelFn = settings.cancel;
        }
        if (settings.ok) { // qunado for ok, fará a função _okFn virar a função do indice ok do objeto settings;
            _okFn = settings.ok;
        }
        _form.onsubmit = function(event) {
            event.preventDefault();
            _okFn({name: _inputName.value, lastName: _inputLastName.value, email: _inputEmail.value}) 
            formReset();
        }
    }
    

    return{open, close, cancel}
 })();
