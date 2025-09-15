// স্যাম্পল ডেটা (এখানে আপনার রিয়েল ডেটা যোগ করুন)
const buildings = [
    {
        name: "গ্রিন ভ্যালি টাওয়ার",
        image: "https://via.placeholder.com/300x150?text=Green+Valley",
        apartments: [
            {
                type: "2BHK",
                storage: "1200 sq ft",
                capacity: 4,
                available: true,
                images: [
                    "https://via.placeholder.com/600x400?text=2BHK+Living",
                    "https://via.placeholder.com/600x400?text=2BHK+Kitchen",
                    "https://via.placeholder.com/600x400?text=2BHK+Bedroom"
                ]
            },
            {
                type: "3BHK",
                storage: "1500 sq ft",
                capacity: 6,
                available: false,
                images: [
                    "https://via.placeholder.com/600x400?text=3BHK+Living",
                    "https://via.placeholder.com/600x400?text=3BHK+Kitchen"
                ]
            },
            {
                type: "1BHK",
                storage: "800 sq ft",
                capacity: 2,
                available: true,
                images: [
                    "https://via.placeholder.com/600x400?text=1BHK+Living"
                ]
            }
        ]
    },
    {
        name: "ব্লু স্কাই অ্যাপার্টমেন্ট",
        image: "https://via.placeholder.com/300x150?text=Blue+Sky",
        apartments: [
            {
                type: "2BHK",
                storage: "1100 sq ft",
                capacity: 4,
                available: false,
                images: [
                    "https://via.placeholder.com/600x400?text=2BHK+Living",
                    "https://via.placeholder.com/600x400?text=2BHK+Bedroom"
                ]
            },
            {
                type: "3BHK",
                storage: "1600 sq ft",
                capacity: 6,
                available: true,
                images: [
                    "https://via.placeholder.com/600x400?text=3BHK+Living",
                    "https://via.placeholder.com/600x400?text=3BHK+Balcony",
                    "https://via.placeholder.com/600x400?text=3BHK+Kitchen"
                ]
            }
        ]
    }
];

// অফার ডেটা
const offers = [
    {
        title: "১০% ডিসকাউন্ট অফার",
        description: "প্রথম মাসের ভাড়ায় ১০% ডিসকাউন্ট পান! শুধুমাত্র এই মাসের জন্য।",
        image: "https://via.placeholder.com/600x200?text=Discount+Offer",
        link: "#buildings"
    },
    {
        title: "ফ্রি পার্কিং প্যাকেজ",
        description: "নতুন বুকিংয়ে ১ বছরের জন্য ফ্রি পার্কিং পান।",
        image: "https://via.placeholder.com/600x200?text=Free+Parking",
        link: "#buildings"
    },
    {
        title: "বিশেষ ফ্যামিলি প্যাকেজ",
        description: "৩বিএইচকে অ্যাপার্টমেন্টে বিশেষ ছাড়। এখনই বুক করুন!",
        image: "https://via.placeholder.com/600x200?text=Family+Package",
        link: "#buildings"
    }
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
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const offerList = document.getElementById('offer-list');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

// লাইটবক্স ভেরিয়েবল
let currentImages = [];
let currentImageIndex = 0;

// ক্যারোজেল ভেরিয়েবল
let currentOfferIndex = 0;

// বিল্ডিং লিস্ট রেন্ডার করুন
function renderBuildings(filteredBuildings = buildings) {
    buildingList.innerHTML = '';
    filteredBuildings.forEach((building, index) => {
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

// অফার লিস্ট রেন্ডার করুন
function renderOffers() {
    offerList.innerHTML = '';
    offers.forEach((offer, index) => {
        const card = document.createElement('div');
        card.className = 'offer-card';
        card.style.transform = `translateX(${-index * 100}%)`;
        card.innerHTML = `
            <img src="${offer.image}" alt="${offer.title}">
            <h3>${offer.title}</h3>
            <p>${offer.description}</p>
            <a href="${offer.link}" class="offer-btn">এখনই বুক করুন</a>
        `;
        offerList.appendChild(card);
    });
    updateCarousel();
}

// ক্যারোজেল আপডেট করুন
function updateCarousel() {
    offerList.style.transform = `translateX(-${currentOfferIndex * 100}%)`;
}

// ক্যারোজেল নেভিগেশন
carouselPrev.onclick = () => {
    currentOfferIndex = (currentOfferIndex - 1 + offers.length) % offers.length;
    updateCarousel();
};

carouselNext.onclick = () => {
    currentOfferIndex = (currentOfferIndex + 1) % offers.length;
    updateCarousel();
};

// স্বয়ংক্রিয় ক্যারোজেল
setInterval(() => {
    currentOfferIndex = (currentOfferIndex + 1) % offers.length;
    updateCarousel();
}, 5000);

// বিল্ডিং ডিটেইলস মডাল ওপেন করুন
function openModal(buildingIndex) {
    const building = buildings[buildingIndex];
    modalTitle.textContent = building.name;
    apartmentsList.innerHTML = '';

    building.apartments.forEach((apt, aptIndex) => {
        const card = document.createElement('div');
        card.className = 'apartment-card';
        card.innerHTML = `
            <img src="${apt.images[0]}" alt="${apt.type}" onclick="openLightbox(${buildingIndex}, ${aptIndex})">
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

// লাইটবক্স ওপেন করুন
function openLightbox(buildingIndex, aptIndex) {
    currentImages = buildings[buildingIndex].apartments[aptIndex].images;
    currentImageIndex = 0;
    updateLightboxImage();
    lightbox.style.display = 'block';
}

// লাইটবক্সে ছবি আপডেট করুন
function updateLightboxImage() {
    lightboxImage.src = currentImages[currentImageIndex];
    lightboxPrev.style.display = currentImages.length > 1 ? 'block' : 'none';
    lightboxNext.style.display = currentImages.length > 1 ? 'block' : 'none';
}

// লাইটবক্স নেভিগেশন
lightboxPrev.onclick = () => {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
};

lightboxNext.onclick = () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
};

lightboxClose.onclick = () => {
    lightbox.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
};

// ফিল্টার এবং সার্চ ফাংশন
function filterBuildings() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    let filteredBuildings = buildings.map(building => ({
        ...building,
        apartments: building.apartments.filter(apt => {
            if (filterValue === 'all') return true;
            if (filterValue === 'available') return apt.available;
            if (filterValue === 'not-available') return !apt.available;
            return apt.type === filterValue;
        })
    })).filter(building => {
        return building.apartments.length > 0 && 
               (building.name.toLowerCase().includes(searchTerm) ||
                building.apartments.some(apt => apt.type.toLowerCase().includes(searchTerm)));
    });

    renderBuildings(filteredBuildings);
}

// ফিল্টার এবং সার্চ ইভেন্ট লিসেনার
searchInput.addEventListener('input', filterBuildings);
filterSelect.addEventListener('change', filterBuildings);

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
document.addEventListener('DOMContentLoaded', () => {
    renderBuildings();
    renderOffers();
});