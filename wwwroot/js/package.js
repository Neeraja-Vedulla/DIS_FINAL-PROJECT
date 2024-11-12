// Temporary object to track booked spots for each package
let bookedSpots = {
    france: 0,
    ireland: 0,
    singapore: 0
};

// Total available spots for each package
const packageInfo = {
    france: {
        name: "France Getaway",
        description: "Experience the romance of Paris, the vineyards of Bordeaux, and the stunning Riviera. This all-inclusive package offers a luxurious tour across France's most iconic cities.",
        price: "$499",
        spotsAvailable: 20
    },
    ireland: {
        name: "Ireland Adventure",
        description: "Discover the lush landscapes of Ireland with a guided tour through Galway, Dublin, and the Cliffs of Moher. A perfect package for those who love nature and culture.",
        price: "$399",
        spotsAvailable: 10
    },
    singapore: {
        name: "Singapore Dream",
        description: "Explore the vibrant city of Singapore with its futuristic skyline, stunning gardens, and exciting shopping. This package includes guided tours and VIP access to Singapore's top attractions.",
        price: "$599",
        spotsAvailable: 20
    }
};

// Track user details and spots for editing and deleting
let userBooking = {
    name: '',
    phone: '',
    email: '',
    spots: 0
};

function showPackageDetails() {
    const packageDropdown = document.getElementById("packageDropdown");
    const packageDetails = document.getElementById("packageDetails");

    const selectedPackage = packageDropdown.value;

    if (selectedPackage) {
        const details = packageInfo[selectedPackage];
        const remainingSpots = details.spotsAvailable - bookedSpots[selectedPackage];

        packageDetails.innerHTML = `
            <h3>${details.name}</h3>
            <p>${details.description}</p>
            <p><strong>Price:</strong> ${details.price}</p>
            <p><strong>Spots Available:</strong> ${remainingSpots}</p>
            <button onclick="showAppointmentForm('${selectedPackage}')">Book Appointment</button>
        `;
        packageDetails.style.display = "block";
    } else {
        packageDetails.style.display = "none";
    }
}

function showAppointmentForm(packageName) {
    window.selectedPackage = packageName;
    document.getElementById("appointmentForm").style.display = "block";
    document.getElementById("packageDetails").style.display = "none";
}

function bookAppointment(event) {
    event.preventDefault();

    const form = document.getElementById("appointmentFormContent");
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const spotsBooked = parseInt(document.getElementById("spots").value, 10);

    const selectedPackage = window.selectedPackage;
    const availableSpots = packageInfo[selectedPackage].spotsAvailable - bookedSpots[selectedPackage];

    if (spotsBooked > availableSpots) {
        alert("Not enough spots available. Please select a smaller number.");
        return;
    }

    // Save booking details for editing
    userBooking = { name, phone, email, spots: spotsBooked };
    bookedSpots[selectedPackage] += spotsBooked;

    form.reset();
    document.getElementById("appointmentForm").style.display = "none";
    showModal("Booking successful!");

    updatePackageDetails();
}

function updatePackageDetails() {
    const selectedPackage = window.selectedPackage;
    const details = packageInfo[selectedPackage];
    const remainingSpots = details.spotsAvailable - bookedSpots[selectedPackage];

    document.getElementById("packageDetails").innerHTML = `
        <h3>${details.name}</h3>
        <p>${details.description}</p>
        <p><strong>Price:</strong> ${details.price}</p>
        <p><strong>Spots Available:</strong> ${remainingSpots}</p>
        <button onclick="editBooking()">Edit Appointment</button>
        <button onclick="deleteBooking()">Delete Appointment</button>
    `;
    document.getElementById("packageDetails").style.display = "block";
}

function showModal(message) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal").querySelector("p").textContent = message;
}

function closeModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
}

function editBooking() {
    document.getElementById("editSection").style.display = "block";
    document.getElementById("appointmentForm").style.display = "none";

    // Fill form with existing booking details
    document.getElementById("editName").value = userBooking.name;
    document.getElementById("editPhone").value = userBooking.phone;
    document.getElementById("editEmail").value = userBooking.email;
    document.getElementById("editSpots").value = userBooking.spots;
}

function saveEdit(event) {
    event.preventDefault();

    const editedSpots = parseInt(document.getElementById("editSpots").value, 10);
    const selectedPackage = window.selectedPackage;
    const availableSpots = packageInfo[selectedPackage].spotsAvailable - bookedSpots[selectedPackage] + userBooking.spots;

    if (editedSpots > availableSpots) {
        alert("Not enough spots available. Please select a smaller number.");
        return;
    }

    bookedSpots[selectedPackage] = bookedSpots[selectedPackage] - userBooking.spots + editedSpots;
    userBooking = {
        name: document.getElementById("editName").value,
        phone: document.getElementById("editPhone").value,
        email: document.getElementById("editEmail").value,
        spots: editedSpots
    };

    document.getElementById("editSection").style.display = "none";
    showModal("Booking updated successfully!");

    updatePackageDetails();
}

function deleteBooking() {
    const selectedPackage = window.selectedPackage;
    bookedSpots[selectedPackage] -= userBooking.spots;
    userBooking = { name: '', phone: '', email: '', spots: 0 };

    showModal("Booking deleted successfully!");
    showPackageDetails();
}

function cancelEdit() {
    document.getElementById("editSection").style.display = "none";
}
