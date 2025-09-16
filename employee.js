// DOM এলিমেন্ট
const staffList = document.getElementById('staff-list');

// কর্মীদের তথ্য (হার্ডকোড করা)
const employees = [
    {
        name: "Atif Ayan",
        position: "Owner",
        phone: "839-9009",
        image: "images/atif.jpg"
    },
    {
        name: "Mofiz Mia",
        position: "Manager",
        phone: "297-4572",
        image: "images/mofiz.jpg"
    },
    {
        name: "Saniyat Shelby",
        position: "Agent Head",
        phone: "528-1062",
        image: "images/employee3.jpg"
    },
    {
        name: "Shelby",
        position: "Agent",
        phone: "528-1062",
        image: "images/employee3.jpg"
    }
];

// কর্মীদের লিস্ট রেন্ডার করুন
function renderEmployees() {
    staffList.innerHTML = '';
    employees.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'staff-card';
        card.innerHTML = `
            <img src="${employee.image}" alt="${employee.name}" loading="lazy">
            <h3>${employee.name}</h3>
            <p>${employee.position}</p>
            <p>${employee.phone}</p>
        `;
        staffList.appendChild(card);
    });
}

// পেজ লোড হলে কর্মীদের রেন্ডার করুন
document.addEventListener('DOMContentLoaded', renderEmployees);