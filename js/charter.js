// Charter functionality for TARMAQ
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('charter-form');
    const signatoriesList = document.getElementById('signatories-list');
    const signatureCount = document.getElementById('signature-count');
    const notification = document.getElementById('notification');
    
    
    // Load signatories from localStorage or use defaults
    let signatories = loadSignatories();
    let currentCount = signatories.length;
    
    // Load signatories from Airtable on page load
    loadSignatoriesFromAirtable();

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const prenom = form.prenom.value.trim();
        const nom = form.nom.value.trim();
        const email = form.email.value.trim();
        const consent = form.consent.checked;

        if (prenom === '' || nom === '' || !consent) {
            // Form validation failed
            return;
        }

        // Create signature data
        const signatureData = {
            prenom: prenom,
            nom: nom,
            email: email,
            fullName: `${prenom} ${nom}`,
            timestamp: new Date().toISOString(),
            dateTime: new Date().toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        // Add new signatory to the top of the list
        signatories.unshift(signatureData.fullName);
        currentCount++;

        // Save to localStorage
        saveSignatories(signatories);

        // Save to Airtable
        await saveSignatureToAirtable(signatureData);

        // Reload signatories from Airtable to get the latest data
        await loadSignatoriesFromAirtable();

        // Reset form
        form.reset();

        // Show notification
        showNotification();
    });

    // Load signatories from localStorage
    function loadSignatories() {
        try {
            const stored = localStorage.getItem('tarmaq_charter_signatories');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading signatories from localStorage:', error);
        }
        // Return default signatories if localStorage is empty or error occurs
        return ['Bastien Dumont'];
    }

    // Save signatories to localStorage
    function saveSignatories(signatories) {
        try {
            localStorage.setItem('tarmaq_charter_signatories', JSON.stringify(signatories));
        } catch (error) {
            console.error('Error saving signatories to localStorage:', error);
        }
    }


    // Save signature to Airtable
    async function saveSignatureToAirtable(signatureData) {
        try {
            console.log('🔍 Debugging Airtable integration...');
            
            // Check if Airtable API is available
            if (!window.AirtableAPI) {
                console.error('❌ Airtable API not loaded');
                return;
            }
            console.log('✅ Airtable API loaded');

            // Check if Airtable is configured
            if (!window.AirtableConfig) {
                console.error('❌ AirtableConfig not found');
                return;
            }
            console.log('✅ AirtableConfig found');

            if (!window.AirtableConfig.isValid()) {
                console.error('❌ Airtable not configured properly');
                console.log('API Key:', window.AirtableConfig.apiKey ? 'Set' : 'Missing');
                console.log('Base ID:', window.AirtableConfig.baseId ? 'Set' : 'Missing');
                return;
            }
            console.log('✅ Airtable configuration is valid');

            const airtableData = {
                "Name": signatureData.fullName,
                "Email": signatureData.email || '',
                "Timestamp": signatureData.timestamp,
                "Signature_Date": signatureData.dateTime
            };

            console.log('📤 Sending data to Airtable:', airtableData);

            // Use the AirtableAPI object with the correct table ID
            const result = await window.AirtableAPI.createRecord('tbl9jqKoSak8XjWcQ', airtableData);
            console.log('✅ Signature saved to Airtable successfully:', result);

        } catch (error) {
            console.error('❌ Error saving signature to Airtable:', error);
            console.error('Error details:', error.message);
        }
    }

    // Load signatories from Airtable
    async function loadSignatoriesFromAirtable() {
        try {
            console.log('🔍 Loading signatories from Airtable...');
            
            // Check if Airtable API is available
            if (!window.AirtableAPI) {
                console.warn('⚠️ Airtable API not loaded, using localStorage only');
                return;
            }

            // Check if Airtable is configured
            if (!window.AirtableConfig || !window.AirtableConfig.isValid()) {
                console.warn('⚠️ Airtable not configured properly, using localStorage only');
                return;
            }

            // Fetch records from Airtable
            const records = await window.AirtableAPI.getRecords('tbl9jqKoSak8XjWcQ', {
                sort: [{ field: 'Timestamp', direction: 'desc' }] // Most recent first
            });

            console.log('✅ Loaded records from Airtable:', records);

            if (records && records.length > 0) {
                // Extract names from Airtable records
                const airtableSignatories = records
                    .filter(record => record.fields && record.fields.Name) // Only records with names
                    .map(record => record.fields.Name);

                console.log('📋 Extracted signatories:', airtableSignatories);

                // Update the signatories list with Airtable data
                signatories = airtableSignatories;
                currentCount = signatories.length;

                // Update localStorage with fresh data
                saveSignatories(signatories);

                // Update the display
                updateSignatoriesList();
                updateSignatureCount();

                console.log('✅ Signatories loaded and displayed successfully');
            } else {
                console.log('ℹ️ No signatories found in Airtable, using localStorage');
            }

        } catch (error) {
            console.error('❌ Error loading signatories from Airtable:', error);
            console.log('ℹ️ Falling back to localStorage data');
        }
    }

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
