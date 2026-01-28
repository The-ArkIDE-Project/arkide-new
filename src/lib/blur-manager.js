class BlurManager {
    constructor() {
        this.STORAGE_KEY = 'arkide_disable_blur';
        this.init();
    }

    init() {
        // Load setting on page load
        const disabled = this.isBlurDisabled();
        this.applyBlurSetting(disabled);
    }

    isBlurDisabled() {
        try {
            return localStorage.getItem(this.STORAGE_KEY) === 'true';
        } catch (e) {
            return false;
        }
    }

    setBlurDisabled(disabled) {
        try {
            localStorage.setItem(this.STORAGE_KEY, disabled.toString());
            this.applyBlurSetting(disabled);
        } catch (e) {
            console.error('Failed to save blur setting:', e);
        }
    }

    applyBlurSetting(disabled) {
        if (disabled) {
            document.body.classList.add('disable-blur');
        } else {
            document.body.classList.remove('disable-blur');
        }
    }
}

export default new BlurManager();