// Charter functionality for TARMAQ
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('charter-form');
    const signatoriesList = document.getElementById('signatories-list');
    const signatureCount = document.getElementById('signature-count');
    const notification = document.getElementById('notification');
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        const publicKey = window.CONFIG?.EMAILJS?.PUBLIC_KEY || 'your_public_key_here';
        emailjs.init(publicKey);
    }
    
    // Load signatories from localStorage or use defaults
    let signatories = loadSignatories();
    let currentCount = signatories.length;

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

        // Send email notification
        await sendEmailNotification(signatureData, currentCount);

        // Update the display
        updateSignatoriesList();
        updateSignatureCount();

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

    // Send email notification using EmailJS
    async function sendEmailNotification(signatureData, totalCount) {
        try {
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                console.log('EmailJS not loaded, skipping email notification');
                return;
            }

            // EmailJS configuration (you need to set these up in your EmailJS account)
            const serviceId = window.CONFIG?.EMAILJS?.SERVICE_ID || 'service_15n2y6q';
            const templateId = window.CONFIG?.EMAILJS?.TEMPLATE_ID || 'template_tzrwo6d';
            const publicKey = window.CONFIG?.EMAILJS?.PUBLIC_KEY || 'your_public_key';

            // Template parameters
            const templateParams = {
                to_email: window.CONFIG?.EMAIL?.NOTIFICATION_EMAIL || 'bastien@balder-app.com',
                signatory_name: signatureData.fullName,
                signatory_email: signatureData.email || 'Non fourni',
                signature_date: signatureData.dateTime,
                total_signatures: totalCount,
                message: `Nouvelle signature de la charte TARMAQ !

Signataire: ${signatureData.fullName}
Email: ${signatureData.email || 'Non fourni'}
Date et heure: ${signatureData.dateTime}
Nombre total de signataires: ${totalCount}

---
Message automatique de TARMAQ`
            };

            // Send email using EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log('Email notification sent successfully');

        } catch (error) {
            console.error('Error sending email notification:', error);
            
            // Fallback: Try to send via a simple webhook if EmailJS fails
            try {
                const webhookData = {
                    to: window.CONFIG?.EMAIL?.NOTIFICATION_EMAIL || 'bastien@balder-app.com',
                    subject: `Nouvelle signature de la charte TARMAQ - ${signatureData.fullName}`,
                    body: `Nouvelle signature de la charte TARMAQ !

Signataire: ${signatureData.fullName}
Email: ${signatureData.email || 'Non fourni'}
Date et heure: ${signatureData.dateTime}
Nombre total de signataires: ${totalCount}

---
Message automatique de TARMAQ`
                };

                // Using a webhook service as fallback
                const webhookUrl = window.CONFIG?.WEBHOOK?.URL || 'https://webhook.site/your-unique-webhook-url';
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(webhookData)
                });
                console.log('Fallback email notification sent via webhook');
            } catch (fallbackError) {
                console.error('Fallback email notification also failed:', fallbackError);
            }
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

            // Use the AirtableAPI object
            const result = await window.AirtableAPI.createRecord('Charter Signatures', airtableData);
            console.log('✅ Signature saved to Airtable successfully:', result);

        } catch (error) {
            console.error('❌ Error saving signature to Airtable:', error);
            console.error('Error details:', error.message);
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
