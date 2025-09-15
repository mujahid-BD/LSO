// স্যাম্পল ডেটা (এখানে আপনার রিয়েল ডেটা যোগ করুন)
const buildings = [
    {
        name: "গ্রিন ভ্যালি টাওয়ার",
        image: "https://via.placeholder.com/300x150?text=Green+Valley",
        apartments: [
            { type: "2BHK", storage: "1200 sq ft", capacity: 4, available: true, image: "https://via.placeholder.com/250x120?text=2BHK" },
            { type: "3BHK", storage: "1500 sq ft", capacity: 6, available: false, image: "https://via.placeholder.com/250x120?text=3BHK" },
            { type: "1BHK", storage: "800 sq ft", capacity: 2, available: true, image: "https://via.placeholder.com/250x120?text=1BHK" }
        ]
    },
    {
        name: "ব্লু স্কাই অ্যাপার্টমেন্ট",
        image: "https://via.placeholder.com/300x150?text=Blue+Sky",
        apartments: [
            { type: "2BHK", storage: "1100 sq ft", capacity: 4, available: false, image: "https://via.placeholder.com/250x120?text=2BHK" },
            { type: "3BHK", storage: "1600 sq ft", capacity: 6, available: true, image: "https://via.placeholder.com/250x120?text=3BHK" }
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
const bookingModal = document.getElementById('booking-modal');
const bookingCloseBtn = document.querySelector('.booking-close');
const bookingForm = document.getElementById('booking-form');

// বিল্ডিং লিস্ট রেন্ডার করুন
function renderBuildings() {
    buildingList.innerHTML = '';
    buildings.forEach((building, index) => {
        const card = document.createElement('div');
        card.className = 'building-card';
        card.innerHTML = `
            <img src="${building.image}" alt="${building.name}">
            <h3>${building.name}</h3>
            <p>${building.apartments.length} টি অ্যাপার্টমেন্ট</p>
        `;
        card.onclick = () => openModal(index);
        buildingList.appendChild(card);
    });
}

// বিল্ডিং ডিটেইলস মডাল ওপেন করুন
function openModal(buildingIndex) {
    const building = buildings[buildingIndex];
    modalTitle.textContent = building.name;
    apartmentsList.innerHTML = '';

    building.apartments.forEach((apt, aptIndex) => {
        const card = document.createElement('div');
        card.className = 'apartment-card';
        card.innerHTML = `
            <img src="${apt.image}" alt="${apt.type}">
            <p><strong>টাইপ:</strong> ${apt.type}</p>
            <p><strong>স্টোরেজ:</strong> ${apt.storage}</p>
            <p><strong>ক্যাপাসিটি:</strong> ${apt.capacity} জন</p>
            <p><strong>স্ট্যাটাস:</strong> <span style="color: ${apt.available ? 'green' : 'red'}">${apt.available ? 'Available' : 'Not Available'}</span></p>
            ${apt.available ? `<button class="book-btn" onclick="showBookingForm('${building.name}', '${apt.type}')">Book Now</button>` : ''}
        `;
        apartmentsList.appendChild(card);
    });

    modal.style.display = 'block';
}

// বুকিং ফর্ম মডাল দেখান
function showBookingForm(buildingName, apartmentType) {
    document.getElementById('building-name').value = buildingName;
    document.getElementById('apartment-type').value = apartmentType;
    bookingModal.style.display = 'block';
}

// মডাল ক্লোজ করুন
closeBtn.onclick = () => {
    modal.style.display = 'none';
};
bookingCloseBtn.onclick = () => {
    bookingModal.style.display = 'none';
};
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
};

// ফর্ম সাবমিট হ্যান্ডলার (Discord-এ পাঠান)
bookingForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        building: document.getElementById('building-name').value,
        apartmentType: document.getElementById('apartment-type').value
    };

    // Discord Webhook-এ পোস্ট করুন
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `নতুন বুকিং রিকোয়েস্ট!\n**বিল্ডিং:** ${formData.building}\n**অ্যাপার্টমেন্ট টাইপ:** ${formData.apartmentType}\n**নাম:** ${formData.name}\n**ইমেইল:** ${formData.email}\n**ফোন:** ${formData.phone}\n**মেসেজ:** ${formData.message}`
            })
        });
        if (response.ok) {
            alert('রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!');
            bookingForm.reset();
            bookingModal.style.display = 'none';
            modal.style.display = 'none';
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