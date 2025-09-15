// স্যাম্পল ডেটা (এখানে আপনার রিয়েল ডেটা যোগ করুন)
const buildings = [
    {
        name: "গ্রিন ভ্যালি টাওয়ার",
        apartments: [
            { type: "2BHK", storage: "1200 sq ft", capacity: 4, available: true },
            { type: "3BHK", storage: "1500 sq ft", capacity: 6, available: false },
            { type: "1BHK", storage: "800 sq ft", capacity: 2, available: true }
        ]
    },
    {
        name: "ব্লু স্কাই অ্যাপার্টমেন্ট",
        apartments: [
            { type: "2BHK", storage: "1100 sq ft", capacity: 4, available: false },
            { type: "3BHK", storage: "1600 sq ft", capacity: 6, available: true }
        ]
    }
    // আরও বিল্ডিং যোগ করুন
];

// Discord Webhook URL (আপনারটা পেস্ট করুন)
const DISCORD_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; // এটি চেঞ্জ করুন!

// DOM এলিমেন্টস
const buildingList = document.getElementById('building-list');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const apartmentsList = document.getElementById('apartments-list');
const closeBtn = document.querySelector('.close');
const requestForm = document.getElementById('request-form');
const bookingForm = document.getElementById('booking-form');

// বিল্ডিং লিস্ট রেন্ডার করুন
function renderBuildings() {
    buildingList.innerHTML = '';
    buildings.forEach((building, index) => {
        const card = document.createElement('div');
        card.className = 'building-card';
        card.innerHTML = `<h3>${building.name}</h3><p>${building.apartments.length} টি অ্যাপার্টমেন্ট</p>`;
        card.onclick = () => openModal(index);
        buildingList.appendChild(card);
    });
}

// মডাল ওপেন করুন
function openModal(buildingIndex) {
    const building = buildings[buildingIndex];
    modalTitle.textContent = building.name;
    apartmentsList.innerHTML = '';

    let hasAvailable = false;
    building.apartments.forEach(apt => {
        const item = document.createElement('div');
        item.className = 'apartment-item';
        item.innerHTML = `
            <strong>টাইপ:</strong> ${apt.type} | <strong>স্টোরেজ:</strong> ${apt.storage} | 
            <strong>ক্যাপাসিটি:</strong> ${apt.capacity} জন | 
            <strong>স্ট্যাটাস:</strong> <span style="color: ${apt.available ? 'green' : 'red'}">${apt.available ? 'Available' : 'Not Available'}</span>
        `;
        if (apt.available) hasAvailable = true;
        apartmentsList.appendChild(item);
    });

    // যদি কোনো Available থাকে, ফর্ম দেখান
    requestForm.style.display = hasAvailable ? 'block' : 'none';

    modal.style.display = 'block';
}

// মডাল ক্লোজ করুন
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
};

// ফর্ম সাবমিট হ্যান্ডলার (Discord-এ পাঠান)
bookingForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        building: modalTitle.textContent
    };

    // Discord Webhook-এ পোস্ট করুন
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `নতুন বুকিং রিকোয়েস্ট!\n**বিল্ডিং:** ${formData.building}\n**নাম:** ${formData.name}\n**ইমেইল:** ${formData.email}\n**ফোন:** ${formData.phone}\n**মেসেজ:** ${formData.message}`
            })
        });
        if (response.ok) {
            alert('রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!');
            bookingForm.reset();
        } else {
            alert('এরর! আবার চেষ্টা করুন।');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('নেটওয়ার্ক এরর! কনসোল চেক করুন।');
    }
};

// পেজ লোড হলে রেন্ডার করুন
document.addEventListener('DOMContentLoaded', renderBuildings);