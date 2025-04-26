document.addEventListener('DOMContentLoaded', () => {
    // Form switching functionality
    const switchButtons = document.querySelectorAll('.switch-button');
    const forms = document.querySelectorAll('.brief-form');
    const newProjectForm = document.getElementById('brief-form');
    const existingProjectForm = document.getElementById('existing-brief-form');

    // Autofill for new project
    const newProjectAnswers = {
        'company_name': 'Administrative Service Center of Lviv (CNAP Lviv)',
        'business_area': 'Providing administrative services to citizens and businesses',
        'geography': 'Lviv and Lviv territorial community',
        'social_links': 'https://cnap.city-adm.lviv.ua/',
        'project_name': 'New Digital Portal for CNAP Lviv',
        'project_description': 'Creating a modern website/portal for convenient submission of applications for administrative services, appointment booking at CNAP, and providing service information.',
        'project_goals': 'Improving convenience for residents, digitalization of services, automation of application submission processes.',
        'target_audience': 'Ukrainian citizens, Lviv residents, entrepreneurs, foreigners living in the city.',
        'user_problems': 'Reducing document submission time, minimizing queues, improving information accessibility.',
        'features': '- Online appointment booking\n- Electronic application submission\n- User account\n- Service category search\n- Integration with government registries',
        'integrations': 'Integration with government registries, CRM/ERP systems',
        'examples': 'Diia, e-Malyatko',
        'budget': 'Depends on the scope of functionality (open for discussion)',
        'deadline': '6 months',
        'additional_info': '- Responsive design\n- Multilingual support (Ukrainian / English)\n- Accessibility for people with disabilities\n- Possibility of mobile app integration in the future'
    };

    // Autofill for existing project
    const existingProjectAnswers = {
        'company_name': 'Administrative Service Center of Lviv (CNAP Lviv)',
        'business_area': 'Providing administrative services to citizens and businesses',
        'geography': 'Lviv and Lviv territorial community',
        'social_links': 'https://cnap.city-adm.lviv.ua/',
        'project_description': 'The current website provides basic functions but has an outdated interface and limited mobile optimization.',
        'project_links': 'https://cnap.city-adm.lviv.ua/',
        'project_goals': 'Complete UI/UX update, mobile version implementation, navigation improvement, simplification of service booking process.',
        'main_issues': 'Outdated interface, limited mobile optimization, complex navigation.',
        'success_criteria': 'Modern responsive design, simple navigation, convenient service booking process.',
        'design_references': 'Diia, e-Malyatko - modern government services with simple interfaces',
        'existing_features': '- Basic service information\n- Registry integrations\n- Appointment booking',
        'new_features': '- Fully responsive design\n- Simplified navigation\n- Feedback and quality assessment system\n- Multilingual support',
        'integrations': 'Existing registry integrations must be preserved',
        'technical_constraints': 'Full responsiveness + multilingual support required',
        'budget': 'To be discussed based on the scope of work',
        'deadline': '4-5 months',
        'milestones': '1. Analysis and planning\n2. Design and prototyping\n3. Development\n4. Testing\n5. Launch',
        'additional_info': 'Desire to create a system for feedback and service quality assessment'
    };

    // Product type checkboxes
    const productTypes = ['website', 'crm', 'mobile'];

    // Function to fill all fields in a form
    const fillAllFields = (form, answers) => {
        // Fill text inputs and textareas
        form.querySelectorAll('input[type="text"], textarea').forEach(input => {
            if (answers[input.name]) {
                input.value = answers[input.name];
            }
        });

        // Check product type checkboxes if present
        if (form.id === 'brief-form') {
            form.querySelectorAll('input[type="checkbox"][name="product_type"]').forEach(checkbox => {
                if (['website', 'crm', 'mobile'].includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

            // Set "no" for brandbook radio
            const brandbookNo = form.querySelector('input[type="radio"][name="has_brandbook"][value="no"]');
            if (brandbookNo) {
                brandbookNo.checked = true;
            }
        }

        // Set radio buttons for existing project form
        if (form.id === 'existing-brief-form') {
            const launchedStage = form.querySelector('input[type="radio"][name="project_stage"][value="launched"]');
            if (launchedStage) {
                launchedStage.checked = true;
            }

            const modernizeDesign = form.querySelector('input[type="radio"][name="design_approach"][value="modernize"]');
            if (modernizeDesign) {
                modernizeDesign.checked = true;
            }
        }

        // Resize all textareas
        form.querySelectorAll('textarea').forEach(textarea => {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
        });
    };

    // Add click handler for new project form
    if (newProjectForm) {
        const newProjectInputs = newProjectForm.querySelectorAll('input, textarea');
        let newProjectFilled = false;

        newProjectInputs.forEach(input => {
            input.addEventListener('click', () => {
                if (!newProjectFilled) {
                    fillAllFields(newProjectForm, newProjectAnswers);
                    newProjectFilled = true;
                }
            });
        });
    }

    // Add click handler for existing project form
    if (existingProjectForm) {
        const existingProjectInputs = existingProjectForm.querySelectorAll('input, textarea');
        let existingProjectFilled = false;

        existingProjectInputs.forEach(input => {
            input.addEventListener('click', () => {
                if (!existingProjectFilled) {
                    fillAllFields(existingProjectForm, existingProjectAnswers);
                    existingProjectFilled = true;
                }
            });
        });
    }

    console.log('Found switch buttons:', switchButtons.length);
    console.log('Found forms:', forms.length);

    switchButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.dataset.form);
            
            // Update buttons
            switchButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update forms
            const formType = button.dataset.form;
            
            // Hide all forms first
            forms.forEach(form => {
                form.style.display = 'none';
                form.classList.remove('active');
                console.log('Removed active class from:', form.id);
            });
            
            // Show selected form
            if (formType === 'new' && newProjectForm) {
                newProjectForm.style.display = 'block';
                newProjectForm.classList.add('active');
                console.log('Activated new project form');
            } else if (formType === 'existing' && existingProjectForm) {
                existingProjectForm.style.display = 'block';
                existingProjectForm.classList.add('active');
                console.log('Activated existing project form');
            }
        });
    });

    // File upload handling
    const initFileUploads = () => {
        document.querySelectorAll('.media-upload-container').forEach(container => {
            const input = container.querySelector('.media-input');
            const uploadBtn = container.querySelector('.upload-btn');
            const preview = container.querySelector('.preview-container');
            
            if (input && uploadBtn) {
                uploadBtn.addEventListener('click', () => input.click());
                
                input.addEventListener('change', () => {
                    handleFiles(input.files, preview);
                });

                // Drag and drop
                preview.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    preview.classList.add('drag-over');
                });

                preview.addEventListener('dragleave', () => {
                    preview.classList.remove('drag-over');
                });

                preview.addEventListener('drop', (e) => {
                    e.preventDefault();
                    preview.classList.remove('drag-over');
                    handleFiles(e.dataTransfer.files, preview);
                });
            }
        });
    };

    // Handle uploaded files
    const handleFiles = (files, preview) => {
        if (!files.length) return;

        // Clear placeholder if it exists
        const placeholder = preview.querySelector('.upload-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }

        [...files].forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';

                if (file.type.startsWith('image/')) {
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-btn">&times;</button>
                    `;
                } else if (file.type.startsWith('video/')) {
                    previewItem.innerHTML = `
                        <video src="${e.target.result}" controls></video>
                        <button type="button" class="remove-btn">&times;</button>
                    `;
                } else {
                    // Document preview
                    let fileIcon = '📄';
                    if (file.name.endsWith('.pdf')) fileIcon = '📕';
                    else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) fileIcon = '📘';
                    else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) fileIcon = '📗';
                    else if (file.name.endsWith('.txt')) fileIcon = '📝';

                    previewItem.classList.add('document');
                    previewItem.innerHTML = `
                        <div class="file-icon">${fileIcon}</div>
                        <div class="file-name">${file.name}</div>
                        <button type="button" class="remove-btn">&times;</button>
                    `;
                }

                previewItem.querySelector('.remove-btn').addEventListener('click', () => {
                    previewItem.remove();
                    if (preview.querySelectorAll('.preview-item').length === 0 && placeholder) {
                        placeholder.style.display = 'flex';
                    }
                });

                preview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    };

    // Initialize file uploads
    initFileUploads();

    // Form submission handling
    const handleFormSubmit = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Process checkboxes separately for product type
            if (form.id === 'brief-form') {
                const productTypes = [];
                formData.getAll('product_type').forEach(type => {
                    productTypes.push(type);
                });
                data.product_type = productTypes;
            }
            
            // Collect all other fields
            for (let [key, value] of formData.entries()) {
                if (key !== 'product_type' || form.id !== 'brief-form') {
                    data[key] = value;
                }
            }
            
            // Collect files data
            const filesData = [];
            form.querySelectorAll('.preview-item').forEach(item => {
                if (item.querySelector('img')) {
                    filesData.push({
                        type: 'image',
                        src: item.querySelector('img').src
                    });
                } else if (item.querySelector('video')) {
                    filesData.push({
                        type: 'video',
                        src: item.querySelector('video').src
                    });
                } else if (item.classList.contains('document')) {
                    filesData.push({
                        type: 'document',
                        name: item.querySelector('.file-name').textContent
                    });
                }
            });
            data.files = filesData;
            
            console.log('Form data:', data);
            
            // Create URL parameters from form data
            const params = new URLSearchParams();
            for (let [key, value] of Object.entries(data)) {
                if (Array.isArray(value)) {
                    params.append(key, JSON.stringify(value));
                } else {
                    params.append(key, value);
                }
            }
            
            // Redirect to confirmation page with form data
            window.location.href = `confirmation.html?${params.toString()}`;
        });
    };

    // Initialize form handlers
    if (newProjectForm) handleFormSubmit(newProjectForm);
    if (existingProjectForm) handleFormSubmit(existingProjectForm);
    
    // Auto-resize textarea
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
}); 