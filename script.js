class Contact{
    constructor(name, address, phone){
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}

class ContactApp{
    static displayContacts(){
        const contacts = Store.getContacts();

    contacts.forEach(function(contact) {
        ContactApp.addContacts(contact)
    });
    }
    static addContacts(contact){
        const list = document.querySelector("#table-value");
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td> ${contact.name} </td>
            <td> ${contact.address} </td>
            <td> ${contact.phone} </td>
            <td> <a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `
        list.appendChild(tr);
    }

    static deleteBook(el){
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, classname){
        const div = document.createElement('div');
        div.className = `alert alert-${classname} text-center`;
        div.innerHTML = message;
        document.querySelector('.container').insertBefore(div, document.querySelector('form'));

        setTimeout(() => {div.remove()}, 3000)
    }

    
    static clearFields(){
        document.querySelector('#name').value = '';
        document.querySelector('#address').value = '';
        document.querySelector('#phone').value = '';
    }
}

class Store{
    static getContacts(){
        let contacts;
        if (localStorage.getItem('contacts') === null) {
            contacts = [];
        }else{
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts
    }

   static addBooks(contact){
       const contacts = Store.getContacts();
       contacts.push(contact);
       localStorage.setItem('contacts', JSON.stringify(contacts))
   }

    static removeBook(phone){
        const contacts  =Store.getContacts();

        contacts.forEach((contact, index) => {
            if (contact.phone === phone) {
                contacts.splice(index, 1);
            }
        });
        
        localStorage.setItem(contacts, JSON.stringify(contacts))
    }
}

document.addEventListener('DOMContentLoaded', ContactApp.displayContacts)

document.querySelector('form').addEventListener('submit', (e)=> {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;

    if (name =='' || address == '' || phone =='') {
        ContactApp.showAlert('pls fill all fields', 'danger')
    }
    // else if(phone <= 10 && phone.length > 12){
    //     ContactApp.showAlert('Please enter a valid phone number', 'danger')
    // }
    else{
        const contact = new Contact(name, address, phone);
        console.log(contact)

        ContactApp.addContacts(contact);
        Store.addContacts(contact)
        ContactApp.showAlert('Contact Saved Successfully', 'success')

        ContactApp.clearFields()
    }
})

document.querySelector('#table-value').addEventListener('click', (e) => {
    ContactApp.deleteBook(e.target);

});