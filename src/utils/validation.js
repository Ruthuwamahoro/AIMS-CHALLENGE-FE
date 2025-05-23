export var validateRegisterForm = function (formData) {
    var valid = true;
    var errors = {
        fullName: '',
        username: '',
        email: '',
        gender: '',
        telephone: '',
        password: '',
        confirmPassword: ''
    };
    if (formData.fullName.trim().length < 3) {
        errors.fullName = 'Full name must be at least 3 characters';
        valid = false;
    }
    if (formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
        valid = false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'Invalid email address';
        valid = false;
    }
    if (!formData.gender) {
        errors.gender = 'Please select a gender';
        valid = false;
    }
    if (!formData.telephone.trim()) {
        errors.telephone = 'Phone number is required';
        valid = false;
    }
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        errors.password = 'Password does not meet requirements';
        valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        valid = false;
    }
    return { valid: valid, errors: errors };
};
