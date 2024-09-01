import { toast, Bounce } from 'react-toastify';

// دالة لإظهار التوست
const showToast = (variant, content) => {
    const validVariants = ['success', 'error', 'info', 'warn'];
    if (!validVariants.includes(variant)) {
        console.error(`Invalid variant: ${variant}`);
        return;
    }

    toast[variant](content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}

export default showToast;
