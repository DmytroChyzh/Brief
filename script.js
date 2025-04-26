document.addEventListener('DOMContentLoaded', () => {
    // Form switching functionality
    const switchButtons = document.querySelectorAll('.switch-button');
    const forms = document.querySelectorAll('.brief-form');
    const newProjectForm = document.getElementById('brief-form');
    const existingProjectForm = document.getElementById('existing-brief-form');

    // Autofill for new project
    const newProjectAnswers = {
        'company_name': '[Not specified]',
        'business_area': 'Educational technology, children\'s learning apps',
        'geography': 'International focus, primarily targeting English-speaking countries',
        'social_links': '[Not specified]',
        'project_name': 'Lighti – Kids\' STEM Adventure',
        'project_description': 'Develop an educational app for children that mixes learning and entertainment through a character named Lighti. The app teaches basic concepts of physics, mechanics, and electricity through playful interactive challenges.',
        'project_goals': '- Introduce STEM concepts at an early age\n- Create an engaging educational experience\n- Launch an MVP for real-user testing within a few months\n- Keep the development cost-effective due to limited budget',
        'target_audience': 'Children aged 5–10\nParents and educators (as influencers and feedback providers)',
        'user_problems': '- Need for engaging, interactive learning methods\n- Need for fun introduction to STEM topics',
        'features': '- Character-guided learning paths (Lighti)\n- Interactive physics and mechanics challenges\n- Reward system for completed levels',
        'integrations': 'None specified at MVP stage',
        'examples': 'Educational mobile games for kids with a strong narrative\nReference: ABCmouse, Khan Academy Kids',
        'budget': 'Limited / Bootstrapped (lean development needed)',
        'deadline': 'MVP: 2-3 months, Full launch: TBD based on MVP results',
        'additional_info': '- Must be lightweight for mobile devices\n- Scalable to add new levels in the future\n- Basic character animation\n- Informal feedback gathering during MVP testing phase\n- Easy onboarding for kids\n- Future development plans include more levels and educational content based on user feedback'
    };

    // Autofill for existing project
    const existingProjectAnswers = {
        'company_name': '[Not specified]',
        'business_area': 'Educational technology, children\'s learning apps',
        'geography': 'International focus, primarily targeting English-speaking countries',
        'social_links': '[Not specified]',
        'project_description': 'Educational app concept for children (Lighti) with basic mechanics outlined and character design created. The project needs full UI/UX design and development implementation.',
        'project_links': '[Development stage - no live links yet]',
        'project_stage': 'concept',
        'project_goals': '- Design user-friendly, engaging UI/UX around the Lighti concept\n- Create visuals for educational interactions and challenges\n- Prepare basic animations for the character\n- Design a minimal but expandable MVP structure',
        'main_issues': '- No formal UX/UI design yet\n- No detailed user research conducted\n- Need for lightweight and scalable implementation',
        'success_criteria': '- Intuitive app flow for children aged 5–10\n- Cartoonish, bright, motivating design\n- Mobile-first experience (iOS/Android)',
        'design_references': 'Looking for cartoonish, bright, and motivating design examples from successful children\'s educational apps',
        'existing_features': '- Core concept is developed\n- Character design (Lighti) is created\n- Basic educational mechanics are outlined',
        'new_features': '- Complete UI/UX design\n- Interactive challenges and rewards\n- Character animations\n- Cross-platform compatibility',
        'integrations': 'No external integrations required for MVP',
        'technical_constraints': '- Must be lightweight for mobile devices\n- Easy scaling for future levels and content updates\n- Cross-platform compatibility (iOS and Android)',
        'budget': 'Limited - seeking budget-friendly solutions',
        'deadline': 'Fast MVP development needed (2-3 months target)',
        'milestones': '1. UI/UX Design (2-3 weeks)\n2. Visual Assets Creation (2-3 weeks)\n3. MVP Development (4-6 weeks)\n4. Testing & Refinement (2-3 weeks)',
        'additional_info': 'Available Resources:\n- Concept document\n- Character sketches\n- Early gameplay mechanics notes\n- Informal feedback from parents/educators\n\nSpecial Requests:\n- Fast MVP development\n- Budget-friendly solutions\n- Focus on playful learning'
    };

    // Product type checkboxes
    const productTypes = ['mobile', 'saas', 'other'];

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
                if (['mobile', 'saas', 'other'].includes(checkbox.value)) {
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