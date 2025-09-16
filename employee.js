// DOM এলিমেন্ট
const staffList = document.getElementById('staff-list');

// কর্মীদের তথ্য (হার্ডকোড করা)
const employees = [
    {
        name: "আহমেদ রহিম",
        position: "ম্যানেজার",
        image: "images/employee1.jpg"
    },
    {
        name: "সারা খান",
        position: "সেলস এক্সিকিউটিভ",
        image: "images/employee2.jpg"
    },
    {
        name: "রাকিব হোসেন",
        position: "কাস্টমার সাপোর্ট",
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
        `;
        staffList.appendChild(card);
    });
}

// পেজ লোড হলে কর্মীদের রেন্ডার করুন
document.addEventListener('DOMContentLoaded', renderEmployees);