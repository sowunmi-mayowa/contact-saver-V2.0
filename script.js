class Contact{
    constructor(name, address, phone){
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}

class ContactApp{
    static displayContacts(){
        const storedContact = [
            {
                name: 'mayowa',
                address: 'cario, Egypt',
                phone: '09032073275'
            },
            {
                name: 'mayowa',
                address: 'cario, Egypt',
                phone: '09032073275'
            }
        ];
        const contacts = storedContact

        contacts.forEach((contact) => ContactApp.addContacts(contact))
    }
    static addContacts(contact){
        const list = document.querySelector("#table-value");
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td> ${contact.name} </td>
            <td> ${contact.address} </td>
            <td> ${contact.phone} </td>
            <td> <a href="#" class="btn btn-danger btn-sm">Delete</a></td>
        `
        list.appendChild(tr);
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

document.addEventListener('DOMContentLoaded', ContactApp.displayContacts)

document.querySelector('form').addEventListener('submit', (e)=> {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;

    if (name =='' || address == '' || phone =='') {
        ContactApp.showAlert('pls fill all fields', 'danger')
    }else{
        
    const contact = new Contact(name, address, phone);
    console.log(contact)

    ContactApp.addContacts(contact);

    ContactApp.showAlert('Contact Saved Successfully', 'success')

    ContactApp.clearFields()
    }

})

document.querySelector('#table-value').addEventListener('click', (e) => {
    console.log(e.target)
});