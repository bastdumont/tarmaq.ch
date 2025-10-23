// Charter functionality for TARMAQ
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('charter-form');
    const signatoriesList = document.getElementById('signatories-list');
    const signatureCount = document.getElementById('signature-count');
    const notification = document.getElementById('notification');
    
    // Initial signatories
    let signatories = ['Marie Dubois', 'Jean Dupont', 'Alex Martin'];
    let currentCount = 3;

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const prenom = form.prenom.value.trim();
        const nom = form.nom.value.trim();
        const consent = form.consent.checked;

        if (prenom === '' || nom === '' || !consent) {
            // Form validation failed
            return;
        }

        // Add new signatory to the top of the list
        const newSignatory = `${prenom} ${nom}`;
        signatories.unshift(newSignatory);
        currentCount++;

        // Update the display
        updateSignatoriesList();
        updateSignatureCount();

        // Reset form
        form.reset();

        // Show notification
        showNotification();
    });

    function updateSignatoriesList() {
        signatoriesList.innerHTML = '';
        signatories.forEach(signatory => {
            const li = document.createElement('li');
            li.className = 'py-2';
            li.style.cssText = "font-family: 'Caveat', cursive; font-size: 1.75rem; line-height: 2.25rem; color: #1f2937; border-bottom-width: 1px;";
            li.textContent = signatory;
            signatoriesList.appendChild(li);
        });
    }

    function updateSignatureCount() {
        signatureCount.textContent = currentCount;
    }

    function showNotification() {
        notification.classList.remove('opacity-0', 'translate-y-3');
        notification.classList.add('opacity-100', 'translate-y-0');
        
        setTimeout(() => {
            notification.classList.remove('opacity-100', 'translate-y-0');
            notification.classList.add('opacity-0', 'translate-y-3');
        }, 3000);
    }

    // Initialize the display
    updateSignatoriesList();
    updateSignatureCount();
});
